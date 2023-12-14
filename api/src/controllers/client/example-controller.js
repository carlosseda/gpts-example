const db = require('../../models')
const Example = db.Example
const Op = db.Sequelize.Op

exports.findAll = async (req, res) => {

  Example.findAll({
    order: [['createdAt', 'ASC']]
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
