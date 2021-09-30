import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Tienda } from "./tienda.entity";

@Entity()
export class ProductosTienda{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Producto, producto => producto.productosTienda, {nullable: false})
    producto: Producto;

    @ManyToOne(type => Tienda, tienda => tienda.productosTienda, {nullable: false})
    tienda: Tienda;

    @Column({type: 'bigint', nullable: false})
    cantidad: number;
}