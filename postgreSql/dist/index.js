"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.findMany({});
    console.log(res);
});
const insertData = (email, firstName, lastName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password,
        },
    });
    console.log(res);
});
const updateData = (email, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.update({
        where: { email },
        data: {
            firstName,
        }
    });
    console.log(res);
    fetchData();
});
// insertData('luffy@onepience.com','monkey D','luffy','luffy1234');
// updateData('luffy@onepience.com','Monkey D');
// fetchData();
const insertTodo = (title, description, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todos.create({
        data: {
            title,
            description,
            user_id,
        }
    });
    console.log(res);
});
const getUserAndTodos = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todos.findMany({
        where: { user_id },
        select: {
            user: true,
            title: true,
            description: true,
        }
    });
    console.log(res);
});
getUserAndTodos(1);
// insertTodo('go to gym','heyy going to make you healthier', 1);
