const computersElement = document.getElementById("computers");
const priceElement = document.getElementById("price");
const loanButtonElement = document.getElementById("loan");
const bankButtonElement = document.getElementById("bank");
const workButtonElement = document.getElementById("work");
const repayLoanButtonElement = document.getElementById("repayLoan");
const buyButtonElement = document.getElementById("buy");
const imageElement = document.getElementById("image");
const baseUrl = "https://noroff-komputer-store-api.herokuapp.com";

let computers = [];
let loan = 0;
let balance = 200;
let bank = 0;
let payBalance = 0;
let repayLoan = 0;
let priceTotal = 0;
let boughtPC = false;

this.balanceText.innerText = 200;
this.workText.innerText = 0;
loanButtonElement.classList.remove("hiddenButton");

fetch(baseUrl + "/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));

function errorImage() {
    imageElement.src = "noImageFound.png";
};

const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
    priceElement.innerText = computers[0].price;
    priceTotal = computers[0].price;
    title.innerText = computers[0].title;
    description.innerText = computers[0].description;
    specs.innerText = computers[0].specs;
    imageElement.src = baseUrl + "/" + computers[0].image;
}

const addComputerToMenu = (el) => {
    const computerElement = document.createElement("option");
    computerElement.value = el.id;
    computerElement.appendChild(document.createTextNode(el.title));
    computersElement.appendChild(computerElement);
}

const handlecomputersMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    priceElement.innerText = selectedComputer.price;
    priceTotal = selectedComputer.price;
    title.innerText = selectedComputer.title;
    description.innerText = selectedComputer.description;
    specs.innerText = selectedComputer.specs;
    imageElement.src = baseUrl + "/" + selectedComputer.image;
}

const handleLoan = () => {

    if (boughtPC === false) {
        if (loan <= 0 && balance != 0) {

            loan = prompt("Please enter of amount you want to loan");
            loan = parseFloat(loan);

            let res = isNaN(loan);

            if (res === true) {
                loan = 0;
                return;
            }

            if (loan > (balance * 2)) {

                alert("You cannot loan more than twice the balance");
                loan = 0;
                return;
            }

            balance += loan;
            loanText.innerText = "Loan " + loan;
            balanceText.innerText = balance;

            repayLoanButtonElement.classList.remove("hiddenButton");
            loanButtonElement.classList.add("hiddenButton");
            boughtPC = true;
        }
        else { alert("You need money in the bank to get a loan") }
    }
    else { alert(`You can't have another bank loan. Sorry!`) };
}

const handleBank = () => {

    if (payBalance === 0) {
        alert(`You haven't any money to transfer`);
    }

    if (loan > 0 && payBalance > 0) {
        loan = loan - (payBalance * 0.1);
        loanText.innerText = "Loan " + loan;

        if (loan <= 0) {
            payBalance = payBalance + Math.abs(loan);
            loanText.innerText = null;
            loan = 0;
            repayLoanButtonElement.classList.add("hiddenButton");
            loanButtonElement.classList.remove("hiddenButton");
        }
        payBalance = payBalance - (Math.abs((payBalance) * 0.1));
    }

    balance += payBalance;
    payBalance = 0;
    workText.innerText = payBalance;
    balanceText.innerText = balance;
}

const handleWork = () => {

    payBalance += 100;
    workText.innerText = payBalance;
}

const handleRepayLoan = () => {

    if (payBalance > 0) {
        if (payBalance >= loan) {
            payBalance = payBalance - loan;
            loan = 0;
        }

        workText.innerText = payBalance;

        // // loan = 0;
        // balanceText.innerText = balance;
        if (loan > 0) {
            loanText.innerText = "Loan " + loan;
        } else {
            loanText.innerText = null;
            repayLoanButtonElement.classList.add("hiddenButton");
            loanButtonElement.classList.remove("hiddenButton");
        }
    }
    else {
        alert(`Your're paybalance is zero.You should work a little bit more!`);
    }
}
const handleBuy = () => {

    if (balance >= priceTotal) {
        balance = balance - priceTotal;
        balanceText.innerText = balance;
        alert(`Congratulations! You have bought a new laptop!`);
        boughtPC = false;
    }
    else {
        alert(`Sorry, you don't have enough money (yet)!`)
    }
}

computersElement.addEventListener("change", handlecomputersMenuChange);
loanButtonElement.addEventListener("click", handleLoan);
bankButtonElement.addEventListener("click", handleBank);
workButtonElement.addEventListener("click", handleWork);
repayLoanButtonElement.addEventListener("click", handleRepayLoan);
buyButtonElement.addEventListener("click", handleBuy);



