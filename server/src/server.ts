import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import compression from 'compression';
import { registerSiteRoutes } from './site/registerSiteRoutes.js';
import { registerApiRoutes } from './api/registerApiRoutes';
import { registerErrorHandlers } from './utils/errorHandlers';

const { APP_PORT, APP_BASE_PATH, ENV } = process.env;

const isLocal = ENV === 'localhost';

const app = express();
const siteRouter = express.Router();
const apiRouter = express.Router();

app.use('*', compression());
app.use(APP_BASE_PATH, siteRouter);
siteRouter.use('/api', apiRouter);

// Redirect from root to basepath in local development environments
if (isLocal && APP_BASE_PATH && APP_BASE_PATH !== '/') {
    app.get('/', (req, res) => res.redirect(APP_BASE_PATH));
}

registerApiRoutes(apiRouter)
    .then(() => registerSiteRoutes(siteRouter))
    .then(() => registerErrorHandlers(app))
    .catch((e) => {
        console.error(`Error occured while initializing server! - ${e}`);
        throw e;
    })
    .then(() => {
        const server = app.listen(APP_PORT, () => {
            console.log(`Server starting on port ${APP_PORT}`);
        });

        const shutdown = () => {
            console.log('Server shutting down');

            server.close(() => {
                console.log('Shutdown complete!');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    });
