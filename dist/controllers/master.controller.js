import { prisma } from '../lib/prisma.js';
import { v4 as uuidv4 } from 'uuid';
export class ERPController {
    static async createProduct(req, res, next) {
        try {
            const { name, sku, uom_id, product_cat_id, brand } = req.body;
            const product = await prisma.product.create({
                data: {
                    product_id: uuidv4(),
                    name: name,
                    sku_code: sku,
                    uom_id: Number(uom_id),
                    product_cat_id: product_cat_id ? Number(product_cat_id) : null,
                    brand: brand || null,
                }
            });
            res.status(201).json({ success: true, data: product });
        }
        catch (e) {
            console.error("Prisma Error:", e);
            next(e);
        }
    }
    static async addParty(req, res, next) {
        try {
            const { name, email, phone, type, organization, accessLevel } = req.body;
            const party = await prisma.party.create({
                data: {
                    party_id: uuidv4(),
                    name: name,
                    email: email,
                    type: type || 'CUSTOMER',
                    phone: phone || null
                }
            });
            res.status(201).json({ success: true, data: party });
        }
        catch (e) {
            console.error("Prisma Error Details:", e);
            next(e);
        }
    }
    static async createUOM(req, res, next) {
        try {
            const uom = await prisma.uom.create({ data: { ...req.body } });
            res.status(201).json({ success: true, data: uom });
        }
        catch (e) {
            next(e);
        }
    }
    static async createPurchaseOrder(req, res, next) {
        try {
            console.log(req.body);
            const { items, financials } = req.body;
            const po = await prisma.purchaseorder.create({
                data: {
                    party: {
                        connect: { party_id: '11111111-1111-1111-1111-111111111111' }
                    },
                    order_date: new Date(),
                    status: 'APPROVED',
                    total_amount: parseFloat(financials.netTotal),
                    purchaseorderline: {
                        create: items.map((item) => {
                            const qty = parseFloat(item.total_unit);
                            const rate = parseFloat(item.approved_rate);
                            const itemLineTotal = qty * rate;
                            return {
                                product_id: item.product_id,
                                quantity: qty,
                                uom_id: Number(item.uom_id) || 1,
                                tax_id: item.tax_id ? Number(item.tax_id) : null,
                                unit_price: rate,
                                line_total: itemLineTotal
                            };
                        })
                    }
                },
                include: {
                    purchaseorderline: true
                }
            });
            res.status(201).json({ success: true, data: po });
        }
        catch (e) {
            console.error("PO Creation Error:", e);
            next(e);
        }
    }
    static async pickGRN(req, res, next) {
        try {
            const po = await prisma.purchaseorder.findUnique({
                where: { po_id: Number(req.params.id) },
                include: { purchaseorderline: { include: { product: true } } }
            });
            res.json({ success: true, data: po });
        }
        catch (e) {
            next(e);
        }
    }
    static async getOpenPOs(req, res, next) {
        try {
            const openPOs = await prisma.purchaseorder.findMany({
                where: {
                    status: {
                        notIn: ['RECIEVED', 'CANCELLED']
                    }
                },
                include: {
                    party: {
                        select: { name: true }
                    }
                },
                orderBy: {
                    order_date: 'desc'
                }
            });
            const formattedPOs = openPOs.map((po) => ({
                id: po.po_id,
                po_number: `PO-#${po.po_id}`,
                vendor_name: po.party?.name || "Unknown Supplier",
                date: po.order_date
            }));
            res.status(200).json({
                success: true,
                data: formattedPOs
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async receiveGoods(req, res, next) {
        try {
            const { po_id, warehouse_id, items } = req.body;
            if (!po_id || !warehouse_id || !items || !Array.isArray(items)) {
                return res.status(400).json({
                    success: false,
                    message: "Missing mandatory fields: po_id, warehouse_id, or items array."
                });
            }
            const result = await prisma.$transaction(async (tx) => {
                const grn = await tx.grn.create({
                    data: {
                        po_id: Number(po_id),
                        received_date: new Date(),
                        status: 'RECEIVED'
                    }
                });
                for (const item of items) {
                    const qty = parseFloat(item.received_qty);
                    if (isNaN(qty))
                        continue;
                    await tx.stockitem.upsert({
                        where: {
                            product_id_warehouse_id: {
                                product_id: String(item.product_id),
                                warehouse_id: Number(warehouse_id)
                            }
                        },
                        update: {
                            quantity_on_hand: { increment: qty }
                        },
                        create: {
                            product_id: String(item.product_id),
                            warehouse_id: Number(warehouse_id),
                            quantity_on_hand: qty,
                            uom_id: item.uom_id || 'PCS'
                        }
                    });
                }
                return grn;
            });
            return res.status(200).json({
                success: true,
                message: "Stock Updated Successfully",
                data: result
            });
        }
        catch (error) {
            console.error("GRN_TRANSACTION_ERROR:", error);
            next(error);
        }
    }
    static async getPOItems(req, res, next) {
        try {
            const { po_id } = req.params;
            const poDetails = await prisma.purchaseorder.findUnique({
                where: { po_id: Number(po_id) },
                include: {
                    purchaseorderline: {
                        include: {
                            product: {
                                select: {
                                    product_id: true,
                                    name: true,
                                }
                            },
                            uom: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    party: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            if (!poDetails) {
                return res.status(404).json({ success: false, message: "PO Not Found" });
            }
            const responseData = {
                po_id: poDetails.po_id,
                supplier: poDetails.party.name,
                items: poDetails.purchaseorderline.map(line => ({
                    product_id: line.product_id,
                    product_name: line.product.name,
                    quantity: line.quantity,
                    uom_name: line.uom.name,
                    uom_id: line.uom_id
                }))
            };
            res.json({ success: true, data: responseData });
        }
        catch (e) {
            console.error(e);
            next(e);
        }
    }
    static async getDropdowns(req, res, next) {
        try {
            const [products, parties, uoms, categories, warehouses, provinces, tax, batch] = await Promise.all([
                prisma.product.findMany({ select: { product_id: true, name: true, sku_code: true } }),
                prisma.party.findMany(),
                prisma.uom.findMany(),
                prisma.productcategory.findMany(),
                prisma.warehouse.findMany(),
                prisma.province.findMany(),
                prisma.tax.findMany(),
                prisma.batch.findMany({
                    include: {
                        batchitem: { include: { product: { select: { product_id: true, name: true, sku_code: true } } } },
                        province: { select: { province_id: true, name: true } }
                    },
                    orderBy: { batch_id: 'desc' }
                }),
            ]);
            res.json({
                success: true,
                data: {
                    products,
                    parties,
                    uoms,
                    categories,
                    warehouses,
                    provinces,
                    tax,
                    batch
                }
            });
        }
        catch (e) {
            console.error("Dropdown Fetch Error:", e);
            next(e);
        }
    }
}
//# sourceMappingURL=master.controller.js.map