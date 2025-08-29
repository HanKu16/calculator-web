import CalculationsProccessor from "./CalculationsProcessor.js";

let input = "";
let numbers = [];
let operations = [];
let currentNumber = "";
const operationSigns = ["+", "-", "*", "/"];

addEventListenersToNumberButtons();
addEventListenersToOperationButtons();
addEventListenerToClearButton();
addEventListenerToResultButton();
addEventListenerToDeleteButton();

function addEventListenersToNumberButtons() {
  const numberButtons = document.querySelectorAll(".value-button");
  numberButtons.forEach(button => {
    button.addEventListener("click", event => {
      const number = button.dataset.number;
      input += number;
      const inputDisplay = document.querySelector(".input-display");
      inputDisplay.textContent = input;
      currentNumber += number;
    });
  });
}

function addEventListenersToOperationButtons() {
  const operationButtons = document.querySelectorAll(".operation-button");
  operationButtons.forEach(button => {
    button.addEventListener("click", event => {
      if (input.length === 0) {
        const outputDisplay = document.querySelector(".output-display");
        outputDisplay.textContent = "Invalid input!";
      }
      const operationSign = button.dataset.operation;
      input += operationSign;
      const inputDisplay = document.querySelector(".input-display");
      inputDisplay.textContent = input;
      if (currentNumber != "") {
        numbers.push(Number(currentNumber));
      }
      currentNumber = "";
      operations.push(operationSign);
    });
  });
}

function addEventListenerToClearButton() {
  const clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", event => {
    reset();
    const inputDisplay = document.querySelector(".input-display");
    inputDisplay.textContent = "";
    const outputDisplay = document.querySelector(".output-display");
    outputDisplay.textContent = "";
  });
}

function addEventListenerToResultButton() {
  const resultButton = document.querySelector("#result-button");
  resultButton.addEventListener("click", event => {
      if (currentNumber != "") {
        numbers.push(Number(currentNumber));
      }
      const proccessor = new CalculationsProccessor(numbers, operations);
      if (!proccessor.validate()) {
        const outputDisplay = document.querySelector(".output-display");
        outputDisplay.textContent = "Invalid input!";
      }
      const result = proccessor.getResult();
      const outputDisplay = document.querySelector(".output-display");
      outputDisplay.textContent = result;
      reset();
  });
}

function addEventListenerToDeleteButton() {
  const deleteButton = document.querySelector("#delete-button");
  deleteButton.addEventListener("click", event => {

    const lastCharackter = input[input.length-1];
    input = input.slice(0, -1)
    if (operationSigns.includes(lastCharackter)) {
      operations.pop();
    }
    if (operationSigns.includes(input[input.length-1])) {
      currentNumber = "";
    } else {
      currentNumber = currentNumber.slice(0, -1);
    }
    const inputDisplay = document.querySelector(".input-display");
    inputDisplay.textContent = input;
  });
}

function reset() {
  input = "";
  numbers = [];
  operations = [];
  currentNumber = "";
}