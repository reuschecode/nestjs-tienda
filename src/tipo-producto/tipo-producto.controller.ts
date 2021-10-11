import { BadRequestException, Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CrearTipoProductoDTO } from 'src/dto/crear-tipo-producto-dto.input';
import { Empresa } from 'src/entities/empresa.entity';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { TipoProductoService } from './tipo-producto.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tipo-producto')
export class TipoProductoController {
    constructor(
        private readonly tipoProductosService: TipoProductoService,
        private readonly authService: AuthService
    ) { }

    @Get('empresa')
    async getByEmpresaId(@Req() req): Promise<TipoProducto[]> {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        return await this.tipoProductosService.getByIdEmpresa(usuario.empresaId);
    }

    @Post('create')
    async create(@Body() crearTipoProductoDto: CrearTipoProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if (await this.tipoProductosService.existByNombreAndEmpresaId(crearTipoProductoDto.nombre, usuario.empresaId)) {
            throw new BadRequestException('Ya existe un tipo de producto con ese nombre.');
        }

        const nuevoTipoProducto: TipoProducto = new TipoProducto();
        nuevoTipoProducto.nombre = crearTipoProductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        nuevoTipoProducto.empresa;

        await this.tipoProductosService.create(nuevoTipoProducto);

        return { message: 'El tipo ' + nuevoTipoProducto.nombre + ' se ha ingresado correctamente.' };
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() editarTipoproductoDto: CrearTipoProductoDTO, @Req() req) {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        if ((await this.tipoProductosService.existByNombreAndEmpresaId(editarTipoproductoDto.nombre, usuario.empresaId)) && (await this.tipoProductosService.getByNombreAndEmpresaId(editarTipoproductoDto.nombre, usuario.empresaId)).id != id) {
            throw new BadRequestException('Ya existe un tipo de producto con ese nombre.');
        }

        const editarTipoProducto: TipoProducto = new TipoProducto();
        editarTipoProducto.id = id;
        editarTipoProducto.nombre = editarTipoproductoDto.nombre;
        const empresa: Empresa = new Empresa();
        empresa.id = usuario.empresaId;
        editarTipoProducto.empresa;

        this.tipoProductosService.update(editarTipoProducto);

        return { message: 'El tipo ' + editarTipoProducto.nombre + ' se ha actualizado correctamente.' };
    }
}
