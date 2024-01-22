const outcomesBtn = document.querySelector('.outcomes-btn');
const incomesBtn = document.querySelector('.incomes-btn');

const balanceField = document.querySelector('.balance-field');
let balance = 0;

let outcomes = [];
let incomes = [];

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
                <p>Название</p>
                <p>Сумма</p>
                <p>Дата</p>
            </div>
    `;
    if(incomes.length>0) {
        incomes.forEach(oc => {
            html+=`
        <div class="income">
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
    balance = 0;
    incomes.forEach(ic => {
        balance+=+ic.amount;
    });
    outcomes.forEach(oc => {
        balance-=+oc.amount;
    });

    console.log(incomes);
    console.log(outcomes);

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

const categoriesToOptions = () => {
    let html = ``;
    outcomeCategories.forEach(
        c => html+=`<option value="${c}">${c}</option>`
    )

    return html;
};

document.querySelector('.add-outcome').addEventListener(
    'click', () => {
        document.querySelector('.modal').innerHTML = `
            <div class="modal-win">
                <p>Введите название</p>
                <input class="name" type="text">
                <p>Выберите категорию</p>
                <select class="category" type="text">
                    ${categoriesToOptions()}
                </select>
                <p>Введите сумму</p>
                <input class="summ" type="text">
                <button class="add-outcome-btn">Добавить</button>
            </div>
        `;

        document.querySelector('.modal').classList.remove('display-none');

        document.querySelector('.add-outcome-btn').addEventListener('click', () => {
            let name = document.querySelector('input.name').value;
            let category = document.querySelector('select.category').value;
            let summ = document.querySelector('input.summ').value;

            if(name.length==0) {
                document.querySelector('input.name').classList.add('red-borders');
                return;
            }
            else {
                document.querySelector('input.name').classList.remove('red-borders');
            }
            if(!category) {
                document.querySelector('select.category').classList.add('red-borders');
                return;
            }
            else {
                document.querySelector('select.category').classList.remove('red-borders');
            }
            if(summ.length==0) {
                document.querySelector('input.summ').classList.add('red-borders');
                return;
            }
            else {
                document.querySelector('input.summ').classList.remove('red-borders');
            }

            let outcome = {
                name: name,
                category: category,
                amount: summ,
                date: new Date()
            };

            outcomes.push(outcome);

            document.querySelector('.modal').classList.add('display-none');
            showBalance();
        });
    }
);

document.querySelector('.add-income').addEventListener(
    'click', () => {
        document.querySelector('.modal').innerHTML = `
            <div class="modal-win">
                <p>Введите название</p>
                <input class="name" type="text">
                <p>Введите сумму</p>
                <input class="summ" type="text">
                <button class="add-outcome-btn">Добавить</button>
            </div>
        `;

        document.querySelector('.modal').classList.remove('display-none');

        document.querySelector('.add-outcome-btn').addEventListener('click', () => {
            let name = document.querySelector('input.name').value;
            let summ = document.querySelector('input.summ').value;

            if(name.length==0) {
                document.querySelector('input.name').classList.add('red-borders');
                return;
            }
            else {
                document.querySelector('input.name').classList.remove('red-borders');
            }
            if(summ.length==0) {
                document.querySelector('input.summ').classList.add('red-borders');
                return;
            }
            else {
                document.querySelector('input.summ').classList.remove('red-borders');
            }

            let income = {
                name: name,
                amount: summ,
                date: new Date()
            };

            incomes.push(income);

            document.querySelector('.modal').classList.add('display-none');
            showBalance();
        });

    }
);

showBalance();