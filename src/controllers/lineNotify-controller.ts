import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export class LineNotifyController {
  login(request: Request, response: Response, next: NextFunction) {
    const state = 'state';
    response.redirect(`https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${process.env['LINE_NOTIFY_CLIENT_ID']}&redirect_uri=${process.env['LINE_NOTIFY_CALLBACK_URL']}&scope=notify&state=${state}`);
  }

  getAccessToken(request: Request, response: Response, next: NextFunction) {
    axios.post(`https://notify-bot.line.me/oauth/token?grant_type=authorization_code&code=${request.query.code}&redirect_uri=${process.env['LINE_NOTIFY_CALLBACK_URL']}&client_id=${process.env['LINE_NOTIFY_CLIENT_ID']}&client_secret=${process.env['LINE_NOTIFY_CLIENT_SECRET']}`)
      .then(function (res) {
        process.env['LINE_ACCESS_TOKEN'] = res.data.access_token;
        console.log(process.env['LINE_ACCESS_TOKEN']);
        return response.send(res.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendMessage(request: Request, response: Response, next: NextFunction) {
    const formData = new URLSearchParams();
    formData.append('message', '測試推播');

    axios({
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: { Authorization: `Bearer pdXgIWpy4EwvpxoKrEVLm31UcvZ5d04P2BG1RJfynvY` },
      data: formData,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}