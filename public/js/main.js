document.addEventListener('DOMContentLoaded', function() {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
      window.location.href = 'signin.html'; // Redirect to sign in if no token
  } else {
      displayAdminPanel(); // Display CRUD buttons without checking admin role
      startPolling(); // Start polling for weapons
  }
});

function startPolling() {
  fetchWeapons(); // Initial fetch
  setInterval(fetchWeapons, 2000); // Poll every 2 seconds
}

function fetchWeapons() {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
      console.error('No access token found');
      return;
  }

  fetch('http://localhost:9000/api/weapons', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + accessToken }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(updateWeaponsList)
  .catch(error => {
      console.error('Error fetching weapons:', error);
  });
}

function updateWeaponsList(weapons) {
  const weaponsList = document.getElementById('weaponsList');
  if (!weaponsList) return; // Exit if weaponsList does not exist on the page

  // Create table rows with weapon data
  let rows = weapons.map(weapon =>
      `<tr>
          <td>${weapon.model}</td>
          <td>${weapon.serial_number}</td>
          <td>${weapon.manufacturer}</td>
          <td>${weapon.caliber}</td>
          <td>${weapon.current_location}</td>
          <td>${weapon.status}</td>
          <td>${new Date(weapon.createdAt).toLocaleDateString()}</td>
      </tr>`
  ).join('');

  // Wrap rows in table tags if you are not using an existing <table> element
  weaponsList.innerHTML = `<table>${rows}</table>`;
}

// Display admin panel immediately for demo purposes, replace with actual admin check
function displayAdminPanel() {
  const adminPanel = document.getElementById('adminPanel');
  if (adminPanel) adminPanel.style.display = 'block';
}

// Event listeners for CRUD operations
document.getElementById('createWeaponType').addEventListener('click', function() {
  openModal('Create Weapon Type', {
    action: 'http://localhost:9000/api/weaponTypes/create',
    method: 'POST',
    inputs: [
      { id: 'type_name', placeholder: 'Type Name', type: 'text' },
      { id: 'description', placeholder: 'Description', type: 'text' },
    ]
  });
});

document.getElementById('createWeapon').addEventListener('click', function() {
  openModal('Create Weapon', {
    action: 'http://localhost:9000/api/weapons/create',
    method: 'POST',
    inputs: [
      { id: 'type_id', placeholder: 'Type ID', type: 'number' },
      { id: 'serial_number', placeholder: 'Serial Number', type: 'text' },
      { id: 'manufacturer', placeholder: 'Manufacturer', type: 'text' },
      { id: 'model', placeholder: 'Model', type: 'text' },
      { id: 'caliber', placeholder: 'Caliber', type: 'text' },
      { id: 'current_location', placeholder: 'Current Location', type: 'text' },
      { id: 'status', placeholder: 'Status', type: 'text' },
    ]
  });
});

document.getElementById('updateWeapon').addEventListener('click', function() {
  const weaponId = prompt("Enter the ID of the weapon to update:");
  if (!weaponId) return;

  openModal('Update Weapon', {
    action: `http://localhost:9000/api/weapons/${weaponId}`,
    method: 'PUT',
    inputs: [
      { id: 'user_id', placeholder: 'User ID', type: 'number', value: 1 }, // You might need a proper way to get the current user's ID
      { id: 'type_id', placeholder: 'Type ID', type: 'number', value: 1 },
      { id: 'serial_number', placeholder: 'Serial Number', type: 'text', value: 'DEF67890' },
      { id: 'manufacturer', placeholder: 'Manufacturer', type: 'text', value: 'Updated Manufacturer' },
      { id: 'model', placeholder: 'Model', type: 'text', value: 'Updated Model' },
      { id: 'caliber', placeholder: 'Caliber', type: 'text', value: '7.62mm' },
      { id: 'current_location', placeholder: 'Current Location', type: 'text', value: 'Armory' },
      { id: 'status', placeholder: 'Status', type: 'text', value: 'Out of Stock' }
    ]
  });
})

document.getElementById('deleteWeapon').addEventListener('click', function(){
  const weaponId = prompt("Enter the ID of the weapon to delete:");
  if (!weaponId) return;

  if (confirm(`Are you sure you want to delete weapon with ID ${weaponId}?`)) {
    fetch(`http://localhost:9000/api/weapons/${weaponId}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') }
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Weapon deleted successfully.');
      fetchWeapons();
    })
    .catch(error => {
      alert('Error deleting weapon: ' + error.message);
    });
  }
})

// Add listeners and openModal calls for updateWeapon and deleteWeapon here...

function openModal(title, { action, method, inputs }) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalForm = document.getElementById('modal-form');

  // Set the title and form action/method
  modalTitle.textContent = title;
  modalForm.action = action;
  modalForm.method = method;
  modalForm.innerHTML = ''; // Clear any existing inputs

  // Create input fields
  inputs.forEach(({ id, placeholder, type }) => {
    const inputGroup = document.createElement('div');
    inputGroup.innerHTML = `
      <label for="${id}">${placeholder}</label>
      <input type="${type}" id="${id}" name="${id}" placeholder="${placeholder}" required>
    `;
    modalForm.appendChild(inputGroup);
  });

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = title;
  modalForm.appendChild(submitButton);

  // Add event listener for form submission
  modalForm.onsubmit = handleModalFormSubmit;

  // Display the modal
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function handleModalFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
    },
    body: JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert(data.message);
    }
    fetchWeapons();
    closeModal();
  })
  .catch(error => {
    alert('Error: ' + error.message);
  });
}


function createWeaponType() {
  // Implementation for creating a weapon type
}

function createWeapon() {
  // Implementation for creating a weapon
}

function updateWeapon() {
  // Implementation for updating a weapon
}

function deleteWeapon() {
  // Implementation for deleting a weapon
}
