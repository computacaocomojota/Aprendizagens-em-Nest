import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { UsuarioEntity } from "src/usuarios/usuario.entity";
import { Repository } from "typeorm";
import { AtualizarProdutoDTO } from "./dto/AtualizarProduto.dto";

@Injectable()
export class ProdutoService{

	constructor(

		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,
		
		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>
	
	){}

	async buscaUsuarioPorId(usuarioId: string){

		const usuario = await this.usuarioRepository.findOneBy({id: usuarioId}); 
		if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

		return usuario;
	}

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
