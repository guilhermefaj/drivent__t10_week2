import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType[]> {
    const ticketTypes = await ticketsRepository.findManyTickets();

    if (ticketTypes.length === 0) {
        return []
    }

    return ticketTypes;
}

async function getTickets(id: number): Promise<Ticket[]> {
    const ticket = await ticketsRepository.findTicket(id);

    return ticket;
}

const ticketsService = {
    getAllTicketTypes,
    getTickets
}

export default ticketsService;