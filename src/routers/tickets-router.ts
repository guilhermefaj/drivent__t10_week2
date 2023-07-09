import { getTickets, getTicketsTypes, postTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken)
ticketsRouter.get('/', getTickets);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.post('/', postTicket);

export { ticketsRouter };
