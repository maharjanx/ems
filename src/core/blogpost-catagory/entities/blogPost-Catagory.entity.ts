import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlogPost } from "../../blogpost/entities/blogpost.entity";
import { Catagory } from "../../catagories/entities/catagory.entity";

@Entity()
export class BlogPostCatagory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public blogPostId: number;

  @Column()
  public catagoryId: number;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.id, {
    onDelete: "CASCADE",
  })
  blogPost: BlogPost;

  @ManyToOne(() => Catagory, (catagory) => catagory.id, {
    onDelete: "CASCADE",
  })
  catagory: Catagory;
}
