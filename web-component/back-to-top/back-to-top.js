class BackToTop extends HTMLElement {
  constructor() {
    super();
    this.style.cssText = `
      position: fixed;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      bottom: 10px;
      right: 20px;
      background: #efefef;
      text-align: center;
      font-size: 12px;
      color: #fff;
    `;

    this.innerHTML = 'top';

    this.addEventListener('click', () => {
      this.toTop();
    });
  }

  toTop() {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  }
}

export default BackToTop;