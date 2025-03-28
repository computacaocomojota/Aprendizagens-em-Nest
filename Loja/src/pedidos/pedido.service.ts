import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuarios/usuario.entity';
import { PedidoEntity } from './pedido.entity';
import { CriarPedidoDTO } from './dto/CriarPedido.dto';
import { ListarPedidoDTO } from './dto/ListarPedido.dto';
import { AtualizarPedidoDTO } from './dto/AtualizarPedido.dto';
import { StatusPedido } from './enum/statuspedido.enum';

@Injectable()
export class PedidosService {
  
  constructor(

    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>

  ){}

  async criarPedido(dadosDoPedido: CriarPedidoDTO){

    const usuario = await this.usuarioRepository.findOneBy({id: dadosDoPedido.usuario.id})

    if(!usuario){
      
      throw new NotFoundException('Usuario não encontrado')
    }
    
    const pedidoEntity = new PedidoEntity()

    pedidoEntity.valorTotal = dadosDoPedido.valorTotal
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario

    return await this.pedidoRepository.save(pedidoEntity)

  }

  async listarPedido(){

    const pedidosSalvos = await this.pedidoRepository.find({ relations: ['usuario'] });

    const pedidosLista = pedidosSalvos.map(
     
      (pedido) => new ListarPedidoDTO(pedido.id, pedido.usuario.id, pedido.valorTotal, pedido.status)
    )

    return pedidosLista;
  }

  async atualizarPedido(id:string, dadosDeAtualizacao: AtualizarPedidoDTO){

    const pedido = await this.pedidoRepository.findOneBy({id})
    
    if(!pedido){
      
      throw new NotFoundException('Pedido não encontrado')
    }

    await this.pedidoRepository.update(id,dadosDeAtualizacao)
  }

  async deletarPedido(id:string){

    const pedido = await this.pedidoRepository.findOneBy({id})

    if(!pedido){

      throw new NotFoundException('Pedido não encontrado')
    }

    await this.pedidoRepository.delete(id)
  }
}
