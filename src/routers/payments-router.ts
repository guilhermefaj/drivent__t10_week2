import { getPaymentByTicketId, postPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', getPaymentByTicketId);
paymentsRouter.post('/process', postPayment);

export { paymentsRouter };
