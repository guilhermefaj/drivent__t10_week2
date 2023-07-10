import { prisma } from "@/config";


async function getPaymentByTicketId(ticketId: number) {
    return await prisma.payment.findFirst({
        where: {
            ticketId: ticketId,
        }
    })
}

type CardType = {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
}

async function createPayment(card: CardType, ticketId: number, value: number) {
    const { number, issuer } = card;
    const lastDigits = number.toString().slice(-4);
    const paymentData = {
        updatedAt: new Date(),
        cardIssuer: issuer,
        cardLastDigits: lastDigits,
        value,
        createdAt: new Date(),
        ticketId,
    };

    return await prisma.payment.create({
        data: paymentData,
    });
}



const paymentsRepository = {
    getPaymentByTicketId,
    createPayment,
}

export default paymentsRepository;