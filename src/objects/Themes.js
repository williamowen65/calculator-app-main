export default class Themes {
  input;
  value;
  bodyEl;
  constructor(input) {
    this.input = input
    // console.log('new themes', this.input);
    this.bodyEl = document.querySelector('body')
    this.configure()
    
  }



  setTheme = () => {
    switch (this.value) {
      case "1":
        this.bodyEl.setAttribute('class','theme1')
        break;
      case "2":
        this.bodyEl.setAttribute('class','theme2')
        break;
      case "3":
        this.bodyEl.setAttribute('class','theme3')
        break;
      default:
        break;
    }
    console.log(this.bodyEl, this.value);
  }

  configure = () => {
    this.input.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.setTheme();
    })
  }

}