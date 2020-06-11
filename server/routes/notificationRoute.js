import expres from 'express';
import { verifyTokenMiddleWare } from '../util/helper';
import { getUserNotifications, markNotificationRead } from '../controller/notificationController';

const router = expres.Router();

router.get('/', verifyTokenMiddleWare, getUserNotifications)

router.get('/:id/mark-read', verifyTokenMiddleWare, markNotificationRead);

export default router;