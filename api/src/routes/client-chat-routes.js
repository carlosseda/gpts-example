module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/client/chat-controller.js')

  router.post('/', [authJwt.verifyUserToken], controller.create)
  router.get('/', [authJwt.verifyUserToken], controller.findAll)
  router.get('/:id', [authJwt.verifyUserToken], controller.findOne)

  app.use('/api/client/chats', router)
}
