import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CrearMarcaProductoDTO } from 'src/dto/crear-marca-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { Roles } from 'src/rol/decorators/rol.decorator';
import { RolGuard } from 'src/rol/guards/rol.guard';
import { MarcaProductoService } from './marca-producto.service';

@UseGuards(AuthGuard('jwt'), RolGuard)
@Controller('marca-producto')
export class MarcaProductoController {
    constructor(
        private readonly marcaProductoService: MarcaProductoService,
        private readonly authService: AuthService
    ) { }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Get('empresa')
    async getByEmpresaId(@Req() req): Promise<MarcaProducto[]> {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        return await this.marcaProductoService.getByEmpresaId(usuario.empresaId);
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Post('create')
    async create(@Body() crearMarcaProductoDto: CrearMarcaProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if (await this.marcaProductoService.existByNombreAndEmpresaId(crearMarcaProductoDto.nombre, usuario.empresaId)) {
            throw new BadRequestException('Ya existe una marca de producto con ese nombre.');
        }

        const nuevaMarcaProducto: MarcaProducto = new MarcaProducto();
        nuevaMarcaProducto.nombre = crearMarcaProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        nuevaMarcaProducto.empresa;

        await this.marcaProductoService.create(nuevaMarcaProducto);

        return { message: 'La marca ' + nuevaMarcaProducto.nombre + ' se ha ingresado correctamente.' };
    }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() editarMarcaProductoDto: CrearMarcaProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if ((await this.marcaProductoService.existByNombreAndEmpresaId(editarMarcaProductoDto.nombre, usuario.empresaId)) && (await this.marcaProductoService.getByNombreAndEmpresaId(editarMarcaProductoDto.nombre, usuario.empresaId)).id != id) {
            throw new BadRequestException('Ya existe una marca de producto con ese nombre.');
        }

        const editarMarcaProducto: MarcaProducto = new MarcaProducto();
        editarMarcaProducto.id = id;
        editarMarcaProducto.nombre = editarMarcaProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        editarMarcaProducto.empresa;

        await this.marcaProductoService.update(editarMarcaProducto);


        return { message: 'El tipo ' + editarMarcaProducto.nombre + ' se ha actualizado correctamente.' };
    }
}
