import "reflect-metadata";
import express from "express";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from "typeorm";

import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from 'cors'

import HelloResolver from './modules/hello.resolver';
import { RegisterResolver } from "./modules/register.resolver";
import { LoginResolver } from "./modules/login.resolver";
import { MeResolver } from "./modules/me.resolver";
import { ConfirmEmailResolver } from "./modules/confirmEmail.resolver";


const RedisStore = connectRedis(session);

const main = async () => {


  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      MeResolver,
      RegisterResolver,
      LoginResolver,
      ConfirmEmailResolver
    ],
    authChecker: (
      { context: { req } }
    ) => {

      return !!req.session!.userId;
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:40001"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "Thi is recret key 123456798ABCDE",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(40000, () => {
    console.log("server started on http://localhost:40000/graphql");
  });
};

main();
