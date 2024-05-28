import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const router = express.Router();

const ADMIN_AUTH_API_LOGIN_URL = process.env.ADMIN_AUTH_API_LOGIN_URL;
const ADMIN_AUTH_API_TEST_URL = process.env.ADMIN_AUTH_API_TEST_URL;
const ADMIN_AUTH_API_USER_CREATION_URL =
  process.env.ADMIN_AUTH_API_USER_CREATION_URL;

/*
Login Route
Returns jwt token and role claim on success
*/
router.post("/login", async (req: Request, res: Response) => {
  if (!ADMIN_AUTH_API_LOGIN_URL) {
    res.status(500).send("Authentication API URL not configured");
    return;
  }

  try {
    // Forward the login request to the authentication API server
    const apiResponse = await axios({
      method: "post",
      url: ADMIN_AUTH_API_LOGIN_URL,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Connection: "close",
      },
      timeout: 10000,
    });

    res.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send("Authentication service is unreachable");
      }
    } else {
      res.status(500).send("Internal server error");
    }
  }
});

/*
User Creation Route
*/
router.post("/users", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization; // Capture the Authorization header from the incoming request

  // Check if the Authorization header is present
  if (!authHeader) {
    res
      .status(401)
      .send("Action not authorized. No authorization token provided.");
    return;
  }

  if (!ADMIN_AUTH_API_USER_CREATION_URL) {
    res.status(500).send("User creation API URL not configured");
    return;
  }

  try {
    // Forward the request to the user creation API server
    const apiResponse = await axios({
      method: "post",
      url: ADMIN_AUTH_API_USER_CREATION_URL,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader, // Forward the Authorization header
        Connection: "close",
      },
      timeout: 10000,
    });

    // Send the exact response from the user creation API back to the original client
    res.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Forward the status code and response from the user creation API if the request failed
        res.status(error.response.status).send(error.response.data);
      } else {
        // Handle network errors or no response received
        res.status(500).send("User creation service is unreachable");
      }
    } else {
      // Handle any other errors that may have occurred during the request
      res.status(500).send("Internal server error");
    }
  }
});

/*
Troll Endpoint :D
*/
router.get("/ping", async (req: Request, res: Response) => {
  if (!ADMIN_AUTH_API_TEST_URL) {
    res.status(500).send("Authentication API URL not configured");
    return;
  }

  try {
    // Forward the login request to the authentication API server
    const apiResponse = await axios({
      method: "get",
      url: ADMIN_AUTH_API_TEST_URL,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        Connection: "close",
      },
      timeout: 10000,
    });

    res.status(apiResponse.status).send(apiResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send("OOPS your ping didnt pong too bad!!");
      }
    } else {
      res.status(500).send("OOPS your ping didnt pong too bad!!");
    }
  }
});

export default router;
