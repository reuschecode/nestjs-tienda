import { Injectable, NotFoundException } from '@nestjs/common';
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
    ){}

    async getByEmpresa(empresaId: number): Promise<Usuario[]>{
        return this.usuarioRepository.find({relations: ['tienda'], where: {tienda: {empresa: empresaId}}})
    }

    async getByEmail(email: string): Promise<Usuario>{
        return this.usuarioRepository.findOne({where: {email: email}})
    }

    async create(usuario: Usuario){
        await this.usuarioRepository.save(usuario);
    }

    async asignarRol(usuarioId: number, rolId: number){
        const usuario = await this.usuarioRepository.findOne(usuarioId, {where: {activo: true}});
        if(!usuario){
            throw new NotFoundException("No se encontró al usuario");
        }

        const rol = await this.rolRepository.findOne(rolId);
        if(!rol){
            throw new NotFoundException("No se encontró ese rol");
        }

        usuario.roles.push(rol);
        await this.usuarioRepository.save(usuario);

        return true;
    }
}
