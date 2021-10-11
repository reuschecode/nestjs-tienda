import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private readonly productosRepository: Repository<Producto>
    ) { }

    async create(producto: Producto) {
        ;
        await this.productosRepository.save(producto);
    }

    async update(producto: Producto) {
        await this.productosRepository.update(producto.id, producto);
    }

    async getByEmpresaId(idEmpresa: number): Promise<Producto[]> {
        return await this.productosRepository.find({ where: { empresa: idEmpresa, activo: true }, order: { id: 'DESC' }, relations: ['subtipoProducto', 'subtipoProducto.tipoProducto', 'marcaProducto'] });
    }

    async getOnlyIdAndName(idEmpresa: number): Promise<Producto[]> {
        return await this.productosRepository.find({ select: ['id', 'nombre'], where: { empresa: idEmpresa, activo: true }, order: { id: 'DESC' } });
    }

    async getById(idProducto: number): Promise<Producto> {
        return await this.productosRepository.findOne(idProducto, { where: { activo: true }, relations: ['subtipoProducto', 'subtipoProducto.tipoProducto', 'marcaProducto'] });
    }

    async changeActivo(idProducto: number, estado: boolean) {
        return await this.productosRepository.update(idProducto, { activo: estado });
    }

    async getByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<Producto> {
        return await this.productosRepository.findOne({ where: { nombre: nombre, empresa: idEmpresa } });
    }

    async existByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<boolean> {
        const existe = await this.productosRepository.findOne({ where: { nombre: nombre, empresa: idEmpresa } });
        return existe !== undefined;
    }

    async existById(id: number): Promise<boolean> {
        const existe = await this.productosRepository.findOne(id);
        return existe !== undefined;
    }
}
