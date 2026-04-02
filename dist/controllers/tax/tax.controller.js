import { prisma } from '../../lib/prisma.js';
export class TaxController {
    static async getTaxes(req, res) {
        try {
            const taxes = await prisma.tax.findMany({
                orderBy: { tax_id: 'desc' },
                include: { glaccount: true }
            });
            return res.status(200).json({
                success: true,
                data: taxes,
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    static async createTax(req, res) {
        try {
            const { name, rate, type, context, gl_account_id } = req.body;
            if (!name || rate === undefined) {
                return res.status(400).json({ success: false, message: "Name and Rate are required." });
            }
            const newTax = await prisma.tax.create({
                data: {
                    name: name,
                    rate: Number(rate),
                    type: type || 'percentage',
                    context: context || 'sale',
                    gl_account_id: gl_account_id ? Number(gl_account_id) : null
                }
            });
            return res.status(201).json({
                success: true,
                data: newTax,
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    static async deleteTax(req, res) {
        try {
            const { id } = req.params;
            await prisma.tax.delete({
                where: { tax_id: Number(id) }
            });
            return res.status(200).json({
                success: true,
                message: "Tax record purged successfully."
            });
        }
        catch (error) {
            if (error.code === 'P2003') {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete. This tax is currently linked to orders or invoices."
                });
            }
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateTax(req, res) {
        try {
            const { id } = req.params;
            const { name, rate, type, context, gl_account_id } = req.body;
            if (!name || rate === undefined) {
                return res.status(400).json({ success: false, message: "Name and Rate are required." });
            }
            const updatedTax = await prisma.tax.update({
                where: { tax_id: Number(id) },
                data: {
                    name: name,
                    rate: Number(rate),
                    type: type || 'percentage',
                    context: context || 'sale',
                    gl_account_id: gl_account_id ? Number(gl_account_id) : null
                }
            });
            return res.status(200).json({
                success: true,
                data: updatedTax,
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}
//# sourceMappingURL=tax.controller.js.map