const Router = require("express");

const router = Router.Router();

function Authenticated(res, req, next)
{
    // If AUTH next ELSE Redirect /auth/login
    console.log("Authenticating...");
    next();
}

// User login page
router.get('/login', (req, res) => {
    return res.send('Received a GET HTTP method');
  });

// User login post
router.post('/login', (req, res) => {
return res.send('Received a POST HTTP method');
});

//
router.get('/:id', Authenticated, (req, res) => {
    return res.send('Received a GET HTTP method ' + req.params.id);
  });

router.put('/:id', Authenticated, (req, res) => {
return res.send('Received a PUT HTTP method');
});

router.delete('/:id', Authenticated, (req, res) => {
return res.send('Received a DELETE HTTP method');
});

module.exports = router;