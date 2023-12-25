import { PartialType } from "@nestjs/mapped-types";
import { CreateBlogpostDto } from "./create-blogpost.dto";

export class UpdateBlogpostDto extends PartialType(CreateBlogpostDto) {
  title: string;
  description: string;
  isActive?: boolean;
}
