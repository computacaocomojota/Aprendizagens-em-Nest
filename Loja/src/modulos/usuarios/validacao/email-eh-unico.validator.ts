import { Injectable, NotFoundException } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Not, Repository } from "typeorm";
import { UsuarioEntity } from "../usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface{
	
	constructor(

		@InjectRepository(UsuarioEntity)
		private usuarioRepository: Repository<UsuarioEntity>
		
	){}

	async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean>{
	
		try{
			
			const usuarioComEmailExiste = await this.usuarioRepository.findOneBy({email: value});

			return !usuarioComEmailExiste;

		} catch(error){

			if(error instanceof NotFoundException){

				return true;
			}

			throw error;
		}
	}
	
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {

	return (objeto: Object, propriedade: string)=> {

		registerDecorator({
			target: objeto.constructor,
			propertyName: propriedade,
			options: opcoesDeValidacao,
			constraints: [],
			validator: EmailEhUnicoValidator
		})
	}
}