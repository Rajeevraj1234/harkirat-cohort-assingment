import express, { Request, Response } from "express";
const router = express.Router();
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const validateTodo = z.object({
  title: z.string(),
  description: z.string(),
  done: z.string().optional(),
});

interface todo {
  title: string;
  description: string;
  userId: number;
}

router.post("/makeTodo/:userId", async (req: Request, res: Response) => {
  const { success } = validateTodo.safeParse(req.body);
  try {
    const { userId } = req.params;
    if (!success) {
      res.status(400).json({
        msg: "Invalid Input",
      });
    }

    const todoData: todo = {
      title: req.body.title,
      description: req.body.description,
      userId: Number(userId),
    };
    await prisma.todo.create({
      data: todoData,
    });
    res.status(200).json({
      msg: "Todo created !!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

router.get("/getTodo/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await prisma.todo.findMany({
      where: { userId: Number(userId) },
    });

    res.status(200).json({
      todo: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

export default router;
