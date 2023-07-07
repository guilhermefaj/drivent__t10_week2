import { getTickets, getTicketsTypes } from '@/controllers';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/', getTickets)
ticketsRouter.get('/types', getTicketsTypes);

export { ticketsRouter };
