import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearSubtipoProductoDTO{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsDefined()
    @IsNumber()
    idTipo: number;
}