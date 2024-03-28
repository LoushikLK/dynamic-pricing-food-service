export {};

////////////////////////////////////////////////////////// CREATE PRICING ///////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/price:
 *   post:
 *     summary: Create a new price
 *     description: Create a new price for an organization and item
 *     tags:
 *       - Price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationId:
 *                 type: integer
 *                 description: The ID of the organization (required)
 *               itemId:
 *                 type: integer
 *                 description: The ID of the item (required)
 *               zone:
 *                 type: string
 *                 description: The zone for the price
 *               baseDistanceInKM:
 *                 type: integer
 *                 description: The base distance in kilometers
 *               pricePerKM:
 *                 type: integer
 *                 description: The price per kilometer in cents
 *               fixPrice:
 *                 type: integer
 *                 description: The minimum fix price in cents
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Price created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: The ID of the created price
 *                           example: 123
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Unprocessable Entity - Invalid input data
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */

///////////////////////////////////////////////////////// GET PRICING BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/price/{id}:
 *   get:
 *     summary: Get price by ID
 *     description: Retrieve price information by its ID
 *     tags:
 *       - Price
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the price to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Price retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: The retrieved price object
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Price not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */

////////////////////////////////////////////////////// GET ALL PRICING //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/prices:
 *   get:
 *     summary: Get prices with optional query parameters
 *     description: Retrieve a list of prices with optional pagination, searching, sorting, and filtering
 *     tags:
 *       - Price
 *     parameters:
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of prices per page
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter prices
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort prices by
 *       - in: query
 *         name: itemId
 *         schema:
 *           type: integer
 *         description: Filter prices by item ID
 *       - in: query
 *         name: organizationId
 *         schema:
 *           type: integer
 *         description: Filter prices by organization ID
 *       - in: query
 *         name: itemType
 *         schema:
 *           type: string
 *         description: Filter prices by item type
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Prices retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       description: Array of price objects
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Invalid query parameters
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */

////////////////////////////////////////////////////////// UPDATE PRICING BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/price/{id}:
 *   patch:
 *     summary: Update price by ID
 *     description: Update price information by its ID
 *     tags:
 *       - Price
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the price to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationId:
 *                 type: integer
 *                 description: The ID of the organization
 *               itemId:
 *                 type: integer
 *                 description: The ID of the item
 *               baseDistanceInKM:
 *                 type: integer
 *                 description: The base distance in kilometers
 *               pricePerKM:
 *                 type: integer
 *                 description: The price per kilometer in cents
 *               zone:
 *                 type: string
 *                 description: The zone for the price
 *               fixPrice:
 *                 type: integer
 *                 description: The minimum fix price in cents
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Price updated successfully
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Price not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */

////////////////////////////////////////////////////////// DELETE PRICING BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/price/{id}:
 *   delete:
 *     summary: Delete price by ID
 *     description: Delete price information by its ID
 *     tags:
 *       - Price
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the price to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Price deleted successfully
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Price not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */

////////////////////////////////////////////////////////// GET DYNAMIC PRICING //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/price/calculate:
 *   post:
 *     summary: Calculate dynamic pricing
 *     description: Calculate dynamic pricing based on zone, organization ID, item type, and total distance
 *     tags:
 *       - Price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: The zone for pricing calculation
 *               organizationId:
 *                 type: integer
 *                 description: The ID of the organization
 *               itemType:
 *                 type: string
 *                 description: The type of the item
 *               totalDistance:
 *                 type: number
 *                 description: The total distance for pricing calculation
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Dynamic pricing calculated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         totalPrice:
 *                           type: number
 *                           description: The calculated total price
 *                           example: 5000
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Unprocessable Entity - Invalid input data
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 */
