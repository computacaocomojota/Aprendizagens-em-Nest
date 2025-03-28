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

@Controller('/pedidos')
export class PedidoController {

  constructor(private readonly pedidoService: PedidosService) { }

  @Post()
  async criarPedido(@Body() dadosDoPedido: CriarPedidoDTO){
    
    const pedidoSalvo = await this.pedidoService.criarPedido(dadosDoPedido)

    return {

      pedidoSalvo: new ListarPedidoDTO(pedidoSalvo.id, pedidoSalvo.usuario.id, pedidoSalvo.valorTotal,pedidoSalvo.status),
      message: 'Pedido criado com sucesso',
    }
  }

  @Get()
  async listarPedidos(){

    return await this.pedidoService.listarPedido()
  }


  @Put('/:id')
  async atualizarPedido(@Param('id') id:string, @Body() dadosDeAtualizacao: AtualizarPedidoDTO){

    const pedidoAualizado = await this.pedidoService.atualizarPedido(id,dadosDeAtualizacao)

    return {

      pedidoAualizado: pedidoAualizado,
      message:  'Pedido atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deletarPedido(@Param('id') id:string){

    const pedidoDeletado = await this.pedidoService.deletarPedido(id)
    
    return {

      pedidoDeletado: pedidoDeletado,
      message: 'Pedido deletado com sucesso'
    }
  }

}
