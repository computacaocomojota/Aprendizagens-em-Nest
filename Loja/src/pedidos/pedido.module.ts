import { Module } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity])],
  controllers: [PedidoController],
  providers: [PedidosService],
})
export class PedidosModule {}
