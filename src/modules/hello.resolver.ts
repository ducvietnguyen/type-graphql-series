import {Resolver, Query, UseMiddleware } from "type-graphql";
import { isAuth } from "./middlewares/isAuth";

@Resolver()
class HelloResolver {

  // @Authorized()
  @UseMiddleware(isAuth)
  @Query(() => String, {name: 'sayHelloWorld', description:'This is the first function of the app'})
  async helloWorld() {
    return "Hello World!";
  }
}

export default HelloResolver;