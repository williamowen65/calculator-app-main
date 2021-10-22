import _ from 'lodash'

export default class Calculator {
  screen;
  currentView = "";
  addition = "";
  currentProxy = "";

  constructor(el) {
    this.screen = el.querySelector('.total');
    // console.log(el);
    el.addEventListener('click', this.handleClick);
    this.configure()

    
  }

  set setCurrent(string) {
    // console.log(string);
    if(string === 'del'){
      this.currentProxy.slice(0, -1);
      console.log('delete');

      
    } else {

      this.currentProxy += string; 
    }
    // console.log(arrString);\
    if(this.currentProxy.length > 3) {
      const arrString = Array.from(this.currentProxy);
      const revArrString = _.reverse(arrString)
      const chunkRevArrString = _.chunk(revArrString, 3);
      chunkRevArrString.forEach((arr, i) => {
        if(arr.length === 3 && i !== chunkRevArrString.length - 1){
          arr.push(',')
        }
      })
      const flatArr = _.flatten(chunkRevArrString);
      const newArr = _.reverse(flatArr);
      const newString = _.join(newArr, '');
      console.log(newString);
      

      // for(let i = arrString.length; i >= 1; i--){
      //   // console.log("i: ", i);
      //   const position = arrString.length - i + 1;
      //   if(!(position % 3)){
      //     console.log("pos: ", position);
      //     // console.log("string ",arrString[i - 1]);
      //     arrString.splice(i - 1, 0, ',');
      //     console.log(arrString.join(''));
      //   }
      // }
      this.currentView = newString
     
    } else {
      this.currentView += string
    }
    // this.screen.value = this.currentView;

  }



  format = () => {
    console.log('sets string commas');
  }

  enter = (string) => {
    this.setCurrent = string;
    // this.currentView += string; 
    // this.screen.value = this.currentView;
  }

  operator = (string) => {
    this.addition += this.currentView + ` ${string} `;
    this.currentView = "";
    console.log(this.addition);
  }
  period = (string) => {
    console.log('period');
  }
  delete = (e) => {
      // console.log('event: ', e);
      if(e){
        console.log('trying to delete');
        // const newNum = this.currentProxy.slice(0, -1);
        // console.log(this.currentView, newNum);
        // this.currentView = newNum;
        this.setCurrent('del')
        this.screen.value = this.currentView
        this.screen.innerHTML = this.currentView
      }
    // console.log(this.screen);
  }

  submit = () => {
    console.log('=====');
  }

 handleInput = (string) => {
    // console.log(string);
    if(/\/|\+|-|x/.test(string)){
        this.operator(string);
    } 
    else if(/\./.test(string)){
        this.period(string);
    } 
    else if(/=/.test(string)){
        this.submit(string);
    } 
    else if(/del/.test(string)){
        this.delete(string);
    } 
    else if(/reset/.test(string)){
        this.reset(string);
    } else if(/[0-9]/.test(string)){
      this.enter(string);
    }
    this.screen.value = this.currentView
  }

  handleClick = (e) => {
    if(e.target.type === 'button'){
      let {currentView, additions} = this.handleInput(e.target.value);
      
    //  this.screen.value += e.target.value;
    }
  }
  configureTheme = (input) => {
    // console.log('theme', input);
  }
  configureTotal = (input) => {
    console.log('total', input);
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log(e);
      if(/Backspace/.test(e.key)){
        this.delete(e)
      } else if(/[0-9]|\/|\+|-|x/.test(e.key)){
        this.handleInput(e.key)
      } 
    })
    window.addEventListener('keydown', e => {
      if(/Backspace/.test(e.key)){
        this.delete(e)
      } else if(/[0-9]|\/|\+|-|x/.test(e.key)){
        this.handleInput(e.key)
      } 
    })
  }
  configureKey = (el) => {
    const value = el.value;
    // console.log('handle Key', value);

  }
  configureDel = (el) => {
    console.log(el);
    el.addEventListener('click', () => this.delete())
  }
  configureReset = (el) => {
    console.log(el);
    el.addEventListener('click', () => {
      this.currentView = "";
      this.addition = "";
      this.screen.value = '';
      this.screen.innerHTML = '';
      // console.log("reset");
      // console.log("screen: ", this.screen.value);
      // console.log("currentView: ", this.currentView);
    })
  }
  configureSubmit = (el) => {
    // console.log('handle submit', el);
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