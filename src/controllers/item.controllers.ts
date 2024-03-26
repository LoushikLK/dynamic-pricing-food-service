import { ItemType } from "@prisma/client";
import {
  createItem,
  deleteItem,
  findItemById,
  getItems,
  updateItem,
} from "../services/item.services";
import { RequestHandler } from "../types";

export const ItemController: {
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
  getById: RequestHandler;
  getAll: RequestHandler;
} = {
  create: async (req, res, next) => {
    try {
      const { type, description } = req.body;

      await createItem({ type, description });

      res.status(201).json({
        msg: "Item created",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const { type, description } = req.body;

      await updateItem({ type, id: +id, description });

      res.status(200).json({
        msg: "Item updated",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      await deleteItem({ id: +id });

      res.status(200).json({
        msg: "Item deleted",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const organization = await findItemById(+id);

      res.status(200).json({
        msg: "Item fetched",
        success: true,
        data: {
          data: organization,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { perPage, pageNo, type, sortBy } = req.query;

      const { data, total } = await getItems({
        pageNo: pageNo ? +pageNo : 1,
        perPage: perPage ? +perPage : 10,
        type: type ? (type.toString() as ItemType) : undefined,
        sortBy: sortBy ? sortBy.toString() : "createdAt",
      });

      res.status(200).json({
        msg: "Item fetched",
        success: true,
        data: {
          data,
          total,
          perPage: perPage ? +perPage : 10,
          pageNo: pageNo ? +pageNo : 1,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
