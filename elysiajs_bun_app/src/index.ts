import { Elysia } from "elysia";

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .get("/api/v1/hello-world", () => {
        return {
            message: "Hello World",
        };
    })
    .get("/api/v1/users", () => {
        //  todo: add users response here
        return {
            message: "Hello World",
        };
    })
    .get("/api/v1/jwt", () => {
        //  todo: add jwt code here
        return {
            message: "Hello World",
        };
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
