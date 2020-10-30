const Router = require("express");
const userService = require("../middleware").userService;
const isAuthenticated = userService.isAuthenticated;
const register = userService.register;
const login = userService.login;
const router = Router.Router();

// User login
router.get('/login', (req, res) => {
  return res.send('Received a GET HTTP method');
});

// User login post
// POST /AUTH/LOGIN
// Body: username, password
router.post('/login', login);

// authentication check
router.post('/protected', isAuthenticated(), (req, res) => { res.send("Success") });

// Get info about a user from the database
// GET /AUTH/{userId}
router.get('/:id', isAuthenticated(), (req, res) => {
  return res.send('Received a GET HTTP method ' + req.params.id);
});

// Update a user from the database
// PUT /AUTH/{userId}
router.put('/:id', isAuthenticated(), (req, res) => {
  return res.send('Received a PUT HTTP method');
});

// Delete a user from the database
// DELETE /AUTH/{userId}
router.delete('/:id', isAuthenticated(), (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

// Register new user
// POST /AUTH/REGISTER
// Body: user, password, email
router.post("/register", isAuthenticated(), register);

module.exports = router;