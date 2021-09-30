import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Proveedor } from './proveedor.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class TipoDocumentoIdentificacion{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    nombre: string;

    @OneToMany(type => Cliente, cliente => cliente.tipoDocumentoIdentificacion)
    clientes: Cliente[];

    @OneToMany(type => Proveedor, proveedor => proveedor.tipoDocumentoIdentificacion)
    proveedores: Proveedor[];

    @OneToMany(type => Usuario, usuario => usuario.tipoDocumentoIdentificacion)
    usuarios: Usuario[];
}