let container = null;
let inited = false;

class MessageBox extends HTMLElement {

  static iconMap = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }

  constructor(msg, type = 'info') {
    super();
    this.init(msg, type);
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      this.classList.remove('message-box--hide');

      this.timer = setTimeout(() => {
        this.addEventListener('transitionend', () => {
          container.removeChild(this);
        });
        this.classList.add('message-box--remove');
      }, 2500);
    });
  }

  disconnectedCallback() {
    if (container.children.length === 0) {
      document.body.removeChild(container);
      container = null;
    }
  }

  init(msg, type) {
    const root = this.attachShadow({ mode: 'open' });

    this.setAttribute('data-type', type);
    this.classList.add('message-box--hide');

    root.appendChild(this.getInitalStyle());
    root.appendChild(this.getInitalIcon(type));
    root.appendChild(this.getInitalContent(msg));
  }

  getInitalContent(msg) {
    const content = document.createElement('div');
    content.textContent = msg;
    return content;
  }

  getInitalIcon(type) {
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.textContent = MessageBox.iconMap[type];
    return icon;
  }

  getInitalStyle() {
    const style = document.createElement('style');

    style.textContent = `
      :host([data-type="info"]){
        background: #c3e5f5;
        color: #6c97b9;
      }

      :host([data-type=error]){
        background: #fd968e;
        color: #ff0000;
      }

      :host([data-type=success]){
        background: #99f19c;
        color: green;
      }

      :host(.message-box--hide) {
        transform: translate(-50%, 20px);
        opacity: 0.3;
      }

      :host(.message-box--remove) {
        transition: all 0.1s ease-in;
        opacity: 0;
      }

      :host {
        all: initial;
        box-sizing: border-box;
        display: flex;
        margin-top: 20px;
        margin-left: calc(50vw);
        min-width: 300px;
        min-height: 40px;
        padding: 5px 10px;
        align-self: center;
        transform: translate(-50%, 0);
        transition: all 0.3s ease-out;
      }

      :host > * {
        align-self: center
      }

      .icon {
        margin-right: 10px;
      }`;

      return style;
  }
}

function createContainer() {
  const box = document.createElement('div');

  box.style.cssText = `
    position: fixed;
    top: 0;
    width: 0;
    height: 0;
  `;

  return box;
}

function message(msg, type = 'info') {
  if (!inited) {
    customElements.define('message-box', MessageBox);
    inited = true;
  }

  if (!container) {
    container = createContainer();
    document.body.appendChild(container);
  }


  container.appendChild(new MessageBox(msg, type));
}

['info', 'success', 'error'].forEach(type => {
  message[type] = (msg) => message(msg, type);
})

export { message };