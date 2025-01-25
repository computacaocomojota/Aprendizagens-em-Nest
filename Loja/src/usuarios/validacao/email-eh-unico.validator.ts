import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
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
	
		const usuarioComEmailExiste = await this.usuarioRepository.findOneBy({email: value});

		return !usuarioComEmailExiste;
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