import { prisma } from "@/config";

async function findManyTickets() {
    try {
        return prisma.ticketType.findMany();
    } catch (error) {
        throw new Error(`Can't obtain ticket types: ${error.message}`)
    }
}

async function findTicket(userId: number) {
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                Enrollment: {
                    userId: userId,
                },
            },
            include: {
                TicketType: true,
            }
        });

        return tickets
    } catch (error) {
        throw new Error(`Can't obtain user tickets: ${error.message}`)
    }

}

const ticketsRepository = {
    findManyTickets,
    findTicket
}

export default ticketsRepository;
