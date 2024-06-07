import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../../helpers/generate.helper";

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if(existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!"
    });
    return;
  }

  const dataUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    token: generateRandomString(30),
  };

  const user = new User(dataUser);
  await user.save();

  const token = user.token;

  res.json({
    code: 200,
    message: "Đăng ký tài khoản thành công!",
    token: token
  });
};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const existUser = await User.findOne({
    email: email,
    deleted: false
  });

  if(!existUser) {
    res.json({
      code: 400,
      message: "Email không tồn tại!"
    });
    return;
  }

  if(md5(password) != existUser.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!"
    });
    return;
  }

  const token: string = existUser.token || "";

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token
  });
};