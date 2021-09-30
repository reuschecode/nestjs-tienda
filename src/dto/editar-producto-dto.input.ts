import { IsDefined, IsNumber } from "class-validator";
import { CrearProductoDTO } from "./crear-producto-dto.input";

export class EditarProductoDTO extends CrearProductoDTO{
    @IsDefined()
    @IsNumber()
    id: number
}