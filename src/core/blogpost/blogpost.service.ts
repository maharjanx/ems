import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBlogpostDto } from "./dto/create-blogpost.dto";
import { UpdateBlogpostDto } from "./dto/update-blogpost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPost } from "./entities/blogpost.entity";
import { Repository } from "typeorm";
import { PostNotFoundException } from "../methods/method.exception";
import { Catagory } from "../catagories/entities/catagory.entity";
import { BlogpostCatagoryService } from "../blogpost-catagory/blogpost-catagory.service";

@Injectable()
export class BlogpostService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
    @InjectRepository(Catagory)
    private categoryRepository: Repository<Catagory>,
    private blogpostCategoryService: BlogpostCatagoryService
  ) {}

  async createBlogPost(createBlogpostDto: CreateBlogpostDto) {
    const titleAlreadyExist = await this.blogPostRepository.findOne({
      where: { title: createBlogpostDto?.title },
    });

    if (titleAlreadyExist) {
      throw new HttpException(
        "Title name already exist. Please try different title name",
        HttpStatus.CONFLICT
      );
    }

    const newBlog = this.blogPostRepository.create({
      ...createBlogpostDto,
      // catagories: categories,
    });
    const blog = await this.blogPostRepository.save(newBlog);
    this.blogpostCategoryService.create(
      newBlog.id,
      createBlogpostDto.categoryId
    );
    return blog;
  }

  async fetchAllBlogPost() {
    return await this.blogPostRepository.manager.query(`
    SELECT
  bp.id AS post_id,
  bp.title AS post_title,
  bp.content AS post_content,
  CASE
      WHEN bool_or(c.id IS NOT NULL) THEN
      json_agg(json_build_object(
        'catagory_id', c.id,
        'catagory_name', c.name
      ))
    ELSE
      NULL
  END AS categories
FROM
  blog_posts bp
LEFT JOIN
  blog_post_catagory bpc ON bpc."blogPostId" = bp.id
LEFT JOIN
  catagories c ON c.id = bpc."catagoryId"

GROUP BY
  bp.id, bp.title, bp.content;
    `);
  }

  async fetchBlogPostbyId(id: number) {
    const post = await this.blogPostRepository.findOne({ where: { id } });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async updateBlogPost(id: number, updateBlogpostDto: UpdateBlogpostDto) {
    const post = await this.blogPostRepository.findOne({ where: { id } });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    this.blogPostRepository.update(id, updateBlogpostDto);

    return "Data updated successfully";
  }

  async remove(id: number) {
    const post = await this.blogPostRepository.findOneBy({ id });
    if (!post) throw new PostNotFoundException(id);

    this.blogPostRepository.delete(id);
    return "The Data with id " + id + " has been deleted successfully";
  }
}
