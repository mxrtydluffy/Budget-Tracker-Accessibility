// Set variable to new UI and getting the instance of the class

class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-input");
        this.budgetInput = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        // Add more ElementID
    }
}

function eventListenters(){
    const budgetForm = document.getElementById('budget-form');
    const budgetForm = document.getElementById('budget-form');
}

document.addEventListener('DOMContentLoaded', function(){
    eventListenters();
})