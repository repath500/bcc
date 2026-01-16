import { Sandbox } from 'e2b';
import type { SandboxInstance, SandboxOptions, Env } from '../types';

const normalizeUrl = (value: string) => (value.startsWith('http') ? value : `https://${value}`);

export class E2BProvider {
  constructor(private env: Env) {}

  async createSandbox(options: SandboxOptions): Promise<SandboxInstance> {
    const sandbox = await Sandbox.create({
      apiKey: this.env.E2B_API_KEY,
      timeout: 60 * 60 * 1000
    });

    await this.installOpenCode(sandbox);
    await this.cloneRepository(sandbox, options);
    await this.configureOpenCode(sandbox);

    await this.startOpenCodeServer(sandbox);
    await this.startVSCodeServer(sandbox);

    const sandboxUrl = normalizeUrl(sandbox.getHostname(4096));
    const vscodeUrl = normalizeUrl(sandbox.getHostname(8080));
    const opencodeSessionId = await this.createOpenCodeSession(sandboxUrl);

    return {
      sandboxId: options.sessionId,
      sandboxUrl,
      vscodeUrl,
      opencodeSessionId,
      sandbox
    };
  }

  async closeSandbox(instance: SandboxInstance): Promise<void> {
    await instance.sandbox.close();
  }

  private async installOpenCode(sandbox: Sandbox): Promise<void> {
    await sandbox.process.startAndWait('bash -c "curl -fsSL https://opencode.ai/install | bash"');
  }

  private async cloneRepository(sandbox: Sandbox, options: SandboxOptions): Promise<void> {
    const authenticatedUrl = options.repoUrl.replace(
      'https://github.com/',
      `https://x-access-token:${options.githubToken}@github.com/`
    );

    await sandbox.process.startAndWait(`git clone --branch ${options.branch} ${authenticatedUrl} /workspace`);

    await sandbox.process.startAndWait({
      cmd: 'git config --global user.email "bot@inspect.local"',
      cwd: '/workspace'
    });

    await sandbox.process.startAndWait({
      cmd: 'git config --global user.name "Inspect Bot"',
      cwd: '/workspace'
    });

    await sandbox.process.startAndWait({
      cmd: 'git config --global credential.helper store',
      cwd: '/workspace'
    });

    await sandbox.filesystem.write(
      '/root/.git-credentials',
      `https://x-access-token:${options.githubToken}@github.com\n`
    );

    await sandbox.process.startAndWait({
      cmd: `git remote set-url origin ${authenticatedUrl}`,
      cwd: '/workspace'
    });
  }

  private async configureOpenCode(sandbox: Sandbox): Promise<void> {
    const config = {
      $schema: 'https://opencode.ai/config.json',
      model: 'zai/glm-4.7',
      provider: {
        zai: {
          npm: '@ai-sdk/openai-compatible',
          name: 'Z.AI',
          options: {
            baseURL: 'https://api.z.ai/api/paas/v4',
            apiKey: this.env.ZAI_API_KEY
          },
          models: {
            'glm-4.7': {
              name: 'GLM-4.7',
              thinking: { type: 'enabled', clear_thinking: false }
            }
          }
        }
      }
    };

    await sandbox.filesystem.write(
      '/root/.config/opencode/opencode.json',
      JSON.stringify(config, null, 2)
    );
  }

  private async startOpenCodeServer(sandbox: Sandbox): Promise<void> {
    await sandbox.process.start({
      cmd: 'opencode serve --port 4096',
      cwd: '/workspace',
      envVars: {
        OPENCODE_SERVER_PASSWORD: this.env.OPENCODE_SERVER_PASSWORD
      }
    });

    await this.waitForServer(sandbox, 4096);
  }

  private async startVSCodeServer(sandbox: Sandbox): Promise<void> {
    await sandbox.process.startAndWait('bash -c "curl -fsSL https://code-server.dev/install.sh | sh"');

    await sandbox.process.start({
      cmd: 'code-server --bind-addr 0.0.0.0:8080 --auth none /workspace'
    });
  }

  private async waitForServer(sandbox: Sandbox, port: number): Promise<void> {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const result = await sandbox.process.startAndWait(`curl -s http://localhost:${port}/health || true`);

      if (result.stdout.trim().length > 0) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error(`OpenCode server failed to start on port ${port}`);
  }

  private async createOpenCodeSession(sandboxUrl: string): Promise<string> {
    const auth = btoa(`opencode:${this.env.OPENCODE_SERVER_PASSWORD}`);

    const response = await fetch(`${sandboxUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`Failed to create OpenCode session: ${response.status}`);
    }

    const data = (await response.json()) as { id: string };
    return data.id;
  }
}
