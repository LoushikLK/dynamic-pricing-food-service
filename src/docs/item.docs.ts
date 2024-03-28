export {};

////////////////////////////////////////////////////////////////// CREATE ITEM ///////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/item:
 *   post:
 *     summary: Create a new item
 *     description: Create a new item with optional description
 *     tags:
 *       - Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the item (required)
 *                 required: true
 *               description:
 *                 type: string
 *                 description: Optional description of the item
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
 *                   example: Item created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: The ID of the created item
 *                       example: 1
 *       400:
 *         description: Bad Request
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
 *                   example: Bad Request
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

////////////////////////////////////////////////////////////////// GET ITEM BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/item/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve item information by its ID
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item retrieved successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: The retrieved item object
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item not found
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 *                 success:
 *                   type: boolean
 *                   example: false
 */

////////////////////////////////////////////////////////////////// GET ALL ITEMS //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/item:
 *   get:
 *     summary: Get items with optional query parameters
 *     description: Retrieve a list of items with optional pagination, filtering, and sorting
 *     tags:
 *       - Item
 *     parameters:
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *         description: Number of items per page
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: number
 *         description: Page number to retrieve
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [PERMISSIBLE, NONPERMISSIBLE]
 *         description: Type of item (PERMISSIBLE or NONPERMISSIBLE)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort items by
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Items retrieved successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       description: Array of item objects
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Invalid query parameters
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 *                 success:
 *                   type: boolean
 *                   example: false
 */

////////////////////////////////////////////////////////////////// UPDATE ITEM BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/item/{id}:
 *   patch:
 *     summary: Update item by ID
 *     description: Update item information by its ID with optional parameters
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the item
 *               description:
 *                 type: string
 *                 description: Description of the item
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item updated successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item not found
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 *                 success:
 *                   type: boolean
 *                   example: false
 */

////////////////////////////////////////////////////////////////// DELETE ITEM BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/item/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Delete item information by its ID
 *     tags:
 *       - Item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item deleted successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Item not found
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Internal Server Error
 *                 success:
 *                   type: boolean
 *                   example: false
 */
