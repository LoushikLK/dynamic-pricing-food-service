import { RequestHandler } from "../types";

export const PriceController: {
  checkPrice: RequestHandler;
} = {
  checkPrice: async (req, res, next) => {
    try {
      res.status(200).json({
        msg: "Price fetched successfully",
        success: true,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },
};
