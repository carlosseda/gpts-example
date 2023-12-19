import { API_URL } from '../config/config.js'

class LoginForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /*html*/`
      <style>

        :host{
          width: 15%;
        }

        .form-login-container{
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        } 

        h2{
          color: hsl(0, 0%, 100%);
          font-family: 'SoehneBuch' , sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          text-align: center;
        }

        form{
          width: 100%;
        }

        .form-element{
          margin-bottom: 1rem;
          width: 100%;
        }

        .form-element-label{
          margin-bottom: 0.5rem;
        }

        .form-element-label label{
          color: hsl(0, 0%, 100%);
          font-family: 'SoehneBuch' , sans-serif;
          font-size: 1rem;
          transition: color 0.5s;
        }

        .form-element-input{
          width: 100%;
        }

        .form-element-input input{
          background-color: transparent;
          border: none;
          border-bottom: 0.1rem solid  hsl(0, 0%, 100%);
          box-sizing: border-box;
          color: hsl(0, 0%, 100%);
          font-family: 'SoehneBuch' , sans-serif;
          font-weight: 600;
          padding: 0.2rem;
          width: 100%;
        }

        .form-submit{
          background-color: hsl(0, 0%, 100%);
          border-radius: 1em;
          border: 0.2rem solid white;
          color: hsl(235, 11%, 23%);
          cursor: pointer;
          float: right;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0;
          line-height: 0px;
          margin-top: 1rem;
          width: 100%;
          padding: 1rem 2rem;
          text-decoration: none;
        }

        .form-submit:hover{
          background-color: hsl(235, 11%, 23%);
          color: hsl(0, 0%, 100%);
        }
      </style>

      <div class="form-login-container">
        <h2>Assistants GPT</h2>
        <form class="form">
            <div class="form-element">
                <div class="form-element-label">
                    <label for="email">Email</label>
                </div>
                <div class="form-element-input">
                    <input type="email" name="email" id="email" required>
                </div>
            </div>
            <div class="form-element">
                <div class="form-element-label">
                    <label for="password">Password</label>
                </div>
                <div class="form-element-input">
                    <input type="password" name="password" id="password" required>
                </div>
            </div>
            <button type="submit" class="form-submit">Enviar</button>
        </form>
      </div>
    `

    const form = this.shadow.querySelector('form')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.submitForm(form)
    })
  }

  async submitForm (form) {

    const url = API_URL + this.getAttribute('action')
    const formData = new FormData(form)
    const formDataJson = Object.fromEntries(formData.entries())

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
      })

      if (result.ok) {
        const data = await result.json()
        sessionStorage.setItem('accessToken', data.accessToken)
        window.location.href = data.redirection
      } else {
        const error = await result.json()
        console.log(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

customElements.define('login-form', LoginForm)
