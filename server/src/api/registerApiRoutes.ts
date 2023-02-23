import { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler';
import { isAliveHandler } from './routes/isAlive/isAliveHandler';

export const registerApiRoutes = async (router: Router) => {
    router.get('/internal/isAlive', isAliveHandler);
    router.get('/internal/isReady', isReadyHandler);
    return Promise.resolve();
};
