import _ from 'lodash';

class Calculator {
  parent;
  constructor(el) {
    this.parent = el;
    console.log(el);
    el.addEventListener('click', this.handleClick);
    this.configure()
  }
  handleClick = (e) => {
    if(e.target.type === 'button'){
      console.log('sdnfjlksdfjkl', e.target.type);
      console.log(e.target.value);
    }
  }
  configureTheme = (input) => {
    console.log('theme', input);
  }
  configureTotal = (input) => {
    console.log('total', input);
  }
  configureKey = (el) => {
    const value = el.value;
    console.log('handle Key', value);

  }
  configureDel = (el) => {
    console.log('handle del', el);
  }
  configureReset = (el) => {
    console.log('handle reset', el);
  }
  configureSubmit = (el) => {
    console.log('handle submit', el);
  }
  configure = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if(input.id || input.className){
        switch (input.className || input.id) {
          case 'theme':
            this.configureTheme(input)
            break;
          case 'total':
            this.configureTotal(input)
            break;
          case 'del':
            this.configureDel(input)
            break;
          case 'reset':
            this.configureReset(input)
            break;
          case 'submit':
            this.configureSubmit(input)
            break;
        
          default:
            break;
        }
      } else {
        this.configureKey(input);
      }
    })
    // console.log(labels);
    labels.forEach(label => {

      
    })
  }
}

const el = document.querySelector('.calc');
const myCalc = new Calculator(el)

