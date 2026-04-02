export declare class PartyService {
    static createParty(data: any): Promise<{
        addresses: {
            party_id: string;
            address_id: number;
            line1: string;
            line2: string | null;
            city: string | null;
            postal_code: string | null;
            country: string | null;
        }[];
    } & {
        party_id: string;
        user_id: number | null;
        email: string | null;
        tax_id: number | null;
        name: string;
        type: import("@prisma/client").$Enums.party_enum;
        phone: string | null;
    }>;
    static getPartiesByType(type: 'CUSTOMER' | 'SUPPLIER' | 'BOTH'): Promise<({
        addresses: {
            party_id: string;
            address_id: number;
            line1: string;
            line2: string | null;
            city: string | null;
            postal_code: string | null;
            country: string | null;
        }[];
        _count: {
            customerinvoice: number;
            purchaseorder: number;
        };
    } & {
        party_id: string;
        user_id: number | null;
        email: string | null;
        tax_id: number | null;
        name: string;
        type: import("@prisma/client").$Enums.party_enum;
        phone: string | null;
    })[]>;
    static getPartyById(id: string): Promise<({
        addresses: {
            party_id: string;
            address_id: number;
            line1: string;
            line2: string | null;
            city: string | null;
            postal_code: string | null;
            country: string | null;
        }[];
        tax: {
            gl_account_id: number | null;
            tax_id: number;
            name: string;
            type: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
            context: string | null;
        } | null;
    } & {
        party_id: string;
        user_id: number | null;
        email: string | null;
        tax_id: number | null;
        name: string;
        type: import("@prisma/client").$Enums.party_enum;
        phone: string | null;
    }) | null>;
    static updateParty(id: string, data: any): Promise<{
        addresses: {
            party_id: string;
            address_id: number;
            line1: string;
            line2: string | null;
            city: string | null;
            postal_code: string | null;
            country: string | null;
        }[];
    } & {
        party_id: string;
        user_id: number | null;
        email: string | null;
        tax_id: number | null;
        name: string;
        type: import("@prisma/client").$Enums.party_enum;
        phone: string | null;
    }>;
    static deleteParty(id: string): Promise<{
        party_id: string;
        user_id: number | null;
        email: string | null;
        tax_id: number | null;
        name: string;
        type: import("@prisma/client").$Enums.party_enum;
        phone: string | null;
    }>;
}
