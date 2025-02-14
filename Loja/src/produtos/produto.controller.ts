import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 
} from "@nestjs/common";

import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";
import { CriarProdutoDTO } from "./dto/CriarProduto.dto";
import { ProdutoService } from "./produto.service";

@Controller('/produtos')
export class ProdutoController {

	constructor(

		private produtoService: ProdutoService,

	) {}

	@Post()
	async criarProduto(@Body() dadosDoProduto: CriarProdutoDTO) {
	
		const produtoSalvo = await this.produtoService.criarProduto(dadosDoProduto);

		return{
			
			produto: produtoSalvo,
			mensagem: 'Produto criado com sucesso'
		}
		
	}
	
	@Get()
	async listarProdutos() {

		return this.produtoService.listarProdutos();

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