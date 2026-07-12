import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import wishListRouter from "./routes/wishlist.route.js";
import catalogRouter from "./routes/catalog.route.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import orderRouter from "./routes/order.route.js";
const app = express();
app.use(morgan("dev"));
// app.use(cors({
//   credentials:true,
//   origin:"http://localhost:5173"
// }))
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    (_, __, profile, done) => {
      try {
        return done(null, profile);
      } catch (error) {}
      return done(error, null);
    },
  ),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/order", orderRouter);
app.use(globalErrorHandler);
export default app;
