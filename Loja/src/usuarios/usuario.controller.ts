import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

	constructor(private usuarioRepository: UsuarioRepository) { }

	@Get()
	async listaUsuarios() {

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
	async criaUsuario(@Body() dadosUsuarios: CriarUsuarioDTO) {

		const usuarioEntity = new UsuarioEntity();
		usuarioEntity.nome = dadosUsuarios.nome;
		usuarioEntity.email = dadosUsuarios.email;
		usuarioEntity.senha = dadosUsuarios.senha;
		usuarioEntity.id = uuid();
		this.usuarioRepository.salvar(usuarioEntity);

		return {

			usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
			messagem: 'Usuário criado com sucesso'
		};
	}

	@Put('/:id')
	async atualizaUsuario(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarUsuarioDTO) {

		const usuarioAtualizado = await this.usuarioRepository.atualizar(id, dadosDeAtualizacao);

		return {

			usuario: usuarioAtualizado,
			messagem: 'Usuário atualizado com sucesso'
		}
	}

	@Delete('/:id')
	async deletaUsuario(@Param('id') id: string) {

		const usuarioDeletado = await this.usuarioRepository.deletar(id);

		return {

			usuario: usuarioDeletado,
			messagem: 'Usuário deletado com sucesso'
		}
	}

}