import { BadRequestException, Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrearSubtipoProductoDTO } from 'src/dto/crear-subtipo-producto-dto.input';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { Roles } from 'src/rol/decorators/rol.decorator';
import { RolGuard } from 'src/rol/guards/rol.guard';
import { SubtipoProductoService } from './subtipo-producto.service';

@UseGuards(AuthGuard('jwt'), RolGuard)
@Controller('subtipo-producto')
export class SubtipoProductoController {
    constructor(
        private readonly subtipoProductosService: SubtipoProductoService
    ) { }

    @Roles('ADMINISTRADOR DE EMPRESA')
    @Post('create')
    async create(@Body() subtipoProductoDto: CrearSubtipoProductoDTO) {
        if (await this.subtipoProductosService.existByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)) {
            throw new BadRequestException('Ya existe un subtipo con ese nombre.');
        }

        const nuevoSubtipoProducto: SubtipoProducto = new SubtipoProducto();
        nuevoSubtipoProducto.nombre = subtipoProductoDto.nombre;
        const tipoProducto: TipoProducto = new TipoProducto();
        tipoProducto.id = subtipoProductoDto.idTipo;

        await this.subtipoProductosService.create(nuevoSubtipoProducto);

        return { message: 'El subtipo ' + nuevoSubtipoProducto.nombre + ' se ha ingresado correctamente.' };
    }

    @Roles('ADMINISTRADOR DE EMPRESA')
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() subtipoProductoDto: CrearSubtipoProductoDTO) {
        if ((await this.subtipoProductosService.existByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)) && (await this.subtipoProductosService.getByNombreAndTipoId(subtipoProductoDto.nombre, subtipoProductoDto.idTipo)).id != id) {
            throw new BadRequestException('Ya existe un subtipo con ese nombre.');
        }

        const editarSubtipoProducto: SubtipoProducto = new SubtipoProducto();
        editarSubtipoProducto.id = id;
        editarSubtipoProducto.nombre = subtipoProductoDto.nombre;
        const tipoProducto: TipoProducto = new TipoProducto();
        tipoProducto.id = subtipoProductoDto.idTipo;

        await this.subtipoProductosService.update(editarSubtipoProducto);

        return { message: 'El subtipo ' + editarSubtipoProducto.nombre + ' se ha ingresado correctamente.' };
    }
}
