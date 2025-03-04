const readline = require("readline");
//calculator
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? "Error: Cannot divide by zero!" : a / b),
    squareRoot: (a) => (a < 0 ? "Error: Cannot take square root of a negative number!" : Math.sqrt(a)),
    power: (a, b) => Math.pow(a, b),
    logarithm: (a, base = 10) => (a <= 0 ? "Error: Logarithm undefined for zero or negative numbers!" : Math.log(a) / Math.log(base)),
    exponential: (a) => Math.exp(a),
    average: (...nums) => nums.reduce((sum, num) => sum + num, 0) / nums.length,
    pi: () => Math.PI,
    
    // Trigonometric Functions (Input in Degrees)
    sin: (angle) => Math.sin(angle * Math.PI / 180),  
    cos: (angle) => Math.cos(angle * Math.PI / 180),  
    tan: (angle) => Math.tan(angle * Math.PI / 180)
};

// Set up readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to take user input
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
    const operation = (await askQuestion("Enter operation (add, subtract, multiply, divide, sqrt, power, log, exp, avg, sin, cos, tan, pi): ")).toLowerCase();
    let result;

    if (operation === "pi") {
        result = calculator.pi();
    } else if (operation === "avg") {
        const numbers = (await askQuestion("Enter numbers separated by commas: ")).split(",").map(Number);
        result = calculator.average(...numbers);
    } else {
        const num1 = parseFloat(await askQuestion("Enter first number: "));
        let num2;

        if (!["sqrt", "exp", "sin", "cos", "tan"].includes(operation)) {
            num2 = parseFloat(await askQuestion("Enter second number (if required): "));
        }

        switch (operation) {
            case "add":
                result = calculator.add(num1, num2);
                break;
            case "subtract":
                result = calculator.subtract(num1, num2);
                break;
            case "multiply":
                result = calculator.multiply(num1, num2);
                break;
            case "divide":
                result = calculator.divide(num1, num2);
                break;
            case "sqrt":
                result = calculator.squareRoot(num1);
                break;
            case "power":
                result = calculator.power(num1, num2);
                break;
            case "log":
                result = calculator.logarithm(num1, num2 || 10);
                break;
            case "exp":
                result = calculator.exponential(num1);
                break;
            case "sin":
                result = calculator.sin(num1);
                break;
            case "cos":
                result = calculator.cos(num1);
                break;
            case "tan":
                result = calculator.tan(num1);
                break;
            default:
                result = "Invalid operation!";
        }
    }

    console.log(`Result: ${result}`);
    rl.close();
})();
