import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const ticketsTypes = await ticketsService.getAllTicketTypes();
        return res.status(httpStatus.OK).send(ticketsTypes);
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({})
    }
}

export async function getTickets(req: Request, res: Response) {
    try {
        const ticket = await ticketsService.getTickets(res.locals.userId);
        return res.status(httpStatus.OK).send(ticket)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({})
    }
}