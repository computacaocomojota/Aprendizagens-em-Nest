import { IsUrl } from "class-validator"

export class ImagensProdutoDTO{
	
	@IsUrl(undefined, {message: 'url inválida'})
	url: string
	
	descricao: string

}