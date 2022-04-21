import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { LineNotifyRouter } from './routes/lineNotify-routing';

/** 取得 env */
dotenv.config()

const port = 3310;
const app = express();

/** routers */
const lineNotifyRouter = new LineNotifyRouter;

app.use(cors())
app.use('/line_notify', lineNotifyRouter.router);

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});