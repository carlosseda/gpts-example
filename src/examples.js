class Examples extends HTMLElement {

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    document.addEventListener('newChat', this.handleNewChat.bind(this))
    document.addEventListener('startChat', this.handleStartChat.bind(this))
  }

  connectedCallback () {
    this.render()
  }

  handleNewChat = event => {
    this.render()
  }

  handleStartChat = event => {
    this.shadow.innerHTML = ''
  }

  render () {

    this.shadow.innerHTML =
    /*html*/`
      <style>

        :host{
          width: 100%;
        }
        
        .examples{
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
          gap: 0.5rem;
        }

        .example{
          border: 1px solid hsl(0, 0%, 40%);
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .example:hover{
          background-color: hsl(236, 10%, 28%);
          cursor: pointer;
        }

        .example-title h2{
          color: hsla(0, 0%, 100%, 0.7);
          font-family: 'SoehneBuch', Arial;
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0;
        }

        .example-description p{
          color: hsl(0, 0%, 100%);
          font-family: 'SoehneBuch', Arial;
          font-size: 0.9em;
          margin: 0;
          opacity: 0.5;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .example .example-send{
          align-items: center;
          background-color: hsla(236, 10%, 28%, 0.911);
          display: flex;
          height: 90%;
          justify-content: center;
          opacity: 0;
          position: absolute;
          right: 0;
          width: 10%;
          z-index: 1000;
        }

        .example:hover .example-send{
          opacity: 1;
        }

        .example-send-button{
          background-color: hsl(235, 11%, 23%);
          border-radius: 0.3rem;
          padding: 0.25rem;
        }

        .example-send-button svg{
          height: 0.8rem;
          width: 0.8rem;
        }

        .example-send-button svg path{
          fill: white;
        }

        .example-send-button .tooltiptext{
          background-color: black;
          border-radius: 0.5rem;
          color: #fff;
          font-family: 'SoehneBuch', sans-serif;
          font-size: 0.8rem;
          margin-top: -3.5rem;
          margin-left: -5rem;
          opacity: 0;
          padding: 0.5rem 0;
          pointer-events: none; 
          position: absolute;
          text-align: center;
          transition: opacity 0.3s;
          width: 150px;
          z-index: 1001;
        }

        .example-send-button .tooltiptext::after {
          border-color: rgb(0, 0, 0) transparent transparent transparent;
          border-style: solid;
          border-width: 5px;
          content: "";
          left: 45%;
          position: absolute;
          top: 100%;   
        }

        .example-send-button:hover .tooltiptext{
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 800px) {
          .examples{
            grid-template-columns: repeat(1, 1fr);
          }
        }
      </style>
    
      <section class="examples">
        <article class="example" data-prompt="Este es un ejemplo de prompt">
          <div class="example-title">
            <h2>Comparar principios del diseño</h2>
          </div>
          <div class="example-description">
            <p>para convertir una fecha al día de la semana correspo...</p>
          </div>
          <div class="example-send">
            <div class="example-send-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>  
              <span class="tooltiptext">Haz click para enviar</span>         
          </div>
        </article>
        <article class="example" data-prompt="Este es un ejemplo de prompt">
          <div class="example-title">
            <h2>Comparar técnicas de narración</h2>
          </div>
          <div class="example-description">
            <p>en novelas y en películas</p>
          </div>
          <div class="example-send">
            <div class="example-send-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg> 
              <span class="tooltiptext">Haz click para enviar</span>                   
          </div>
        </article>
        <article class="example" data-prompt="Este es un ejemplo de prompt">
          <div class="example-title">
            <h2>Generar nombres</h2>
          </div>
          <div class="example-description">
            <p>para mi equipo de fútbol de fantasía con un tema de rasputin</p>
          </div>
          <div class="example-send">
            <div class="example-send-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>  
              <span class="tooltiptext">Haz click para enviar</span>                  
          </div>
        </article>
        <article class="example" data-prompt="Este es un ejemplo de prompt">
          <div class="example-title">
            <h2>Sugiere conceptos</h2>
          </div>
          <div class="example-description">
            <p>para un juego de arcade de estilo retro</p>
          </div>
          <div class="example-send">
            <div class="example-send-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>  
              <span class="tooltiptext">Haz click para enviar</span>                  
          </div>
        </article>
      </section>
    `

    const examples = this.shadow.querySelector('.examples');

    examples.addEventListener('click', (event) => {
      if (event.target.closest('.example')) {
        const prompt = event.target.closest('.example').dataset.prompt

        document.dispatchEvent(new CustomEvent('startChat'))
        document.dispatchEvent(new CustomEvent('newPrompt', { detail: {
          prompt: prompt
        }}))
      }
    })
  }
}

customElements.define('examples-component', Examples);