import { Resolver, Query, Float } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float)
  getRandomNumber(): number {
    return Math.random() * 100;
  }
}
