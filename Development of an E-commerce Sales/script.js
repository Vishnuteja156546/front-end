document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
  } else {
    alert('Invalid login!');
  }
});

document.getElementById('send-btn').addEventListener('click', async () => {
  const message = document.getElementById('chat-input').value;
  const chatBox = document.getElementById('chat-box');
  
  chatBox.innerHTML += `<div><strong>User:</strong> ${message}</div>`;
  document.getElementById('chat-input').value = '';

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
});

document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('chat-box').innerHTML = '';
});
// Example of handling form submission on Contact page
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for contacting us!');
  });
  