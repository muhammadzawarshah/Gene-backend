export declare class UserService {
    static register(userData: any): Promise<{
        user_id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.user_role;
    }>;
    static validateUser(email: string): Promise<{
        created_at: Date;
        user_id: number;
        username: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.user_role;
        is_active: boolean;
        updated_at: Date;
    } | null>;
    static getAll(): Promise<{
        user_id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.user_role;
        is_active: boolean;
    }[]>;
    static update(id: number, data: any): Promise<{
        user_id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.user_role;
        is_active: boolean;
    }>;
    static getuserbyid(id: number): Promise<{
        user_id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.user_role;
        is_active: boolean;
    } | null>;
    static changePassword(id: number, currentPassword: string, newPassword: string): Promise<{
        user_id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.user_role;
    }>;
}
