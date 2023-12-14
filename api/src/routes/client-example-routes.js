module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/client/example-controller.js')

  router.get('/', [authJwt.verifyUserToken], controller.findAll)

  app.use('/api/client/examples', router)
}
