import { ItemType } from "@prisma/client";
import {
  createPricing,
  deletePricing,
  findPricingById,
  getAllPricing,
  updatePricing,
} from "../services/price.services";
import { RequestHandler } from "../types";

export const PricingController: {
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
  getById: RequestHandler;
  getAll: RequestHandler;
} = {
  create: async (req, res, next) => {
    try {
      const {
        organizationId,
        itemId,
        baseDistanceInKM,
        pricePerKM,
        zone,
        fixPrice,
      } = req.body;

      await createPricing({
        organizationId,
        itemId,
        baseDistanceInKM,
        pricePerKM,
        zone,
        fixPrice,
      });

      res.status(201).json({
        msg: "Pricing created",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        organizationId,
        itemId,
        baseDistanceInKM,
        pricePerKM,
        zone,
        fixPrice,
      } = req.body;

      await updatePricing({
        organizationId,
        itemId,
        baseDistanceInKM,
        pricePerKM,
        zone,
        fixPrice,
        id: +id,
      });

      res.status(200).json({
        msg: "Pricing updated",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      await deletePricing({ id: +id });

      res.status(200).json({
        msg: "Pricing deleted",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const pricing = await findPricingById(+id);

      res.status(200).json({
        msg: "Pricing fetched",
        success: true,
        data: {
          data: pricing,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const {
        perPage,
        pageNo,
        search,
        sortBy,
        itemId,
        organizationId,
        itemType,
      } = req.query;

      const { data, total } = await getAllPricing({
        pageNo: pageNo ? +pageNo : 1,
        perPage: perPage ? +perPage : 10,
        search: search ? search.toString() : "",
        sortBy: sortBy ? sortBy.toString() : "createdAt",
        itemId: itemId ? +itemId : undefined,
        organizationId: organizationId ? +organizationId : undefined,
        itemType: itemType ? (itemType.toString() as ItemType) : undefined,
      });

      res.status(200).json({
        msg: "Pricing fetched",
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
