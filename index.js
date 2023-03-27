const screen = document.getElementById('screen-text');
const numButtons = document.querySelectorAll(`[data-num]`)
const operation = document.querySelectorAll(`[data-oper]`)
const equal = document.querySelector(`[data-equal]`)
const clear = document.querySelector(`[data-clear]`)


let num1 = undefined;
let num2 = undefined;
let oper = undefined;
let buffer = '';
let isEqualed = false;

const handleNumButtonClick = (event) => {
    if (isEqualed === true) {
        clearAll();
        isEqualed = false;
    }
    // console.log(event)
    buffer = `${buffer}` + `${event.target.innerText}`;
    screen.innerText = buffer;
}

const handleOperationClick = (event) => {
    if (buffer !== '') {
        oper = event.target.innerText;
        buffer += oper;
        console.log('operator: ', oper)
        screen.innerText = buffer;
        // clearAll();
        disableOper();
    }
}

const disableOper = () => {
    for (let i = 0; i < operation.length; i++) {
        operation[i].disabled = true;
    }
}

const enableOper = () => {
    for (let i = 0; i < operation.length; i++) {
        operation[i].disabled = false;
    }
}

const clearAll = () => {
    num1 = undefined;
    num2 = undefined;
    oper = undefined;
    buffer = '';
    screen.innerText = buffer;
    enableOper();
}

const calculate = () => {
    switch (oper) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            break;
    }
}

const handleEqualClick = () => {
    if (buffer !== '') {

        let val = buffer.split(/-|\+|\*|\//)
        // console.log(val)
        if (val[0] === '' || val[1] === '') {
            return ;
        }
        num1 = parseInt(val[0]);
        num2 = parseInt(val[1]);
    }
    if (num1 !== undefined && num2 !== undefined) {

        const res = `num1 = ${num1} \n
        num2 = ${num2} \n
        oper = |${oper}|`
    
    
        enableOper();
        const result = calculate();
        buffer = res;
        screen.innerText = result;
        num1 = undefined;
        num2 = undefined;
        oper = undefined;
    }
    isEqualed = true;
}

console.log(numButtons.length)

for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener('click', handleNumButtonClick);
}

for (let i = 0; i < operation.length; i++) {
    operation[i].addEventListener('click', handleOperationClick);
}
equal.addEventListener('click', handleEqualClick);
clear.addEventListener('click', clearAll);