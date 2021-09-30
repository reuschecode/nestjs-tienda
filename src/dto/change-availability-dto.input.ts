import { IsArray, IsBoolean, IsDefined } from "class-validator";
import { Producto } from "src/entities/producto.entity";

export class ChangeAvailabilityProductosDTO{
    @IsDefined()
    @IsBoolean()
    estado: boolean;

    @IsDefined()
    @IsArray()
    productos: number[];
}