export interface IJwtPayload{
    email: string;
    id: number;
    tiendaId: number;
    empresaId: number;
    roles: string[];
    iat?: Date;
}