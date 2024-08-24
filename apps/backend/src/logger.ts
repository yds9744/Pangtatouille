import * as api from '@opentelemetry/api-logs';
// It might be one of http, proto, grpc depending on preferred transport
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { Resource } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};
winston.addColors(config.colors);

// log provider is not initialized automatically @see https://github.com/open-telemetry/opentelemetry-js-contrib/issues/2090
const logExporter = new OTLPLogExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/logs',
  headers: {
    Authorization: process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTHORIZATION,
  },
});
const loggerProvider = new LoggerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: `${process.env.OTEL_SERVICE_NAME}-${process.env.NODE_ENV}`,
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
});

loggerProvider.addLogRecordProcessor(
  new BatchLogRecordProcessor(logExporter),
  // new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
);
api.logs.setGlobalLoggerProvider(loggerProvider);

export default function createLogger() {
  const transports = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
        winston.format.json(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('API', {
          colors: true,
          prettyPrint: true,
          processId: true,
        }),
      ),
    }),
    new OpenTelemetryTransportV3(),
  ];
  const logger = WinstonModule.createLogger({
    defaultMeta: { environment: process.env.NODE_ENV },
    transports,
  });

  return logger;
}
