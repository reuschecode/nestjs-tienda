import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Documento } from './documento.entity';
import { Rol } from './rol.entity';
import { Tienda } from './tienda.entity';
import { TipoDocumentoIdentificacion } from './tipo-documento-identificacion.entity';

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({length: 50})
    nombres: string;

    @Column({length: 50})
    apellidos: string;

    @Column({nullable: false, type: 'char', length: 12})
    documentoIdentificacion: string;

    @ManyToOne(type => TipoDocumentoIdentificacion, tipo_documento_identificacion => tipo_documento_identificacion.usuarios, {nullable: false})
    tipoDocumentoIdentificacion: TipoDocumentoIdentificacion;

    @Column({default: true, nullable: false})
    activo: boolean;

    @OneToMany(type => Documento, documento => documento.usuario)
    documentos: Documento[];

    @ManyToOne(type => Tienda, tienda => tienda.usuarios, {nullable: false})
    tienda: Tienda;

    @ManyToMany(type => Rol, rol => rol.usuarios)
    @JoinTable()
    roles: Rol[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}