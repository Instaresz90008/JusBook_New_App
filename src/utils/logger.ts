
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  module?: string;
  data?: Record<string, any>;
}

// Environment check to control logging in production
const isProd = import.meta.env.PROD;

class Logger {
  private static instance: Logger;
  
  private constructor() {}
  
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(level: LogLevel, message: string, options: LogOptions = {}): void {
    // Always log errors, but only log other levels in development or if explicitly enabled
    if (level === 'error' || !isProd) {
      const timestamp = new Date().toISOString();
      const module = options.module || 'app';
      const logData = {
        timestamp,
        level,
        module,
        message,
        ...(options.data || {})
      };
      
      // In production, we might want to send logs to a service
      if (isProd) {
        // Here you could add code to send logs to a service like LogRocket, Sentry, etc.
        // For now, we'll still console.log in production, but in a real app you might want to send to a service
        console[level](JSON.stringify(logData));
      } else {
        // In development, format for better readability
        const prefix = `[${timestamp}] [${level.toUpperCase()}] [${module}]`;
        
        if (options.data) {
          console[level](prefix, message, options.data);
        } else {
          console[level](prefix, message);
        }
      }
    }
  }

  debug(message: string, options: LogOptions = {}): void {
    this.log('debug', message, options);
  }

  info(message: string, options: LogOptions = {}): void {
    this.log('info', message, options);
  }

  warn(message: string, options: LogOptions = {}): void {
    this.log('warn', message, options);
  }

  error(message: string, options: LogOptions = {}): void {
    this.log('error', message, options);
  }

  // Event tracking specifically for user interactions
  trackEvent(eventName: string, data: Record<string, any> = {}): void {
    this.info(`Event: ${eventName}`, { 
      module: 'events',
      data: { 
        ...data, 
        eventName
      } 
    });
    
    // In production, you could integrate with analytics services here
    if (isProd) {
      // E.g.: analyticsService.track(eventName, data);
    }
  }
}

// Create a singleton logger instance
export const logger = Logger.getInstance();
