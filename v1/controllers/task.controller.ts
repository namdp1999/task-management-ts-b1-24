import { Request, Response } from "express";
import Task from "../models/task.model";

// [GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }

  const find: Find = {
    deleted: false
  }

  if(req.query.status) {
    find["status"] = `${req.query.status}`;
  }

  // Sắp xếp
  const sort: any = {};

  if(req.query.sortKey && req.query.sortValue) {
    sort[`${req.query.sortKey}`] = `${req.query.sortValue}`;
  }
  // Hết Sắp xếp

  // Phân trang
  const pagination = {
    limit: 2,
    page: 1
  };

  if(req.query.page) {
    pagination.page = parseInt(`${req.query.page}`);
  }

  if(req.query.limit) {
    pagination.limit = parseInt(`${req.query.limit}`);
  }

  const skip = (pagination.page - 1) * pagination.limit;
  // Hết Phân trang

  // Tìm kiếm
  if(req.query.keyword) {
    const regex: RegExp = new RegExp(`${req.query.keyword}`, "i");
    find["title"] = regex;
  }
  // Hết Tìm kiếm

  const tasks = await Task
    .find(find)
    .sort(sort)
    .limit(pagination.limit)
    .skip(skip);

  res.json(tasks);
}

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  
  res.json(task);
}

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;

    await Task.updateOne({
      _id: id
    }, {
      status: status
    });

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  } catch (error) {
    // console.log(error);
    res.json({
      code: 400,
      message: "Không tồn tại bản ghi!"
    });
  }
};