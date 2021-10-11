import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Rol } from 'src/entities/rol.entity';
import { Roles } from './decorators/rol.decorator';
import { RolGuard } from './guards/rol.guard';
import { RolService } from './rol.service';

@UseGuards(AuthGuard('jwt'), RolGuard)
@Controller('rol')
export class RolController {
    constructor(
        private readonly rolService: RolService
    ) { }

    @Roles('ADMINISTRADOR DE EMPRESA', 'ADMINISTRADOR DE TIENDA')
    @Get()
    async getRoles(): Promise<Rol[]> {
        return await this.rolService.getAll();
    }

    @Roles('SUPERADMIN')
    @Post()
    async createRol(@Body('nombre') nombreRol: string): Promise<Rol> {
        if (await this.rolService.existByNombre(nombreRol)) {
            throw new BadRequestException("Ya existe un rol con ese nombre.");
        }
        const nuevoRol = new Rol();
        nuevoRol.nombre = nombreRol;
        return this.rolService.create(nuevoRol);
    }

}
