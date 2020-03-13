# news-backend
![Node.js](https://github.com/DanielBelokon/news-backend/workflows/Node.js%20CI/badge.svg)

A simple backend server for a simple news website using Node.js with Express

### Structure

:file_folder: [**data**](src/data) - _The Data Access Layer, using [mongoose](https://github.com/Automattic/mongoose) for modeling and accessing mongoDB_

:file_folder: [**middleware**](src/middleware) - _The Domain layer, implementing functions which access the data layer, that are then used by the..._

:file_folder: [**routes**](src/routes) - _Application Layer, using express and express routes to provide the actual API access points_

:page_with_curl: [server.js](src/server.js) - _The main entry point, initializes express and sets up the first steps in the pipeline._
