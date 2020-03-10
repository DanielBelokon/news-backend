const express = require("express");
const router = express.Router();
// Import article middleware index //NOT IMPLEMENTED
const articleMiddleware = require("../middleware/article/articleService");
//Authorization module to check if user logged in //NOT IMPLEMENTED
const isAuthenticated = require("../middleware/auth").userController.isAuthenticated; 
// Article CRUD

// GET /ARTICLE/ID
// READ a specific article from the DB
router.get('/:id', articleMiddleware.get);

// GET /ARTICLE
// READ all the articles in the DB
router.get('/', isAuthenticated, articleMiddleware.getAll);

// POST /ARTICLE
// CREATE a single article
router.post('/', isAuthenticated, articleMiddleware.create);

// PUT /ARTICLE/ID
// UPDATE a specific article from DB
router.put('/:id', isAuthenticated, articleMiddleware.update);

// DELETE /ARTICLE/ID
// DELETE a specific article from DB
router.delete('/:id', isAuthenticated, articleMiddleware.deleteArticle);

module.exports = router;