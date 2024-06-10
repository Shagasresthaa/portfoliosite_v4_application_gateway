import express from "express";
import adminRoutes from "./routes/adminRoutes";
import dotenv from "dotenv";
import cors from "cors";
import { CorsOptions } from "cors";
// To be enabled once implemented
// import userRoutes from './routes/userRoutes';
// import authenticationManagerRoutes from './routes/authenticationManagerRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3001"];

// CORS configuration
const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware to parse JSON bodies and cors setting
app.use(express.json());
app.use(cors(corsOptions));

// Register route handlers
app.use("/admin", adminRoutes);
// To be enabled once implemented
// app.use("/users", userRoutes);
// app.use("/auth", authenticationManagerRoutes);

app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
