import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoModule } from './produtos/produto.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidosModule } from './pedidos/pedido.module';
@Module({

  imports: [

    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidosModule,
  ],
})
export class AppModule {}
