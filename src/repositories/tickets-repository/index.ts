import { prisma } from "@/config";

async function findManyTickets() {
    return prisma.ticketType.findMany();
}

const ticketsRepository = {
    findManyTickets
}

export default ticketsRepository;
