import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findManyTickets() {
    try {
        return prisma.ticketType.findMany();
    } catch (error) {
        throw new Error(`Can't obtain ticket types: ${error.message}`)
    }
}

async function findTicketTypeById(id: number) {
    return await prisma.ticketType.findFirst({
        where: {
            id,
        }
    })
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


type CreateTicket = Omit<Ticket, "id">;

async function postTicket(ticket: CreateTicket) {

    const { status, enrollmentId, ticketTypeId, createdAt, updatedAt } = ticket

    try {
        const newTicket = await prisma.ticket.create({
            data: {
                status,
                enrollmentId,
                ticketTypeId,
                createdAt,
                updatedAt
            },
        })

        return newTicket
    } catch (error) {
        throw new Error(`Can't create new ticket: ${error.message}`)
    }
}

async function findTicketById(id: number) {
    return await prisma.ticket.findFirst({
        where: {
            id,
        }
    })
}

async function updatePaymentStatus(id: number) {
    await prisma.ticket.update({
        data: {
            status: 'PAID',
        },
        where: {
            id,
        }
    })
}

const ticketsRepository = {
    findManyTickets,
    findTicketTypeById,
    findTicket,
    postTicket,
    findTicketById,
    updatePaymentStatus,
}

export default ticketsRepository;
