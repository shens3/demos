class PopupBox extends HTMLElement {
  static get observedAttributes() {
    return ['show'];
  }

  constructor() {
    super();

    let root = this.attachShadow({ mode: 'open' }); // this.shadowRoot { mode: 'close' }

    let template = document.querySelector('template#popup').content;
    root.appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    let trigger = this.querySelector('[slot=trigger]');
    trigger.addEventListener('mouseenter', () => {
      this.setAttribute('show', 1);
    });

    trigger.addEventListener('mouseleave', () => {
      this.setAttribute('show', 0);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (name === 'show') {
      if (newValue === '1') {
        this.shadowRoot.querySelector('.popup-content').classList.add('popup-content--show');
      } else {
        this.shadowRoot.querySelector('.popup-content').classList.remove('popup-content--show');
      }
    }
  }

  createStyle(content) {
    let style = document.createElement('style');
    style.textContent = content;
    return style;
  }
}

export default PopupBox;