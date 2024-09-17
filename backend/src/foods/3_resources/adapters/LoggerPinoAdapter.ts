import pino, { Logger } from "pino"
import pretty from "pino-pretty"

interface ILogger {
  info(message: any): void
  error(message: any): void
}

class LoggerPinoAdapter implements ILogger {
  private _logger: Logger<never, boolean>

  constructor() {
    const stream = pretty({
      colorize: true,
      ignore: "pid,hostname",
    })

    this._logger = pino(stream)
  }

  info(message: any) {
    this._logger.info(message)
  }

  error(message: any) {
    this._logger.error(message)
  }
}

export default LoggerPinoAdapter
export type { ILogger }
