var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

document.querySelector('#targetPrice').addEventListener('change', (e) => {
    if (isNaN(e.target.value)) {
        e.target.value = ''
    } else {
        e.target.value = formatter.format(e.target.value);
    }
})