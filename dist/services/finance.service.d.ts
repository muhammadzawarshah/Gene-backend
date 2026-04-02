export declare class FinanceService {
    static createInvoice(deliveryId: string, narration?: string, userId?: string): Promise<{
        cust_inv_id: number;
        cust_invoice_number: string | null;
        party_id_customer: string;
        cust_invoice_date: Date;
        cust_inv_due_date: Date | null;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.customer_invoice_enum;
        so_id: number | null;
    }>;
    static createInvoiceFromGRN(grnId: number, narration?: string, userId?: string): Promise<{
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
    static processPayment(data: {
        amount: number;
        method: any;
        invoiceId: number;
        remarks?: string;
        narration?: string;
        userId?: string;
        payment_date?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            party_id: string | null;
            payment_id: number;
            payment_number: string | null;
            payment_date: Date;
            payment_type: import("@prisma/client").$Enums.payment_enum;
            method: import("@prisma/client").$Enums.payment_enum_method;
            amount: import("@prisma/client-runtime-utils").Decimal;
            reference_number: string | null;
            created_by: string | null;
            created_at: Date | null;
        };
    }>;
    static getInvoices(userId: string, statusFilter: string, search: string): Promise<{
        id: any;
        poRef: any;
        dueDate: string;
        totalAmount: string;
        paidAmount: any;
        balance: string;
        status: any;
    }[]>;
    static getinvoice(): Promise<({
        customerinvoiceline: {
            cust_inv_line_id: number;
        }[];
        party: {
            email: string | null;
            name: string;
            phone: string | null;
        };
    } & {
        cust_inv_id: number;
        cust_invoice_number: string | null;
        party_id_customer: string;
        cust_invoice_date: Date;
        cust_inv_due_date: Date | null;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.customer_invoice_enum;
        so_id: number | null;
    })[]>;
    static specificinvoice(id: number): Promise<({
        customerinvoiceline: ({
            product: ({
                productcategory: {
                    description: string | null;
                    product_category_id: number;
                    category: string | null;
                } | null;
                uom: {
                    uom_id: number;
                    name: string;
                    conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
                };
            } & {
                product_id: string;
                uom_id: number;
                name: string;
                sku_code: string | null;
                description: string | null;
                product_cat_id: number | null;
                hsn_code: string | null;
                brand: string | null;
            }) | null;
            tax: {
                gl_account_id: number | null;
                tax_id: number;
                name: string;
                type: string;
                rate: import("@prisma/client-runtime-utils").Decimal | null;
                context: string | null;
            } | null;
        } & {
            product_id: string | null;
            cust_inv_id: number;
            cust_inv_line_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            discount: import("@prisma/client-runtime-utils").Decimal | null;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
        })[];
        party: {
            party_id: string;
            user_id: number | null;
            email: string | null;
            tax_id: number | null;
            name: string;
            type: import("@prisma/client").$Enums.party_enum;
            phone: string | null;
        };
    } & {
        cust_inv_id: number;
        cust_invoice_number: string | null;
        party_id_customer: string;
        cust_invoice_date: Date;
        cust_inv_due_date: Date | null;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.customer_invoice_enum;
        so_id: number | null;
    }) | null>;
    static payments(): Promise<({
        party: {
            party_id: string;
            user_id: number | null;
            email: string | null;
            tax_id: number | null;
            name: string;
            type: import("@prisma/client").$Enums.party_enum;
            phone: string | null;
        } | null;
    } & {
        party_id: string | null;
        payment_id: number;
        payment_number: string | null;
        payment_date: Date;
        payment_type: import("@prisma/client").$Enums.payment_enum;
        method: import("@prisma/client").$Enums.payment_enum_method;
        amount: import("@prisma/client-runtime-utils").Decimal;
        reference_number: string | null;
        created_by: string | null;
        created_at: Date | null;
    })[]>;
    static processPurchasePayment(data: {
        amount: number;
        method: any;
        invoiceId: number;
        remarks?: string;
        narration?: string;
        userId?: string;
        payment_date?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            party_id: string | null;
            payment_id: number;
            payment_number: string | null;
            payment_date: Date;
            payment_type: import("@prisma/client").$Enums.payment_enum;
            method: import("@prisma/client").$Enums.payment_enum_method;
            amount: import("@prisma/client-runtime-utils").Decimal;
            reference_number: string | null;
            created_by: string | null;
            created_at: Date | null;
        };
    }>;
    static purchaseInvoiceList(): Promise<{
        id: number;
        invoiceNumber: string | null;
        supplierName: string;
        date: Date;
        dueDate: Date | null;
        totalAmount: import("@prisma/client-runtime-utils").Decimal | null;
        paidAmount: number;
        balanceAmount: number;
        status: import("@prisma/client").$Enums.supplier_invoice_enum;
        poReference: string;
    }[]>;
    static specificPurchaseInvoice(invoiceId: number): Promise<{
        totalPaid: number;
        balanceDue: number;
        party: {
            addresses: {
                line1: string;
                line2: string | null;
                city: string | null;
                postal_code: string | null;
                country: string | null;
            }[];
            party_id: string;
            email: string | null;
            name: string;
            phone: string | null;
        };
        paymentallocation: ({
            payment: {
                party_id: string | null;
                payment_id: number;
                payment_number: string | null;
                payment_date: Date;
                payment_type: import("@prisma/client").$Enums.payment_enum;
                method: import("@prisma/client").$Enums.payment_enum_method;
                amount: import("@prisma/client-runtime-utils").Decimal;
                reference_number: string | null;
                created_by: string | null;
                created_at: Date | null;
            };
        } & {
            cust_inv_id: number | null;
            suppl_inv_id: number | null;
            payment_id: number;
            remarks: string | null;
            payment_allocation_id: number;
            allocated_amount: import("@prisma/client-runtime-utils").Decimal;
        })[];
        purchaseorder: {
            total_amount: import("@prisma/client-runtime-utils").Decimal | null;
            status: import("@prisma/client").$Enums.purchase_order_enum;
            po_id: number;
            party_id_supplier: string;
            order_date: Date;
            expected_del_date: Date | null;
        } | null;
        supplierinvoiceline: ({
            product: {
                name: string;
                sku_code: string | null;
            } | null;
            tax: {
                gl_account_id: number | null;
                tax_id: number;
                name: string;
                type: string;
                rate: import("@prisma/client-runtime-utils").Decimal | null;
                context: string | null;
            } | null;
        } & {
            product_id: string | null;
            suppl_inv_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            suppl_inv_line_id: number;
        })[];
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
    static custinvoice(userid: number): Promise<({
        customerinvoiceline: ({
            product: {
                product_id: string;
                uom_id: number;
                name: string;
                sku_code: string | null;
                description: string | null;
                product_cat_id: number | null;
                hsn_code: string | null;
                brand: string | null;
            } | null;
        } & {
            product_id: string | null;
            cust_inv_id: number;
            cust_inv_line_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            discount: import("@prisma/client-runtime-utils").Decimal | null;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        cust_inv_id: number;
        cust_invoice_number: string | null;
        party_id_customer: string;
        cust_invoice_date: Date;
        cust_inv_due_date: Date | null;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.customer_invoice_enum;
        so_id: number | null;
    })[]>;
    static custpayment(userid: number): Promise<({
        paymentallocation: {
            cust_inv_id: number | null;
            suppl_inv_id: number | null;
            payment_id: number;
            remarks: string | null;
            payment_allocation_id: number;
            allocated_amount: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        party_id: string | null;
        payment_id: number;
        payment_number: string | null;
        payment_date: Date;
        payment_type: import("@prisma/client").$Enums.payment_enum;
        method: import("@prisma/client").$Enums.payment_enum_method;
        amount: import("@prisma/client-runtime-utils").Decimal;
        reference_number: string | null;
        created_by: string | null;
        created_at: Date | null;
    })[]>;
    private static updateAccountBalances;
    static getLedger(): Promise<{
        gl_account_id: number;
        gl_account_code: string;
        name: string;
        type: string;
        parent_account_id: number | null;
        is_control_account: boolean | null;
        parent_name: any;
        balance: {
            gl_account_id: number;
            acc_bal_id: number;
            period: string;
            opening_balance: import("@prisma/client-runtime-utils").Decimal | null;
            debit_total: import("@prisma/client-runtime-utils").Decimal | null;
            credit_total: import("@prisma/client-runtime-utils").Decimal | null;
            closing_balance: import("@prisma/client-runtime-utils").Decimal | null;
        } | {
            opening_balance: number;
            debit_total: number;
            credit_total: number;
            closing_balance: number;
        };
    }[]>;
    static getLedgerLines(glAccountId: number): Promise<{
        account: {
            gl_account_id: number;
            gl_account_code: string;
            parent_account_id: number | null;
            name: string;
            type: string;
            is_control_account: boolean | null;
            controled_by: string | null;
        } | null;
        lines: {
            journal_line_id: number;
            date: Date;
            journal_number: string;
            journal_type: import("@prisma/client").$Enums.journal_type_enum;
            narration: string | null;
            party: string | null;
            debit: number;
            credit: number;
            running_balance: number;
        }[];
    }>;
    static getAccountBalances(): Promise<{
        gl_account_id: number;
        code: string;
        name: string;
        type: string;
        opening_balance: number;
        debit_total: number;
        credit_total: number;
        closing_balance: number;
        period: string;
    }[]>;
    static getPaymentAllocations(): Promise<{
        allocation_id: number;
        payment_id: number;
        payment_number: any;
        payment_type: import("@prisma/client").$Enums.payment_enum;
        payment_method: import("@prisma/client").$Enums.payment_enum_method;
        payment_date: Date;
        party: string;
        allocated_amount: number;
        remarks: string | null;
        invoice_ref: string;
        invoice_total: number;
    }[]>;
    static getAccountsDashboard(): Promise<{
        stats: {
            label: string;
            value: string;
            change: string;
            trend: string;
        }[];
        transactions: {
            id: string;
            party: string;
            type: import("@prisma/client").$Enums.journal_type_enum;
            amount: number;
            status: string;
        }[];
        accounts: {
            name: string;
            type: string;
            balance: number;
        }[];
        urgentPayables: number;
        pendingDeliveries: number;
        recentPayments: {
            id: string;
            party: any;
            type: import("@prisma/client").$Enums.payment_enum;
            amount: number;
            method: import("@prisma/client").$Enums.payment_enum_method;
            date: Date;
        }[];
    }>;
    static getPartyLedgerSummary(type: 'CUSTOMER' | 'SUPPLIER'): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        totalBalance: number;
        totalDue: number;
        lastActive: string;
    }[]>;
    static getPartyLedgerDetails(partyId: string): Promise<{
        id: string;
        invoice_ref: string | null;
        date: string;
        type: import("@prisma/client").$Enums.journal_type_enum;
        description: string;
        debit: number;
        credit: number;
        balance: number;
    }[]>;
    static getReceivables(): Promise<{
        id: string;
        customer: string;
        amount: number;
        dueDate: string | undefined;
        daysOverdue: number;
        status: string;
    }[]>;
    static getPendingPayments(): Promise<{
        id: string;
        customer: string;
        amount: number;
        method: string;
        submittedDate: string | undefined;
        referenceNo: string;
        attachment: boolean;
    }[]>;
    static getPaymentHistory(): Promise<{
        id: string;
        customer: string;
        amount: number;
        method: string;
        date: string | undefined;
        time: string;
        status: string;
        ledgerImpact: string;
    }[]>;
}
