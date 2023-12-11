class Aside extends HTMLElement {

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
        aside{
          background-color: hsl(0, 0%, 0%);
          max-width: 260px;
          min-width: 260px;
          height: 100%;
        }
      </style>
    
      <aside>
        <slot name="content"></slot>
      </aside>
    `
  }
}

customElements.define('aside-component', Aside);