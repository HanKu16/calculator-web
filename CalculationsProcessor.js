export default class CalculationsProccessor {

  numbers;
  operationsSigns;
  operationsOrderIndexes;

  constructor(numbers, operations) {
    this.numbers = numbers;
    this.operationsSigns = operations;
  }

  validate() {
    return this.numbers.length === (this.operationsSigns.length + 1);
  }

  determineOperationsOrder() {
    const higherPriorityOperations = [];
    const lowerPriorityOperations = [];
    for (let i = 0; i < this.operationsSigns.length; i++) {
      let operation = this.operationsSigns[i];
      if (operation === "*" || operation === "/") {
        higherPriorityOperations.push(i);
      } else {
        lowerPriorityOperations.push(i);
      }
    }
    this.operationsOrderIndexes = higherPriorityOperations.concat(lowerPriorityOperations);
  }

  getResult() {
    this.determineOperationsOrder();
    while (this.numbers.length != 1) {
      let operationIndex = this.operationsOrderIndexes[0];
      let operationSign = this.operationsSigns[operationIndex];
      let leftNumber = this.numbers[operationIndex];
      let rightNumber = this.numbers[operationIndex+1];
      let result = this.calculate(leftNumber, rightNumber, operationSign);
      this.numbers[operationIndex] = result;
      this.numbers.splice(operationIndex+1, 1);
      this.operationsSigns.splice(operationIndex, 1);
      this.operationsOrderIndexes.splice(0, 1);
      for (let i = 0; i < this.operationsOrderIndexes.length; i++) {
        if (this.operationsOrderIndexes[i] > operationIndex) {
          this.operationsOrderIndexes[i]--;
        }
      }
    }
    return this.numbers[0];
  }

  calculate(leftNumber, rightNumber, operation) {
    if (operation === "+") {
      return leftNumber + rightNumber;
    } else if (operation === "-") {
      return leftNumber - rightNumber;
    } else if (operation === "*") {
      return leftNumber * rightNumber;
    } else if (operation === "/") {
      return leftNumber / rightNumber;
    }
  }

}