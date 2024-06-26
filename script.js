
document.addEventListener('DOMContentLoaded', (event) => {
    displayExpenses();
    updateBalance();
});

function getExpenses() {
    let expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    if (description && amount) {
        const expenses = getExpenses();
        expenses.push({ description, amount: parseFloat(amount) });
        saveExpenses(expenses);
        displayExpenses();
        updateBalance();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please fill in both fields.');
    }
}

function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    displayExpenses();
    updateBalance();
}

function displayExpenses() {
    const expenses = getExpenses();
    const expensesContainer = document.getElementById('expenses');
    expensesContainer.innerHTML = '';

    expenses.forEach((expense, index) => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense';
        expenseElement.innerHTML = `
            <p>${expense.description}: $${expense.amount.toFixed(2)}</p>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesContainer.appendChild(expenseElement);
    });
}

function updateBalance() {
    const expenses = getExpenses();
    const totalBalance = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-balance').innerText = totalBalance.toFixed(2);
}
