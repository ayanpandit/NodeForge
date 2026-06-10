let requestTotalCounter = 0;

export function incrementRequestCount() {
  requestTotalCounter++;
}

/**
 * Endpoint for exporting plain text metrics to Prometheus scraping agents.
 */
export function getMetrics(req, res) {
  const uptime = process.uptime();
  const memory = process.memoryUsage();

  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(
    `
# HELP node_uptime_seconds System uptime in seconds.
# TYPE node_uptime_seconds gauge
node_uptime_seconds ${uptime}

# HELP node_memory_rss_bytes Resident set size in bytes.
# TYPE node_memory_rss_bytes gauge
node_memory_rss_bytes ${memory.rss}

# HELP node_memory_heap_used_bytes Heap used in bytes.
# TYPE node_memory_heap_used_bytes gauge
node_memory_heap_used_bytes ${memory.heapUsed}

# HELP http_requests_total Total number of HTTP requests processed.
# TYPE http_requests_total counter
http_requests_total ${requestTotalCounter}
  `.trim() + '\n'
  );
}
