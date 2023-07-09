import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const ticketsTypes = await ticketsService.getAllTicketTypes();
        return res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({})
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    try {
        const ticket = await ticketsService.getTickets(res.locals.userId);
        return res.status(httpStatus.OK).send(ticket)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({})
    }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;


    try {
        const newTicket = await ticketsService.postTicket(userId, ticketTypeId)
        res.status(httpStatus.CREATED).send(newTicket)
    } catch (error) {
        return
    }
}