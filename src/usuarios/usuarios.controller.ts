import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Usuario } from 'src/entities/usuario.entity';
import { Roles } from 'src/rol/decorators/rol.decorator';
import { RolGuard } from 'src/rol/guards/rol.guard';
import { UsuariosService } from './usuarios.service';

@UseGuards(AuthGuard('jwt'), RolGuard)
@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuarioServicio: UsuariosService,
        private readonly authService: AuthService
    ) { }

    @Get('empresa')
    @Roles('ADMINISTRADOR DE EMPRESA')
    async getUsuariosByEmpresa(@Req() req): Promise<Usuario[]> {
        const usuario = await this.authService.usuario(req.cookies['access-token']);
        return await this.usuarioServicio.getByEmpresa(usuario.empresaId);
    }

    @Post('asignar_rol/:userId/:roleId')
    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    async asignarRolAUsuario(@Param('userId') usuarioId: number, @Param('roleId') rolId: number) {
        return this.usuarioServicio.asignarRol(usuarioId, rolId);
    }
}
