import { 
	
	Body, 
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put, 
	UseInterceptors

} from "@nestjs/common";

import { ProdutoService } from "./produto.service";
import { CriarProdutoDTO } from "./dto/CriarProduto.dto";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('/produtos')
export class ProdutoController {

	constructor(private readonly produtoService: ProdutoService){}

	@Post()
	async criarProduto(@Body() dadosDoProduto: CriarProdutoDTO) {
	
		const produtoSalvo = await this.produtoService.criarProduto(dadosDoProduto);

		return{
			
			produtoSalvo: produtoSalvo,
			mensagem: 'Produto criado com sucesso'
		}
		
	}
	
	@Get()
	async listarProdutos() {

		return await this.produtoService.listarProdutos();

	}

	@Get('/:id')
	@UseInterceptors(CacheInterceptor)
	async listarProdutoPorId(@Param('id') id: string){

		return await this.produtoService.listarProdutoPorId(id);
	}


	@Put('/:id')
	async atualizarProduto(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarProdutoDTO){

		const produtoAtualizado = await this.produtoService.atualizarProduto(id, dadosDeAtualizacao);

		return{

			produtoAtualizado: produtoAtualizado,
			mensagem: 'Produto atualizado com sucesso'
		}
	}

	@Delete('/:id')
	async deletarProduto(@Param('id') id: string) {

		const produtoDeletado = await this.produtoService.deletarProduto(id);

		return {

			produtoDeletado: produtoDeletado,
			mensagem: 'Produto deletado com sucesso'
		}
	}

}