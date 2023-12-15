module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/client/chat-controller.js')

  // router.get('/', [authJwt.verifyUserToken], controller.findAll)
  router.get('/', controller.findAll)


  app.use('/api/client/chats', router)
}
