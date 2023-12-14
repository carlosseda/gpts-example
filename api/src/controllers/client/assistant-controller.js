const OpenAI = require('../../utils/OpenAI')
const db = require('../../models')
const Assistant = db.Assistant

exports.findAll = async (req, res) => {
 
  Assistant.findAll({
    order: [['name', 'ASC']]
  })
  .then(result => {
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

