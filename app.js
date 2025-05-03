async function fetchData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30");
    const data = await response.json();
    return data.prices.map(p => ({ time: new Date(p[0]), price: p[1] }));
  }
  
  fetchData().then(data => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.time.toLocaleDateString()),
        datasets: [{
          label: 'BTC Price (USD)',
          data: data.map(d => d.price),
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      }
    });
  });