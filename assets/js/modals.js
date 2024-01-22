let outcomeCategories = [];

document.querySelector('.wallet-btn').addEventListener('click', () => {
    const content = document.querySelector('.content').innerHTML = `
    <div class="add-btns">
        <div class="add-income">➕ Добавить доход</div>
        <div class="change-password">Изменить пароль</div>
        <div class="add-outcome-category">Добавить категорию расходов</div>
        <div class="add-outcome">➕ Добавить расход</div>
    </div>
    `;
});

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