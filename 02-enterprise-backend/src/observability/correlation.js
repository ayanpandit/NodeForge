import { AsyncLocalStorage } from 'async_hooks';

export const correlationContext = new AsyncLocalStorage();

/**
 * Returns the correlation ID for the active trace context store.
 */
export function getCorrelationId() {
  const store = correlationContext.getStore();
  return store?.requestId;
}
