var Resume = /** @class */ (function () {
    function Resume() {
        this.personalInfo = { name: "", email: "", phone: "" };
        this.education = [];
        this.workExperience = [];
        this.skills = [];
        this.addEventListeners();
    }
    Resume.prototype.addEventListeners = function () {
        var _this = this;
        var _a, _b, _c;
        var form = document.getElementById('form');
        form.addEventListener('submit', function (event) { return _this.generateResume(event); });
        (_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            _this.addEducationField();
        });
        (_b = document.getElementById('add-work')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            _this.addWorkField();
        });
        (_c = document.getElementById('add-skill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            _this.addSkillField();
        });
    };
    Resume.prototype.addEducationField = function () {
        var container = document.getElementById('education-container');
        var newField = document.createElement('div');
        newField.classList.add('education-item');
        newField.innerHTML = "\n      <label for=\"edu-institution\">Institution:</label>\n      <input type=\"text\" class=\"edu-institution\" required>\n      \n      <label for=\"edu-degree\">Degree:</label>\n      <input type=\"text\" class=\"edu-degree\" required>\n      \n      <label for=\"edu-year\">Year:</label>\n      <input type=\"text\" class=\"edu-year\" required>\n    ";
        container.appendChild(newField);
    };
    Resume.prototype.addWorkField = function () {
        var container = document.getElementById('work-container');
        var newField = document.createElement('div');
        newField.classList.add('work-item');
        newField.innerHTML = "\n      <label for=\"job-title\">Job Title:</label>\n      <input type=\"text\" class=\"job-title\" required>\n      \n      <label for=\"company\">Company:</label>\n      <input type=\"text\" class=\"company\" required>\n      \n      <label for=\"job-year\">Year:</label>\n      <input type=\"text\" class=\"job-year\" required>\n    ";
        container.appendChild(newField);
    };
    Resume.prototype.addSkillField = function () {
        var container = document.getElementById('skills-container');
        var newField = document.createElement('div');
        newField.classList.add('skill-item');
        newField.innerHTML = "\n      <label for=\"skill-name\">Skill:</label>\n      <input type=\"text\" class=\"skill-name\" required>\n      \n      <label for=\"skill-level\">Level (0-100%):</label>\n      <input type=\"number\" class=\"skill-level\" min=\"0\" max=\"100\" required>\n    ";
        container.appendChild(newField);
    };
    Resume.prototype.generateResume = function (event) {
        event.preventDefault();
        var form = event.target;
        this.personalInfo.name = document.getElementById('name').value;
        this.personalInfo.email = document.getElementById('email').value;
        this.personalInfo.phone = document.getElementById('phone').value;
        // Collect education
        var educationItems = document.querySelectorAll('.education-item');
        this.education = Array.from(educationItems).map(function (item) { return ({
            institution: item.querySelector('.edu-institution').value,
            degree: item.querySelector('.edu-degree').value,
            year: item.querySelector('.edu-year').value,
        }); });
        // Collect work experience
        var workItems = document.querySelectorAll('.work-item');
        this.workExperience = Array.from(workItems).map(function (item) { return ({
            title: item.querySelector('.job-title').value,
            company: item.querySelector('.company').value,
            year: item.querySelector('.job-year').value,
        }); });
        // Collect skills
        var skillItems = document.querySelectorAll('.skill-item');
        this.skills = Array.from(skillItems).map(function (item) { return ({
            name: item.querySelector('.skill-name').value,
            level: parseInt(item.querySelector('.skill-level').value),
        }); });
        this.renderResume();
    };
    Resume.prototype.renderResume = function () {
        var resumeContent = document.getElementById('resume-content');
        resumeContent.innerHTML = "\n      <div contenteditable=\"true\" class=\"editable-section\">\n        <h3>Personal Information</h3>\n        <p>Name: <span>".concat(this.personalInfo.name, "</span></p>\n        <p>Email: <span>").concat(this.personalInfo.email, "</span></p>\n        <p>Phone: <span>").concat(this.personalInfo.phone, "</span></p>\n      </div>\n\n      <div contenteditable=\"true\" class=\"editable-section\">\n        <h3>Education</h3>\n        ").concat(this.education.map(function (edu) { return "\n          <p><strong>".concat(edu.institution, "</strong> - ").concat(edu.degree, " (").concat(edu.year, ")</p>\n        "); }).join(''), "\n      </div>\n\n      <div contenteditable=\"true\" class=\"editable-section\">\n        <h3>Work Experience</h3>\n        ").concat(this.workExperience.map(function (work) { return "\n          <p><strong>".concat(work.title, "</strong> at ").concat(work.company, " (").concat(work.year, ")</p>\n        "); }).join(''), "\n      </div>\n\n      <div contenteditable=\"true\" class=\"editable-section\">\n        <h3>Skills</h3>\n        ").concat(this.skills.map(function (skill) { return "\n          <p><strong>".concat(skill.name, "</strong> - ").concat(skill.level, "% proficiency</p>\n        "); }).join(''), "\n      </div>\n    ");
    };
    return Resume;
}());
var resumeApp = new Resume();
