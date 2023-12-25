import { Module } from "@nestjs/common";
import { BlogpostService } from "./blogpost.service";
import { BlogpostController } from "./blogpost.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./entities/blogpost.entity";
import { Catagory } from "../catagories/entities/catagory.entity";
import { BlogpostCatagoryService } from "../blogpost-catagory/blogpost-catagory.service";
import { BlogPostCatagory } from "../blogpost-catagory/entities/blogPost-Catagory.entity";
import { BlogPostRepository } from "./blogpost.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostCatagory, BlogPost, Catagory])],
  controllers: [BlogpostController],
  providers: [BlogpostService, BlogpostCatagoryService, BlogPostRepository],
})
export class BlogpostModule {}
