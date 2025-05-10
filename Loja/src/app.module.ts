import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutoModule } from './modulos/produtos/produto.module';
import { UsuarioModule } from './modulos/usuarios/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidosModule } from './modulos/pedidos/pedido.module';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtros-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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

    CacheModule.registerAsync({ 
      
      useFactory: async () => ({

        store: await redisStore({ ttl: 10 * 1000 })

      }),

      isGlobal: true,

    }),
  ],

  providers: [

    {
      provide: 'APP_FILTER',
      useClass: FiltroDeExcecaoGlobal,
    },

  ]
})
export class AppModule{}
