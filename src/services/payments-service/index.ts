import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsService from "../tickets-service";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

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
type CardType = {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
}

type PaymentType = {
    ticketId: number;
    cardType: CardType;
}

async function postPayment(pay: PaymentType, userId: number) {
    const { ticketId, cardType } = pay;
    const ticket = await ticketsService.getTicketById(ticketId);
    await getPaymentByTicketId(ticketId, userId);

}


async function createPayment(pay: PaymentType, userId: number) {
    const { ticketId, cardType } = pay;

    try {
        const ticket = await ticketsService.getTicketById(ticketId);
        const enrollment = await enrollmentRepository.findEnrollmentById(userId);
        const payment = await paymentsRepository.getPaymentByTicketId(ticketId);

        if (ticket.enrollmentId !== enrollment.id) {
            throw new Error(`UnauthorizedError: This Ticket doesn't belong to the user`);
        }

        const ticketType = await ticketsService.getTicketTypeById(ticket.ticketTypeId);
        const createdPayment = await paymentsRepository.createPayment(cardType, ticketId, ticketType.price);
        await ticketsRepository.updatePaymentStatus(ticketId);

        return createdPayment;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw new Error('Failed to create payment');
    }
}


const paymentsService = {
    getPaymentByTicketId,
    createPayment,
}

export default paymentsService;