import { HttpException } from "@nestjs/common";

export class PostNotFoundException extends HttpException {
  constructor(id?: number) {
    super(`post with id ${id} not found `, 404);
  }
}
