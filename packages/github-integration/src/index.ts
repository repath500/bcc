import { App } from '@octokit/app';

export interface GitHubAuthConfig {
  appId: string;
  privateKey: string;
}

export class GitHubIntegration {
  private app: App;

  constructor(config: GitHubAuthConfig) {
    this.app = new App({
      appId: config.appId,
      privateKey: this.normalizePrivateKey(config.privateKey)
    });
  }

  async getInstallationToken(installationId: number): Promise<string> {
    const { data } = await this.app.octokit.request(
      'POST /app/installations/{installation_id}/access_tokens',
      { installation_id: installationId }
    );

    return data.token;
  }

  async getInstallationOctokit(installationId: number): Promise<ReturnType<typeof this.app.getInstallationOctokit>> {
    return this.app.getInstallationOctokit(installationId);
  }

  async listRepositories(installationId: number) {
    const octokit = await this.getInstallationOctokit(installationId);
    const { data } = await octokit.request('GET /installation/repositories');
    return data.repositories;
  }

  async getAuthenticatedCloneUrl(
    owner: string,
    repo: string,
    installationId: number
  ): Promise<{ cloneUrl: string; token: string }> {
    const token = await this.getInstallationToken(installationId);
    const cloneUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;
    return { cloneUrl, token };
  }

  private normalizePrivateKey(key: string): string {
    if (key.includes('\n')) {
      return key.replace(/\\n/g, '\n');
    }
    return key;
  }
}
