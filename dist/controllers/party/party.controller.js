import { PartyService } from '../../services/party.service.js';
export class PartyController {
    static async addParty(req, res) {
        try {
            const party = await PartyService.createParty(req.body);
            res.status(201).json({ success: true, data: party });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async listCustomers(_req, res) {
        try {
            const customers = await PartyService.getPartiesByType('CUSTOMER');
            res.json(customers);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async listSuppliers(_req, res) {
        try {
            const suppliers = await PartyService.getPartiesByType('SUPPLIER');
            res.json(suppliers);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateParty(req, res) {
        try {
            const id = req.params['id'];
            const party = await PartyService.updateParty(id, req.body);
            res.json({ success: true, data: party });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async deleteParty(req, res) {
        try {
            await PartyService.deleteParty(req.params['id']);
            res.json({ success: true, message: 'Distributor deleted.' });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
//# sourceMappingURL=party.controller.js.map