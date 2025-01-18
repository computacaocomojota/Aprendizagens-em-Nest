import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {

	private produtos: ProdutoEntity[] = []

	private buscarPorId(id: string) {

		const possivelProduto = this.produtos.find(
			produtosSalvos => produtosSalvos.id === id
		)
		if (!possivelProduto) {
			throw new Error('Produto não encontrado');
		}

		return possivelProduto;
	}

	async listar() {

		return this.produtos;
	}
	
	async salvar(produto: ProdutoEntity) {
		this.produtos.push(produto);
		return produto;
	}
	

	async atualizar(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
 
		const produto = this.buscarPorId(id);

		Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {

			if (chave === 'id' || chave === 'usuarioId') {
				return;
			}

			produto[chave] = valor;
		})

		return produto;
	}

	async deletar(id: string) {

		const produto = this.buscarPorId(id);

		this.produtos = this.produtos.filter(
			produtoSalvo => produtoSalvo.id !== produto.id
		)

		return produto;
	}
}