# Plandek Tech Test for Backend

1. Clone this repo
2. Ensure that you have the [requirements](#requirements) to run it
3. [Check](#checking-that-it-works) that it works properly
4. Do the [warm-up exercise](#warm-up-exercise)

## Requirements

To run this test we need:

- [node 14.x](https://nodejs.org/en/)
- [yarn 1.x](https://classic.yarnpkg.com/lang/en/) (although it could be changed to use an alternative like `npm`)

## Checking that it works

### Preparing the API to run

1. `yarn install`
2. `yarn type-check`: this will run the TypeScript compilation check
3. `yarn generate`: this will run the code generation for the GraphQL schema types
4. `yarn fix`: this will run `prettier` and `eslint`, which should run without any warnings
5. `yarn test`: this will run the test suite (`jest`)
6. `yarn dev`: this will run the API in <http://localhost:4002> (or a different port if it has been changed in the `.env` file).

### Checking the GraphQL connection

Opening <http://localhost:4002> in a browser with the API running should show the GraphQL Playground. On it, we can run the following query:

```graphql
query {
  ping
}
```

and check that everything goes ok.

## Warm-up exercise

Complete the resolver for `messageList` query in `src/api/modules/tech-test/resolvers.ts`. The schema is in `src/api/modules/tech-test/schema.graphql`, which describes what the query should return.

The tests in `src/api/modules/tech-test/__tests__/warmup-exercise.spec.ts` will guide you to the resolution. 

## Exercise 1

Read the exercise described in `src/api/modules/tech-test/schema.graphql`. Design the GraphQL query, types and inputs needed if any. Then implement the resolver in `src/api/modules/tech-test/resolvers.ts`.

The tests in `src/api/modules/tech-test/__tests__/exercise.spec.ts` will guide you to the resolution. 

## Exercise 2

Once the warmup exercise and the main exercise are completed and discussed with the interviewers, please ask about the second exercise, which will consist on a live-coding extension of Exercise 1.

