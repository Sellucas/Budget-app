// BarChart - Incomes & Expenses
const bar = document.getElementById('barChart');
const barChart = new Chart(bar, {
    type: 'bar',
    data: {
        labels: ['Icomes', 'Expenses'],
        datasets: [{
            data: [21000, 12000],
            backgroundColor: [
                'rgb(90, 140, 53)',
                'rgb(196, 69, 58)'
            ]

        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// DoughnutChart - Incomes Status
const doughnut = document.getElementById('doughnutChart');
const doughnutChart = new Chart(doughnut, {
    type: 'doughnut',
    data: {
        labels: ['Received', 'Wasn\'t received'],
        datasets: [{
            data: [21000, 12000],
            backgroundColor: [
                'rgb(90, 140, 53)',
                'rgb(196, 69, 58)'
            ]

        }]
    }
});

// DoughnutChart - Expenses Status
const pie = document.getElementById('pieChart');
const pieChart = new Chart(pie, {
    type: 'pie',
    data: {
        labels: ['It was paid', 'Not paid'],
        datasets: [{
            data: [21000, 12000],
            backgroundColor: [
                'rgb(90, 140, 53)',
                'rgb(196, 69, 58)'
            ]

        }]
    }
});