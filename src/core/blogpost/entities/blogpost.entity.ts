import { BlogPostCatagory } from "src/core/blogpost-catagory/entities/blogPost-Catagory.entity";
import { Catagory } from "src/core/catagories/entities/catagory.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "blog_posts" })
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToMany(
    () => BlogPostCatagory,
    (blogPostCatagories) => blogPostCatagories.blogPost
  )
  blogPostCatagories: BlogPostCatagory[];
}
