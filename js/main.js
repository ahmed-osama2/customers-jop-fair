
let allcastomrs = [];
let transactions = [];

(async function () {
  let allDataCastoma = await fetch(`http://localhost:3000/customers`);
  allcastomrs = await allDataCastoma.json();

  let allTransactions = await fetch(`http://localhost:3000/transactions`);
  transactions = await allTransactions.json();
  // console.log(finalallTransactions, finalallDataCastoma)

  displayAllCastomrs();




  showAllCha();




})();

function displayAllCastomrs() {

  let boxCustomers = '';
  for (const castomr of allcastomrs) {

    let totalAmout = 0;

    for (const trans of transactions) {

      if (castomr.id == trans.customer_id) {
        totalAmout += trans.amount

      }

    };

    boxCustomers += `
            <tr>
              <td>${castomr.name}</td>
              <td>${totalAmout}</td>
              <td><button id-data ='${castomr.id}' class="btn my-btn">View</button></td>

            </tr>`

  }

  // console.log(boxCustomers);

  $('.my-row').html(boxCustomers);
}


function searchSites() {
  let term = $('.my-serch').val();
  let boxCustomers = '';


  for (const castomr of allcastomrs) {
    if (castomr.name.toLowerCase().includes(term.toLowerCase())) {

      let totalAmout = 0;

      for (const trans of transactions) {

        if (castomr.id == trans.customer_id) {
          totalAmout += trans.amount

        }

      };

      boxCustomers += `
                  <tr>
                    <td>${castomr.name}</td>
                    <td>${totalAmout}</td>
                    <td><button id-data ='${castomr.id}' class="btn my-btn">View</button></td>
      
                  </tr>`




    }

  }


  $('.my-row').html(boxCustomers);
  showAllCha()




};

function serchByAmount() {
  let term = $('.my-number').val();

  let boxCustomers = '';


  for (const castomr of allcastomrs) {
    let totalAmout = 0;

    for (const trans of transactions) {

      if (castomr.id == trans.customer_id) {
        totalAmout += trans.amount

      }
      if (totalAmout.toLocaleString().includes(term)) {


        boxCustomers += `
                    <tr>
                      <td>${castomr.name}</td>
                      <td>${totalAmout}</td>
                      <td><button id-data ='${castomr.id}' class="btn my-btn">View</button></td>
        
                    </tr>`




      }

    };


  }


  $('.my-row').html(boxCustomers);
  showAllCha();




};


$('.my-number').on('input', () => {
  serchByAmount();
  
})


$('.my-serch').on('input', () => {
  searchSites();

})


function showAllCha() {
  for (const btn of $('.my-btn')) {

    $(btn).on('click', () => {

      let date = []
      let transaction = []

      for (const trans of transactions) {

        if ($(btn).attr('id-data') == trans.customer_id) {

          date.push(trans.date);
          transaction.push(trans.amount);


        }

      };

      $('.my-vip').addClass('d-none')

      showCharts(date, transaction)

    })
  }

};


function showCharts(x, y) {
  $('.my-charts').html(`<canvas id="myChart" class="w-50 m-auto"></canvas>`)

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        label: '# of Votes',
        data: y,
        borderWidth: 2
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
}


// *******************************************************************************

let currentTheme = 'light-mode';


$('body').addClass(currentTheme);

$('#darkModeBtn').on('click', function () {
  $('body').removeClass('light-mode').addClass('dark-mode');

  currentTheme = 'dark-mode';
});

$('#lightModeBtn').on('click', function () {
  $('body').removeClass('dark-mode').addClass('light-mode');

  currentTheme = 'light-mode';
});








