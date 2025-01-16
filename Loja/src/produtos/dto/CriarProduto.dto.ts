
import { IsArray, IsDecimal, IsNotEmpty, IsPositive, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagensProdutoDTO } from './ImagensProduto.dto';
import { Type } from 'class-transformer';

export class CriarProdutoDTO{

	@IsUUID(undefined,{message: 'ID de usuário inválido'})
	usuarioId: string
	
	@IsString({message: 'nome precisa ser uma string'})
	@IsNotEmpty({message: 'nome não pode ser vazio'})
	nome: string

	@IsPositive({message: 'valor precisa ser um número positivo'})
	@IsDecimal({decimal_digits: '2'},{message: 'valor precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais'})
	valor: number

	@IsPositive({message: 'quantidade disponível precisa ser um número igual ou maior que zero'})
	quantidadeDisponivel: number

	@IsNotEmpty({message: 'descrição não pode ser vazia'})
	@MinLength(1000,{message: 'descrição precisa ter pelo menos 1000 caracteres'})
	descricao: string


	@ValidateNested()
	@IsArray({message: 'características precisam ser um array'})
	@Type(() => CaracteristicaProdutoDTO)
	@MinLength(3,{message: 'produto precisa ter pelo menos três características'})
	caracteristicas: CaracteristicaProdutoDTO[]

	@ValidateNested()
	@IsArray({message: 'imagens precisam ser um array'})
	@Type(() => ImagensProdutoDTO)
	@MinLength(1,{message: 'produto precisa ter pelo menos uma imagem'})
	imagens: ImagensProdutoDTO[]

	@IsNotEmpty({message: 'categoria não pode ser vazia'})
	categoria: string

	dataCriacao: Date
	dataAtualizacao: Date
}