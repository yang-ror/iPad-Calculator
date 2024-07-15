import Button from './Button'

const OperatorButtons = () => {
  function print(label) {
    console.log(label)
  }

  const buttons = []
  
  {['/', 'X', '-', '+', '='].map( i => {
    buttons.push(<Button key={i} label={i} color={'white'} bgcolor={'rgb(0,135,145)'} func={print} />)
  })}
  
  return buttons
}

export default OperatorButtons