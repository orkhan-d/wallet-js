const outcomesBtn = document.querySelector('.outcomes-btn');
const incomesBtn = document.querySelector('.incomes-btn');

const balanceField = document.querySelector('.balance-field');
let balance = 0;

let outcomes = [];
let incomes = [];

let outcomeCategories = [];
let incomeCategories = [];

outcomes.push({
    category: 'cat',
    name: 'name',
    amount: 228,
    date: new Date(2024, 0, 1)
});

outcomesBtn.addEventListener('click', () => {
    let content = document.querySelector('.content');
    let html = `
        <div class="outcomes-list">
            <div class="outcome outcome-headers">
                <p>Категория</p>
                <p>Название</p>
                <p>Сумма</p>
                <p>Дата</p>
            </div>
    `;

    if(outcomes.length>0){
        outcomes.forEach(oc => {
            html+=`
                <div class="outcome">
                    <p>${oc.category}</p>
                    <p>${oc.name}</p>
                    <p>${oc.amount}</p>
                    <p>${oc.date.toLocaleDateString()}</p>
                </div>
            `
        });
    }
    else {
        html+=`
            <div class="no-rows">
                <p>Нет данных!</p>
            </div>
        `
    }
    content.innerHTML = html+'</div>';
});

incomesBtn.addEventListener('click', () => {
    let content = document.querySelector('.content');
    let html = `
        <div class="incomes-list">
            <div class="income income-headers">
                <p>Категория</p>
                <p>Название</p>
                <p>Сумма</p>
                <p>Дата</p>
            </div>
    `;
    if(incomes.length>0) {
        incomes.forEach(oc => {
            html+=`
        <div class="income">
            <p>${oc.category}</p>
            <p>${oc.name}</p>
            <p>${oc.amount}</p>
            <p>${oc.date.toLocaleDateString()}</p>
        </div>
        `
        });
    }
    else {
        html+=`
            <div class="no-rows">
                <p>Нет данных!</p>
            </div>
        `
    }
    content.innerHTML = html+'</div>';
});

const showBalance = () => {
    incomes.forEach(ic => balance+=ic.amount);
    outcomes.forEach(oc => balance-=oc.amount);

    balanceField.innerHTML = balance;
    if(balance<0) {
        balanceField.classList.remove('green-color');
        balanceField.classList.add('red-color');
    }
    else if(balance<0) {
        balanceField.classList.add('green-color');
        balanceField.classList.remove('red-color');
    }
    else {
        balanceField.classList.remove('green-color');
        balanceField.classList.remove('red-color');
    }
}

showBalance();