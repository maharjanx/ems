import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from "@nestjs/common";
import { BlogpostService } from "./blogpost.service";
import { CreateBlogpostDto } from "./dto/create-blogpost.dto";
import { UpdateBlogpostDto } from "./dto/update-blogpost.dto";

@Controller("blogpost")
export class BlogpostController {
  constructor(private blogpostService: BlogpostService) {}

  @Post()
  createBlog(@Body() createBlogpostDto: CreateBlogpostDto) {
    return this.blogpostService.createBlogPost(createBlogpostDto);
  }

  @Get()
  findAll() {
    return this.blogpostService.fetchAllBlogPost();
  }

  @Get(":id")
  findOneByid(@Param("id", ParseIntPipe) id: number) {
    return this.blogpostService.fetchBlogPostbyId(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBlogPostDto: UpdateBlogpostDto
  ) {
    await this.blogpostService.updateBlogPost(id, updateBlogPostDto);
    return "Data updated successfully";
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.blogpostService.remove(id);
  }
}
