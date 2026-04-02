export declare class ReportService {
    static getStockSummary(): Promise<{
        productId: string;
        warehouseId: number;
        availableQty: number;
        onHand: number;
    }[]>;
    static getSalesReport(startDate: Date, endDate: Date): Promise<{
        party: {
            name: string;
        };
        cust_invoice_number: string | null;
        cust_invoice_date: Date;
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
    }[]>;
    static getDashboardStats(): Promise<{
        kpis: {
            totalSalesAmount: number;
            totalSalesCount: number;
            totalPurchaseAmount: number;
            totalPurchaseCount: number;
            totalGRN: number;
            totalDeliveries: number;
            totalProducts: number;
            totalStockOnHand: number;
            pendingSalesOrders: number;
        };
        monthlySales: {
            month: string;
            label: string;
            total: number;
            count: number;
        }[];
        topProducts: {
            product_id: string;
            name: string;
            revenue: number;
            qty: number;
        }[];
        recentInvoices: {
            number: string | null;
            party: string;
            amount: number;
            date: Date;
            status: import("@prisma/client").$Enums.customer_invoice_enum;
        }[];
    }>;
}
