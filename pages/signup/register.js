const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    dataError: () => document.getElementById('errorMessage-form'),
    signUpBtn: () => document.getElementById('singup-form-btn')
};

function onChangeEmail() {
    const email = form.email().value;
    form.dataError().style.visibility = email ? "hidden" : "visible";
    form.dataError().style.visibility = validateEmail(email) ? "hidden" : "visible";
    toggleSignUpBtnDisable();
};

function onChangePassword() {
    const password = form.password().value;
    form.dataError().style.visibility = password ? "hidden" : "visible";
    form.dataError().style.visibility = password.length >= 8 ? "hidden" : "visible";
    validatePasswordsMatch();
    toggleSignUpBtnDisable();
};

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleSignUpBtnDisable();
};

function validatePasswordsMatch() {
    const confirmPassword = form.confirmPassword().value;
    const password = form.password().value;
    form.dataError().style.visibility = password === confirmPassword ? "hidden" : "visible";
};

function toggleSignUpBtnDisable() {
    form.signUpBtn().disabled = !isFormValid();
};

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false
    }

    const password = form.password().value;
    if (!password || password.length < 8) {
        return false
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false
    }

    return true;
}