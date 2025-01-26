import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";

@Injectable()
export class ProdutoService{

	constructor(

		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>
	
	){}

	async criarProduto(produtoEntity: ProdutoEntity){

		await this.produtoRepository.save(produtoEntity);
	}

	async listarProdutos(){

		await this.produtoRepository.find();
	}

	async atualizarProduto(id: string, produto: AtualizarProdutoDTO){

		await this.produtoRepository.update(id, produto);
	}

	async deletarProduto(id: string){

		await this.produtoRepository.delete(id);
	}
}
