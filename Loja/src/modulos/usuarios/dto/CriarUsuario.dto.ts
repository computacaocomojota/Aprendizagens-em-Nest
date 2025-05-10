import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { EmailEhUnico } from "../validacao/email-eh-unico.validator"

export class CriarUsuarioDTO{

	@IsNotEmpty({message: 'nome não pode ser vazio'})
	nome: string

	@IsEmail(undefined,{message: 'O e-mail informado é inválido'})
	@EmailEhUnico({message: 'O e-mail informado já está em uso'})
	email: string

	@MinLength(6,{message: 'A senha precisa ter pelo menos 6 caracteres'})
	senha: string
}