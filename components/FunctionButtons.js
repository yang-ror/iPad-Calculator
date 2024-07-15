import Button from './Button'

const FunctionButtons = () => {
  function print(label) {
    console.log(label)
  }

  const buttons = []
  
  {['C', '+/-', '%'].map( i => {
    buttons.push(<Button key={i} label={i} color={'black'} bgcolor={'rgb(180, 180, 180)'} func={print} />)
  })}
  
  return buttons
}

export default FunctionButtons