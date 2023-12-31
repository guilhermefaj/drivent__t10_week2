import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";

async function getAllTicketTypes(): Promise<TicketType[]> {
    const ticketTypes = await ticketsRepository.findManyTickets();

    if (ticketTypes.length === 0) {
        return []
    }

    return ticketTypes;
}

async function getTicketTypeById(id: number) {
    return await ticketsRepository.findTicketTypeById(id);
}

async function getTickets(id: number): Promise<Ticket[]> {
    const ticket = await ticketsRepository.findTicket(id);

    return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
    const enrollment = await enrollmentsService.findEnrollmentById(userId);

    const ticket = {
        status: TicketStatus.RESERVED,
        enrollmentId: enrollment.id,
        ticketTypeId: ticketTypeId,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
    }

    const post = await ticketsRepository.postTicket(ticket)

    return post;
}

async function getTicketById(ticketId: number) {
    const ticket = await ticketsRepository.findTicketById(ticketId)

    return ticket;
}

const ticketsService = {
    getAllTicketTypes,
    getTicketTypeById,
    getTickets,
    postTicket,
    getTicketById
}

export default ticketsService;