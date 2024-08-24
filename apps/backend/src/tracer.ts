import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core';
// import { OTLPTraceExporter as GRPCOTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPTraceExporter as PROTOOTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-node';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG); // Uncomment this line to debug otel

const samplePercentage = process.env.NODE_ENV === 'production' ? 0.1 : 1;

const consoleTraceExporter = new ConsoleSpanExporter();
const oltpTraceExporter = new PROTOOTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/traces',
  headers: {
    Authorization: process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTHORIZATION,
  },
});
// const traceExporter = consoleTraceExporter;
const traceExporter = oltpTraceExporter;
const otelSDK = new NodeSDK({
  traceExporter: oltpTraceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-winston': { enabled: true },
    }),
  ],
  resource: new Resource({
    [ATTR_SERVICE_NAME]: `${process.env.OTEL_SERVICE_NAME}-${process.env.NODE_ENV}`,
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  textMapPropagator: new CompositePropagator({
    propagators: [
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
});

export default otelSDK;
