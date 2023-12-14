const dotenv = require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

module.exports = class OpenAI {
  constructor () {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })

    this.openai = new OpenAIApi(this.configuration)
    this.completion
  }

  async getAnswer () {
    try {
      if (this.completion.model === 'gpt-3.5-turbo') {
        const response = await this.openai.createChatCompletion(this.completion)

        return response.data.choices[0].message.content
      }

      if (this.completion.model === 'text-davinci-003') {
        const response = await this.openai.createCompletion(this.completion)
        return `${response.data.choices[0].text}`
      }
    } catch (error) {
      console.log(error)
    }
  }

  setCompletion (model, prompt) {
    switch (model) {
      case 'mysqlGenerator':

        this.completion = {
          model: 'text-davinci-003',
          prompt,
          temperature: 0.3,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        }

        break

      case 'resourceGenerator':

        this.completion = {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.3,
          max_tokens: 1500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        }

        break

      case 'singularize':

        this.completion = {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.3,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        }

        break
    }
  }

  extractCode (response) {
    const regex = /```([^```]+)```/g;
    const matches = response.match(regex);

    if (matches && matches.length > 0) {
      response = matches[0].replace(/```/g, '');
      return response
    }else{
      return response
    }
  }
}
