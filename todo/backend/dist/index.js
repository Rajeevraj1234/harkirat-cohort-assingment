"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const userRoute_1 = __importDefault(require("./userRoute"));
const todoRoute_1 = __importDefault(require("./todoRoute"));
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/user", userRoute_1.default);
app.use("/todo", todoRoute_1.default);
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
