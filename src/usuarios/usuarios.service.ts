import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) { }

    async getByEmpresa(empresaId: number): Promise<Usuario[]> {
        return this.usuarioRepository.find({ relations: ['tienda', 'roles', 'tipoDocumentoIdentificacion'], select: ['nombres', 'apellidos', 'email', 'id', 'documentoIdentificacion', 'createdAt', 'tienda'], where: { activo: true, tienda: { empresa: empresaId } } })
    }

    async getByEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({ relations: ['tienda', 'tienda.empresa', 'roles'], where: { email: email } })
    }

    async create(usuario: Usuario) {
        await this.usuarioRepository.save(usuario);
    }

    async existsByEmail(email: string) {
        const existe = await this.usuarioRepository.findOne({ where: { email: email } });
        return existe !== undefined;
    }

    async asignarRol(usuarioId: number, rolId: number) {
        const usuario = await this.usuarioRepository.findOne(usuarioId, { relations: ['roles'], where: { activo: true } });
        if (!usuario) {
            throw new NotFoundException("No se encontró al usuario");
        }

        const rol = await this.rolRepository.findOne(rolId);
        if (!rol) {
            throw new NotFoundException("No se encontró ese rol");
        }
        if (usuario.roles.filter(e => { return e.nombre === rol.nombre }).length > 0) {
            throw new BadRequestException("Este usuario ya cuenta con el rol '" + rol.nombre + "'");
        }

        usuario.roles.push(rol);
        await this.usuarioRepository.save(usuario);

        return true;
    }
}
