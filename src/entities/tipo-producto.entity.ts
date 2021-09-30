import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Empresa } from './empresa.entity';
import { SubtipoProducto } from './subtipo-producto.entity';

@Entity()
export class TipoProducto{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 45})
    nombre: string;

    @ManyToOne(type => Empresa, empresa => empresa.tipoProductos, {nullable: false})
    empresa: Empresa

    @OneToMany(type => SubtipoProducto, subtipo_productos => subtipo_productos.tipoProducto)
    subtipoProductos: SubtipoProducto[];
}