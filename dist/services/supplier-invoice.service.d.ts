export declare class SupplierInvoiceService {
    static createInvoiceFromGRN(data: {
        grnId: number;
        invoiceNumber: string;
        amountUntaxed: number;
        taxAmount: number;
    }): Promise<{
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.supplier_invoice_enum;
        suppl_inv_id: number;
        suppl_invoice_number: string | null;
        party_id: string;
        suppl_invoice_date: Date;
        suppl_inv_due_date: Date | null;
        amount_untaxed: import("@prisma/client-runtime-utils").Decimal | null;
        tax_amount: import("@prisma/client-runtime-utils").Decimal | null;
        po_id: number | null;
    }>;
}
