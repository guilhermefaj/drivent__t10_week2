import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req

    if (!ticketId) {
        res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
        const payment = await paymentsService.getPaymentByTicketId(ticketId, userId)
        res.status(httpStatus.OK).send(payment)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}