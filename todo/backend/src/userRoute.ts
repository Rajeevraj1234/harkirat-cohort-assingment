import express from "express";
const router = express.Router();
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const signupValidate = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

router.get("/signup", async (req, res) => {
  try {
    const { success } = signupValidate.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        msg: "Invalid Input",
      });
    }

    await prisma.user.create({
      data: {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      },
    });
    res.status(200).json({
      msg: "Signup Successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

const signinValidate = z.object({
  username: z.string(),
  password: z.string(),
});

router.get("/signin", async (req, res) => {
  try {
    const { success } = signinValidate.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "Invalid Input",
      });
    }

    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (user?.password !== req.body.password) {
      return res.status(400).json({
        msg: "Incorrect username or password",
      });
    }
    res.status(200).json({
      msg: "Login Successfull",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});

export default router;
