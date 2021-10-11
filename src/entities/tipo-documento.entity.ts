import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Documento } from './documento.entity';

@Entity()
export class TipoDocumento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 12, nullable: false })
    nombre: string;

    @OneToMany(type => Documento, documento => documento.tipoDocumento)
    documentos: Documento[];
}