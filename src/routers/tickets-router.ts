import { getTickets, getTicketsTypes, postTicket } from '@/controllers';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/', getTickets);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.post('/', postTicket);

export { ticketsRouter };
