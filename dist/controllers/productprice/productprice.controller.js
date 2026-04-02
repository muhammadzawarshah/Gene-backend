import { ProductPriceService } from '../../services/productprice.service.js';
export class ProductPriceController {
    static async list(req, res) {
        try {
            const prices = await ProductPriceService.getAllProductPrices();
            res.status(200).json({ success: true, data: prices });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async listByProduct(req, res) {
        try {
            const prices = await ProductPriceService.getPricesByProductId(req.params.productId);
            res.status(200).json({ success: true, data: prices });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getOne(req, res) {
        try {
            const price = await ProductPriceService.getProductPriceById(parseInt(req.params.id));
            if (!price)
                return res.status(404).json({ success: false, message: 'Product price not found' });
            res.status(200).json({ success: true, data: price });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async create(req, res) {
        try {
            const price = await ProductPriceService.createProductPrice(req.body);
            res.status(201).json({ success: true, data: price });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async update(req, res) {
        try {
            const price = await ProductPriceService.updateProductPrice(parseInt(req.params.id), req.body);
            res.status(200).json({ success: true, data: price });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async lookup(req, res) {
        try {
            const { product_id, price_type } = req.query;
            if (!product_id || !price_type) {
                return res.status(400).json({ success: false, message: 'product_id and price_type are required' });
            }
            const price = await ProductPriceService.getActivePrice(product_id, price_type);
            res.status(200).json({ success: true, data: price });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async remove(req, res) {
        try {
            await ProductPriceService.deleteProductPrice(parseInt(req.params.id));
            res.status(200).json({ success: true, message: 'Product price deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
//# sourceMappingURL=productprice.controller.js.map