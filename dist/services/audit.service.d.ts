export declare class AuditService {
    static logChange(data: {
        userId: string;
        action: string;
        entityType: string;
        entityId: string;
        oldValue: any;
        newValue: any;
    }): Promise<void>;
    static getHistory(entityType: string, entityId: string): Promise<void>;
}
