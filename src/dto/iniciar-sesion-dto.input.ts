import { IsNotEmpty, IsString } from "class-validator";

export class IniciarSesionDTO{
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}