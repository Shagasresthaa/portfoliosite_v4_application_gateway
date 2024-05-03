import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

// Middleware to check JWTs
const checkJwt = (req: Request, res: Response, next: Function) => {
  // Implementation of JWT check here
  next();
};

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from the Dynamic Gateway!');
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
