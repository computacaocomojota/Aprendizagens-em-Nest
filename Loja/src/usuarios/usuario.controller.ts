import { Body, Controller,Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";

@Controller('/usuarios')
export class UsuarioController{

	constructor(private usuarioRepository: UsuarioRepository){}

	@Get()
	async listaUsuarios(){
		return this.usuarioRepository.listar();
	}
	
	@Post()
	async criaUsuario(@Body() dadosUsuarios: CriarUsuarioDTO){
		
		this.usuarioRepository.salvar(dadosUsuarios);
		return dadosUsuarios;
	}
	
}