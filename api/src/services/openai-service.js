const dotenv = require('dotenv').config()
const OpenAI = require('openai')
const db = require('../models')
const Chat = db.Chat

module.exports = class OpenAIService {

  constructor () {

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    this.completion
  }

  async createChat (data) {

    try {
      const thread = await this.openai.beta.threads.create();    
      data.thread = thread.id
  
      const response = await this.openai.chat.completions.create({
        messages: [{ 
          role: "user", content: `Haz un resumen, máximo cinco palabras, del siguiente texto y no acabes con .: ${data.prompt}`
        }],
        model: "gpt-3.5-turbo",
      });

      data.resume = response.choices[0].message.content

      const chat = await Chat.create(data)

      return chat

    }catch(error){
      console.log(error)
    }
  }

  async getChat (chatId) {
    try{
      const chat = await Chat.findByPk(chatId)
      return chat
    }catch{
      console.log(error)
    }
  }

  async getAssistantAnswer (assistantReference, thread, prompt) {

    try {

      await this.openai.beta.threads.messages.create(
        thread,
        { role: "user", content: prompt }
      );

      const run = await this.openai.beta.threads.runs.create(
        thread,
        { 
          assistant_id: assistantReference,
        }
      );

      return new Promise((resolve, reject) => {

        let intervalId = setInterval(async () => {

          try {
            const state = await this.openai.beta.threads.runs.retrieve(thread, run.id);
            console.log(state.status);

            if (state.status === 'completed') {
              
              clearInterval(intervalId);
              await new Promise(resolve => setTimeout(resolve, 5000));
              
              const messages = await this.openai.beta.threads.messages.list(thread);
              
              resolve([
                messages.data[0].content[0].text.value, 
                messages.data[0].content[0].text.annotations
              ]);
            }

          } catch (error) {
            clearInterval(intervalId);
            reject(error);
          }

        }, 45000);

      });

    } catch (error) {
      console.log(error);
    }
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
