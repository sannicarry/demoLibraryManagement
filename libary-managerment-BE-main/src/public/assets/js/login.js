const btnSubmit = document.getElementById('login-form');
const btnAccount = document.getElementById('account')
const btnPassword = document.getElementById('password')

//onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())

btnSubmit.onsubmit = function(event) {
    event.preventDefault();
    const acccountValue = btnAccount.value;
    const passwordValue = btnPassword.value;
    if(acccountValue === 'admin' && passwordValue === '123456') {
        location.assign('./client-library.html')
    } else {
        alert('Sai tên đăng nhập hoặc mật khẩu, vui lòng thử lại!')
        btnAccount.value = ''
        btnPassword.value = ''
        btnAccount.focus();
    }
}