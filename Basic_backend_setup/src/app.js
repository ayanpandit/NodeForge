import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';
import { requestIdMiddleware } from './middleware/request-id.middleware.js';
import { notFoundMiddleware } from './middleware/not-found.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import router from './routes/index.js';

const app = express();

// 1. Core security headers and configuration
app.use(helmet());
app.use(cors({ origin: config.security.corsOrigin }));

// 2. Request tracking and parsers
app.use(requestIdMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Logger setup
const morganFormat =
  config.server.env === 'production'
    ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - RequestID: :res[x-request-id]'
    : 'dev';
app.use(morgan(morganFormat));

// 4. API Routes
app.use('/api', router);

// 5. Fallback Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
