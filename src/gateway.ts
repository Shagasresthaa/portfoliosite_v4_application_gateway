import express from "express";
import adminRoutes from "./routes/adminRoutes";
import dotenv from "dotenv";
//To be enabled once implemented
//import userRoutes from './routes/userRoutes';
//import authenticationManagerRoutes from './routes/authenticationManagerRoutes';

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

dotenv.config();

// Register route handlers
app.use("/admin", adminRoutes);
//To be enabled once implemented
//app.use("/users", userRoutes);
//app.use("/auth", authenticationManagerRoutes);

app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
