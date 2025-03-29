import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutoEntity } from "./produto.entity";
import { CriarProdutoDTO } from "./dto/CriarProduto.dto";
import { ListarProdutoDTO } from "./dto/ListarProduto.dto";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";

@Injectable()
export class ProdutoService{

	constructor(

		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>
	
	){}

	async criarProduto(dadosDoProduto: CriarProdutoDTO){

		const produtoEntity = new ProdutoEntity();
		
		produtoEntity.nome = dadosDoProduto.nome;
		produtoEntity.valor = dadosDoProduto.valor;
		produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
		produtoEntity.descricao = dadosDoProduto.descricao;
		produtoEntity.categoria = dadosDoProduto.categoria;
		produtoEntity.caracteristicas = dadosDoProduto.caracteristicas
		produtoEntity.imagens = dadosDoProduto.imagens
				
		return await this.produtoRepository.save(produtoEntity);
	}

	async listarProdutos(){

		const produtosSalvos = await this.produtoRepository.find();

		const produtosLista = produtosSalvos.map(
			
			(produto) => new ListarProdutoDTO(produto.id, produto.nome, produto.caracteristicas, produto.imagens)
		);

		return produtosLista;
	}

	async atualizarProduto(id: string, dadosDeAtualizacao: AtualizarProdutoDTO){

		const pedido = await this.produtoRepository.findOneBy({id: id});

		if(!pedido){
			
			throw new NotFoundException('Produto não encontrado');
		}
		
		await this.produtoRepository.update(id, dadosDeAtualizacao);
	}

	async deletarProduto(id: string){

		const pedido = await this.produtoRepository.findOneBy({id: id});

		if(!pedido){

			throw new NotFoundException('Produto não encontrado');
		}

		await this.produtoRepository.delete(id);
	}
}
