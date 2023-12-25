import { BlogPost } from "src/core/blogpost/entities/blogpost.entity";
import { BlogPostCatagory } from "src/core/blogpost-catagory/entities/blogPost-Catagory.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "catagories" })
export class Catagory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => BlogPostCatagory,
    (blogPostCatagories) => blogPostCatagories.catagory
  )
  blogPostCatagories: BlogPostCatagory[];
}
