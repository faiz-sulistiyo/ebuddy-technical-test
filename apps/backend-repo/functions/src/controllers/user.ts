import {Request, Response} from "express";
import {BaseResponse, RequestQueryParams, User} from "@ebuddy/types";
import {
  countUsersDB,
  createUserDB,
  deleteUserDB,
  getUsersDB,
  updateUserDB,
} from "../repositories/user";

export const getUsers = async (
  req: Request<
    Record<string, never>,
    BaseResponse<User[]>,
    Record<string, never>,
    RequestQueryParams
  >,
  res: Response<BaseResponse<User[]>>,
) => {
  try {
    const {page, limit} = req.query;
    const currentPage = Number(page ?? 1);
    const currentLimit = Number(limit ?? 10);

    const users = await getUsersDB(currentPage, currentLimit);
    const count = await countUsersDB();

    res.status(200).json({
      data: users,
      meta: {
        pagination: {
          page: currentPage,
          limit: currentLimit,
          totalItem: count,
        },
      },
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({message: "Error retrieving users", error});
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const data = await updateUserDB(req.params.userId, req.body);
  res.status(200).json({message: "User updated successfully", data});
};

export const createUser = async (req: Request, res: Response) => {
  const data = await createUserDB(req.body);
  res.status(201).json({message: "User created successfully", data});
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserDB(req.params.userId);
  res.status(204).json({message: "User deleted successfully"});
};
