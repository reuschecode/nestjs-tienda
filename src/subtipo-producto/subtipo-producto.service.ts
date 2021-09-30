import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubtipoProductoService {
    constructor(
        @InjectRepository(SubtipoProducto) 
        private readonly subtipoProductosRepository: Repository<SubtipoProducto>
    ){}

    async getByIdTipo(idTipo: number): Promise<SubtipoProducto[]>{
        return await this.subtipoProductosRepository.find({where: {tipoProducto: idTipo}})
    }

    async getByIdSubtipo(idSubtipo: number): Promise<SubtipoProducto>{
        return await this.subtipoProductosRepository.findOneOrFail(idSubtipo);
    }
    
    async getByNombreAndTipoId(nombre: string, idTipo: number): Promise<SubtipoProducto>{
        return await this.subtipoProductosRepository.findOne({where: {nombre: nombre, tipoProducto: idTipo}});
    }

    async create(subtipo: SubtipoProducto){
        await this.subtipoProductosRepository.save(subtipo);
    }

    async update(subtipo: SubtipoProducto){
        await this.subtipoProductosRepository.update(subtipo.id, subtipo);
    }

    async existByNombreAndTipoId(nombre: string, idTipo: number): Promise<boolean>{
        const existe = await this.subtipoProductosRepository.findOne({where: {nombre: nombre, tipoProducto: idTipo}});
        return existe !== undefined;
    }
}
