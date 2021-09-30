import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuarioServicio: UsuariosService)
    {}

    @Get('empresa')
    async getUsuariosByEmpresa(): Promise<Usuario[]>{

        return await this.usuarioServicio.getByEmpresa(1);
    }

    @Post('asignarRol/:userId/:roleId')
    async asignarRolAUsuario(@Param('userId') usuarioId: number, @Param('roleId') rolId: number){
        return this.asignarRolAUsuario(usuarioId,rolId);
    }
}
