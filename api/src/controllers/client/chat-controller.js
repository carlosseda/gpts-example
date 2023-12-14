const OpenAI = require('../../utils/OpenAI')
const db = require('../../models')
const Chat = db.Chat
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    const data = await Customer.create(req.body)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Algún error ha surgido al insertar el dato.',
      errors: error.errors
    })
  }
}

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

exports.findOne = (req, res) => {
  const id = req.params.id
  Customer.findByPk(id).then(data => {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  })
}
