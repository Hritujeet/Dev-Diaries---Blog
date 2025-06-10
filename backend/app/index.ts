import express, { Application, Request, Response } from 'express';
import cors from "cors"
import blogRouter from "./routes/blog"
import userRouter from "./routes/user"
import adminRouter from "./routes/admin"

const app: Application = express();
const PORT: number = 8000;
app.use(express.json());
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true // if you need cookies, authorization headers, etc.
}));

app.get('/', (req: Request, res: Response) => {
    res.json({ hello: 'world' });
});

app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/admin/jeet/devDiaries/1982", adminRouter)

app.listen(PORT, () => {
    console.log('App Running : Express');
});

export default app;
