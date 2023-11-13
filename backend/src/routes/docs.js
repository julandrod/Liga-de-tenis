/**
 * @swagger
 * /api/v1/auth/:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get all games
 *     parameters:
 *     - in: query
 *       name: filter
 *       schema:
 *         type: string
 *         format: string
 *       required: false
 *       description: Text to filter the list games, can be location, city or team
 *     - in: query
 *       name: date
 *       schema:
 *         type: string
 *         format: date
 *       required: false
 *       description: date to filter in format format Y-M-D (2023-10-25T00:00:00.000)
 *     - in: query
 *       name: time
 *       schema:
 *         type: string
 *         format: time
 *       required: false
 *       description: time time of the game in the format HH:MM (10:50)
 *     - in: query
 *       name: status
 *       schema:
 *         type: string
 *         format: enum
 *       required: false
 *       description: Status of the game, can be 'pending', 'done' or 'cancel'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
*/