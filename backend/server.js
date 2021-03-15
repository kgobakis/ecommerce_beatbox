import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app = express();
// Parsing JSON data middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL ||
    "mongodb+srv://kostas:rlhnkfl1@cluster0.gw7yj.mongodb.net/beatbox_shop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Error catcher using express-async-handler middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at localhost:${port}`);
});
