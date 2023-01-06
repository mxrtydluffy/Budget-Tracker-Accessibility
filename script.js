/*
Set variable to new UI and getting the instance of the class

Convenient because helps keep code clean. Class already has the
contructor, the properties then initializing the methods below.
*/

class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form")
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }

    // Submit budget method
    submitBudgetForm(){
        const value = this.budgetInput.value;
        // Declaring the values
        if(value === '' || value < 0){
            this.budgetFeedback.classList.add('showItem');  // ClassList has add or remove
            this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;  // Inner HTML will not show p tag, if were to put textcontent it will show. Displaying ticks allows us to accomplish this.
            setTimeout(function(){
                this.budgetFeedback.classList.remove('showItem');
            },4000)
        }
    }
}

function eventListenters() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // New instance of UI Class allows to get its methods & properties.
    const ui = new UI()

    // Budget form submit
    budgetForm.addEventListener('submit', function(event) {
        // Not going to be resubmitting everytime | No need to refresh
        event.preventDefault();
        ui.submitBudgetForm();
    });

    // Expense form submit
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
    });

    // Expense click
    expenseList.addEventListener('click', function() {});
}

document.addEventListener('DOMContentLoaded', function() {
    eventListenters();
});