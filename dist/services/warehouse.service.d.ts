export declare class WarehouseService {
    static createWarehouse(data: {
        name: string;
        locationId: number;
        type: string;
        districtId?: number;
    }): Promise<{
        warehouse_id: number;
        name: string | null;
        type: string | null;
        district_id: number | null;
        location: number | null;
    }>;
    static listWarehouses(): Promise<({
        province: {
            name: string | null;
            province_id: number;
        } | null;
        district: {
            name: string;
            province_id: number;
            district_id: number;
        } | null;
        _count: {
            stockitem: number;
        };
    } & {
        warehouse_id: number;
        name: string | null;
        type: string | null;
        district_id: number | null;
        location: number | null;
    })[]>;
    static updateWarehouse(id: number, data: {
        name?: string;
        locationId?: number;
        type?: string;
        districtId?: number;
    }): Promise<{
        warehouse_id: number;
        name: string | null;
        type: string | null;
        district_id: number | null;
        location: number | null;
    }>;
    static deleteWarehouse(id: number): Promise<{
        warehouse_id: number;
        name: string | null;
        type: string | null;
        district_id: number | null;
        location: number | null;
    }>;
}
