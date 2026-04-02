export declare class DeliveryService {
    processDelivery(soId: number, warehouseId: number): Promise<{
        status: string | null;
        so_id: number | null;
        discount: string | null;
        delv_note_id: number;
        delivery_number: string | null;
        delv_date: Date;
        delivered_by: string | null;
        transportcharges: string | null;
        nettotal: string | null;
    }>;
}
