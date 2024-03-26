import {
  createOrganization,
  deleteOrganization,
  findOrganizationById,
  getOrganizations,
  updateOrganization,
} from "../services/organization.services";
import { RequestHandler } from "../types";

export const OrganizationController: {
  create: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
  getById: RequestHandler;
  getAll: RequestHandler;
} = {
  create: async (req, res, next) => {
    try {
      const { name } = req.body;

      await createOrganization({ name });

      res.status(201).json({
        msg: "Organization created",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.id;

      const { name } = req.body;

      await updateOrganization({ name, id: +id });

      res.status(200).json({
        msg: "Organization updated",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.body;

      await deleteOrganization({ id });

      res.status(200).json({
        msg: "Organization deleted",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const organization = await findOrganizationById(+id);

      res.status(200).json({
        msg: "Organization fetched",
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
      const { perPage, pageNo, search, sortBy } = req.query;

      const { data, total } = await getOrganizations({
        pageNo: pageNo ? +pageNo : 1,
        perPage: perPage ? +perPage : 10,
        search: search ? search.toString() : "",
        sortBy: sortBy ? sortBy.toString() : "createdAt",
      });

      res.status(200).json({
        msg: "Organization fetched",
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
