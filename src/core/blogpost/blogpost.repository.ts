import { Repository, EntityRepository, Connection } from "typeorm";
import { BlogPost } from "./entities/blogpost.entity";
import { Inject, Injectable } from "@nestjs/common";

Injectable();
export class BlogPostRepository extends Repository<BlogPost> {
  private entity = this.manager;
  async fetchAllBlog() {
    return await this.entity.query(`
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
  where id=:id
GROUP BY
  bp.id, bp.title, bp.content;
    `);
  }
}
