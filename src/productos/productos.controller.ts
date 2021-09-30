import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ChangeAvailabilityProductosDTO } from 'src/dto/change-availability-dto.input';
import { CrearProductoDTO } from 'src/dto/crear-producto-dto.input';
import { EditarProductoDTO } from 'src/dto/editar-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { Producto } from 'src/entities/producto.entity';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {

    constructor(
        private readonly productosService: ProductosService
    ){}

    @Post('create')
    async create(@Body() crearProductoDto: CrearProductoDTO){
        if(await this.productosService.existByNombreAndEmpresaId(crearProductoDto.nombre, crearProductoDto.empresa)){
            throw new BadRequestException('Ya existe un producto con ese nombre');
        }

        const nuevoProducto: Producto = new Producto();
        nuevoProducto.nombre = crearProductoDto.nombre;
        nuevoProducto.precio = crearProductoDto.precio;
        const empresa: Empresa = new Empresa();
        empresa.id = crearProductoDto.empresa;
        nuevoProducto.empresa = empresa;
        const subtipoProducto: SubtipoProducto = new SubtipoProducto();
        subtipoProducto.id = crearProductoDto.subtipoProducto;
        nuevoProducto.subtipoProducto = subtipoProducto;
        const marcaProducto: MarcaProducto = new MarcaProducto();
        marcaProducto.id = crearProductoDto.marcaProducto;
        nuevoProducto.marcaProducto = marcaProducto;

        await this.productosService.create(nuevoProducto);

        return {message: 'El producto '+nuevoProducto.nombre+' se ha ingresado correctamente.', status: 'OK'};
    }

    @Get('empresa/:id')
    async getByEmpresaId(@Param('id') id: number): Promise<Producto[]>{
        return await this.productosService.getByEmpresaId(id);
    }

    @Get('empresa/only_id_and_name/:id')
    async getByEmpresaIdOnlyIdAndName(@Param('id') id: number): Promise<Producto[]>{
        return await this.productosService.getOnlyIdAndName(id);
    }

    @Get('detail/:id')
    async getBtId(@Param('id') id: number): Promise<Producto>{
        return await this.productosService.getById(id);
    }

    @Put('update/:id')
    async updateById(@Param('id') id: number, @Body() editarProductoDto: EditarProductoDTO){
        if((await this.productosService.existByNombreAndEmpresaId(editarProductoDto.nombre, editarProductoDto.empresa)) && (await this.productosService.getByNombreAndEmpresaId(editarProductoDto.nombre, editarProductoDto.empresa)).id != id){
            throw new BadRequestException('Ya existe un producto con ese nombre.');
        }

        const editarProducto: Producto = new Producto();
        editarProducto.id = editarProductoDto.id;
        editarProducto.nombre = editarProductoDto.nombre;
        editarProducto.precio = editarProductoDto.precio;
        const empresa: Empresa = new Empresa();
        empresa.id = editarProductoDto.empresa;
        editarProducto.empresa = empresa;
        const subtipoProducto: SubtipoProducto = new SubtipoProducto();
        subtipoProducto.id = editarProductoDto.subtipoProducto;
        editarProducto.subtipoProducto = subtipoProducto;
        const marcaProducto: MarcaProducto = new MarcaProducto();
        marcaProducto.id = editarProductoDto.marcaProducto;
        editarProducto.marcaProducto = marcaProducto;

        this.productosService.update(editarProducto);

        return {message: 'El producto '+editarProducto.nombre+' se ha actualizado correctamente.'};
    }

    @Put('change_availability')
    async changeActivoOfProducto(@Body() input: ChangeAvailabilityProductosDTO){
        try{
            input.productos.forEach((producto, index) => {
                this.productosService.changeActivo(producto, input.estado);
            })
            return {message: 'Se ha actualizado el estado de/los producto(s).'}
        }
        catch(error){
            console.log(error);
            throw new InternalServerErrorException('Ocurrió un error al intentar cambiar el estado de/los productos.')
        }
    }
}
