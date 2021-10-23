import _ from 'lodash'
import exactMath from 'exact-math';

export default class Calculator {
  screen;
  currentView = {
    text: "",
    number: null
  };
  addition = {
    text: '',
    number: null,
    operator: ''
  };
  intProxy = "";
  remainProxy = "";

  constructor(el) {
    this.screen = el.querySelector('.total');
    // console.log(el);
    el.addEventListener('click', this.handleClick);
    this.configure()

    
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
    console.log(chunkRevArrString);
    chunkRevArrString.forEach((arr, i) => {
      if(arr.length === 3 && i !== chunkRevArrString.length - 1){
        arr.push(',')
      }
    })
    const flatArr = _.flatten(chunkRevArrString);
    const newArr = _.reverse(flatArr);
    const newString = _.join(newArr, '');
    console.log('new str: ', chunkRevArrString);
    if(remainder){
      return newString + remainder;
    }
    return newString
  }


  checkPeriod = (string) => {
    if(string === '.'){
      this.remainProxy = '.';
      if(this.addition.text){
        this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
      }else{
        this.screen.value = '' + this.currentView.text + this.remainProxy
      }
    }
  }
  
  deleteBackOne = (string) => {
    if(!this.remainProxy.length && string === 'del') {
      if(this.intProxy.length > 1){
        this.intProxy = this.intProxy.slice(0,-1);
      } else {
        this.intProxy = '';
      }
    } 
    if(this.remainProxy.length && string === 'del' ) {

    }
      
  }

  set setCurrent(string) {

    // console.log(string, !this.intProxy.length, typeof string );
    
    ///sets remainProxy
    // this.checkPeriod();

    if(!this.remainProxy.length) {
      // if(!this.intProxy.length && string == '0' || this.intProxy[0] == '0' && string == '0'){
      //   console.log('zero');
      //   this.intProxy = '0'; 
        
      // } else {
        if(string !== 'del'){
          this.intProxy += string; 
        } 
        else {
          if(this.intProxy.length > 1){
            this.intProxy = this.intProxy.slice(0,-1);
          } else {
            this.intProxy = '';
          }
        }
        // console.log(this.intProxy);
      // }
      // Add to intProxy
      if(this.intProxy.length > 3) {
     

          const newString = this.processToComma(this.intProxy)
          
          this.currentView.text = newString
          
        } else {
          if(+this.intProxy){
            if(this.currentView.text[0] == '0'){
              const arrString = Array.from(this.currentView.text)
              this.currentView.text = arrString.splice(1,1).join('');
              // this.screen.value = this.currentView.text;
              console.log(this.currentView.text);
            }
            console.log('int: ', this.intProxy);
            console.log(this.intProxy[0] == '0', this.intProxy);
            if(string !== 'del'){

              this.currentView.text += this.intProxy[this.intProxy.length - 1]
            } else {
              if (this.currentView.text.length === 5){
                const arrCurrentView = Array.from(this.currentView.text)
                const fixCurrentView = _.without(arrCurrentView, ',')
                this.currentView.text = fixCurrentView.slice(0,-1).join('')
              } else {
                // console.log(this.currentView.text.slice(0,-1));

                if(this.currentView.text.length >= 1){

                  this.currentView.text = this.currentView.text.slice(0,-1);
                }
              }
            }
            
          } else {
            if(this.intProxy.length === 1 ){

              this.currentView.text = this.intProxy[0];
            } else {
              this.currentView.text = ''
            }
            this.intProxy = ''
          }
        }
      
      if(this.addition.text){
          this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text;
      }else{
        this.screen.value = this.currentView.text;
      }
    }

    if(this.remainProxy.length && string !== '.' ) {
      if(string !== 'del'){
        //  add to remain proxy
        this.remainProxy += string; 

        if(this.addition.text){
          this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
        }else{
          this.screen.value = '' + this.currentView.text + this.remainProxy
        }

      } else {
        this.remainProxy = this.remainProxy.slice(0,-1);

        if(this.addition.text){
          this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
        }else{
          this.screen.value = '' + this.currentView.text + this.remainProxy
        }
      }
    }

   
  }



  format = () => {
    console.log('sets string commas');
  }

  enter = (string) => {
    if(string === '.' && !this.intProxy.includes('.')){
      this.setCurrent = string;
    } else if (/[0-9]/.test(string)){
      this.setCurrent = string;
    }
    // this.currentView.text += string; 
    // this.screen.value = this.currentView.text;
  }

  operator = (string) => {
    if(this.addition.length){
      // const num1 = this.addition
    }
    if(!this.remainProxy.length){
      // const total = +this.addition.text + +this.currentView.text;
      // const totalWComma = this.processToComma(total)
      this.addition.number = exactMath.add(+_.split(this.addition.text, ',').join(''), +_.split(this.currentView.text, ',').join(''));
      this.addition.text = this.processToComma(this.addition.number)
      // this.addition.text = +this.addition.text + +this.currentView.text;
      this.addition.operator =  ` ${string} `;
    } else {
      this.addition.number = exactMath(+_.split(this.addition.number + +this.currentView.text, ',').join(''), +this.remainProxy) ;
      this.addition.text = this.processToComma(this.addition.number) ;
      this.addition.operator =  ` ${string} `;
    }

    

    this.intProxy = "";
    this.remainProxy = "";
    this.currentView.text = "";
    this.screen.value = this.addition.text + " " + this.addition.operator + " ";

    console.log('addition: ', this.addition, typeof this.addition.number);
    console.log('current: ', this.currentView);
  }
 
  delete = (e) => {
      // console.log('event: ', e);
      if(e){
        this.setCurrent = 'del';
      }
  }

  submit = () => {
    console.log('=====');
  }


 handleInput = (string) => {
    // console.log(string);
    if(/\/|\+|-|x/.test(string)){
        this.operator(string);
    } 
    else if(/=/.test(string)){
        this.submit(string);
    } 
    else if(/del/.test(string)){
        this.delete(string);
    } else if(/[0-9]|\./.test(string)){
      this.enter(string);
    }
    // this.screen.value = this.currentView.text
  }

  handleClick = (e) => {
    if(e.target.type === 'button'){
     this.handleInput(e.target.value);
      
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
      } else if(/[0-9]|\/|\+|-|x|\./.test(e.key)){
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
      this.currentView = {
        text: '',
        number: null,
      };
      this.addition = {
        text: '',
        number: null,
        operator: ''
      };
      this.screen.value = '';
      this.screen.innerHTML = '';
      this.intProxy = "";
      this.remainProxy = "";
      // console.log("reset");
      // console.log("screen: ", this.screen.value);
      // console.log("currentView.text: ", this.currentView.text);
    })
  }
  configureSubmit = (el) => {
    el.parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.addition, this.currentView.text);
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