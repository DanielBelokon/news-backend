# news-backend
![Node.js](https://github.com/DanielBelokon/news-backend/workflows/Node.js%20CI/badge.svg)

A simple backend server for a simple news website using Node.js with Express

## Structure

:file_folder: [**data**](src/data) - _The Data Access Layer, using [mongoose](https://github.com/Automattic/mongoose) for modeling and accessing mongoDB_

:file_folder: [**middleware**](src/middleware) - _The Domain layer, implementing functions which access the data layer, that are then used by the..._

:file_folder: [**routes**](src/routes) - _Application Layer, using express and express routes to provide the actual API access points_

:page_with_curl: [server.js](src/server.js) - _The main entry point, initializes express and sets up the first steps in the pipeline._





## API GUIDE:
### :newspaper: Article calls (/article)
- Get a specific article from the DB
```
GET /ARTICLE/{id}
```

- Get all the articles in the DB
```
GET /ARTICLE/{page}.{count}
```

- Create a single article
```
POST /ARTICLE
```

- Update a specific article from DB
```
PUT /ARTICLE/{id}
```

- Delete a specific article from DB
```
DELETE /ARTICLE/{id}
```

### :closed_lock_with_key: User Calls (/auth)

- User login post
```
POST /AUTH/LOGIN
Body: username, password
```

- Authentication check
```
POST /AUTH/PROTECTED
```

- Get info about a user from the database
```
GET /AUTH/{userId}
```

- Update a user from the database
```
PUT /AUTH/{userId}
```

- Delete a user from the database
```
DELETE /AUTH/{userId}
```

- Register new user
```
POST /AUTH/REGISTER
Body: user, password, email
```
