const outcomesBtn = document.querySelector('.outcomes-btn');
const incomesBtn = document.querySelector('.incomes-btn');

const balanceField = document.querySelector('.balance-field');
let balance = 0;

let outcomes = [];
let incomes = [];

const generateList = (data) => {
    let html = `
        <div class="list">
            <div class="summary summary-headers">
                <p>Период</p>
                <p>Доход</p>
                <p>Расход</p>
            </div>
    `;
    if(data.length>0) {
        data.forEach(oc => {
            html+=`
        <div class="summary-row">
            <p>${typeof oc.date=="string" ? oc.date : oc.date.toLocaleDateString()}</p>
            <p>${oc.income}</p>
            <p>${oc.outcome}</p>
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
    html+=`</div>`;

    return html;
};

const generateMainPage = () => {
    let content = document.querySelector('.content');
    let html = `
        <div class="lists">
    `
    html+=generateList(generateDailyData());
    html+=generateList(generateMonthlyData());
    html+=generateList(generateDailyData());
    html+=generateList(generateYearlyData());

    content.innerHTML = html+'</div></div>';

    document.querySelector('.content').innerHTML = `
    <div class="add-btns">
        <div class="add-income">➕ Добавить доход</div>
        <div class="change-password">Изменить пароль</div>
        <div class="add-outcome-category">Добавить категорию расходов</div>
        <div class="add-outcome">➕ Добавить расход</div>
    </div>
    `+html;

    addOutcomeBtnAction();
    addIncomeBtnAction();
    changePwdBtnAction();
    AccOutcomeCatBtnAction();
}

document.querySelector('.wallet-btn').addEventListener('click', () => {
    generateMainPage();
});

const generateDailyData = () => {
    let data = [];
    outcomes.forEach(oc => {
        let ind = data.findIndex(el => el.date.getDate()===oc.date.getDate());
        if(ind>=0)
            data[ind].outcome += +oc.amount;
        else {
            data.push({
                date: oc.date,
                outcome: +oc.amount,
                income: 0
            });
        }
    });

    incomes.forEach(oc => {
        let ind = data.findIndex(el => el.date.getDate()===oc.date.getDate());
        if(ind>=0)
            data[ind].income += +oc.amount;
        else {
            data.push({
                date: oc.date,
                outcome: 0,
                income: +oc.amount
            });
        }
    });

    return data;
};


const generateMonthlyData = () => {
    let data = [];
    outcomes.forEach(oc => {
        let ind = data.findIndex(
            el => el.date.getFullYear()===oc.date.getFullYear()
                &&
                el.date.getMonth()===oc.date.getMonth()
        );
        if(ind>=0)
            data[ind].outcome += +oc.amount;
        else {
            data.push({
                date: oc.date,
                outcome: +oc.amount,
                income: 0
            });
        }
    });

    incomes.forEach(oc => {
        let ind = data.findIndex(
            el => el.date.getFullYear()===oc.date.getFullYear()
                    &&
                el.date.getMonth()===oc.date.getMonth()
        );
        if(ind>=0)
            data[ind].income += +oc.amount;
        else {
            data.push({
                date: oc.date,
                income: +oc.amount,
                outcome: 0
            });
        }
    });

    const formatter = new Intl.DateTimeFormat('fr', { month: 'short' });

    data.forEach(d => d.date = `${formatter.format(d.date)} ${d.date.getFullYear()}`)


    return data;
};

const generateYearlyData = () => {
    let data = [];
    outcomes.forEach(oc => {
        let ind = data.findIndex(el => el.date.getFullYear()===oc.date.getFullYear());
        if(ind>=0)
            data[ind].outcome += +oc.amount;
        else {
            data.push({
                date: oc.date,
                outcome: +oc.amount,
                income: 0
            });
        }
    });

    incomes.forEach(oc => {
        let ind = data.findIndex(el => el.date.getFullYear()===oc.date.getFullYear());
        if(ind>=0)
            data[ind].income += +oc.amount;
        else {
            data.push({
                date: oc.date,
                income: +oc.amount,
                outcome: 0
            });
        }
    });

    data.forEach(d => d.date = `${d.date.getFullYear()}`)

    return data;
};

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

const addOutcomeBtnAction = () => {
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
}

const AccOutcomeCatBtnAction = () => {
    document.querySelector('.add-outcome-category').addEventListener(
        'click', () => {
            document.querySelector('.modal').innerHTML = `
            <div class="modal-win">
                <p>Введите название категории</p>
                <input class="category" type="text">
                <button class="add-category">Добавить</button>
            </div>
        `;

            document.querySelector('.modal').classList.remove('display-none');

            document.querySelector('.add-category').addEventListener('click', () => {
                let category = document.querySelector('input.category').value;
                if(category.length==0)
                    document.querySelector('input.category').classList.add('red-borders');
                else if(outcomeCategories.indexOf(category)<0)
                    outcomeCategories.push(category);
                console.log(outcomeCategories);
                document.querySelector('.modal').classList.add('display-none');
            });
        }
    );
}

const changePwdBtnAction = () => {
    document.querySelector('.change-password').addEventListener(
        'click', () => {
            document.querySelector('.modal').innerHTML = `
            <div class="modal-win">
                <p>Введите новый пароль</p>
                <input class="password" type="text">
                <button class="change-pwd">Установить</button>
            </div>
        `;

            document.querySelector('.modal').classList.remove('display-none');

            document.querySelector('.change-pwd').addEventListener('click', () => {
                let pwd = document.querySelector('input.password').value;
                if(pwd.length==0) {
                    document.querySelector('input.password').classList.add('red-borders');
                    return;
                }
                localStorage.setItem('password', pwd);
                document.querySelector('.modal').classList.add('display-none');
                console.log(outcomeCategories);
            });
        }
    );
}

const addIncomeBtnAction = () => {
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
};

addOutcomeBtnAction();
addIncomeBtnAction();
changePwdBtnAction();
AccOutcomeCatBtnAction();

showBalance();
generateMainPage();