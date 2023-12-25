import { Module } from "@nestjs/common";
import { CatagoriesService } from "./catagories.service";
import { CatagoriesController } from "./catagories.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Catagory } from "./entities/catagory.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Catagory])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
})
export class CatagoriesModule {}
