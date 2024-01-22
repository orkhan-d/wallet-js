let pwd = localStorage.getItem('password');

if(!pwd) {
    pwd = '0000';
    localStorage.setItem('password', '0000')
}

document.querySelector('.login-btn').addEventListener('click', () => {
    if(document.querySelector('input.pwd').value==pwd) {
        document.querySelector('.modal-login').classList.add('display-none');
    }
})