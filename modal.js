const form = {
    date: () => document.querySelector('#dateTransaction'),
    value: () => document.querySelector('#valueTransaction'),
    description: () => document.querySelector('#descriptionTransaction'),
    currency: () => document.querySelector('#currencySelect'),
    type: () => document.querySelector('#typeSelect'),
    checkStatusTrue: () => document.querySelector('#checkStatusTrue'),
    submitBtn: () => document.getElementById('submit'),
    errorMessage: () => document.querySelector('#errorMessage-form')
}

function submitTransaction() {
    const transaction = createTransaction();

    firebase.firestore()
        .collection('transactions')
        .add(transaction)
        .then(() => {
            closeModal();
        })
        .catch(() => {
            alert('Error sending transaction')
        })
}

function createTransaction() {
    return {
        type: form.type().value,
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: form.value().value
        },
        transactionStatus: form.checkStatusTrue().checked ? 'true' : 'false',
        transactionDescription: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

function onChangeDate() {
    const date = form.date().value;
    form.errorMessage().style.visibility = !date ? 'visible' : 'hidden';
    toggleSubmitButtonDisabled()
}

function onChangeValue() {
    const value = form.value().value;
    form.errorMessage().style.visibility = value <= 0 ? 'visible' : 'hidden';
    toggleSubmitButtonDisabled()
}

function onChangeDescription() {
    const description = form.description().value;
    form.errorMessage().style.visibility = description.length == '0' ? 'visible' : 'hidden';
    toggleSubmitButtonDisabled()
}

function onChangeCurrency() {
    const currency = form.currency().value;
    form.errorMessage().style.visibility = !currency ? 'visible' : 'hidden';
    form.value().disabled = false

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: `${form.currency().value}`,
    });

    document.querySelector('#valueTransaction').addEventListener('change', (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = ''
        } else {
            e.target.value = formatter.format(e.target.value);
        }
    })

    toggleSubmitButtonDisabled()
}

function onChangeType() {
    const type = form.type().value;
    form.errorMessage().style.visibility = !type ? 'visible' : 'hidden';
    toggleSubmitButtonDisabled()
}

function toggleSubmitButtonDisabled() {
    form.submitBtn().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if (!date) {
        return false
    }

    const value = form.value().value;
    if (!value || value <= 0) {
        return false
    }

    const description = form.description().value;
    if (description.length == '0') {
        return false
    }

    const currency = form.currency().value;
    if (!currency) {
        return false
    }

    const type = form.type().value;
    if (!type) {
        return false
    }

    return true
}

/* var selectedRow = null;

document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();

    //Get All Form Values
    const valueTransaction = document.querySelector('#valueTransaction').value,
        dateTransaction = document.querySelector('#dateTransaction').value,
        descriptionTransaction = document.querySelector('#descriptionTransaction').value,
        typeTransaction = document.querySelector('#inputGroupSelect01').value,
        statusTransaction = checkedRadio.value;

    //Validate 
    if (valueTransaction == '' || dateTransaction == '' || descriptionTransaction == '' || typeTransaction == '0') {
        alert('Please, fill in all data!')
    } else if (selectedRow == null) {
        const list = document.querySelector('#tbody'),
            row = document.createElement('tr');

        row.innerHTML = `
            <td><i class='bx bxs-check-circle'></i></td>
            <td>${dateTransaction}</td>
            <td>${descriptionTransaction}</td>
            <td>${valueTransaction}</td>
            <td><i class='bx bx-pencil'></i> <i class='bx bx-trash'></i></td>
        `
        list.appendChild(row);
        selectedRow = null;
        closeModal();
    }
}); */

function closeModal() {
    window.location.reload(true)
};