import express, { urlencoded } from "express";
const app = express();
import userRoute from "./userRoute";
import todoRoute from "./todoRoute";
import cors from "cors";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
