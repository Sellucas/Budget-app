const form = {
    email: () => document.querySelector('#email'),
    password: () => document.querySelector('#password'),
    errorMessage: () => document.querySelector('#errorMessage-form'),
    recoverPassword: () => document.querySelector('#recover-form-btn'),
    loginButton: () => document.querySelector('#login-form-btn')
};

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html"
    }
});

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailError();
};

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordError();
};

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(() => {
        hideLoading();
        form.errorMessage().style.visibility = "visible"
    });
};

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email successfully sent!')
    }).catch(() => {
        hideLoading();
        form.errorMessage().style.visibility = "visible";
    });
};

function signup() {
    window.location.href = "pages/signup/signup.html";
};

function isEmailValid() {
    let email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
};

function isPasswordValid() {
    let password = form.password().value
    if (!password) {
        return false;
    }
    return true;
};

function toggleEmailError() {
    let email = form.email().value;
    form.errorMessage().style.visibility = !email ? "visible" : "hidden";
};

function togglePasswordError() {
    let password = form.password().value;
    form.errorMessage().style.visibility = !password ? "visible" : "hidden";
};

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
};