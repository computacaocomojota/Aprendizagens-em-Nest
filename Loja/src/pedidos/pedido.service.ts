import { Injectable } from '@nestjs/common';
import { CriarPedidoDto } from './dto/CriarPedido.dto';
import { AtualizarPedidoDto } from './dto/AtualizarPedido.dto';

@Injectable()
export class PedidosService {
  create(createPedidoDto: CriarPedidoDto) {
    return 'This action adds a new pedido';
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: AtualizarPedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
