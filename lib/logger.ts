export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LogContext {
  service?: string;
  method?: string;
  userId?: number;
  requestId?: string;
  [key: string]: unknown;
}

class Logger {
  private context?: string;

  setContext(context: string) {
    this.context = context;
    return this;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = this.context ? `[${this.context}]` : '';
    const additionalContext = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()} ${contextStr}: ${message}${additionalContext}`;
  }

  log(message: string, context?: LogContext) {
    console.log(this.formatMessage(LogLevel.INFO, message, context));
  }

  error(message: string, context?: LogContext) {
    console.error(this.formatMessage(LogLevel.ERROR, message, context));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage(LogLevel.WARN, message, context));
  }

  debug(message: string, context?: LogContext) {
    console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
  }

  info(message: string, context?: LogContext) {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }
}

export const logger = new Logger(); 