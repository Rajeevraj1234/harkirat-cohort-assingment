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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validateTodo = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    done: zod_1.z.string().optional(),
});
router.post("/makeTodo/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = validateTodo.safeParse(req.body);
    try {
        const { userId } = req.params;
        if (!success) {
            res.status(400).json({
                msg: "Invalid Input",
            });
        }
        yield prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                userId: Number(userId),
            },
        });
        res.status(200).json({
            msg: "Todo created !!",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
router.get("/getTodo/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield prisma.todo.findMany({
            where: { userId: Number(userId) },
        });
        res.status(200).json({
            todo: data,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
exports.default = router;
