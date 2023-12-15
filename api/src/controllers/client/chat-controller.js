const db = require('../../models')
const Chat = db.Chat

exports.findAll = async (req, res) => {
  
  Chat.findAll({
    order: [['createdAt', 'DESC']]
  })
  .then(result => {
    //TODO ordenar por fecha

    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })

}
