export declare class ProvinceService {
    static createProvince(data: {
        id: number;
        name: string;
    }): Promise<{
        name: string | null;
        province_id: number;
    }>;
    static listProvinces(): Promise<({
        _count: {
            warehouse: number;
        };
    } & {
        name: string | null;
        province_id: number;
    })[]>;
    static deleteProvince(id: number): Promise<{
        name: string | null;
        province_id: number;
    }>;
}
