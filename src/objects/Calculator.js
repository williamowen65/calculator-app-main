import _ from 'lodash'
import exactMath from 'exact-math';

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
  // intProxy = "";
  // remainProxy = "";

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


  // checkPeriod = (string) => {
  //   if(string === '.'){
  //     this.remainProxy = '.';
  //     if(this.addition.text){
  //       this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
  //     }else{
  //       this.screen.value = '' + this.currentView.text + this.remainProxy
  //     }
  //   }
  // }
  
  // deleteBackOne = (string) => {
  //   if(!this.remainProxy.length && string === 'del') {
  //     if(this.intProxy.length > 1){
  //       this.intProxy = this.intProxy.slice(0,-1);
  //     } else {
  //       this.intProxy = '';
  //     }
  //   } 
  //   if(this.remainProxy.length && string === 'del' ) {

  //   }
      
  // }

  // set setCurrent(string) {

  //   // console.log(string, !this.intProxy.length, typeof string );
    
  //   ///sets remainProxy
  //   // this.checkPeriod();

  //   if(!this.remainProxy.length) {
  //     // if(!this.intProxy.length && string == '0' || this.intProxy[0] == '0' && string == '0'){
  //     //   console.log('zero');
  //     //   this.intProxy = '0'; 
        
  //     // } else {
  //       if(string !== 'del'){
  //         this.intProxy += string; 
  //       } 
  //       else {
  //         if(this.intProxy.length > 1){
  //           this.intProxy = this.intProxy.slice(0,-1);
  //         } else {
  //           this.intProxy = '';
  //         }
  //       }
  //       // console.log(this.intProxy);
  //     // }
  //     // Add to intProxy
  //     if(this.intProxy.length > 3) {
     

  //         const newString = this.processToComma(this.intProxy)
          
  //         this.currentView.text = newString
          
  //       } else {
  //         if(+this.intProxy){
  //           if(this.currentView.text[0] == '0'){
  //             const arrString = Array.from(this.currentView.text)
  //             this.currentView.text = arrString.splice(1,1).join('');
  //             // this.screen.value = this.currentView.text;
  //             console.log(this.currentView.text);
  //           }
  //           console.log('int: ', this.intProxy);
  //           console.log(this.intProxy[0] == '0', this.intProxy);
  //           if(string !== 'del'){

  //             this.currentView.text += this.intProxy[this.intProxy.length - 1]
  //           } else {
  //             if (this.currentView.text.length === 5){
  //               const arrCurrentView = Array.from(this.currentView.text)
  //               const fixCurrentView = _.without(arrCurrentView, ',')
  //               this.currentView.text = fixCurrentView.slice(0,-1).join('')
  //             } else {
  //               // console.log(this.currentView.text.slice(0,-1));

  //               if(this.currentView.text.length >= 1){

  //                 this.currentView.text = this.currentView.text.slice(0,-1);
  //               }
  //             }
  //           }
            
  //         } else {
  //           if(this.intProxy.length === 1 ){

  //             this.currentView.text = this.intProxy[0];
  //           } else {
  //             this.currentView.text = ''
  //           }
  //           this.intProxy = ''
  //         }
  //       }
      
  //     if(this.addition.text){
  //         this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text;
  //     }else{
  //       this.screen.value = this.currentView.text;
  //     }
  //   }

  //   if(this.remainProxy.length && string !== '.' ) {
  //     if(string !== 'del'){
  //       //  add to remain proxy
  //       this.remainProxy += string; 

  //       if(this.addition.text){
  //         this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
  //       }else{
  //         this.screen.value = '' + this.currentView.text + this.remainProxy
  //       }

  //     } else {
  //       this.remainProxy = this.remainProxy.slice(0,-1);

  //       if(this.addition.text){
  //         this.screen.value = this.addition.text + " " + this.addition.operator + " " + this.currentView.text + this.remainProxy
  //       }else{
  //         this.screen.value = '' + this.currentView.text + this.remainProxy
  //       }
  //     }
  //   }

   
  // }



  format = () => {
    console.log('sets string commas');
  }

 

  delete = (e) => {
      // console.log('event: ', e);
    if(e){
      //   this.setCurrent = 'del';
      if(this.currentView.text.length > 1){
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

    console.log('submit');
    this.print()
  }

  print = () => {
    this.addition.operator ? this.screen.value = this.addition.text + ' ' + this.addition.operator + ' ' + this.currentView.text : this.screen.value = this.currentView.text;
    console.log(this.currentView);
    console.log(this.addition);
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
      console.log(string);
      this.addition.operator = string;
      this.currentView.number = ''
      this.currentView.text = ''
    } else {
      this.addition.operator = string;

    }
  }

 handleRequest = (string) => {
    console.log(string, 'handleReq');
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
      } 
      else if(/ /.test(e.key)){
        this.submit();
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
        number: '',
      };
      this.addition = {
        text: '',
        number: '',
        operator: ''
      };
     this.print()
    
      // console.log("reset");
      // console.log("screen: ", this.screen.value);
      // console.log("currentView.text: ", this.currentView.text);
    })
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