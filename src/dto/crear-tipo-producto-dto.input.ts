import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CrearTipoProductoDTO{
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsDefined()
    @IsNumber()
    idEmpresa: number;
}