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
        if(value==='' || value < 0) {
            this.budgetFeedback.classList.add('showItem');  // ClassList has add or remove
            this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;  // Inner HTML will not show p tag, if were to put textcontent it will show. Displaying ticks allows us to accomplish this.
            const self = this;
            // console.log(this);

            setTimeout(function(){
                // Call back function
                console.log(this);
                console.log(self);
                // Setting it back to default
                self.budgetFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            // All this is doing is pointing back to the class
            // If there is some kind of value that is less than 0
            this.budgetAmount.textContent = value;
            this.budgetInput.value = "";
            this.showBalance();
        }
    }
    // Show balance
    showBalance() {
        // Calculating the expense. Here we select a method rather than going to the UI class.
        const expense = this.totalExpense();
        // Need to grab value in budget. Line #44 pass the value then get it back.
        const total = parseInt(this.budgetAmount.textContent) - expense;
        // Grab the expense going to calculate later then get budget amount from text content where its run via parseINT.
        this.balanceAmount.textContent = total;
        if(total < 0) {
            // Make sure to remove the other classes that is going to be added
            this.balance.classList.remove("showGreen", "showBlack");
            this.balance.classList.add('showRed');
        }
        else if (total > 0) {
            // Make sure to remove the other classes that is going to be added
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
        }
        else if (total === 0) {
            // Make sure to remove the other classes that is going to be added
            this.balance.classList.remove("showRed", "showGreen");
            this.balance.classList.add("showBlack");
        }
    }
    // Submit expense form
    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if(expenseValue === '' || amountValue === '' || amountValue < 0)
        {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p>Values cannot be empty or negative<p>`
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove('showItem');
            }, 4000);
        }
        else{
            let amount = parseInt(amountValue);
            this.expenseInput = "";
            this.amountInput = "";

            let expense = {
                id:this.itemID,
                title: expenseValue,
                amount: amount,
            }
            // Increment each item that is adding has a unique ID
            this.itemID++
            this.itemList.push(expense);
            // Point to method present
            this.addExpense(expense);
            // Show balance
        }
    }
    // Add expense
    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-around">

            <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
            <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

            <div class="expense-icons list-item">
                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
                </a>
                <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
                </a>
            </div>
        </div>
        `;
        this.expenseList.appendChild(div);
    }

    // Total Expense
    totalExpense() {
        let total = 400;
        return total;
    }
}

function eventListenters() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    // New instance of UI Class allows to get its methods & properties.
    const ui = new UI()

    // Budget form submit
    budgetForm.addEventListener("submit", function(event) {
        // Not going to be resubmitting everytime | No need to refresh
        event.preventDefault();
        ui.submitBudgetForm();
    });

    // Expense form submit
    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submitExpenseForm();
    });

    // Expense click
    expenseList.addEventListener("click", function() {});
}

document.addEventListener("DOMContentLoaded", function() {
    eventListenters();
});