export interface IJwtPayload {
    email: string;
    id: number;
    nombres: string;
    tiendaId: number;
    empresaId: number;
    roles: string[];
    iat?: Date;
}