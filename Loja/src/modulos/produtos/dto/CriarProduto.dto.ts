import { Type } from 'class-transformer';
import { 

	ArrayMinSize, 
	IsArray,
	IsNotEmpty, 
	IsNumber,
	IsString,
	IsUrl,
	MaxLength,
	Min,
	ValidateNested 

} from 'class-validator';

import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO{
	
	id: string

	@IsString()
	@IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
	nome: string

	@IsString()
	@IsNotEmpty({ message: 'Descrição da característica não pode ser vazia' })
	descricao: string

	produto: ProdutoEntity
}

export class ImagemProdutoDTO{
	
	id: string

	@IsUrl(undefined, { message: 'URL para imagem inválida'})
	url: string

	@IsString()
	@IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
	descricao: string

	produto: ProdutoEntity
}

export class CriarProdutoDTO {
	
	@IsString()
	@IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
	nome: string

	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	@Min(1,{ message: 'valor precisa ser maior que zero' })
	valor: number

	@IsNumber()
	@Min(0,{ message: 'quantidade miníma inválida' })
	quantidadeDisponivel: number

	@IsString()
	@IsNotEmpty({ message: 'Descrição do Produto não pode ser vazia' })
	@MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
	descricao: string

	@ValidateNested()
	@IsArray()
	@ArrayMinSize(3)
	@Type(() => CaracteristicaProdutoDTO)
	caracteristicas: CaracteristicaProdutoDTO[]

	@ValidateNested()
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => ImagemProdutoDTO)
	imagens: ImagemProdutoDTO[]

	@IsString()
	@IsNotEmpty({ message: 'Categoria do Produto não pode ser vazia' })
	categoria: string

}