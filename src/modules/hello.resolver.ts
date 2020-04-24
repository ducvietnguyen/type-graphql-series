import {Resolver, Query } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String, {name: 'sayHelloWorld', description:'This is the first function of the app'})
  async helloWorld() {
    return "Hello World!";
  }
}

export default HelloResolver;