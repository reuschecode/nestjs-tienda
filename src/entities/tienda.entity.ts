import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Empresa } from './empresa.entity';
import { ProductosTienda } from './productos-tienda.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Tienda{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable: false, length: 45})
    nombre: string;

    @Column({nullable: false, length: 45})
    direccionTienda: string;

    @Column({nullable: false, length: 45})
    departamentoTienda: string;

    @Column({nullable: false, length: 45})
    provinciaTienda: string;

    @Column({nullable: false, length: 45})
    distritoTienda: string;

    @Column({nullable: true, length: 100})
    urlImagen: string;

    @Column({nullable: false, default: true})
    activo: boolean;

    @ManyToOne(type => Empresa, empresa => empresa.tiendas, {nullable: false})
    empresa: Empresa
    
    @OneToMany(type => Usuario, usuario => usuario.tienda)
    usuarios: Usuario[];

    @OneToMany(type => ProductosTienda, productos_tienda => productos_tienda.tienda)
    productosTienda: ProductosTienda[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}