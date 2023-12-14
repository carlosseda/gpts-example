const OpenAI = require('../../utils/OpenAI')
const db = require('../../models')
const Customer = db.Customer
const Op = db.Sequelize.Op

exports.findAll = async (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit
  const whereStatement = {}
  whereStatement.onService = true
  for (const key in req.query) {
    if (req.query[key] != '' && key != 'page' && key != 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }
  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}
  Customer.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}
