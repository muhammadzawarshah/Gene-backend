import { StockService } from '../../services/stock.service.js';
import { prisma } from '../../lib/prisma.js';
export class StockController {
    static async getStockByWarehouse(req, res) {
        try {
            const { warehouseId } = req.params;
            if (!warehouseId || isNaN(Number(warehouseId))) {
                return res.status(400).json({
                    success: false,
                    message: "Valid Warehouse ID lazmi hai."
                });
            }
            const stockData = await StockService.getWarehouseStock(Number(warehouseId));
            if (!stockData || stockData.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Is warehouse mein koi stock nahi mila.",
                    data: []
                });
            }
            const formattedStock = stockData.map((item) => ({
                stock_id: item.stock_item_id,
                warehouse_id: item.warehouse_id,
                product_name: item.product?.name,
                product_code: item.product?.product_code,
                uom: item.product?.uom?.name || 'N/A',
                on_hand: Number(item.quantity_on_hand),
                reserved: Number(item.reserved_quantity),
                available: Number(item.quantity_on_hand) - Number(item.reserved_quantity),
                unit_price: item.product?.productprice?.[0]?.unit_price || 0,
                currency: item.product?.productprice?.[0]?.currency || 'PKR'
            }));
            return res.status(200).json({
                success: true,
                count: formattedStock.length,
                data: formattedStock
            });
        }
        catch (error) {
            console.error("Stock Controller Error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error: Stock fetch karne mein masla hua.",
                error: error.message
            });
        }
    }
    static async stockTransfer(req, res) {
        try {
            const { from_warehouse_id, to_warehouse_id, items } = req.body;
            const transaction = await prisma.$transaction(async (tx) => {
                const results = [];
                for (const item of items) {
                    const sourceStock = await tx.stockitem.update({
                        where: {
                            product_id_warehouse_id: {
                                product_id: item.product_id,
                                warehouse_id: Number(from_warehouse_id),
                            },
                        },
                        data: {
                            quantity_on_hand: { decrement: Number(item.quantity) },
                        },
                    });
                    const destStock = await tx.stockitem.upsert({
                        where: {
                            product_id_warehouse_id: {
                                product_id: item.product_id,
                                warehouse_id: Number(to_warehouse_id),
                            },
                        },
                        update: {
                            quantity_on_hand: { increment: Number(item.quantity) },
                        },
                        create: {
                            product_id: item.product_id,
                            warehouse_id: Number(to_warehouse_id),
                            quantity_on_hand: Number(item.quantity),
                            uom_id: item.uom_id || 1,
                        },
                    });
                    const movement = await tx.stockmovement.create({
                        data: {
                            mov_type: 'TRANSFER',
                            product_id: item.product_id,
                            warehouse_from_id: Number(from_warehouse_id),
                            warehouse_to_id: Number(to_warehouse_id),
                            quantity: Number(item.quantity),
                            uom_id: 1,
                            posted_at: new Date(),
                        },
                    });
                    results.push({ movement });
                }
                return results;
            });
            return res.status(200).json({
                success: true,
                message: "Stock successfully moved between warehouses.",
                data: transaction,
            });
        }
        catch (error) {
            console.error("Transfer Error:", error);
            return res.status(500).json({
                success: false,
                error: error.message || "Internal Server Error"
            });
        }
    }
}
//# sourceMappingURL=stock.controller.js.map