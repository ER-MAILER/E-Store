// Sample data - In real app, this would come from API or database
let orders = [
  {
    id: "E-Store_230815-1234",
    customer: "Rahim Store",
    amount: 1250.50,
    status: "completed",
    date: "2023-08-15",
    items: [
      {id: 1, name: "8 Pin Switch Board", price: 20.50, quantity: 2},
      {id: 5, name: "2 Pin Round Plug", price: 3.00, quantity: 10}
    ],
    salesman: "Ali"
  },
  {
    id: "E-Store_230815-1235",
    customer: "Karim Electronics",
    amount: 850.00,
    status: "pending",
    date: "2023-08-15",
    items: [
      {id: 3, name: "4 Pin Switch Board", price: 1.00, quantity: 50},
      {id: 7, name: "3 Pin Plug 13 Amp", price: 15.00, quantity: 2}
    ],
    salesman: "Raju"
  }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  updateDateTime();
  setInterval(updateDateTime, 60000);
  
  loadDashboardData();
  renderOrdersTable();
  initCharts();
});

function updateDateTime() {
  const now = new Date();
  document.getElementById('currentDateTime').textContent = now.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function loadDashboardData() {
  // In real app, fetch from API
  const todayOrdersCount = orders.filter(o => o.date === getTodayDate()).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  
  document.getElementById('todayOrders').textContent = todayOrdersCount;
  document.getElementById('pendingOrders').textContent = pendingOrdersCount;
  document.getElementById('completedOrders').textContent = completedOrdersCount;
  document.getElementById('totalRevenue').textContent = `৳${totalRevenue.toFixed(2)}`;
}

function renderOrdersTable() {
  const tbody = document.querySelector('#ordersTable tbody');
  tbody.innerHTML = '';
  
  orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>৳${order.amount.toFixed(2)}</td>
      <td><span class="status ${order.status}">${order.status}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="btn btn-primary" onclick="viewOrder('${order.id}')">View</button>
        ${order.status === 'pending' ? 
          `<button class="btn btn-danger" onclick="completeOrder('${order.id}')">Complete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function initCharts() {
  // Orders chart
  const ordersCtx = document.getElementById('ordersChart').getContext('2d');
  new Chart(ordersCtx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Orders',
        data: [12, 19, 8, 15, 12, 10, 5],
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Sales chart
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (৳)',
        data: [12500, 15000, 11000, 18000, 20000, 22000],
        backgroundColor: 'rgba(76, 201, 240, 0.2)',
        borderColor: 'rgba(76, 201, 240, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer}\nAmount: ৳${order.amount}\nStatus: ${order.status}\nItems: ${order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}`);
  }
}

function completeOrder(orderId) {
  if (confirm('Mark this order as completed?')) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'completed';
      renderOrdersTable();
      loadDashboardData();
      alert('Order marked as completed!');
    }
  }
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
