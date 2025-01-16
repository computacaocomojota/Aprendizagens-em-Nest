import { Body, Controller,Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { UsuarioEntity } from "./validacao/usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";

@Controller('/usuarios')
export class UsuarioController{

	constructor(private usuarioRepository: UsuarioRepository){}

	@Get()
	async listaUsuarios(){

		const usuariosSalvos = await this.usuarioRepository.listar();
		const usuariosListados = usuariosSalvos.map(
			
			usuario => new ListarUsuarioDTO(
				usuario.id, 
				usuario.nome
			)
		);
		return usuariosListados;
	}
	
	@Post()
	async criaUsuario(@Body() dadosUsuarios: CriarUsuarioDTO){
		
		const usuarioEntity = new UsuarioEntity();
		usuarioEntity.nome = dadosUsuarios.nome;
		usuarioEntity.email = dadosUsuarios.email;
		usuarioEntity.senha = dadosUsuarios.senha;
		usuarioEntity.id = uuid();
		this.usuarioRepository.salvar(usuarioEntity);
		return {
			usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), 
			message: 'Usuário criado com sucesso'
		};
	}
	
}