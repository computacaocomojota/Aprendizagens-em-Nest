import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TempleteEntity } from "./templete.entity";
import { CategoryEntity } from "src/category/category.entity";
import { Repository } from "typeorm";
import { CreateTempleteDTO } from "./dto/CreateTempleteDTO";
import { ListTempleteDTO } from "./dto/ListTempleteDTO";
import { UpdateTempleteDTO } from "./dto/UpdateTempleteDTO";

@Injectable()
export class TempleteService{

	constructor(

		@InjectRepository(TempleteEntity)
		private readonly templeteRepository: Repository<TempleteEntity>,

		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>

	){}

	async createTemplete(dataTemplete: CreateTempleteDTO){

		const templeteEntity = new TempleteEntity();

		templeteEntity.title = dataTemplete.title;
		templeteEntity.content = dataTemplete.content;

		return await this.templeteRepository.save(templeteEntity);
	}

	async addCategoryToTemplete(templeteId: string, categoryId: string){

		const templete = await this.templeteRepository.findOne({where: { id: templeteId }, relations: ['categories']});
		const category = await this.categoryRepository.findOne({where: { id: categoryId }});

		if(!templete || !category){

			throw new NotFoundException('Templete or category not found');
		}

		if(!templete.categories){

			templete.categories = [];
		}

		templete.categories.push(category);

		return await this.templeteRepository.save(templete);

	}

	async listTempletes(){

		const saveTempletes = await this.templeteRepository.find();

		const listTempletes = saveTempletes.map(
			
			templete => new ListTempleteDTO(templete.id, templete.title, templete.content, templete.categories)
		);

		return listTempletes;
	}

	async getTemplete(id:string){

		const saveTemplete = await this.templeteRepository.findOne({where: { id }});

		if(!saveTemplete){

			throw new NotFoundException(`Templete with ${id} not found`);
		}

		const getTemplete = new ListTempleteDTO(saveTemplete.id, saveTemplete.title, saveTemplete.content, saveTemplete.categories);

		return getTemplete;
	}

	async updateTemplete(id: string, dateUpdate: UpdateTempleteDTO){

		const templete = await this.templeteRepository.findOne({where: { id }});
		
		if(!templete){

			throw new NotFoundException(`Templete with ${id} not found`);
		}

		await this.templeteRepository.update(id, dateUpdate);
	}

	async deleteTemplete(id: string){

		const templete = await this.templeteRepository.findOne({where: { id }});

		if(!templete){

			throw new NotFoundException(`Templete with ${id} not found`);
		}

		await this.templeteRepository.delete(id);
	}

	async removeCategoryToTemplete(templeteId: string, categoryId: string){

		const templete = await this.templeteRepository.findOne({where: { id: templeteId }, relations: ['categories']});
		const category = await this.categoryRepository.findOne({where: { id: categoryId }});

		if(!templete || !category){

			throw new NotFoundException('Templete or category not found');
		}

		templete.categories = templete.categories.filter(category => category.id !== categoryId);

		return await this.templeteRepository.save(templete);
	}

}