import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriarProdutoDTO } from "./dto/CriarProduto.dto";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from 'node:crypto';

@Controller('produtos')
export class ProdutoController {

	constructor(private produtoRepository: ProdutoRepository) { }

	@Get()
	async listarProdutos() {

		return this.produtoRepository.listar();
	}

	@Post()
	async criarProduto(@Body() dadosDoProduto: CriarProdutoDTO) {

		const produtoEntity = new ProdutoEntity();
		
		produtoEntity.id = randomUUID();
		produtoEntity.usuarioId = dadosDoProduto.usuarioId;
		produtoEntity.nome = dadosDoProduto.nome;
		produtoEntity.valor = dadosDoProduto.valor;
		produtoEntity.quantidade = dadosDoProduto.quantidade;
		produtoEntity.descricao = dadosDoProduto.descricao;
		produtoEntity.categoria = dadosDoProduto.categoria;
		produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
		produtoEntity.imagens = dadosDoProduto.imagens;

		const produtoSalvo = await this.produtoRepository.salvar(produtoEntity);

		return{
			
			produto: produtoSalvo,
			mensagem: 'Produto criado com sucesso'
		}
		
	}

	@Put('/:id')
	async atualizarProduto(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarProdutoDTO){

		const produtoAtualizado = await this.produtoRepository.atualizar(id,dadosDeAtualizacao);

		return{

			produto: produtoAtualizado,
			mensagem: 'Produto atualizado com sucesso'
		}
	}

	@Delete('/:id')
	async deletarProduto(@Param('id') id: string) {

		const produtoDeletado = await this.produtoRepository.deletar(id);

		return {

			produto: produtoDeletado,
			mensagem: 'Produto deletado com sucesso'
		}
	}

}