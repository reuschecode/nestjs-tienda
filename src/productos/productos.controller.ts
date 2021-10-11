import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ChangeAvailabilityProductosDTO } from 'src/dto/change-availability-dto.input';
import { CrearProductoDTO } from 'src/dto/crear-producto-dto.input';
import { EditarProductoDTO } from 'src/dto/editar-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { Producto } from 'src/entities/producto.entity';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { Roles } from 'src/rol/decorators/rol.decorator';
import { RolGuard } from 'src/rol/guards/rol.guard';
import { ProductosService } from './productos.service';

@UseGuards(AuthGuard('jwt'), RolGuard)
@Controller('productos')
export class ProductosController {

    constructor(
        private readonly productosService: ProductosService,
        private readonly authService: AuthService
    ) { }

    @Roles('ADMINISTRADOR DE TIENDA', 'ADMINISTRADOR DE EMPRESA')
    @Post('create')
    async create(@Body() crearProductoDto: CrearProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if (await this.productosService.existByNombreAndEmpresaId(crearProductoDto.nombre, usuario.empresaId)) {
            throw new BadRequestException('Ya existe un producto con ese nombre');
        }

        const nuevoProducto: Producto = new Producto();
        nuevoProducto.nombre = crearProductoDto.nombre;
        nuevoProducto.precio = crearProductoDto.precio;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        nuevoProducto.empresa = empresa;
        const subtipoProducto: SubtipoProducto = new SubtipoProducto();
        subtipoProducto.id = crearProductoDto.subtipoProducto;
        nuevoProducto.subtipoProducto = subtipoProducto;
        const marcaProducto: MarcaProducto = new MarcaProducto();
        marcaProducto.id = crearProductoDto.marcaProducto;
        nuevoProducto.marcaProducto = marcaProducto;

        await this.productosService.create(nuevoProducto);

        return { message: 'El producto ' + nuevoProducto.nombre + ' se ha ingresado correctamente.', status: 'OK' };
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA', 'SUPERVISOR DE TIENDA')
    @Get('empresa')
    async getByEmpresaId(@Req() req): Promise<Producto[]> {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        return await this.productosService.getByEmpresaId(usuario.empresaId);
    }

    @Roles('ADMINISTRADOR DE EMPRESA')
    @Get('empresa/only_id_and_name')
    async getByEmpresaIdOnlyIdAndName(@Req() req): Promise<Producto[]> {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        return await this.productosService.getOnlyIdAndName(usuario.empresaId);
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA', 'SUPERVISOR DE TIENDA', 'USUARIO DE TIENDA')
    @Get('detail/:id')
    async getById(@Param('id') id: number): Promise<Producto> {
        const producto = await this.productosService.getById(id);
        if (!producto) {
            throw new NotFoundException("No se encontró el producto con ese ID.");
        }
        return producto;
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Put('update/:id')
    async updateById(@Param('id') id: number, @Body() editarProductoDto: EditarProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if (!await this.productosService.existById(id)) {
            throw new NotFoundException("No se encontró al producto con ese ID.");
        }

        if ((await this.productosService.existByNombreAndEmpresaId(editarProductoDto.nombre, usuario.empresaId)) && (await this.productosService.getByNombreAndEmpresaId(editarProductoDto.nombre, usuario.empresaId)).id != id) {
            throw new BadRequestException('Ya existe un producto con ese nombre.');
        }

        const editarProducto: Producto = new Producto();
        editarProducto.id = editarProductoDto.id;
        editarProducto.nombre = editarProductoDto.nombre;
        editarProducto.precio = editarProductoDto.precio;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        editarProducto.empresa = empresa;
        const subtipoProducto: SubtipoProducto = new SubtipoProducto();
        subtipoProducto.id = editarProductoDto.subtipoProducto;
        editarProducto.subtipoProducto = subtipoProducto;
        const marcaProducto: MarcaProducto = new MarcaProducto();
        marcaProducto.id = editarProductoDto.marcaProducto;
        editarProducto.marcaProducto = marcaProducto;

        this.productosService.update(editarProducto);

        return { message: 'El producto ' + editarProducto.nombre + ' se ha actualizado correctamente.' };
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Put('change_availability')
    async changeActivoOfProducto(@Body() input: ChangeAvailabilityProductosDTO) {
        try {
            input.productos.forEach((producto, index) => {
                this.productosService.changeActivo(producto, input.estado);
            })
            return { message: 'Se ha actualizado el estado de/los producto(s).' }
        }
        catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Ocurrió un error al intentar cambiar el estado de/los productos.')
        }
    }
}
