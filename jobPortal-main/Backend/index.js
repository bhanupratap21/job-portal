import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

// Load environment variables
dotenv.config();

const app = express();

// console.log("MONGO_URI from env:", process.env.MONGO_URI);
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:5173", 
//   credentials: true,
// };
// app.use(cors(corsOptions));

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-8ro2.vercel.app",
  "https://job-portal-bhanu.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);



// Start the server
const PORT = process.env.PORT || 3000;

app.get("/test-cookie", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// "http://localhost:8000/api/v1/user/register"

http: app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
