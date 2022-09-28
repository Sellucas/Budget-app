firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
})

function findTransactions(user) {
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionToScreen(transactions);
        })
        .catch(error => {
            console.log(error);
            alert('Error retrieving transactions');
        })
}

function addTransactionToScreen(transactions) {
    const list = document.querySelector('#tbody');

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.classList.add(transaction.type);

        const status = document.createElement('td')
        if (transaction.transactionStatus === 'true') {
            status.innerHTML = `<i class='bx bxs-check-circle'></i>`
        } else {
            status.innerHTML = `<i class='bx bxs-x-circle'></i>`
        }
        row.appendChild(status)

        const date = document.createElement('td');
        date.innerHTML = formatDate(transaction.date);
        row.appendChild(date);

        const description = document.createElement('td');
        description.innerHTML = transaction.transactionDescription;
        row.appendChild(description);

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
    return `${money.value}`
}