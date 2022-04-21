import express, { Router, Request, Response, NextFunction } from 'express';
import { LineNotifyController } from '../controllers/lineNotify-controller';

const lineNotifyController = new LineNotifyController;

export class LineNotifyRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/login', lineNotifyController.login);
    this.router.get('/get_access_token', lineNotifyController.getAccessToken);
    this.router.get('/message', lineNotifyController.sendMessage)
  }
}