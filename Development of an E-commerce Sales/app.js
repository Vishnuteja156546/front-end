// Chatbot Functionality

// DOM Elements
const chatContainer = document.createElement('div');
chatContainer.className = 'chat-container';
document.body.appendChild(chatContainer);

chatContainer.innerHTML = `
  <div class="chat-header">
    <h3>Chatbot</h3>
    <button id="close-chat">×</button>
  </div>
  <div class="chat-body">
    <div id="chat-messages"></div>
  </div>
  <div class="chat-footer">
    <input type="text" id="user-input" placeholder="Ask me about products..." />
    <button id="send-btn">Send</button>
  </div>
`;

// CSS for the Chatbot
const style = document.createElement('style');
style.innerHTML = `
  .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    max-width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 1000;
  }

  .chat-header {
    background-color: #007bff;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .chat-body {
    padding: 10px;
    height: 300px;
    overflow-y: auto;
    flex-grow: 1;
  }

  #chat-messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message {
    padding: 8px 12px;
    border-radius: 20px;
    max-width: 70%;
  }

  .user-message {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
  }

  .bot-message {
    align-self: flex-start;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
  }

  .chat-footer {
    display: flex;
    gap: 10px;
    padding: 10px;
  }

  #user-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  #send-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
  }
`;

document.head.appendChild(style);

// Close Chat Functionality
document.getElementById('close-chat').addEventListener('click', () => {
  chatContainer.style.display = 'none';
});

// Send Message Functionality
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

const productData = [
  { name: 'Laptop 1', price: '$800.00', description: 'High-performance laptop for work and gaming.' },
  { name: 'Mobile 1', price: '$500.00', description: 'Smartphone with excellent camera and battery life.' },
  // Add more mock products here
];

sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, 'user');
    userInput.value = '';
    handleBotResponse(userMessage);
  }
});

// Add message to chat
function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}-message`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle Bot Responses
function handleBotResponse(userMessage) {
  let response = "Sorry, I didn't understand that. Please ask about our products.";
  if (userMessage.toLowerCase().includes('products')) {
    response = 'Here are some of our products:\n';
    productData.forEach((product) => {
      response += `${product.name} - ${product.price}: ${product.description}\n`;
    });
  } else if (userMessage.toLowerCase().includes('hello')) {
    response = 'Hi! How can I assist you today?';
  } else if (userMessage.toLowerCase().includes('thank')) {
    response = 'You’re welcome! Let me know if you have more questions.';
  }

  setTimeout(() => addMessage(response, 'bot'), 500); // Simulate delay
}
