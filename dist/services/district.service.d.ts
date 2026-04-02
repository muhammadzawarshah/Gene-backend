export declare class DistrictService {
    static getByProvince(provinceId: number): Promise<{
        name: string;
        district_id: number;
    }[]>;
    static listAll(): Promise<({
        province: {
            name: string | null;
        };
    } & {
        name: string;
        province_id: number;
        district_id: number;
    })[]>;
}
