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

  // Open modal with form inputs
  openUpdateWeaponModal(weaponId);
});

function openUpdateWeaponModal(weaponId) {
  const modal = document.getElementById('modal');
  const form = document.getElementById('modal-form');
  modal.style.display = 'block';

  // Populate form with existing weapon data if needed or provide empty inputs
  form.innerHTML = `
    <input type="number" id="user_id" value="1" placeholder="User ID (assumed)">
    <input type="number" id="type_id" placeholder="Type ID">
    <input type="text" id="serial_number" placeholder="Serial Number">
    <input type="text" id="manufacturer" placeholder="Manufacturer">
    <input type="text" id="model" placeholder="Model">
    <input type="text" id="caliber" placeholder="Caliber">
    <input type="text" id="current_location" placeholder="Current Location">
    <input type="text" id="status" placeholder="Status">
    <button type="button" onclick="submitWeaponUpdate(${weaponId})">Update Weapon</button>
  `;

  // Close button to hide modal
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cancel';
  closeButton.onclick = function() { modal.style.display = 'none'; };
  form.appendChild(closeButton);
}

function submitWeaponUpdate(weaponId) {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
      console.error('No access token found');
      return;
  }

  const data = {
      user_id: document.getElementById('user_id').value,
      type_id: document.getElementById('type_id').value,
      serial_number: document.getElementById('serial_number').value,
      manufacturer: document.getElementById('manufacturer').value,
      model: document.getElementById('model').value,
      caliber: document.getElementById('caliber').value,
      current_location: document.getElementById('current_location').value,
      status: document.getElementById('status').value
  };

  fetch(`http://localhost:9000/api/weapons/${weaponId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      alert('Weapon updated successfully!');
      fetchWeapons(); // Update the weapons list
      document.getElementById('modal').style.display = 'none'; // Close the modal
  })
  .catch(error => {
      alert('Error updating weapon: ' + error.message);
  });
}

document.getElementById('deleteWeapon').addEventListener('click', function() {
  const weaponId = prompt("Enter the ID of the weapon to decommission:");
  if (!weaponId) return;

  // User confirmation to proceed with decommissioning
  if (confirm(`Are you sure you want to decommission weapon with ID ${weaponId}?`)) {
      openDecommissionWeaponModal(weaponId);
  }
});

function openDecommissionWeaponModal(weaponId) {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const form = document.getElementById('modal-form');
  form.innerHTML = `
    <h3>Decommission Weapon</h3>
    <p>Are you sure you want to decommission this weapon?</p>
    <button type="button" onclick="submitWeaponDecommission(${weaponId})">Decommission Weapon</button>
    <button type="button" onclick="closeModal()">Cancel</button>
  `;
}

function submitWeaponDecommission(weaponId) {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
      console.error('No access token found');
      return;
  }

  fetch(`http://localhost:9000/api/weapons/${weaponId}`, {
      method: 'DELETE', // Using POST as an example, adjust according to your API method settings
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({ status: "decommissioned" }) // Only changing the status
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to decommission weapon due to network response.');
      }
      return response.json();
  })
  .then(data => {
      alert(data.message || 'Weapon decommissioned successfully.');
      fetchWeapons(); // Refresh the weapon list
      closeModal(); // Close the modal
  })
  .catch(error => {
      alert('Error decommissioning weapon: ' + error.message);
  });
}
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
      method: form.method, // This should be PUT for update operation
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
