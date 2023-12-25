import { BlogpostService } from "./blogpost.service";
import { CreateBlogpostDto } from "./dto/create-blogpost.dto";
import { UpdateBlogpostDto } from "./dto/update-blogpost.dto";
export declare class BlogpostController {
    private blogpostService;
    constructor(blogpostService: BlogpostService);
    createBlog(createBlogpostDto: CreateBlogpostDto): Promise<import("./entities/blogpost.entity").BlogPost>;
    findAll(): Promise<import("./entities/blogpost.entity").BlogPost[]>;
    findOneByid(id: number): Promise<import("./entities/blogpost.entity").BlogPost>;
    update(id: number, updateBlogPostDto: UpdateBlogpostDto): Promise<string>;
    remove(id: number): Promise<string>;
}
