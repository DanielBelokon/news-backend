const Router = require("express");
const userService = require("../middleware").userService;
const isAuthenticated = userService.isAuthenticated;
const register = userService.register;
const login = userService.login;
const router = Router.Router();

// User login page
router.get('/login', (req, res) => {
    return res.send('Received a GET HTTP method');
  });

// User login post
router.post('/login', login);

//
router.get('/:id', isAuthenticated(), (req, res) => {
    return res.send('Received a GET HTTP method ' + req.params.id);
  });

router.put('/:id', isAuthenticated(), (req, res) => {
return res.send('Received a PUT HTTP method');
});

router.delete('/:id', isAuthenticated(), (req, res) => {
return res.send('Received a DELETE HTTP method');
});

router.post("/register", register);

module.exports = router;