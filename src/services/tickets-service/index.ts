import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType> {
    const ticketTypes = await ticketsRepository.findManyTickets();

    return ticketTypes;
}

const ticketsService = {
    getAllTicketTypes
}

export default ticketsService;