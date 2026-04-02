import { prisma } from '../lib/prisma.js';
export class ReportService {
    static async getStockSummary() {
        const stock = await prisma.stockitem.groupBy({
            by: ['product_id', 'warehouse_id'],
            _sum: { quantity_on_hand: true, reserved_quantity: true },
        });
        return stock.map(item => ({
            productId: item.product_id,
            warehouseId: item.warehouse_id,
            availableQty: Number(item._sum.quantity_on_hand || 0) - Number(item._sum.reserved_quantity || 0),
            onHand: Number(item._sum.quantity_on_hand || 0)
        }));
    }
    static async getSalesReport(startDate, endDate) {
        return await prisma.customerinvoice.findMany({
            where: { cust_invoice_date: { gte: startDate, lte: endDate }, status: 'PAID' },
            select: {
                cust_invoice_number: true,
                total_amount: true,
                cust_invoice_date: true,
                party: { select: { name: true } }
            }
        });
    }
    static async getDashboardStats() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const [salesAgg, purchaseAgg, grnCount, deliveryCount, productCount, stockAgg, pendingSalesOrders, recentInvoices, monthlySalesRaw, topProductsRaw,] = await Promise.all([
            prisma.customerinvoice.aggregate({
                _count: { cust_inv_id: true },
                _sum: { total_amount: true },
            }),
            prisma.purchaseorder.aggregate({
                _count: { po_id: true },
                _sum: { total_amount: true },
            }),
            prisma.grn.count(),
            prisma.deliverynote.count(),
            prisma.product.count(),
            prisma.stockitem.aggregate({
                _sum: { quantity_on_hand: true },
            }),
            prisma.salesorder.count({ where: { status: 'DRAFT' } }),
            prisma.customerinvoice.findMany({
                take: 5,
                orderBy: { cust_invoice_date: 'desc' },
                select: {
                    cust_invoice_number: true,
                    total_amount: true,
                    cust_invoice_date: true,
                    status: true,
                    party: { select: { name: true } },
                },
            }),
            prisma.$queryRaw `
        SELECT
          TO_CHAR(cust_invoice_date, 'YYYY-MM') AS month,
          COALESCE(SUM(total_amount), 0)::text  AS total,
          COUNT(*)::text                         AS count
        FROM customerinvoice
        WHERE cust_invoice_date >= NOW() - INTERVAL '12 months'
        GROUP BY month
        ORDER BY month ASC
      `,
            prisma.$queryRaw `
        SELECT
          p.product_id,
          p.name,
          COALESCE(SUM(cil.line_total), 0)::text AS revenue,
          COALESCE(SUM(cil.quantity), 0)::text   AS qty
        FROM product p
        JOIN customerinvoiceline cil ON cil.product_id = p.product_id
        GROUP BY p.product_id, p.name
        ORDER BY revenue DESC
        LIMIT 5
      `,
        ]);
        const monthMap = {};
        for (const row of monthlySalesRaw) {
            monthMap[row.month] = { total: Number(row.total), count: Number(row.count) };
        }
        const monthlySales = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const label = d.toLocaleString('en', { month: 'short' }).toUpperCase();
            monthlySales.push({ month: key, label, total: monthMap[key]?.total ?? 0, count: monthMap[key]?.count ?? 0 });
        }
        return {
            kpis: {
                totalSalesAmount: Number(salesAgg._sum.total_amount || 0),
                totalSalesCount: salesAgg._count.cust_inv_id,
                totalPurchaseAmount: Number(purchaseAgg._sum.total_amount || 0),
                totalPurchaseCount: purchaseAgg._count.po_id,
                totalGRN: grnCount,
                totalDeliveries: deliveryCount,
                totalProducts: productCount,
                totalStockOnHand: Number(stockAgg._sum.quantity_on_hand || 0),
                pendingSalesOrders,
            },
            monthlySales,
            topProducts: topProductsRaw.map(r => ({
                product_id: r.product_id,
                name: r.name,
                revenue: Number(r.revenue),
                qty: Number(r.qty),
            })),
            recentInvoices: recentInvoices.map(inv => ({
                number: inv.cust_invoice_number,
                party: inv.party.name,
                amount: Number(inv.total_amount || 0),
                date: inv.cust_invoice_date,
                status: inv.status,
            })),
        };
    }
}
//# sourceMappingURL=report.service.js.map