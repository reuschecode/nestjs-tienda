import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { SubtipoProductoModule } from './subtipo-producto/subtipo-producto.module';
import { MarcaProductoModule } from './marca-producto/marca-producto.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.BACKEND_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //PARA PROD
      entities: ['dist/entities/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [
        'dist/src/db/migrations/*.js'
      ],
      cli: {
        migrationsDir: 'src/db/migrations'
      },
      logging: true
      // PARA DEV
      // autoLoadEntities: true,
      // synchronize: false,
    }),
    ProductosModule,
    SubtipoProductoModule,
    MarcaProductoModule,
    TipoProductoModule,
    AuthModule,
    UsuariosModule,
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
