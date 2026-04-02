import { ProvinceService } from '../../services/province.service.js';
export const addProvince = async (req, res) => {
    try {
        const { id, name } = req.body;
        const result = await ProvinceService.createProvince({ id, name });
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getProvinces = async (_req, res) => {
    try {
        const result = await ProvinceService.listProvinces();
        res.json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=province.controller.js.map