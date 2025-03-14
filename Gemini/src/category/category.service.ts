import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {

	constructor(

		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>

	){}

	async createCategory(){}

	async listCategories(){}

	async getCategory(id:string){}

	async updateCategory(id:string){}

	async deleteCategory(id:string){}
}