firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
})

function findTransactions(user) {
    showLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            hideLoading();
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionToScreen(transactions);
            console.log(snapshot.docs.map(doc => doc.data()))
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Error retrieving transactions')
        })
}

function addTransactionToScreen(transactions) {
    const list = document.querySelector('#tbody');

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.classList.add(transaction.type);

        const status = document.createElement('td')
        if (transaction.transactionStatus === true) {
            status.innerHTML = `<i class='bx bxs-check-circle'></i>`
        } else {
            status.innerHTML = `<i class='bx bxs-x-circle'></i>`
        }

        row.appendChild(status)

        const date = document.createElement('td');
        date.innerHTML = formatDate(transaction.date);
        row.appendChild(date);

        const type = document.createElement('td');
        type.innerHTML = transaction.transactionType;
        row.appendChild(type);

        const money = document.createElement('td');
        money.innerHTML = formatMoney(transaction.money);
        row.appendChild(money);

        const actions = document.createElement('td')
        actions.innerHTML = `<i class='bx bx-pencil'></i> <i class='bx bx-trash'></i>`
        row.appendChild(actions)

        list.appendChild(row)
    })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

/* var selectedRow = null;
document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();

    //Get Radio Values
    let radioButtonGroup = document.getElementsByName("inlineRadioOptions");
    let checkedRadio = Array.from(radioButtonGroup).find(
        (radio) => radio.checked
    );

    //Get All Form Values
    const valueTransaction = document.querySelector('#targetPrice').value,
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