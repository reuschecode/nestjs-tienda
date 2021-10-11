import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearMarcaProductoDTO {
    @IsNotEmpty()
    @IsString()
    nombre: string;
}