import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPostCatagory } from "./entities/blogPost-Catagory.entity";
import { BlogpostCatagoryController } from "./blogpost-catagory.controller";
import { BlogpostCatagoryService } from "./blogpost-catagory.service";
import { BlogPost } from "../blogpost/entities/blogpost.entity";
import { Catagory } from "../catagories/entities/catagory.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostCatagory, BlogPost, Catagory])],
  controllers: [BlogpostCatagoryController],
  providers: [BlogpostCatagoryService],
  exports: [BlogpostCatagoryService],
})
export class BlogpostCatagoryModule {}
