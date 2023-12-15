module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/client/prompt-controller.js')

  // router.post('/', [authJwt.verifyUserToken], controller.create)
  // router.get('/', [authJwt.verifyUserToken], controller.findAll)

  router.post('/', controller.create)
  router.get('/:chatId', controller.findAll)

  app.use('/api/client/prompts', router)
}
