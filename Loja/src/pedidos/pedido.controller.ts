import { 
  Controller, 
  Post, 
  Body,
  Get,
  Put,
  Param,
  Delete
} from '@nestjs/common';

import { PedidosService } from './pedido.service';
import { CriarPedidoDTO } from './dto/CriarPedido.dto';
import { ListarPedidoDTO } from './dto/ListarPedido.dto';
import { AtualizarPedidoDTO } from './dto/AtualizarPedido.dto';

@Controller('/usuarios/:usuarioId/pedidos')
export class PedidoController {

  constructor(private readonly pedidoService: PedidosService) { }

  @Post()
  async criarPedido(@Param('usuarioId') usuarioId: string, @Body() dadosDoPedido: CriarPedidoDTO){
    
    const pedidoSalvo = await this.pedidoService.criarPedido(usuarioId, dadosDoPedido)

    return {

      pedidoSalvo: new ListarPedidoDTO(pedidoSalvo.id, pedidoSalvo.valorTotal,pedidoSalvo.status),
      message: 'Pedido criado com sucesso',
    }
  }

  @Get()
  async listarPedidos(@Param('usuarioId') usuarioId: string){

    return await this.pedidoService.listarPedido(usuarioId)
  }


  @Put('/:pedidoId')
  async atualizarPedido(@Param('usuarioId') usuarioId: string, @Param('pedidoId') pedidoId: string, @Body() dadosDeAtualizacao: AtualizarPedidoDTO){

    const pedidoAualizado = await this.pedidoService.atualizarPedido(usuarioId, pedidoId, dadosDeAtualizacao)

    return {

      pedidoAualizado: pedidoAualizado,
      message:  'Pedido atualizado com sucesso'
    }
  }

  @Delete('/:pedidoId')
  async deletarPedido(@Param('usuarioId') usuarioId: string, @Param('pedidoId') pedidoId: string){

    const pedidoDeletado = await this.pedidoService.deletarPedido(usuarioId, pedidoId)
    
    return {

      pedidoDeletado: pedidoDeletado,
      message: 'Pedido deletado com sucesso'
    }
  }

}
