export declare class SalesService {
    static createOrder(data: any): Promise<{
        party_id_customer: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        so_id: number;
        order_date: Date;
        expected_del_date: Date | null;
    }>;
    static createCusOrder(data: any): Promise<{
        party_id_customer: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        so_id: number;
        order_date: Date;
        expected_del_date: Date | null;
    }>;
    static listorder(): Promise<({
        party: {
            name: string;
        };
        salesorderline: ({
            product: {
                name: string;
            };
            tax: {
                name: string;
                type: string;
                rate: import("@prisma/client-runtime-utils").Decimal | null;
            } | null;
        } & {
            product_id: string;
            uom_id: number;
            so_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            so_line_id: number;
        })[];
    } & {
        party_id_customer: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        so_id: number;
        order_date: Date;
        expected_del_date: Date | null;
    })[]>;
    static listcustorder(id: string): Promise<({
        party: {
            name: string;
        };
        salesorderline: ({
            product: {
                name: string;
            };
            tax: {
                name: string;
                type: string;
                rate: import("@prisma/client-runtime-utils").Decimal | null;
            } | null;
        } & {
            product_id: string;
            uom_id: number;
            so_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            so_line_id: number;
        })[];
    } & {
        party_id_customer: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        so_id: number;
        order_date: Date;
        expected_del_date: Date | null;
    })[]>;
    static getDashboardOverview(userId: string): Promise<{
        stats: {
            activeOrders: string;
            pendingInvoices: string;
            creditUsedPercentage: number;
            monthlyGrowth: string;
        };
        procurementTrend: number[];
        recentShipments: {
            id: string;
            status: string;
            eta: string;
        }[];
        alerts: {
            id: string;
            message: string;
            subtext: string;
        }[];
        creditDetails: {
            used: string;
            total: string;
        };
    }>;
    static getFinancialLedger(userId: string): Promise<{
        summary: {
            total: string;
            invoiced: string;
            delivered: string;
            growth: string;
        };
        history: {
            id: string;
            date: string;
            amount: string;
            status: string;
            type: string;
        }[];
    }>;
    static getBillingSyncStatus(userId: string): Promise<{
        logs: {
            deliveryId: any;
            id: any;
            items: any;
            date: string | undefined;
            amount: string;
            status: string;
        }[];
        metrics: {
            fullyInvoiced: number;
            pending: number;
            disputed: number;
        };
    }>;
    static updateOrder(orderId: number, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
    static getSalesOrderById(id: string): Promise<{
        party: {
            party_id: string;
            name: string;
            phone: string | null;
        };
        salesorderline: ({
            product: {
                uom: {
                    uom_id: number;
                    name: string;
                    conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
                };
                name: string;
            };
        } & {
            product_id: string;
            uom_id: number;
            so_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            so_line_id: number;
        })[];
    } & {
        party_id_customer: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        so_id: number;
        order_date: Date;
        expected_del_date: Date | null;
    }>;
}
