var selectedRow = null;

document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();


    //Get Form Values
    const targetPrice = document.querySelector('#targetPrice').value,
        dateTransaction = document.querySelector('#dateTransaction').value,
        descriptionTransaction = document.querySelector('#descriptionTransaction').value;

    //Validate 
    if (targetPrice == '' || dateTransaction == '' || descriptionTransaction == '') {
        alert('Please fill in all data!')
    } else if (selectedRow == null) {
        const list = document.querySelector('#tbody'),
            row = document.createElement('tr');

        row.innerHTML = `
            <td><i class='bx bxs-check-circle'></i></td>
            <td>${dateTransaction}</td>
            <td>${descriptionTransaction}</td>
            <td>${targetPrice}</td>
            <td><i class='bx bx-pencil'></i> <i class='bx bx-trash'></i></td>
        `
        list.appendChild(row);
        selectedRow = null;
        closeModal();
    }
})