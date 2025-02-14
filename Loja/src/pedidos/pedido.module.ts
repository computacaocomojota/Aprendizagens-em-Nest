import { Module } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { PedidosController } from './pedido.controller';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
