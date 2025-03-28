import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 
} from "@nestjs/common";

import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController {

	constructor(private readonly usuarioService: UsuarioService){}

	@Post()
	async criaUsuario(@Body() dadosUsuarios: CriarUsuarioDTO) {
	
		const usuarioSalvo = await this.usuarioService.criarUsuario(dadosUsuarios);

		return {

			usuario: new ListarUsuarioDTO(usuarioSalvo.id, usuarioSalvo.nome, usuarioSalvo.pedidos),
			messagem: 'Usuário criado com sucesso'
		};
	}

	@Get()
	async listaUsuarios() {

		return await this.usuarioService.listarUsuarios();

	}

	@Put('/:id')
	async atualizaUsuario(@Param('id') id: string, @Body() dadosDeAtualizacao: AtualizarUsuarioDTO) {

		const usuarioAtualizado = await this.usuarioService.atualizarUsuario(id, dadosDeAtualizacao);

		return {

			usuario: usuarioAtualizado,
			messagem: 'Usuário atualizado com sucesso'
		}
	}

	@Delete('/:id')
	async deletaUsuario(@Param('id') id: string) {

		const usuarioDeletado = await this.usuarioService.deletarUsuario(id);

		return {

			usuario: usuarioDeletado,
			messagem: 'Usuário deletado com sucesso'
		}
	}

}