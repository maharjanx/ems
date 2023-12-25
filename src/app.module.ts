import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BlogpostModule } from "./core/blogpost/blogpost.module";
import { CatagoriesModule } from "./core/catagories/catagories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogpostCatagoryModule } from "./core/blogpost-catagory/blogpost-catagory.module";

//// import { importAllModule } from "./utils/utils";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 3000,
      username: "postgres",
      password: "0000",
      database: "blog_post",
      autoLoadEntities: true,
      synchronize: true,
    }),
    // ...importAllModule(),
    BlogpostModule,
    BlogpostCatagoryModule,
    CatagoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor() {
  //   console.log(...importAllModule());
  // }
}
