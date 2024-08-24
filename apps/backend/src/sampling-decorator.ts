import { Context } from '@opentelemetry/api';
import {
  SpanProcessor,
  ReadableSpan,
  Span,
} from '@opentelemetry/sdk-trace-node';

/**
 * Sampling span processor (including all error span and ratio of other spans)
 */
export class SamplingDecorator implements SpanProcessor {
  constructor(private _spanProcessor: SpanProcessor, private _ratio: number) {}

  forceFlush(): Promise<void> {
    return this._spanProcessor.forceFlush();
  }

  onStart(span: Span, parentContext: Context): void {
    this._spanProcessor.onStart(span, parentContext);
  }

  shouldSample(traceId: string): boolean {
    let accumulation = 0;
    for (let idx = 0; idx < traceId.length; idx++) {
      accumulation += traceId.charCodeAt(idx);
    }
    const cmp = (accumulation % 100) / 100;
    return cmp < this._ratio;
  }

  onEnd(span: ReadableSpan): void {
    // Only process spans that have an error status
    if (span.status.code === 2) {
      // Status code 0 means "UNSET", 1 means "OK", and 2 means "ERROR"
      this._spanProcessor.onEnd(span);
    } else {
      if (this.shouldSample(span.spanContext().traceId)) {
        this._spanProcessor.onEnd(span);
      }
    }
  }

  async shutdown(): Promise<void> {
    return this._spanProcessor.shutdown();
  }
}
