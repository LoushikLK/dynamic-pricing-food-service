export {};

//////////////////////////////////////////////////////// CREATE ORGANIZATION //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/organization:
 *   post:
 *     summary: Create a new organization
 *     description: Create a new organization with required name
 *     tags:
 *       - Organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the organization (required)
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
 *                   example: Organization created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           description: The ID of the created organization
 *                           example: 123
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

////////////////////////////////////////////////////// GET ORGANIZATIONS BY ID //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/organization/{id}:
 *   get:
 *     summary: Get organization by ID
 *     description: Retrieve organization information by its ID
 *     tags:
 *       - Organization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the organization to retrieve
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
 *                   example: Organization retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: The retrieved organization object
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
 *                   example: Organization not found
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

///////////////////////////////////////////////////// GET ALL ORGANIZATIONS //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/organization:
 *   get:
 *     summary: Get organizations with optional query parameters
 *     description: Retrieve a list of organizations with optional pagination, searching, and sorting
 *     tags:
 *       - Organization
 *     parameters:
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *         description: Number of organizations per page
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: number
 *         description: Page number to retrieve
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter organizations
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort organizations by
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
 *                   example: Organizations retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       description: Array of organization objects
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

/////////////////////////////////////////////////////// UPDATE ORGANIZATION //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/organization:
 *   patch:
 *     summary: Update organization
 *     description: Update organization information with required name
 *     tags:
 *       - Organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the organization (required)
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
 *                   example: Organization updated successfully
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

///////////////////////////////////////////////////////// DELETE ORGANIZATION //////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/v1/organization/{id}:
 *   delete:
 *     summary: Delete organization by ID
 *     description: Delete organization information by its ID
 *     tags:
 *       - Organization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the organization to delete
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
 *                   example: Organization deleted successfully
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
 *                   example: Organization not found
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
