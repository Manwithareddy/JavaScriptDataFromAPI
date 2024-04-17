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
          <td>${project.id}</td>
          <td>${project.project_name}</td>
          <td>${project.Name}</td>
          <td>${project.project_sponser}</td>
          <td>${project.status}</td>
        `;
        projectBody.appendChild(row);
      });
    }
});

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

  function populateTable(projects) {
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
          <td>${project.id}</td>
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

  function viewProject(id) {
    console.log('View project with ID:', id);
  }

  function editProject(id) {
    console.log('Edit project with ID:', id);
  }

  function deleteProject(id) {
    console.log('Delete project with ID:', id);
  }
  
});
 // Function to edit project
 function editProject(id) {
  // Implement your logic to edit the project with the given ID
  console.log("Editing project with ID:", id);
}
// function deleteProject(id) {
//   if (confirm("Are you sure you want to delete this project?")) {
//     // Call your API to delete the project with the given ID
//     // For demonstration purposes, log the ID to the console
//     console.log("Deleted project with ID:", id);
//     // You may also remove the row from the table visually
//     // document.getElementById('projectRow-' + id).remove();
//   }
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