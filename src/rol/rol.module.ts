import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RolService],
  exports: [RolService],
  controllers: [RolController]
})
export class RolModule { }
