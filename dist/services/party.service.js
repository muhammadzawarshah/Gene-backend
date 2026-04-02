import { prisma } from '../lib/prisma.js';
import { v4 as uuidv4 } from 'uuid';
export class PartyService {
    static async createParty(data) {
        return await prisma.party.create({
            data: {
                party_id: uuidv4(),
                name: data.name,
                type: data.type,
                email: data.email,
                phone: data.phone,
                tax_id: data.tax_id ? parseInt(data.tax_id) : null,
                addresses: {
                    create: {
                        line1: data.address_line1,
                        city: data.city,
                        country: data.country,
                        postal_code: data.postal_code
                    }
                }
            },
            include: { addresses: true }
        });
    }
    static async getPartiesByType(type) {
        return await prisma.party.findMany({
            where: {
                OR: [
                    { type: type },
                    { type: 'BOTH' }
                ]
            },
            include: {
                addresses: true,
                _count: {
                    select: {
                        customerinvoice: type === 'CUSTOMER',
                        purchaseorder: type === 'SUPPLIER'
                    }
                }
            }
        });
    }
    static async getPartyById(id) {
        return await prisma.party.findUnique({
            where: { party_id: id },
            include: { addresses: true, tax: true }
        });
    }
    static async updateParty(id, data) {
        return await prisma.party.update({
            where: { party_id: id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                tax_id: data.tax_id ? parseInt(data.tax_id) : undefined,
                ...(data.address_line1 && {
                    addresses: {
                        updateMany: {
                            where: { party_id: id },
                            data: {
                                line1: data.address_line1,
                                city: data.city,
                                country: data.country,
                                postal_code: data.postal_code
                            }
                        }
                    }
                })
            },
            include: { addresses: true }
        });
    }
    static async deleteParty(id) {
        const linked = await prisma.salesorder.count({ where: { party_id_customer: id } });
        if (linked > 0)
            throw new Error('PARTY_HAS_ORDERS: Cannot delete a distributor with existing orders.');
        await prisma.addresses.deleteMany({ where: { party_id: id } });
        return await prisma.party.delete({ where: { party_id: id } });
    }
}
//# sourceMappingURL=party.service.js.map