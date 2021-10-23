import _ from 'lodash'
import exactMath from 'exact-math';
import Themes from './Themes';

export default class Calculator {
  screen;
  currentView = {
    text: "",
    number: ''
  };
  addition = {
    text: '',
    number: '',
    operator: ''
  };
 

  constructor(el) {
    this.screen = el.querySelector('.total');
    // console.log(el);
    el.addEventListener('click', this.handleClick);
    this.configure()

    // console.log(exactMath.formula('2 * -3 + 4 + 5'));
  }

  processToComma = (string) => {
    let toString = "" + string;
    let remainder;
    if (toString.includes('.')){
      toString = _.split(toString, '.')
      remainder = '.' + toString[1]
      toString = toString[0]
    }
    const arrString = Array.from(toString);
    // const arrString = Array.from(_.split(toString, '.'));

    const revArrString = _.reverse(arrString)
    const chunkRevArrString = _.chunk(revArrString, 3);
    // console.log(chunkRevArrString);
    chunkRevArrString.forEach((arr, i) => {
      if(arr.length === 3 && i !== chunkRevArrString.length - 1){
        arr.push(',')
      }
    })
    const flatArr = _.flatten(chunkRevArrString);
    const newArr = _.reverse(flatArr);
    const newString = _.join(newArr, '');
    // console.log('new str: ', chunkRevArrString);
    if(remainder){
      return newString + remainder;
    }
    return newString
  }




 

  delete = (e) => {
      // console.log('event: ', e);
    if(e){
      //   this.setCurrent = 'del';
      if(this.currentView.text.length){
        this.currentView.number = this.currentView.number.slice(0,-1)
        this.currentView.text = this.processToComma(this.currentView.number)
      } else {
        this.currentView.text = this.addition.text;
        this.currentView.number = this.addition.number;
        this.addition = {
          text: '',
          number: '',
          operator: ''
        }
      }
    }

      this.print()
  }

  submit = () => {
    if(this.currentView.text.length){
      this.currentView.number = '' + exactMath.formula(this.addition.number + " " + this.addition.operator + " " + this.currentView.number);
      this.currentView.text = this.processToComma(this.currentView.number)
      this.addition.operator = '';
      this.addition.number = ''
      this.addition.text = ''
    } else {
      this.currentView.number = "" + this.addition.number
      this.currentView.text = this.addition.text;
      this.addition.operator = '';
      this.addition.number = ''
      this.addition.text = ''

    }

    // console.log('submit');
    this.print()
  }

  print = () => {
    this.addition.operator ? this.screen.value = this.addition.text + ' ' + this.addition.operator + ' ' + this.currentView.text : this.screen.value = this.currentView.text;
    // console.log(this.currentView);
    // console.log(this.addition);
  }
  
  checkPeriod = () => {
   if(this.currentView.number.includes('.')){
     return false;
   }
   return true;
  }

  processNumber = (string) => {
    if(string === '.'){

      this.checkPeriod() ? this.currentView.number += string : this.currentView.number;
    } else {

      this.currentView.number += +string
    }
    this.currentView.text = this.processToComma(this.currentView.number);
  }

  operator = (string) => {
    if(!this.addition.operator){
      this.addition.number = this.currentView.number
      this.addition.text = this.currentView.text
      this.addition.operator = string;
      this.currentView.number = ''
      this.currentView.text = ''
    } else if (this.currentView.number.length){
      this.addition.number = "" + exactMath.formula(this.addition.number + " " + this.addition.operator + " " + this.currentView.number);
      this.addition.text = this.processToComma(this.addition.number)
      // console.log(string);
      this.addition.operator = string;
      this.currentView.number = ''
      this.currentView.text = ''
    } else {
      this.addition.operator = string;

    }
  }

 handleRequest = (string) => {
    // console.log(string, 'handleReq');
    if(/\/|\+|-|x/.test(string)){
        this.operator(string);
    } 
    else if(/=/.test(string)){
        this.submit();
    } 
    else if(/del/.test(string)){
        this.delete(string);
    } else if(/[0-9]|\./.test(string)){
      this.processNumber(string)
    }
    this.print(this.currentView.text)
    // this.screen.value = this.currentView.text
  }

  handleClick = (e) => {
    // console.log(e);
    if(e.target.type === 'button'){
     this.handleRequest(e.target.value);
      
    //  this.screen.value += e.target.value;
    }
  }
  configureTheme = (input) => {
    new Themes(input)
  }
  configureTotal = (input) => {
    // console.log('total', input);
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log(e);
      if(/Backspace/.test(e.key)){
        this.delete(e)
      } else if(/[0-9]|\/|\+|-|x/.test(e.key)){
        this.handleRequest(e.key)
      } 
    })
    window.addEventListener('keydown', e => {
      // console.log(e.key );
      // e.stop(); 
      e.preventDefault()
      if(/Backspace/.test(e.key)){
        this.delete(e)
      } else if(/[0-9]|\/|\+|-|x|\./.test(e.key)){
        this.handleRequest(e.key)
      }  else if(/ /.test(e.key)){
        this.submit();
       } else if(/Enter/.test(e.key)){
        this.submit();
       } else if(/Esc/.test(e.key)){
        this.reset();
       } 
    })
  }
  configureKey = (el) => {
    const value = el.value;
    // console.log('handle Key', value);

  }
  configureDel = (el) => {
    // console.log(el);
    el.addEventListener('click', () => this.delete())
  }
  reset = () => {
    this.currentView = {
      text: '',
      number: '',
    };
    this.addition = {
      text: '',
      number: '',
      operator: ''
    };
   this.print()
  }
  configureReset = (el) => {
    // console.log(el);
    el.addEventListener('click', this.reset)
  }
  configureSubmit = (el) => {
    el.parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit()
      // console.log(this.addition, this.currentView.text);
    })
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
  }
}