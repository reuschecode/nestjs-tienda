import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Documento } from './documento.entity';

@Entity()
export class TipoPago{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25, nullable: false})
    nombre: string;

    @OneToMany(type => Documento, documento => documento.tipoPago)
    documentos: Documento[];
}