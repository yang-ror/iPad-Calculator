import Button from './Button'

const ZeroAndDot = () => {
  function print(label) {
    console.log(label)
  }

  const buttons = [
    <Button key={'0'} label={'0'} color={'white'} bgcolor={'rgb(100, 100, 100)'} func={print} doubleSize />,
    <Button key={'.'} label={'.'} color={'white'} bgcolor={'rgb(100, 100, 100)'} func={print} />
  ]
  
  return buttons
}

export default ZeroAndDot