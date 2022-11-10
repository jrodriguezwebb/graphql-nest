import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

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

  @Query(() => Int, { description: 'From Zero to argument TO' })
  getRandomRumberFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
