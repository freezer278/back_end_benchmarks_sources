import { Elysia } from "elysia";
import 'dotenv/config';
import {UsersRepository} from "./UsersRepository";
import jwt from 'jsonwebtoken';

const usersRepository = new UsersRepository();

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .get("/api/v1/hello-world", () => {
        return {
            message: "Hello World",
        };
    })
    .get("/api/v1/users", async () => {
        const allItemsCount: number = await usersRepository.count();
        const itemsToTake = 30;
        const startId = randomInt(1, allItemsCount - itemsToTake);

        const users = await usersRepository.getUsersAfterId(startId, itemsToTake);

        return {
            data: users,
        };
    })
    .get("/api/v1/jwt", () => {
        const PRIVATE_KEY = 'some_private_jwt_key_string';

        const userId = 321321;
        const currentTime = Math.floor(Date.now() / 1000);

        const payload = {
            iss: 'http://example.org',
            aud: 'http://example.com',
            iat: currentTime,
            exp: currentTime + 3600,
            sub: userId,
        };
        const algorithm = 'HS256';

        const token = jwt.sign(payload, PRIVATE_KEY, { algorithm });

        const decoded = jwt.verify(token, PRIVATE_KEY, { algorithms: [algorithm] });

        return {
            token,
            decoded,
        };
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


function randomInt(min: number, max: number) {
    return Math.ceil(Math.random() * (max - min) + min);
}