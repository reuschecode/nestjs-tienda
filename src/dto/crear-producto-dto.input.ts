import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CrearProductoDTO {
    @IsString()
    @Length(3, 45)
    @IsNotEmpty()
    nombre: string;

    @IsDefined()
    @IsNumber()
    @IsPositive()
    precio: number;

    subtipoProducto: number;

    marcaProducto: number;
}