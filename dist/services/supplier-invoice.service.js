import { prisma } from '../lib/prisma.js';
export class SupplierInvoiceService {
    static async createInvoiceFromGRN(data) {
        return await prisma.$transaction(async (tx) => {
            const grn = await tx.grn.findUnique({
                where: { grn_id: data.grnId },
                include: { purchaseorder: true }
            });
            if (!grn)
                throw new Error("GRN not found");
            const invoice = await tx.supplierinvoice.create({
                data: {
                    po_id: grn.po_id,
                    suppl_invoice_number: data.invoiceNumber,
                    party_id: grn.purchaseorder?.party_id_supplier,
                    suppl_invoice_date: new Date(),
                    amount_untaxed: data.amountUntaxed,
                    tax_amount: data.taxAmount,
                    total_amount: data.amountUntaxed + data.taxAmount,
                    status: 'POSTED'
                }
            });
            await tx.journalentry.create({
                data: {
                    journal_number: `SUP-INV-${invoice.suppl_inv_id}`,
                    journal_type: 'PURCHASE',
                    date: new Date(),
                    source_type: 'SUPPLIER_INVOICE',
                    source_id: invoice.suppl_inv_id,
                    journalline: {
                        create: [
                            { gl_account_id: 5000, debit: data.amountUntaxed },
                            { gl_account_id: 2000, credit: invoice.total_amount },
                            { gl_account_id: 1500, debit: data.taxAmount },
                        ]
                    }
                }
            });
            return invoice;
        });
    }
}
//# sourceMappingURL=supplier-invoice.service.js.map