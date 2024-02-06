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
const signupValidate = zod_1.z.object({
    username: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z.string(),
});
router.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = signupValidate.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                msg: "Invalid Input",
            });
        }
        yield prisma.user.create({
            data: {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            }
        });
        res.status(200).json({
            msg: "Signup Successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
const signinValidate = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
router.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = signinValidate.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                msg: "Invalid Input",
            });
        }
        const user = yield prisma.user.findUnique({
            where: { username: req.body.username }
        });
        if ((user === null || user === void 0 ? void 0 : user.password) !== req.body.password) {
            return res.status(400).json({
                msg: "Incorrect username or password"
            });
        }
        res.status(200).json({
            msg: "Login Successfull"
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
exports.default = router;
