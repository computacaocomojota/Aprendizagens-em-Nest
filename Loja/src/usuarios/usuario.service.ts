import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";
import { ProdutoEntity } from "src/produtos/produto.entity";

@Injectable()
export class UsuarioService{

	constructor(

		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,

		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>

	){}

	async criarUsuario(usuarioEntity: UsuarioEntity){

		await this.usuarioRepository.save(usuarioEntity);

	}

	async listarUsuarios(){

		const usuariosSalvos = await this.usuarioRepository.find();

		const usuariosLista = usuariosSalvos.map(
			
			(usuario) => new ListarUsuarioDTO(usuario.id, usuario.nome)
		);

		return usuariosLista;

	}

	async listarProdutosDoUsuario(id: string){

		return await this.produtoRepository.find({ 
			
			where: { usuario: { id } },
			relations: ['usuarioId']
		});
	}

	async atualizarUsuario(id: string, dadosDeAtualizacao: AtualizarUsuarioDTO){

		await this.usuarioRepository.update(id, dadosDeAtualizacao);
	}

	async deletarUsuario(id: string){

		await this.usuarioRepository.delete(id);
	}
}