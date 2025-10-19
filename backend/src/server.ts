import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from '@config/index';
import { connectToDatabase } from '@config/db';
import { errorHandler, notFoundHandler } from '@middleware/errorHandler';

import authRoutes from '@routes/auth.routes';
import clubRoutes from '@routes/clubs.routes';
import eventRoutes from '@routes/events.routes';
import recruitmentRoutes from '@routes/recruitments.routes';
import templateRoutes from '@routes/templates.routes';
import adminRoutes from '@routes/admin.routes';
import profileRoutes from '@routes/profile.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Mount APIs aligning with existing frontend calls
app.use('/auth', authRoutes);
app.use('/clubs', clubRoutes);
app.use('/events', eventRoutes);
app.use('/recruitments', recruitmentRoutes);
app.use('/templates', templateRoutes);
app.use('/admin', adminRoutes);
app.use('/profile', profileRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectToDatabase(config.mongoUri);
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on port ${config.port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});
