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
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getAnimations("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }
}

function eventListenters() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // New instance of UI Class allows to get its methods & properties.
    const ui = new UI()

    // Budget form submit
    budgetForm.addEventListener('submit', function(event){
        // Not going to be resubmitting everytime 
        event.preventDefault();
    });

    // Expense form submit
    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
    });

    // Expense click
    expenseList.addEventListener('click', function(){});
}

document.addEventListener('DOMContentLoaded', function() {
    eventListenters();
});