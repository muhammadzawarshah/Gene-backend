import { ProductCategoryService } from "../../services/productcategory.service.js";
export class productcategorycontroller {
    static async createcategory(req, res) {
        try {
            const category = await ProductCategoryService.createCategory(req.body);
            res.status(200).json({
                success: true,
                category,
                message: "The category has been created"
            });
        }
        catch (error) {
            res.status(500).send("There will be" + error);
        }
    }
    static async listcategory(req, res) {
        try {
            const category = await ProductCategoryService.getAllProductcategory();
            res.status(200).json({
                success: true,
                category,
                message: "The category has been listed"
            });
        }
        catch (error) {
            res.status(500).send("There will be" + error);
        }
    }
    static async specificcategory(req, res) {
        try {
            const id = req.params.id;
            const category = await ProductCategoryService.getProductcategoryById(String(id));
            res.status(200).json({
                success: true,
                category,
                message: "The category has been specific"
            });
        }
        catch (error) {
            res.status(500).send("There will be" + error);
        }
    }
    static async updatecategory(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const category = await ProductCategoryService.updateProductcategory(String(id), data);
            res.status(200).json({
                success: true,
                category,
                message: "The category has been updated"
            });
        }
        catch (error) {
            res.status(500).send("There will be" + error);
        }
    }
    static async deletecategory(req, res) {
        try {
            const id = req.params.id;
            const category = await ProductCategoryService.deleteProductcategory(String(id));
            res.status(200).json({
                success: true,
                category,
                message: "The category has been deleted"
            });
        }
        catch (error) {
            res.status(500).send("There will be" + error);
        }
    }
}
//# sourceMappingURL=productcategory.controller.js.map