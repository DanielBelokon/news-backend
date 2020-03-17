const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
// Import article middleware index //NOT IMPLEMENTED
const articleMiddleware = middleware.articleService;
//Authorization module to check if user logged in //NOT IMPLEMENTED
const isAuthenticated = middleware.userService.isAuthenticated; 
// Article CRUD

// GET /ARTICLE/ID
// READ a specific article from the DB
router.get('/id=:id', articleMiddleware.get);

// GET /ARTICLE
// READ all the articles in the DB
router.get('/:page.:count?', articleMiddleware.getAll);

// POST /ARTICLE
// CREATE a single article
router.post('/', isAuthenticated(), articleMiddleware.create);

// PUT /ARTICLE/ID
// UPDATE a specific article from DB
router.put('/:id', isAuthenticated(), articleMiddleware.update);

// DELETE /ARTICLE/ID
// DELETE a specific article from DB
router.delete('/:id', isAuthenticated(), articleMiddleware.deleteArticle);

module.exports = router;