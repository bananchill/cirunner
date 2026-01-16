import { Effect, Layer } from "effect";
import { HttpServer, HttpRouter } from "@effect/platform";
import { NodeHttpServer } from "@effect/platform-node";
import { PgClient } from "@effect/sql-pg";

const DatabaseLive = PgClient.layer({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "cirunner",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

const ServerLive = NodeHttpServer.layer({
  port: Number(process.env.PORT) || 3001,
});

const HealthRoute = HttpRouter.empty.pipe(
  HttpRouter.get(
    "/health",
    HttpServer.response.json({ status: "ok", service: "backend" })
  ),
  HttpRouter.get(
    "/api",
    HttpServer.response.json({ message: "Backend API is running" })
  )
);

const Server = HttpServer.serve(HealthRoute);

const program = Effect.gen(function* () {
  const server = yield* Server;
  yield* Effect.log(
    `Backend server running on http://localhost:${server.address.port}`
  );
  yield* Effect.never;
});

const MainLive = Layer.mergeAll(ServerLive, DatabaseLive);

const runnable = Effect.provide(program, MainLive);

Effect.runPromise(runnable).catch(console.error);
