import _ from 'lodash'

export default class Calculator {
  screen;
  currentView = "";
  addition = "";
  intProxy = "";
  remainProxy = "";

  constructor(el) {
    this.screen = el.querySelector('.total');
    // console.log(el);
    el.addEventListener('click', this.handleClick);
    this.configure()

    
  }

  set setCurrent(string) {

    // console.log(string, !this.intProxy.length, typeof string );
    

    if(string === '.'){
      this.remainProxy = '.';
      this.screen.value = '' + this.currentView + this.remainProxy
    } 

    if(!this.remainProxy.length) {
      // if(!this.intProxy.length && string == '0' || this.intProxy[0] == '0' && string == '0'){
      //   console.log('zero');
      //   this.intProxy = '0'; 
        
      // } else {
        if(string !== 'del'){
          this.intProxy += string; 
        } else {
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
          const arrString = Array.from(this.intProxy);
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
          // console.log(newString);
          
          this.currentView = newString
          
        } else {
          if(+this.intProxy){
            if(this.currentView[0] == '0'){
              const arrString = Array.from(this.currentView)
              this.currentView = arrString.splice(1,1).join('');
              // this.screen.value = this.currentView;
              console.log(this.currentView);
            }
            console.log('int: ', this.intProxy);
            console.log(this.intProxy[0] == '0', this.intProxy);
            if(string !== 'del'){

              this.currentView += this.intProxy[this.intProxy.length - 1]
            } else {
              if (this.currentView.length === 5){
                const arrCurrentView = Array.from(this.currentView)
                const fixCurrentView = _.without(arrCurrentView, ',')
                this.currentView = fixCurrentView.slice(0,-1).join('')
              } else {
                // console.log(this.currentView.slice(0,-1));

                if(this.currentView.length >= 1){

                  this.currentView = this.currentView.slice(0,-1);
                }
              }
            }
            
          } else {
            if(this.intProxy.length === 1 ){

              this.currentView = this.intProxy[0];
            } else {
              this.currentView = ''
            }
            this.intProxy = ''
          }
        }
      this.screen.value = this.currentView;
    }

    if(this.remainProxy.length && string !== '.' ) {
      if(string !== 'del'){
        //  add to remain proxy
        this.remainProxy += string; 
        this.screen.value = '' + this.currentView + this.remainProxy
      } else {
        this.remainProxy = this.remainProxy.slice(0,-1);
        this.screen.value = '' + this.currentView + this.remainProxy
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
    // this.currentView += string; 
    // this.screen.value = this.currentView;
  }

  operator = (string) => {
    this.addition += this.currentView + ` ${string} `;
    this.currentView = "";
    console.log(this.addition);
  }
 
  delete = (e) => {
      // console.log('event: ', e);
      if(e){
        // const newNum = this.intProxy.slice(0, -1);
        // console.log(this.currentView, newNum);
        // this.currentView = newNum;
        this.setCurrent = 'del';
        // if(!this.remainProxy.length){
        //   this.screen.value = "" + this.currentView.slice(0, -1);
        // } else {

        //   this.screen.value = "" + this.currentView + this.remainProxy;
        // }
        // this.screen.innerHTML = this.currentView
      }
    // console.log(this.screen);
  }

  submit = () => {
    console.log('=====');
  }

  reset = () => {
    this.currentView = '';
    this.intProxy = '';
    this.remainProxy = '';
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
    } 
    else if(/reset/.test(string)){
        this.reset();
    } else if(/[0-9]|\./.test(string)){
      this.enter(string);
    }
    // this.screen.value = this.currentView
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