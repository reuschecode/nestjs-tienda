import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa.entity";
import { Producto } from "./producto.entity";

@Entity()
export class MarcaProducto{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45, nullable: false})
    nombre: string;

    @ManyToOne(type => Empresa, empresa => empresa.marcaProductos, {nullable: false})
    empresa: Empresa;

    @OneToMany(type => Producto, producto => producto.marcaProducto)
    productos: Producto[];
}