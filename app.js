let calculateBtn = document.getElementById("calculateBtn");
let amountField = document.getElementById("amount");
let termField = document.getElementById("term");
let interestField = document.getElementById("rate");
let monthlyPaymentField = document.getElementById("monthlyPayment");
let totalPrincipalField = document.getElementById("totalPrincipal");
let totalInterestField = document.getElementById("totalInterest");
let totalCostField = document.getElementById("totalCost");
let table = document.querySelector(".table tbody");

const calculate = () => {
    let loanAmount = parseFloat(amountField.value);
    let interestRate = parseFloat(interestField.value);
    let term = termField.value;
    table.innerHTML = "";

    if (loanAmount <= 0 || isNaN(loanAmount)) {
        monthlyPaymentField.innerHTML = `<span style="color:red">Enter a valid amount!</span>`;
        totalPrincipalField.innerHTML = "$0.00";
        totalCostField.innerHTML = "$0.00";
        totalInterestField.innerHTML = "$0.00";
        return;
    }

    if (interestRate <= 0 || isNaN(interestRate)) {
        monthlyPaymentField.innerHTML = `<span style="color:red">Enter a valid interest rate!</span>`;
        totalPrincipalField.innerHTML = "$0.00";
        totalCostField.innerHTML = "$0.00";
        totalInterestField.innerHTML = "$0.00";
        return;
    }

    if (term <= 0 || term == null) {
        monthlyPaymentField.innerHTML = `<span style="color:red">Enter a valid term!</span>`;
        totalPrincipalField.innerHTML = "$0.00";
        totalCostField.innerHTML = "$0.00";
        totalInterestField.innerHTML = "$0.00";
        return;
    }

    let monthlyPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** (-term));


    let remainingBalance = loanAmount;
    let totalInterest = 0;


    for (let i = 1; i <= term; i++) {

        let interest = remainingBalance * interestRate / 1200;
        let principal = monthlyPayment - interest;
        totalInterest += interest;
        remainingBalance -= principal;

        updateTable(i, monthlyPayment, principal, interest, totalInterest, remainingBalance);

    }

    let totalCost = loanAmount + totalInterest;
    monthlyPaymentField.innerHTML = "$" + monthlyPayment.toFixed(2).toLocaleString();
    totalPrincipalField.innerHTML = "$" + loanAmount.toFixed(2).toLocaleString();
    totalInterestField.innerHTML = "$" + totalInterest.toFixed(2).toLocaleString();
    totalCostField.innerHTML = "$" + totalCost.toFixed(2).toLocaleString();

}

const updateTable = (month, monthlyPayment, principal, interest, totalInterest, balance) => {
    table.innerHTML +=
        `<tr>
        <td>${month}</td>
        <td>${monthlyPayment.toFixed(2)}</td>
        <td>${principal.toFixed(2)}</td>
        <td>${interest.toFixed(2)}</td>
        <td>${totalInterest.toFixed(2)}</td>
        <td>${balance.toFixed(2)}</td>
    </tr>`;


}


calculateBtn.onclick = calculate;
calculate();