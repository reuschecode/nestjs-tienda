import { BadRequestException, Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CrearSubtipoProductoDTO } from 'src/dto/crear-subtipo-producto-dto.input';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { SubtipoProductoService } from './subtipo-producto.service';

@Controller('subtipo-producto')
export class SubtipoProductoController {
    constructor(
        private readonly subtipoProductosService: SubtipoProductoService
    ){}

    @Post('create')
    async create(@Body() subtipoProductoDto: CrearSubtipoProductoDTO){
        if(await this.subtipoProductosService.existByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)){
            throw new BadRequestException('Ya existe un subtipo con ese nombre.');
        }

        const nuevoSubtipoProducto: SubtipoProducto = new SubtipoProducto();
        nuevoSubtipoProducto.nombre = subtipoProductoDto.nombre;
        const tipoProducto: TipoProducto = new TipoProducto();
        tipoProducto.id = subtipoProductoDto.idTipo;
        
        await this.subtipoProductosService.create(nuevoSubtipoProducto);

        return {message: 'El subtipo '+nuevoSubtipoProducto.nombre+' se ha ingresado correctamente.'};
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() subtipoProductoDto: CrearSubtipoProductoDTO){
        if((await this.subtipoProductosService.existByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)) && (await this.subtipoProductosService.getByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)).id != id){
            throw new BadRequestException('Ya existe un subtipo con ese nombre.');
        }

        const editarSubtipoProducto: SubtipoProducto = new SubtipoProducto();
        editarSubtipoProducto.id = id;
        editarSubtipoProducto.nombre = subtipoProductoDto.nombre;
        const tipoProducto: TipoProducto = new TipoProducto();
        tipoProducto.id = subtipoProductoDto.idTipo;
        
        await this.subtipoProductosService.update(editarSubtipoProducto);

        return {message: 'El subtipo '+editarSubtipoProducto.nombre+' se ha ingresado correctamente.'};
    }
}
