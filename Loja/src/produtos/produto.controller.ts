import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 
} from "@nestjs/common";
import { randomUUID } from 'node:crypto';

import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";
import { CriarProdutoDTO } from "./dto/CriarProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";

@Controller('/produtos')
export class ProdutoController {

	constructor(

		private produtoService: ProdutoService,

	) {}

	@Post()
	async criarProduto(@Body() dadosDoProduto: CriarProdutoDTO) {

		const produtoEntity = new ProdutoEntity();
		
		produtoEntity.id = randomUUID();
		produtoEntity.nome = dadosDoProduto.nome;
		produtoEntity.valor = dadosDoProduto.valor;
		produtoEntity.quantidade = dadosDoProduto.quantidade;
		produtoEntity.descricao = dadosDoProduto.descricao;
		produtoEntity.categoria = dadosDoProduto.categoria;
		produtoEntity.caracteristicas = dadosDoProduto.caracteristicas
		produtoEntity.imagens = dadosDoProduto.imagens
		
		const produtoSalvo = await this.produtoService.criarProduto(produtoEntity);

		return{
			
			produto: produtoSalvo,
			mensagem: 'Produto criado com sucesso'
		}
		
	}
	
	@Get()
	async listarProdutos() {

		const produtosSalvos = await this.produtoService.listarProdutos();
	
		return produtosSalvos;
	}


	@Put('/:id')
	async atualizarProduto(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarProdutoDTO){

		const produtoAtualizado = await this.produtoService.atualizarProduto(id, dadosDeAtualizacao);

		return{

			produto: produtoAtualizado,
			mensagem: 'Produto atualizado com sucesso'
		}
	}

	@Delete('/:id')
	async deletarProduto(@Param('id') id: string) {

		const produtoDeletado = await this.produtoService.deletarProduto(id);

		return {

			produto: produtoDeletado,
			mensagem: 'Produto deletado com sucesso'
		}
	}

}