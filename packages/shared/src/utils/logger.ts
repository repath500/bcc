export const createLogger = (service: string) => ({
  info: (msg: string, data?: Record<string, unknown>) =>
    console.log(JSON.stringify({ level: 'info', service, msg, ...data, ts: Date.now() })),
  warn: (msg: string, data?: Record<string, unknown>) =>
    console.warn(JSON.stringify({ level: 'warn', service, msg, ...data, ts: Date.now() })),
  error: (msg: string, error?: Error, data?: Record<string, unknown>) =>
    console.error(
      JSON.stringify({
        level: 'error',
        service,
        msg,
        error: error?.message,
        stack: error?.stack,
        ...data,
        ts: Date.now()
      })
    )
});
