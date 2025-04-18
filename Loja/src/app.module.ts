import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoModule } from './produtos/produto.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidosModule } from './pedidos/pedido.module';
import { FiltroDeExcecaoHTTP } from './filtros/filtros-de-excecao-http';
@Module({

  imports: [

    UsuarioModule,
    ProdutoModule,
    PedidosModule,

    ConfigModule.forRoot({
      
      isGlobal: true,

    }),

    TypeOrmModule.forRootAsync({

      useClass: PostgresConfigService,
      inject: [PostgresConfigService],

    }),
    
  ],

  providers: [

    {
      provide: 'APP_FILTER',
      useClass: FiltroDeExcecaoHTTP,
    },

  ]
})
export class AppModule {}
