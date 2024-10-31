# Open Store

Open Store is a Node.js project built with Express.js, designed to provide a RESTful API for managing an online store. This project includes functionalities for handling products, categories, orders, and users, with PostgreSQL as the database and Sequelize as the ORM.

## Project Structure

```
.editorconfig
.env
.env.example
.eslintrc.json
.gitignore
.sequelizerc
api/
	config/
		config.js
	db/
		config.js
		migrations/
		models/
		seeders/
	index.js
	libs/
		sequelize.js
	middlewares/
		auth.handler.js
		error.handler.js
		validator.handler.js
	routes/
		auth.router.js
		categories.router.js
		customers.router.js
		index.js
		orders.router.js
		products.router.js
		profile.router.js
	schemas/
	services/
	utils/
docker-compose.yml
package.json
postgres_data/
README.md
vercel.json
```

## Key Files and Directories

- **api/index.js**: Entry point of the application, sets up the Express app, middleware, and routes.
- **api/middlewares/**: Contains middleware functions for authentication, error handling, and validation.
- **api/routes/**: Defines route handlers for different API endpoints.
- **api/services/**: Service layer for business logic.
- **api/db/**: Database configuration, models, migrations, and seeders.
- **.sequelizerc**: Configuration for Sequelize ORM paths.
- **.env.example**: Example environment variables file.
- **package.json**: Project dependencies and scripts.

## API Endpoints

- **Products**: CRUD operations for products.
- **Orders**: CRUD operations for orders.
- **Users**: CRUD operations for users.
- **Categories**: CRUD operations for categories with role-based access control.
- **Auth**: Authentication routes.
- **Profile**: User profile-related routes.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in .env
4. Run the application: `npm run dev`.

## Courses Followed

- [Backend with Node.js](https://platzi.com/cursos/backend-nodejs/)
- [Backend with Node.js connecting to PostgreSQL](https://platzi.com/cursos/backend-nodejs-postgres/)
- [Backend with Node.js Passport.js and JWT](https://platzi.com/cursos/passport/)

This project is designed to handle various resources with proper validation, authentication, and error handling mechanisms and it's a very good template to start a new JavaScript project.
