import { getPaymentByTicketId } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', getPaymentByTicketId);

export { paymentsRouter };
