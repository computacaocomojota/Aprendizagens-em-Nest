
import { Type } from 'class-transformer';
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriarProduto.dto';
import { 
	ArrayMinSize,
	IsArray,  
	IsNotEmpty, 
	IsNumber, 
	IsOptional, 
	IsString, 
	IsUUID, 
	MaxLength, 
	Min, 
	ValidateNested 
} from 'class-validator';

export class AtualizarProdutoDTO {

	@IsString()
	@IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
	@IsOptional()
	nome: string

	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	@Min(1,{ message: 'valor precisa ser maior que zero' })
	@IsOptional()
	valor: number

	@IsNumber()
	@Min(0,{ message: 'quantidade miníma inválida' })
	@IsOptional()
	quantidadeDisponivel: number

	@IsString()
	@IsNotEmpty({ message: 'Descrição do Produto não pode ser vazia' })
	@MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
	@IsOptional()
	descricao: string

	@ValidateNested()
	@IsArray()
	@ArrayMinSize(3)
	@Type(() => CaracteristicaProdutoDTO)
	@IsOptional()
	caracteristicas: CaracteristicaProdutoDTO[]

	@ValidateNested()
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => ImagemProdutoDTO)
	@IsOptional()
	imagens: ImagemProdutoDTO[]

	@IsString()
	@IsNotEmpty({ message: 'Categoria do Produto não pode ser vazia' })
	@IsOptional()
	categoria: string
}