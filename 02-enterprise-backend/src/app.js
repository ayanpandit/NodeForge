import express from 'express';
import { initLoaders } from './loaders/index.js';

const app = express();

// Load application dependencies, routing, and configurations
await initLoaders(app);

export default app;
