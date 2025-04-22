import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";

@Injectable()
export class UsuarioService{

	constructor(

		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,

	){}

	async criarUsuario(dadosDoUsuario: CriarUsuarioDTO){

		const usuarioEntity = new UsuarioEntity();

		Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);
		
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

		const usuario = await this.usuarioRepository.findOneBy({id: id});

		if(!usuario){

			throw new NotFoundException('Usuario não encontrado');
		}
		
		Object.assign(usuario, dadosDeAtualizacao as UsuarioEntity);

		return await this.usuarioRepository.save(usuario);
	}

	async deletarUsuario(id: string){

		const usuario = await this.usuarioRepository.delete(id);

		if(!usuario.affected){

			throw new NotFoundException('Usuario não encontrado');
		}

		return usuario
	}
}