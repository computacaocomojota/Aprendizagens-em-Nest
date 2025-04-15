import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuarios/usuario.entity';
import { PedidoEntity } from './pedido.entity';
import { CriarPedidoDTO } from './dto/CriarPedido.dto';
import { ListarPedidoDTO } from './dto/ListarPedido.dto';
import { AtualizarPedidoDTO } from './dto/AtualizarPedido.dto';
import { StatusPedido } from './enum/statuspedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produtos/produto.entity';

@Injectable()
export class PedidosService {
  
  constructor(

    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,

  ){}

  async criarPedido(usuarioId: string, dadosDoPedido: CriarPedidoDTO){

    const usuario = await this.usuarioRepository.findOneBy({id: usuarioId})

    if(!usuario){
      
      throw new NotFoundException('Usuario não encontrado')
    }
    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({id: In(produtosIds)})

    if(produtosRelacionados.length === 0){

      throw new NotFoundException('Nenhum produto encontrado')
    }

    const pedidoEntity = new PedidoEntity()

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario

    const itensPedidoEntidade = dadosDoPedido.itensPedido.map((itemPedido) => {

      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)

      if(!produtoRelacionado){

        throw new NotFoundException(`Produto com id ${itemPedido.produtoId} não encontrado`)
      }

      const itemPedidoEntity = new ItemPedidoEntity()

      itemPedidoEntity.precoVenda = produtoRelacionado.valor
      itemPedidoEntity.quantidade = itemPedido.quantidade
      itemPedidoEntity.produto = produtoRelacionado

      if(itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel){

        throw new BadRequestException(`Quantidade deseja de ${produtoRelacionado.nome} não disponível`)
      }

      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade

      return itemPedidoEntity;
      
    })

    const valorTotal = itensPedidoEntidade.reduce((valorTotal, itemPedido) => {

      return valorTotal + (itemPedido.precoVenda * itemPedido.quantidade)
    
    },0);

    pedidoEntity.valorTotal = valorTotal
    pedidoEntity.itensPedido = itensPedidoEntidade

    return await this.pedidoRepository.save(pedidoEntity)

  }

  async listarPedido(){

    const pedidosSalvos = await this.pedidoRepository.find();

    console.log(pedidosSalvos)

    const pedidosLista = pedidosSalvos.map(
     
      (pedido) => new ListarPedidoDTO(pedido.id, pedido.valorTotal, pedido.status, pedido.itensPedido)
    )

    return pedidosLista;
  }

  async atualizarPedido(id: string, dadosDeAtualizacao: AtualizarPedidoDTO){

    const pedido = await this.pedidoRepository.findOneBy({id: id})
    
    if(!pedido){
      
      throw new NotFoundException('Pedido não encontrado')
    }

    await this.pedidoRepository.update(id,dadosDeAtualizacao)

    const pedidoAtualizado = await this.pedidoRepository.findOneBy({id: id})

    return pedidoAtualizado
  }

  async deletarPedido(id: string){

    const pedido = await this.pedidoRepository.findOneBy({id: id})

    if(!pedido){

      throw new NotFoundException('Pedido não encontrado')
    }

    await this.pedidoRepository.delete(id)

    return pedido
  }
}
