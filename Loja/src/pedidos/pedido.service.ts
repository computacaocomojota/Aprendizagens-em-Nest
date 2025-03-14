import { Injectable } from '@nestjs/common';
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

  async criarPedido(usuarioId: string){

    const usuario = await this.usuarioRepository.findOneBy({id: usuarioId})
    const pedidoEntity = new PedidoEntity()

    pedidoEntity.valorTotal = 0
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario

    const pedidoSalvo = await this.pedidoRepository.save(pedidoEntity)

    return pedidoSalvo

  }

  async listarPedido(){

    const pedidosSalvos = await this.pedidoRepository.find();

    const pedidosLista = pedidosSalvos.map(
     
      (pedido) => console.log(pedido)
    )

    

    return pedidosLista;
  }

  async atualizarPedido(id:string, dadosDeAtualizacao: AtualizarPedidoDTO){

    await this.pedidoRepository.update(id,dadosDeAtualizacao)
  }

  async deletarPedido(id:string){

    await this.pedidoRepository.delete(id)
  }
}
