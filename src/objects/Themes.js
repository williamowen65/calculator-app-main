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
        // main
        this.bodyEl.setAttribute('class','theme1')
        window.localStorage.setItem('calc-theme', 'theme1')
        break;
      case "2":
        // light
        this.bodyEl.setAttribute('class','theme2')
        window.localStorage.setItem('calc-theme', 'theme2')
        break;
      case "3":
        // dark
        this.bodyEl.setAttribute('class','theme3')
        window.localStorage.setItem('calc-theme', 'theme3')
        break;
      default:
        break;
    }
    console.log(this.bodyEl, this.value);
    console.log(window.localStorage);
  }

  setToggle = () => {
    this.bodyEl.className
    switch (this.bodyEl.className) {
      case 'theme1':
        this.input.value = 1
        break;
        case 'theme2':
          this.input.value = 2
          break;
          case 'theme3':
            this.input.value = 3     
        break;
    
      default:
        break;
    }
    // console.log(document.styleSheets);
    // document.styleSheets[0].insertRule('input[type=range]::-webkit-slider-thumb {visibility: visible}', 0);
  }

  checkForPrefersColor = () => {
    
    if(window.localStorage.getItem('calc-theme')){
      const theme = window.localStorage.getItem('calc-theme')
      console.log(theme);
      this.bodyEl.setAttribute('class',`${theme}`)
      // console.log('found a theme');
    } else {
      if(window.matchMedia('(prefers-color-scheme: light)').matches){
        this.bodyEl.setAttribute('class','theme2')
      }
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        this.bodyEl.setAttribute('class','theme3')
      }
    }
    this.setToggle()
  }

  configure = () => {
    this.input.addEventListener('change', (e) => {
      this.value = e.target.value;
      this.setTheme();
    })
    this.checkForPrefersColor()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if(localStorage.getItem('calc-theme')){
        localStorage.clear('calc-theme')
      }
      this.value = 3;
      this.checkForPrefersColor()
      console.log('change');
    })
  }

}