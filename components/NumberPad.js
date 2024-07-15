import Button from './Button'

const NumberPad = () => {
  function print(label) {
    console.log(label)
  }

  const buttons = []
  
  {[7, 8, 9, 4, 5, 6, 1, 2, 3].map( i => {
    buttons.push(<Button key={i} label={i} color={'white'} bgcolor={'rgb(100, 100, 100)'} func={print} />)
  })}

  return buttons
}

export default NumberPad