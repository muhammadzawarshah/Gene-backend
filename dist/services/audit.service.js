export class AuditService {
    static async logChange(data) {
        console.log(`[AUDIT LOG]: ${data.action} on ${data.entityType} ID: ${data.entityId} by User: ${data.userId}`);
    }
    static async getHistory(entityType, entityId) {
    }
}
//# sourceMappingURL=audit.service.js.map