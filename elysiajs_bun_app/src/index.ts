import { Elysia } from "elysia";
import 'dotenv/config';
import {UsersRepository} from "./UsersRepository"; // Automatically loads variables from .env

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .get("/api/v1/hello-world", () => {
        return {
            message: "Hello World",
        };
    })
    .get("/api/v1/users", async () => {
        const usersRepository = new UsersRepository();

        const allItemsCount: number = await usersRepository.count();
        const itemsToTake = 30;
        const startId = randomInt(1, allItemsCount - itemsToTake);

        const users = await usersRepository.getUsersAfterId(startId, itemsToTake);

        return {
            data: users,
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


function randomInt(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
}