import { getTicketsTypes } from '@/controllers';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/tickets/types', getTicketsTypes);

export { ticketsRouter };
