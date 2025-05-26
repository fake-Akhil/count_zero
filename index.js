const articles = [
  {
    title: "Tensions Rise in the South China Sea",
    content: "Countries in Southeast Asia continue to express concern over China's increasing military presence in the South China Sea. Diplomatic talks are underway..."
  },
  {
    title: "UN Security Council Meets Over Middle East Crisis",
    content: "In a high-level meeting today, the UN Security Council convened to discuss the escalating violence in the Middle East and its implications on global stability..."
  },
  {
    title: "Global Markets React to European Election Results",
    content: "Following the unexpected results of the recent European elections, global markets showed mixed reactions. Analysts predict a short-term impact on foreign trade policies..."
  }
];

function showPage(page) {
  const container = document.getElementById('page-container');
  container.innerHTML = '';

  if (page === 'home') {
    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.className = 'article';
      articleDiv.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>`;
      container.appendChild(articleDiv);
    });
  } else if (page === 'about') {
    container.innerHTML = `
      <div class="page-content">
        <h2>About Count Zero</h2>
        <p>Count Zero is your trusted source for daily geopolitical insights and analysis. Founded by Akhil, we aim to deliver in-depth reporting on global affairs, conflicts, diplomacy, and international relations.</p>
      </div>
    `;
  } else if (page === 'contact') {
    container.innerHTML = `
      <div class="page-content">
        <h2>Contact Us</h2>
        <p>You can reach out to us via email at contact@countzero.news or follow us on our social media handles for the latest updates and discussions.</p>
      </div>
    `;
  }
}

// User authentication handling
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const signupMessage = document.getElementById('signup-message');
  const loginMessage = document.getElementById('login-message');
  const signupOverlay = document.getElementById('signup-overlay');
  const loginOverlay = document.getElementById('login-overlay');
  const showLoginLink = document.getElementById('show-login');
  const showSignupLink = document.getElementById('show-signup');

  const mainHeader = document.getElementById('main-header');
  const mainNav = document.getElementById('main-nav');
  const pageContainer = document.getElementById('page-container');
  const mainFooter = document.getElementById('main-footer');

  // Function to show main content
  function showMainContent() {
    signupOverlay.style.display = 'none';
    loginOverlay.style.display = 'none';
    mainHeader.style.display = 'block';
    mainNav.style.display = 'flex';
    pageContainer.style.display = 'block';
    mainFooter.style.display = 'block';
    showPage('home'); // Load home page after successful authentication
  }

  // Handle Signup
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      signupMessage.textContent = 'Passwords do not match.';
      return;
    }

    // In a real application, you'd send this data to a server.
    // For demonstration, we'll store it in localStorage.
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    if (users.some(user => user.username === username)) {
      signupMessage.textContent = 'Username already taken. Please choose another.';
      return;
    }
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      signupMessage.textContent = 'Email already registered. Please login or use a different email.';
      return;
    }


    users.push({ email, username, password });
    localStorage.setItem('users', JSON.stringify(users));

    signupMessage.textContent = 'Registration successful! You can now login.';
    signupMessage.style.color = 'green';
    signupForm.reset(); // Clear the form

    // Optionally, switch to login view after successful signup
    setTimeout(() => {
      signupOverlay.style.display = 'none';
      loginOverlay.style.display = 'flex';
      signupMessage.textContent = ''; // Clear message for next signup attempt
    }, 1500);
  });

  // Handle Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      showMainContent();
    } else {
      loginMessage.textContent = 'Invalid username or password.';
    }
  });

  // Toggle between Signup and Login forms
  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupOverlay.style.display = 'none';
    loginOverlay.style.display = 'flex';
    signupMessage.textContent = ''; // Clear message when switching
  });

  showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginOverlay.style.display = 'none';
    signupOverlay.style.display = 'flex';
    loginMessage.textContent = ''; // Clear message when switching
  });

  // Initially show the signup overlay
  signupOverlay.style.display = 'flex';
});