import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CrearUsuarioDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsString()
    apellidos: string;

    @IsDefined()
    @IsNumber()
    tipoDocumentoIdentificacion: number;

    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    documentoIdentificacion: string;

    @IsDefined()
    @IsNumber()
    tienda: number;
}