import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";
import { randomUUID } from "crypto";

@Injectable()
export class UsuarioService{

	constructor(

		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,

	){}

	async criarUsuario(dadosDoUsuario: CriarUsuarioDTO){

		const usuarioEntity = new UsuarioEntity();

		usuarioEntity.nome = dadosDoUsuario.nome;
		usuarioEntity.email = dadosDoUsuario.email;
		usuarioEntity.senha = dadosDoUsuario.senha;
		
		return await this.usuarioRepository.save(usuarioEntity);

	}

	async listarUsuarios(){

		const usuariosSalvos = await this.usuarioRepository.find();

		const usuariosLista = usuariosSalvos.map(
			
			(usuario) => new ListarUsuarioDTO(usuario.id, usuario.nome)
		);

		return usuariosLista;

	}

	async atualizarUsuario(id: string, dadosDeAtualizacao: AtualizarUsuarioDTO){

		await this.usuarioRepository.update(id, dadosDeAtualizacao);
	}

	async deletarUsuario(id: string){

		await this.usuarioRepository.delete(id);
	}
}