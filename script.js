document.addEventListener('DOMContentLoaded', function () {
  const projectTable = document.getElementById('projectTable');
  const projectBody = document.getElementById('projectBody');

 
fetch('https://apigenerator.dronahq.com/api/bF5hzk64/data')
    .then(response => response.json())
    .then(data => {
     
      populateTable(data);
    })
    .catch(error => console.error('Error fetching project data:', error));

  
  function populateTable(projects) {
    projectBody.innerHTML = '';
    projects.forEach(project => {
      const row = document.createElement('tr');
      row.innerHTML = `
${project.id}</td>
        <td>${project.project_name}</td>
        <td>${project.Name}</td>
        <td>${project.project_sponser}</td>
        <td>${project.status}</td>
      `;
      projectBody.appendChild(row);
    });
  }
});
function viewProject(id) {
// console.log('View project with ID:', id);
fetch(`https://apigenerator.dronahq.com/api/bF5hzk64/data?id=${id}`)
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      const popupWindow = window.open('', 'popupWindow', 'width=400,height=300');
      popupWindow.document.body.innerHTML = `
      <h2>Id : ${data[0].id}</h2>
      <h2>Project Name : ${data[0].project_name}</h2>
      <h2>Name : ${data[0].Name}</h2>
      <h2>Project Sponser : ${data[0].project_sponser}</h2>
      <h2>Status : ${data[0].status}</h2>`;
    } else {
      console.error('No project data found');
    }
  })
  .catch(error => console.error('Error fetching project data:', error));

}
function editProject(id) {
console.log('Edit project with ID:', id);
}
async function deleteProject(id) {
// console.log('Delete project with ID:', id);
try {
const response = await fetch(`https://apigenerator.dronahq.com/api/bF5hzk64/data/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('Item deleted successfully');
    // Fetch data again to update the table
    fetchData();
  } else {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete item: ${errorMessage}`);
  }
} catch (error) {
  console.error('Error deleting item:', error);
  alert('Failed to delete item. Please try again later.');
}
}
document.addEventListener('DOMContentLoaded', function () {
const projectTable = document.getElementById('projectTable');
const projectBody = document.getElementById('projectBody');
fetch('https://apigenerator.dronahq.com/api/bF5hzk64/data')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      populateTable(data);
    } else {
      console.error('No project data found');
    }
  })
  .catch(error => console.error('Error fetching project data:', error));
async function populateTable(projects) {
  projectBody.innerHTML = '';
  projects.forEach(project => {
    const row = document.createElement('tr');
    console.log(
    project.hasOwnProperty('id'),
    project.hasOwnProperty('name'),
    project.hasOwnProperty('owner'),
    project.hasOwnProperty('sponser'),
    project.hasOwnProperty('status'))
    if (
      project.hasOwnProperty('id') &&
      project.hasOwnProperty('project_name') &&
      project.hasOwnProperty('Name') &&
      project.hasOwnProperty('project_sponser') &&
      project.hasOwnProperty('status')
    ) {
      row.innerHTML = `
${project.id}</td>
        <td>${project.project_name}</td>
        <td>${project.Name}</td>
        <td>${project.project_sponser}</td>
        <td>${project.status}</td>
        <td>
<button class="button view-button" onclick="viewProject(${project.id})">View</button>
<button class="button edit-button" onclick="editProject(${project.id})">Edit</button>
<button class="button delete-button" onclick="deleteProject(${project.id})">Delete</button>
        </td>
      `;
      projectBody.appendChild(row);
    } else {
      console.error('Invalid project data:', project);
    }
  });
}

});
// Function to edit project
function editProject(id) {
// Implement your logic to edit the project with the given ID
console.log("Editing project with ID:", id);
}
function searchProjects() {
const searchTerm = searchInput.value.trim().toLowerCase();
const rows = projectBody.getElementsByTagName('tr');
for (let row of rows) {
  const cells = row.getElementsByTagName('td');
  let found = false;
  for (let cell of cells) {
    if (cell.textContent.trim().toLowerCase().includes(searchTerm)) {
      found = true;
      break;
    }
  }
  if (found) {
row.style.display = '';
  } else {
row.style.display = 'none';
  }
}
}
