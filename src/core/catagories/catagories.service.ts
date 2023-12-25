import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCatagoryDto } from "./dto/create-catagory.dto";
import { UpdateCatagoryDto } from "./dto/update-catagory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Catagory } from "./entities/catagory.entity";
import { Repository } from "typeorm";
import { PostNotFoundException } from "../methods/method.exception";

@Injectable()
export class CatagoriesService {
  constructor(
    @InjectRepository(Catagory) private catagoryRepository: Repository<Catagory>
  ) {}

  async createCatagory(createCatagoryDto: CreateCatagoryDto) {
    const catagoryNameAlreadyExist = await this.catagoryRepository.findOne({
      where: { name: createCatagoryDto?.name },
    });

    if (catagoryNameAlreadyExist)
      throw new HttpException(
        "there is already a catagory named " + catagoryNameAlreadyExist.name,
        HttpStatus.CONFLICT
      );
    const newCatagory = this.catagoryRepository.create(createCatagoryDto);
    const catagory = await this.catagoryRepository.save(newCatagory);
    return catagory;
  }

  fetchAllCatagory() {
    return this.catagoryRepository.find();
  }

  async fetchCatagoryById(id: number) {
    const catagory = await this.catagoryRepository.findOne({ where: { id } });
    if (!catagory) throw new PostNotFoundException(id);
    return catagory;
  }

  async updateCatagory(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    const catagory = await this.catagoryRepository.findOne({ where: { id } });
    if (!catagory) throw new PostNotFoundException(id);
    this.catagoryRepository.update(id, updateCatagoryDto);
    return "Catagory updated successfully";
  }

  async removeCatagory(id: number) {
    const catagory = await this.catagoryRepository.findOne({ where: { id } });
    if (!catagory) throw new PostNotFoundException(id);
    this.catagoryRepository.delete(id);
    return "Catagory deleted successfully";
  }
}
