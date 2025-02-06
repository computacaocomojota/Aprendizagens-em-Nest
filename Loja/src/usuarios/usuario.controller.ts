import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 
} from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { AtualizarUsuarioDTO } from "./dto/AtualizarUsuario.dto";
import { CriarUsuarioDTO } from "./dto/CriarUsuario.dto";
import { ListarUsuarioDTO } from "./dto/ListarUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";


@Controller('/usuarios')
export class UsuarioController {

	constructor(

		private usuarioService: UsuarioService,

	){}

	@Post()
	async criaUsuario(@Body() dadosUsuarios: CriarUsuarioDTO) {

		const usuarioEntity = new UsuarioEntity();

		usuarioEntity.nome = dadosUsuarios.nome;
		usuarioEntity.email = dadosUsuarios.email;
		usuarioEntity.senha = dadosUsuarios.senha;
		usuarioEntity.id = uuid();

		this.usuarioService.criarUsuario(usuarioEntity);

		return {

			usuario: new ListarUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
			messagem: 'Usuário criado com sucesso'
		};
	}

	@Get()
	async listaUsuarios() {

		const usuariosSalvos = await this.usuarioService.listarUsuarios();
	 
		return usuariosSalvos

	}

	@Get('/:id')
	async listarProdutosDoUsuario(@Param('id') id: string) {	

		const usuarioProdutos = await this.usuarioService.listarProdutosDoUsuario(id);

		return usuarioProdutos;
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