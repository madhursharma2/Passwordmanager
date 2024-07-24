// Generate a random password
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  
  // Save the password along with the website name
  function savePassword(website, password) {
    if (website && password) {
      chrome.storage.sync.get({ passwords: [] }, function (data) {
        let passwords = data.passwords;
        passwords.push({ website, password });
        chrome.storage.sync.set({ passwords }, function () {
          document.getElementById('status').innerText = "Password saved!";
          loadPasswords();
        });
      });
    } else {
      document.getElementById('status').innerText = "Please enter a website and generate a password.";
    }
  }
  
  // Load stored passwords
  function loadPasswords() {
    chrome.storage.sync.get({ passwords: [] }, function (data) {
      let passwords = data.passwords;
      let passwordList = document.getElementById('password-list');
      passwordList.innerHTML = "";
      passwords.forEach(function (item) {
        let listItem = document.createElement('li');
        listItem.textContent = `Website: ${item.website} - Password: ${item.password}`;
        passwordList.appendChild(listItem);
      });
    });
  }
  
  document.getElementById('generate').addEventListener('click', function () {
    let password = generatePassword();
    document.getElementById('password').value = password;
  });
  
  document.getElementById('save').addEventListener('click', function () {
    let website = document.getElementById('website').value;
    let password = document.getElementById('password').value;
    savePassword(website, password);
  });
  
  document.addEventListener('DOMContentLoaded', loadPasswords);
  