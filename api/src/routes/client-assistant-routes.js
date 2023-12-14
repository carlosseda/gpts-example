module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/client/assistant-controller.js')

  // router.get('/', [authJwt.verifyUserToken], controller.findAll)
  // router.get('/:id', [authJwt.verifyUserToken], controller.findOne)

  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)

  app.use('/api/client/assistants', router)
}
