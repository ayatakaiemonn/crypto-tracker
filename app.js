async function fetchData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30");
    const data = await response.json();
    return data.prices.map(p => ({ time: new Date(p[0]), price: p[1] }));
  }
  
  const toggleButton = document.getElementById('toggleMode');
  
  toggleButton.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      toggleButton.textContent = '🌙 ダークモード切替';
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      toggleButton.textContent = '☀️ ライトモード切替';
    }
  });
  
  // 初期設定（デフォルトでライト）
  document.body.classList.add('light-mode');
  
  fetchData().then(data => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.time.toLocaleDateString()),
        datasets: [{
          label: 'BTC Price (USD)',
          data: data.map(d => d.price),
          borderColor: '#007bff',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              font: {
                size: 14
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price (USD)',
              font: {
                size: 14
              }
            },
            ticks: {
              beginAtZero: false
            },
            grid: {
              color: '#e0e0e0'
            }
          }
        }
      }
    });
  });