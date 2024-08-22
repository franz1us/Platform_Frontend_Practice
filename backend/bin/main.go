package main

import (
	"backend/routes"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	// Initialize Redis and MongoDB
	utils.InitRedis()
	utils.InitMongoDB()

	// Initialize Fiber application
	app := fiber.New()

	// Set up routes
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000", // Allow your frontend's origin
		AllowMethods:     "GET, POST, HEAD, PUT, DELETE, PATCH, OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true, // Enable this if you are dealing with credentials (e.g., cookies, authorization headers)
	}))

	routes.Setup(app)

	// Start server on port 4000
	err := app.Listen(":4000")
	if err != nil {
		panic(err)
	}
}
