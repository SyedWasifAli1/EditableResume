type Education = { institution: string; degree: string; year: string };
type WorkExperience = { title: string; company: string; year: string };
type Skill = { name: string; level: number };

class Resume {
  personalInfo = { name: "", email: "", phone: "" };
  education: Education[] = [];
  workExperience: WorkExperience[] = [];
  skills: Skill[] = [];

  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    const form = document.getElementById('form') as HTMLFormElement;
    form.addEventListener('submit', (event) => this.generateResume(event));

    document.getElementById('add-education')?.addEventListener('click', () => {
      this.addEducationField();
    });

    document.getElementById('add-work')?.addEventListener('click', () => {
      this.addWorkField();
    });

    document.getElementById('add-skill')?.addEventListener('click', () => {
      this.addSkillField();
    });
  }

  addEducationField() {
    const container = document.getElementById('education-container')!;
    const newField = document.createElement('div');
    newField.classList.add('education-item');
    newField.innerHTML = `
      <label for="edu-institution">Institution:</label>
      <input type="text" class="edu-institution" required>
      
      <label for="edu-degree">Degree:</label>
      <input type="text" class="edu-degree" required>
      
      <label for="edu-year">Year:</label>
      <input type="text" class="edu-year" required>
    `;
    container.appendChild(newField);
  }

  addWorkField() {
    const container = document.getElementById('work-container')!;
    const newField = document.createElement('div');
    newField.classList.add('work-item');
    newField.innerHTML = `
      <label for="job-title">Job Title:</label>
      <input type="text" class="job-title" required>
      
      <label for="company">Company:</label>
      <input type="text" class="company" required>
      
      <label for="job-year">Year:</label>
      <input type="text" class="job-year" required>
    `;
    container.appendChild(newField);
  }

  addSkillField() {
    const container = document.getElementById('skills-container')!;
    const newField = document.createElement('div');
    newField.classList.add('skill-item');
    newField.innerHTML = `
      <label for="skill-name">Skill:</label>
      <input type="text" class="skill-name" required>
      
      <label for="skill-level">Level (0-100%):</label>
      <input type="number" class="skill-level" min="0" max="100" required>
    `;
    container.appendChild(newField);
  }

  generateResume(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    
    this.personalInfo.name = (document.getElementById('name') as HTMLInputElement).value;
    this.personalInfo.email = (document.getElementById('email') as HTMLInputElement).value;
    this.personalInfo.phone = (document.getElementById('phone') as HTMLInputElement).value;

    // Collect education
    const educationItems = document.querySelectorAll('.education-item');
    this.education = Array.from(educationItems).map(item => ({
      institution: (item.querySelector('.edu-institution') as HTMLInputElement).value,
      degree: (item.querySelector('.edu-degree') as HTMLInputElement).value,
      year: (item.querySelector('.edu-year') as HTMLInputElement).value,
    }));

    // Collect work experience
    const workItems = document.querySelectorAll('.work-item');
    this.workExperience = Array.from(workItems).map(item => ({
      title: (item.querySelector('.job-title') as HTMLInputElement).value,
      company: (item.querySelector('.company') as HTMLInputElement).value,
      year: (item.querySelector('.job-year') as HTMLInputElement).value,
    }));

    // Collect skills
    const skillItems = document.querySelectorAll('.skill-item');
    this.skills = Array.from(skillItems).map(item => ({
      name: (item.querySelector('.skill-name') as HTMLInputElement).value,
      level: parseInt((item.querySelector('.skill-level') as HTMLInputElement).value),
    }));

    this.renderResume();
  }

  renderResume() {
    const resumeContent = document.getElementById('resume-content')!;
    resumeContent.innerHTML = `
      <div contenteditable="true" class="editable-section">
        <h3>Personal Information</h3>
        <p>Name: <span>${this.personalInfo.name}</span></p>
        <p>Email: <span>${this.personalInfo.email}</span></p>
        <p>Phone: <span>${this.personalInfo.phone}</span></p>
      </div>

      <div contenteditable="true" class="editable-section">
        <h3>Education</h3>
        ${this.education.map(edu => `
          <p><strong>${edu.institution}</strong> - ${edu.degree} (${edu.year})</p>
        `).join('')}
      </div>

      <div contenteditable="true" class="editable-section">
        <h3>Work Experience</h3>
        ${this.workExperience.map(work => `
          <p><strong>${work.title}</strong> at ${work.company} (${work.year})</p>
        `).join('')}
      </div>

      <div contenteditable="true" class="editable-section">
        <h3>Skills</h3>
        ${this.skills.map(skill => `
          <p><strong>${skill.name}</strong> - ${skill.level}% proficiency</p>
        `).join('')}
      </div>
    `;
  }
}

const resumeApp = new Resume();
