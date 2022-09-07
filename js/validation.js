function validateFields() {
    toggleButtonsDisable();
    toggleFormError();
};

function isEmailValid() {
    const email = document.querySelector('#email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
};

function isPasswordValid() {
    if (!password) {
        return false;
    }
    return true;
};

function toggleFormError() {
    const email = document.querySelector('#email').value;
    if (!email) {
        document.getElementById('errorMessage-form').style.display = "block";
    }
};

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    document.getElementById('recover-form-btn').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-form-btn').disabled = !emailValid || !passwordValid;
};

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
};