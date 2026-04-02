import { ProductService } from '../../services/product.service.js';
export class ProductController {
    static async create(req, res) {
        try {
            console.log(req.body);
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async list(req, res) {
        try {
            console.log("fetching th eproducts");
            const products = await ProductService.getAllProducts();
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getOne(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            res.json(product);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getExpiredReport(req, res) {
        try {
            const data = await ProductService.getExpiredStock();
            const formatted = data.map(item => ({
                id: item.grn_line_id,
                productName: item.product.name,
                sku: item.product.sku_code,
                batch: item.batch?.batch_number || "No Batch",
                qty: item.received_qty,
                expiryDate: item.expiry_date,
                grnRef: item.grn.grn_number
            }));
            res.json({ success: true, data: formatted });
        }
        catch (e) {
            res.status(500).json({ success: false, error: "Report generation failed" });
        }
    }
    static async getproductoncategory(req, res) {
        try {
            console.log(req.params.id);
            const product = await ProductService.getProductcategory(req.params.id);
            if (!product)
                return res.status(404).json({ message: "Products not found on category" });
            res.status(200).json(product);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async update(req, res) {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.json({ success: true, data: product });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async delete(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.json({ success: true, message: "Product deleted successfully" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
//# sourceMappingURL=product.controller.js.map