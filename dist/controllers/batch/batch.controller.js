import { BatchService } from '../../services/batch.service.js';
export class BatchController {
    static async list(req, res) {
        try {
            const batches = await BatchService.listBatches();
            res.status(200).json({ success: true, data: batches });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getOne(req, res) {
        try {
            const batch = await BatchService.getBatchById(parseInt(req.params.id));
            if (!batch)
                return res.status(404).json({ success: false, message: 'Batch not found' });
            res.status(200).json({ success: true, data: batch });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async create(req, res) {
        try {
            const batch = await BatchService.createBatch(req.body);
            res.status(201).json({ success: true, data: batch });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async update(req, res) {
        try {
            const batch = await BatchService.updateBatch(parseInt(req.params.id), req.body);
            res.status(200).json({ success: true, data: batch });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async remove(req, res) {
        try {
            await BatchService.deleteBatch(parseInt(req.params.id));
            res.status(200).json({ success: true, message: 'Batch deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
//# sourceMappingURL=batch.controller.js.map