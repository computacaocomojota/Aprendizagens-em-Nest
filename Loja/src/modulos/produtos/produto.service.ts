import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";
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
		
		const produtoCaracteristicasEntidade = dadosDoProduto.caracteristicas.map((caracteristicas) => {

			const produtoCaracteristicasEntity = new ProdutoCaracteristicaEntity();

			produtoCaracteristicasEntity.nome = caracteristicas.nome;
			produtoCaracteristicasEntity.descricao = caracteristicas.descricao;

			return produtoCaracteristicasEntity;

		})

		const produtoImagensEntidade = dadosDoProduto.imagens.map((imagens) => {

			const produtoImagensEntity = new ProdutoImagemEntity();

			produtoImagensEntity.url = imagens.url;
			produtoImagensEntity.descricao = imagens.descricao;

			return produtoImagensEntity;

		})

		produtoEntity.caracteristicas = produtoCaracteristicasEntidade;
		produtoEntity.imagens = produtoImagensEntidade;

		Object.assign(produtoEntity, dadosDoProduto as ProdutoEntity);
				
		return await this.produtoRepository.save(produtoEntity);
	}

	async listarProdutos(){

		const produtosSalvos = await this.produtoRepository.find();

		const produtosLista = produtosSalvos.map(
			
			(produto) => new ListarProdutoDTO(
				
				produto.id, 
				produto.nome, 
				produto.valor,
				produto.quantidadeDisponivel,
				produto.caracteristicas, 
				produto.imagens
				
			)
		);

		return produtosLista;
	}

	async atualizarProduto(id: string, dadosDeAtualizacao: AtualizarProdutoDTO){

		const produto = await this.produtoRepository.findOneBy({id: id});

		if(!produto){
			
			throw new NotFoundException('Produto não encontrado');
		}
		
		Object.assign(produto, dadosDeAtualizacao as ProdutoEntity);

		return await this.produtoRepository.save(produto);
	}

	async deletarProduto(id: string){

		const produto = await this.produtoRepository.delete(id);

		if(!produto.affected){
			
			throw new NotFoundException('Produto não encontrado');
		}

		return produto
	}
}
