import { 

  Controller, 
  Post, 
  Body,
  Get,
  Param,
  Delete,
  Patch
  
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

      pedidoSalvo: new ListarPedidoDTO(pedidoSalvo.id, pedidoSalvo.valorTotal,pedidoSalvo.status, pedidoSalvo.itensPedido),
      
      message: 'Pedido criado com sucesso',
    }
  }

  @Get()
  async listarPedidos(){

    return await this.pedidoService.listarPedido()
  }


  @Patch('/:id')
  async atualizarPedido(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarPedidoDTO){

    const pedidoAtualizado = await this.pedidoService.atualizarPedido(id, dadosDeAtualizacao)

    return {

      pedidoAualizado: pedidoAtualizado,
      message:  'Pedido atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deletarPedido(@Param('id') id: string){

    const pedidoDeletado = await this.pedidoService.deletarPedido(id)
    
    return {

      pedidoDeletado: pedidoDeletado,
      message: 'Pedido deletado com sucesso'
    }
  }

}
