function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById('recover-form-btn').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-form-btn').disabled = !emailValid || !passwordValid;
};

function isEmailValid() {
    const email = document.querySelector('#email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.querySelector('#password').value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
};