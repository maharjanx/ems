import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPostCatagory } from "./entities/blogPost-Catagory.entity";
import { Repository } from "typeorm";

@Injectable()
export class BlogpostCatagoryService {
  constructor(
    @InjectRepository(BlogPostCatagory)
    private blogPostCatagoryRepository: Repository<BlogPostCatagory>
  ) {}

  async create(blogPostId: number, catagoryId: number[]) {
    for (let cat of catagoryId) {
      const blogPostCategory = this.blogPostCatagoryRepository.create({
        blogPostId: blogPostId,
        catagoryId: cat,
      });
      await this.blogPostCatagoryRepository.insert(blogPostCategory);
    }
    return true;
  }
}
