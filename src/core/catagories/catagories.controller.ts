import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from "@nestjs/common";
import { CatagoriesService } from "./catagories.service";
import { CreateCatagoryDto } from "./dto/create-catagory.dto";
import { UpdateCatagoryDto } from "./dto/update-catagory.dto";

@Controller("catagories")
export class CatagoriesController {
  constructor(private readonly catagoriesService: CatagoriesService) {}

  @Post()
  create(@Body() createCatagoryDto: CreateCatagoryDto) {
    return this.catagoriesService.createCatagory(createCatagoryDto);
  }

  @Get()
  findAll() {
    return this.catagoriesService.fetchAllCatagory();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catagoriesService.fetchCatagoryById(+id);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCatagoryDto: UpdateCatagoryDto
  ) {
    return this.catagoriesService.updateCatagory(id, updateCatagoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.catagoriesService.removeCatagory(+id);
  }
}
