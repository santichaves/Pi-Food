const { Router } = require('express');
const dietRouter = require('./DietReoutes');
const recipeRouter = require ('./RecipeRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

mainRouter.use('/recipe', recipeRouter)
mainRouter.use('/diet', dietRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = mainRouter;
