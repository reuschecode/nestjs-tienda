import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { RolService } from './rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RolService]
})
export class RolModule {}
