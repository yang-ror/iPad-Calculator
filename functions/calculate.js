export default function calculate(num1, operator, num2) {
  let result

  switch (operator) {
    case '+':
      result = num1 + num2
      break
    case '−':
      result = num1 - num2
      break
    case '×':
      result = num1 * num2
      break
    case '÷':
      if (num2 === 0) {
        result = 'Error'
      } else {
        result = num1 / num2
      }
      break
  }
  
  return result
}