module.exports = (app, upload) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/admin/image-configuration-controller.js')

  router.post('/', [authJwt.verifyUserToken], controller.create)
  router.put('/:id', [authJwt.verifyUserToken], controller.update)
  router.delete('/:id', [authJwt.verifyUserToken], controller.delete)

  app.use('/api/admin/image-configurations', router)
}
