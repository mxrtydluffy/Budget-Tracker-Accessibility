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
        // Checking for values
        if(expenseValue === '' || amountValue === '' || amountValue < 0)
        {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `<p>Values cannot be empty or negative<p>`
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            let amount = parseInt(amountValue);     // Converting from string to int
            this.expenseInput.value = "";
            this.amountInput.value = "";

            let expense = {
                id:this.itemID,
                title: expenseValue,
                amount: amount,
            }
            // Increment each item that is adding has a unique ID
            this.itemID++;
            this.itemList.push(expense);
            // Point to method present
            this.addExpense(expense);
            this.showBalance();
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

            <div class="expense-icons list-item d-flex justify-content-center">
                <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
                
                <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
                
            </div>
        </div>
        `;
        this.expenseList.appendChild(div);
    }

    // Total Expense
    totalExpense() {
        // Set amount to 0 since its our starting
        let total = 0;
        if(this.itemList.length > 0){
            // reduce() takes a callback function which takes two parameters
            // It is then looped through the array and the return account returns each & every iteration.
            total = this.itemList.reduce(function(acc,curr){
                console.log(`Total is ${acc} and the current value is ${curr.amount}`);
                // Need current amount since looping through the array
                acc += curr.amount
                return acc;
            },0);
        }
        this.expenseAmount.textContent = total;
        return total;
    }
    // Edit expense  |   Getting access via data-id to get access to the icon
    editExpense(element){
        let id = parseInt(element.dataset.id);
        // Need to get parent bc in div class id='expense-list'
        let parent = element.parentElement.parentElement.parentElement
        // First, remove from the DOM
        this.expenseList.removeChild(parent);
        // Second, remove from the array. Here filter is being used to find the 
        // item in the function that has the id same as #148. Return a new array
        let expense = this.itemList.filter(function(item){
            return item.id === id;
        })
        // Show value
        this.expenseInput.value = expense[0].title;     // Gets value back to form whcih removes from the expenses and balance.
        this.amount.Input.value = expense[0].amount;
        // Third, work with rest of the DOM
        let tempList = this.itemList.filter(function(item){
            return item.id != id;
        })
        this.itemList = tempList;
        this.showBalance();
    }
    // Delete Expense
    deleteExpense(element){
        let id = parseInt(element.dataset.id);
        // Need to get parent bc in div class id='expense-list'
        let parent = element.parentElement.parentElement.parentElement
        // First, remove from the DOM
        this.expenseList.removeChild(parent);
        // Remove from the list
        let tempList = this.itemList.filter(function(item){
            return item.id != id;
        })
        this.itemList = tempList;
        this.showBalance();
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
    expenseList.addEventListener("click", function(event) {
        // Need to search for its class
        if(event.target.parentElement.classList.contains('edit-icon')){
            // Need to get function
            ui.editExpense(event.target.parentElement)
        }
        else if(event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteExpense(event.target.parentElement)
        }
        
    });
}

document.addEventListener("DOMContentLoaded", function() {
    eventListenters();
});