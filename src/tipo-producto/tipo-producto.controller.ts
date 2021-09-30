import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CrearTipoProductoDTO } from 'src/dto/crear-tipo-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { TipoProductoService } from './tipo-producto.service';

@Controller('tipo-producto')
export class TipoProductoController {
    constructor(
        private readonly tipoProductosService: TipoProductoService
    ){}

    @Get('empresa/:id')
    async getByEmpresaId(@Param('id') id: number): Promise<TipoProducto[]>{
        return await this.tipoProductosService.getByIdEmpresa(id);
    }

    @Post('create')
    async create(@Body() crearTipoProductoDto: CrearTipoProductoDTO){
        if(await this.tipoProductosService.existByNombreAndEmpresaId(crearTipoProductoDto.nombre, crearTipoProductoDto.idEmpresa)){
            throw new BadRequestException('Ya existe un tipo de producto con ese nombre.');
        }

        const nuevoTipoProducto: TipoProducto = new TipoProducto();
        nuevoTipoProducto.nombre = crearTipoProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = crearTipoProductoDto.idEmpresa;
        nuevoTipoProducto.empresa;

        await this.tipoProductosService.create(nuevoTipoProducto);

        return {message: 'El tipo '+nuevoTipoProducto.nombre+' se ha ingresado correctamente.'};
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() editarTipoproductoDto: CrearTipoProductoDTO){
        if((await this.tipoProductosService.existByNombreAndEmpresaId(editarTipoproductoDto.nombre, editarTipoproductoDto.idEmpresa)) && (await this.tipoProductosService.getByNombreAndEmpresaId(editarTipoproductoDto.nombre, editarTipoproductoDto.idEmpresa)).id != id){
            throw new BadRequestException('Ya existe un tipo de producto con ese nombre.');
        }

        const editarTipoProducto: TipoProducto = new TipoProducto();
        editarTipoProducto.id = id;
        editarTipoProducto.nombre = editarTipoproductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = editarTipoproductoDto.idEmpresa;
        editarTipoProducto.empresa;

        this.tipoProductosService.update(editarTipoProducto);

        return {message: 'El tipo '+editarTipoProducto.nombre+' se ha actualizado correctamente.'};
    }
}
