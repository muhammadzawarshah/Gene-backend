export declare class InventoryService {
    static getStockLedger(): Promise<{
        id: string;
        date: string;
        item: string;
        warehouse: string | null | undefined;
        qty: string;
        type: string;
        status: string;
    }[]>;
    static adjustStock(data: any): Promise<{
        success: boolean;
        movementId: number;
    }>;
}
