import { prisma } from "@/config";


async function getPaymentByTicketId(ticketId: number) {
    return await prisma.payment.findFirst({
        where: {
            ticketId: ticketId,
        }
    })
}

const paymentsRepository = {
    getPaymentByTicketId,
}

export default paymentsRepository;