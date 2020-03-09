const Router = require("express");
const IsAuthenticated = require("../middleware/auth/userController").isAuthenticated;
const router = Router.Router();

// User login page
router.get('/login', (req, res) => {
    return res.send('Received a GET HTTP method');
  });

// User login post
router.post('/login', (req, res) => {
return res.send('Received a POST HTTP method');
});

//
router.get('/:id', IsAuthenticated, (req, res) => {
    return res.send('Received a GET HTTP method ' + req.params.id);
  });

router.put('/:id', IsAuthenticated, (req, res) => {
return res.send('Received a PUT HTTP method');
});

router.delete('/:id', IsAuthenticated, (req, res) => {
return res.send('Received a DELETE HTTP method');
});

module.exports = router;