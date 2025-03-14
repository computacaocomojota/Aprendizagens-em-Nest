import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TempleteEntity } from "./templete.entity";
import { Repository } from "typeorm";
import { CreateTempleteDTO } from "./dto/CreateTempleteDTO";
import { ListTempleteDTO } from "./dto/ListTempleteDTO";
import { UpdateTempleteDTO } from "./dto/UpdateTempleteDTO";

@Injectable()
export class TempleteService{

	constructor(

		@InjectRepository(TempleteEntity)
		private readonly templeteRepository: Repository<TempleteEntity>,

	){}

	async createTemplete(dataTemplete: CreateTempleteDTO){

		const templeteEntity = new TempleteEntity();

		templeteEntity.title = dataTemplete.title;
		templeteEntity.content = dataTemplete.content;

		return await this.templeteRepository.save(templeteEntity);
	}

	async listTempletes(){

		const saveTempletes = await this.templeteRepository.find();

		const listTempletes = saveTempletes.map(
			
			templete => new ListTempleteDTO(templete.id, templete.title, templete.content)
		);

		return listTempletes;
	}

	async getTemplete(id:string){

		const saveTemplete = await this.templeteRepository.findOne({where: { id }});

		if(!saveTemplete){

			throw new Error(`Templete with ${id} not found`);
		}

		const getTemplete = new ListTempleteDTO(saveTemplete.id, saveTemplete.title, saveTemplete.content);

		return getTemplete;
	}

	async updateTemplete(id:string, dateUpdate: UpdateTempleteDTO){

		await this.templeteRepository.update(id, dateUpdate);
	}

	async deleteTemplete(id:string){

		await this.templeteRepository.delete(id);
	}

}