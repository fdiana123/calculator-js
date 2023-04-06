class Calculator{
    constructor(previousoperandtext, currentoperandtext){
      this.previousoperandtext = previousoperandtext
      this.currentoperandtext = currentoperandtext
      this.clear()
    }
  
    clear(){
      this.currentoperand = ''
      this.previousoperand = ''
      this.operation = undefined
    }
  
    delete(){
      this.currentoperand = this.currentoperand.toString().slice(0, -1)
  
    }
  
    appendNumber(number){
      if (number === '.' && this.currentoperand.includes('.')) return
      this.currentoperand = this.currentoperand.toString() + number.toString()
    }
  
    chooseOperation(operation){
      if(this.currentoperand === '') return
      if(this.previousoperand !== ''){
        this.compute()
      }
      this.operation = operation
      this.previousoperand = this.currentoperand
      this.currentoperand = ''
    } 
  
    compute(){
      let computation 
      const prev = parseFloat(this.previousoperand)
      const current = parseFloat(this.currentoperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation){
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
  
      }
      this.currentoperand = computation
      this.operation = undefined
      this.previousoperand = ''
    }
  
    getDisplayNumber(number){
      const floatNumber = parseFloat(number)
      if (isNaN(floatNumber)) return ''
      return floatNumber.toLocaleString('en')
    }
    
  
    updateDisplay(){
      this.currentoperandtext.innerText = 
        this.getDisplayNumber(this.currentoperand)
      if (this.operation != null){
        this.previousoperandtext.innerText = 
        `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`
      }
      
    }
  }
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousoperandtext = document.querySelector('[data-previous-operand]')
  const currentoperandtext = document.querySelector('[data-current-operand]')
  
  
  const calculator = new Calculator(previousoperandtext,currentoperandtext)
  
  numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button =>{
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
  })

