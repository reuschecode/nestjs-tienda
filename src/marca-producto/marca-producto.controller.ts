import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CrearMarcaProductoDTO } from 'src/dto/crear-marca-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { MarcaProductoService } from './marca-producto.service';

@Controller('marca-producto')
export class MarcaProductoController {
    constructor(
        private readonly marcaProductoService: MarcaProductoService
    ){}

    
    @Get('empresa/:id')
    async getByEmpresaId(@Param('id') id: number): Promise<MarcaProducto[]>{
        return await this.marcaProductoService.getByEmpresaId(id);
    }

    @Post('create')
    async create(@Body() crearMarcaProductoDto: CrearMarcaProductoDTO){
        if(await this.marcaProductoService.existByNombreAndEmpresaId(crearMarcaProductoDto.nombre, crearMarcaProductoDto.idEmpresa)){
            throw new BadRequestException('Ya existe una marca de producto con ese nombre.');
        }

        const nuevaMarcaProducto: MarcaProducto = new MarcaProducto();
        nuevaMarcaProducto.nombre = crearMarcaProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = crearMarcaProductoDto.idEmpresa;
        nuevaMarcaProducto.empresa;

        await this.marcaProductoService.create(nuevaMarcaProducto);

        return {message: 'La marca '+nuevaMarcaProducto.nombre+' se ha ingresado correctamente.'};
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() editarMarcaProductoDto: CrearMarcaProductoDTO){
        if((await this.marcaProductoService.existByNombreAndEmpresaId(editarMarcaProductoDto.nombre, editarMarcaProductoDto.idEmpresa)) && (await this.marcaProductoService.getByNombreAndEmpresaId(editarMarcaProductoDto.nombre, editarMarcaProductoDto.idEmpresa)).id != id){
            throw new BadRequestException('Ya existe una marca de producto con ese nombre.');
        }

        const editarMarcaProducto: MarcaProducto = new MarcaProducto();
        editarMarcaProducto.id = id;
        editarMarcaProducto.nombre = editarMarcaProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = editarMarcaProductoDto.idEmpresa;
        editarMarcaProducto.empresa;

        await this.marcaProductoService.update(editarMarcaProducto);


        return {message: 'El tipo '+editarMarcaProducto.nombre+' se ha actualizado correctamente.'};
    }
}
