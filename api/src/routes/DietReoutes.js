const {Router} = require('express');
const dietHandlers =require ('../handlers/dietHandler.js')

const dietRouter = Router();

dietRouter.get('/', dietHandlers )

module.exports= dietRouter;