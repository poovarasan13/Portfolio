
async function loadProjects() {
  try {
    const response = await fetch('./projects.json');
    const projects = await response.json();

    const projectCardsContainer = document.getElementById('projectCardsContainer');
    projectCardsContainer.innerHTML = ''; 

    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-4', 'my-4');
      card.innerHTML = `
        <div class="card animate__animated animate__fadeInUp" onclick="showProjectModal(${index})">
          <img src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
          <div class="card-body">
            <h4 class="card-title">${project.title}</h4>
            <h5 class="card-subtitle my-2">${project.subtitle}</h5>
            <p class="card-text">${project.description}</p>
            <div class="row justify-content-center">
            <div class="col-4"><a href="${project.link}" class="btn btn-primary btn-sm text-center" target="_blank">${project.linkText}</a>
            </div></div>
            
          </div>
        </div>
      `;
      projectCardsContainer.appendChild(card);
    });

    window.projects = projects;

  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

function showProjectModal(projectIndex) {
  const project = window.projects[projectIndex];
  const modalBody = document.getElementById('projectModalBody');

  let modalContent = `
    <p><strong>${project.title}</strong> - ${project.subtitle}</p>
    <p>${project.description}</p>
  `;

 
  if (project.Frontend) {
    modalContent += `<p><strong>Frontend:</strong> ${project.Frontend}</p>`;
  }
  if (project.Backend) {
    modalContent += `<p><strong>Backend:</strong> ${project.Backend}</p>`;
  }
  if (project.Database) {
    modalContent += `<p><strong>Database:</strong> ${project.Database}</p>`;
  }


  modalContent += `<a href="${project.link}" class="btn btn-primary btn-sm" target="_blank">${project.linkText}</a>`;


  modalBody.innerHTML = modalContent;

  const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
  projectModal.show();
}


document.addEventListener('DOMContentLoaded', loadProjects);
