const OpenAIService = require('../../services/openai-service')
const db = require('../../models')
const Prompt = db.Prompt

exports.create = async (req, res) => {

  try {
    const openAI = await new OpenAIService()

    const chat = req.body.chatId ? await openAI.getChat(req.body.chatId) : await openAI.createChat(req.body)
    const [assistantAnswer, annotations] = await openAI.getAssistantAnswer(req.body.assistant, chat.thread, req.body.prompt)

    const data = await Prompt.create({
      chatId: chat.id,
      prompt: req.body.prompt,
      answer: assistantAnswer
    })

    data.resume = chat.resume
    data.annotations = annotations

    res.status(200).send(data)

  } catch (error) {

    res.status(500).send({
      message: error.message || 'Algún error ha surgido al insertar el dato.',
      errors: error.errors
    })
  }
}

exports.findAll = async (req, res) => {

  Prompt.findAll({
    where: {
      chatId: req.params.chatId
    }
  })
  .then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
