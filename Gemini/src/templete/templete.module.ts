import { Module } from "@nestjs/common";
import { TempleteService } from "./templete.service";
import { TempleteController } from "./templete.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TempleteEntity } from "./templete.entity";
import { CategoryEntity } from "../category/category.entity";

@Module({

	imports: [TypeOrmModule.forFeature([TempleteEntity, CategoryEntity])],
	controllers: [TempleteController],
	providers: [TempleteService],
})
export class TempleteModule {}