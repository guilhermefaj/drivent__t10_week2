import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsService from "../tickets-service";
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentByTicketId(ticketId: number, userId: number) {
    try {
        const ticket = await ticketsService.getTicketById(ticketId);
        const enrollment = await enrollmentRepository.findEnrollmentById(userId);

        const payment = paymentsRepository.getPaymentByTicketId(ticketId);

        if (ticket.enrollmentId !== enrollment.id) {
            throw new Error(`UnauthorizedError: This Ticket hasn't a user`)
        }

        return payment;
    } catch (error) {
        throw new Error(`Can't get payment by ticketId`)
    }
}

const paymentsService = {
    getPaymentByTicketId,
}

export default paymentsService;