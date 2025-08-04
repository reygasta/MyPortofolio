/**
 * Main script for Rey Gasta's interactive portfolio.
 *
 * This script handles:
 * 1. Dynamic rendering of portfolio sections (experience, projects, etc.).
 * 2. Interactive UI elements like the typewriter effect, mobile menu, and custom cursor.
 * 3. Scroll-based animations and navigation highlighting.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================================
  // I. CONTENT DATA
  // All portfolio content is stored here for easy updates.
  // ===================================================================================

  const experiences = [
    {
      company: "PT. PLN Nusantara Power UP Paiton Unit 9",
      role: "Instrumentation and Control Intern",
      period: "January 2025 – March 2025",
      logoUrl: "photos/logo/pln.png",
      tasks: [
        "Studied PLC control systems and their implementation.",
        "Performed monitoring, calibration, and fault analysis on control systems.",
        "Created wiring diagrams and ladder logic documentation."
      ],
      images: ["photos/documentation/pln_1.png", "photos/documentation/pln_2.png"]
    },
    {
      company: "PPSDM MIGAS Cepu",
      role: "Operator and Maintenance Intern",
      period: "June 2024 – June 2024",
      logoUrl: "photos/logo/ppsdm_migas.png",
      tasks: [
        "Monitored operational parameters of diesel generators.",
        "Analyzed data to evaluate generator efficiency.",
        "Understood the basic operation of diesel power plants."
      ],
      images: ["photos/documentation/ppsdm_1.png", "photos/documentation/ppsdm_2.png"]
    },
    {
      company: "PT. Jagad Karya Utama",
      role: "Marketing Intern",
      period: "June 2023 – August 2023",
      logoUrl: "photos/logo/jagad.png",
      tasks: [
        "Edited simple photos and videos for product promotion.",
        "Assisted the team in preparing visual content for social media.",
        "Contributed to the company's digital promotion materials."
      ],
      images: ["photos/documentation/djagad_1.png", "photos/documentation/djagad_2.png"]
    }
  ];

  const projects = [
    { title: "Electronics & Smartphone Repair", role: "Freelance Technician", imageUrl: "photos/project/tech.png", description: "Handling repairs of electronic devices, including both hardware and software modifications.", tags: ["Hardware", "Software", "Troubleshooting"] },
    { title: "Password Manager App", role: "Developer (Personal Project)", imageUrl: "photos/project/pass.png", description: "A secure desktop application to store passwords using Python and Tkinter with encryption.", tags: ["Python", "Cryptography", "Desktop"], repoUrl: "https://github.com/reygasta/PasswordManager" },
    { title: "Simple Note-Taking App", role: "Dicoding Final Project", imageUrl: "photos/project/notes-app.png", description: "A simple note-taking application built with React, featuring component management, state, and props.", tags: ["React", "JavaScript", "HTML", "CSS"], repoUrl: "https://github.com/reygasta/notes-app" },
    { title: "Book Catalog", role: "Dicoding Final Project", imageUrl: "photos/project/book-catalog.png", description: "A book catalog application using React to display and manage a list of books.", tags: ["React", "JavaScript", "CSS"], repoUrl: "https://github.com/reygasta/bookself-tugas-akhir" }
  ];

  const achievement = {
    title: "Fest Market Day Finalist 2024",
    description: "I contributed to the development of Vorbank, an innovative solar powered power bank with wireless charging designed for outdoor use and remote areas. Our team successfully built a working prototype, conducted market testing, and created a detailed marketing and financial plan. This project reflects my hands-on involvement in tech innovation, teamwork, and sustainable product development.",
    date: "September 2024",
    imageUrl: "photos/Achievements/vorbank.jpg"
  };

  const certifications = [
    { title: "Front-End Web & React", issuer: "Dicoding", date: "Dec 2024", imageUrl: "photos/certifications/react.png", certificateUrl: "https://drive.google.com/drive/folders/1DtB1LY-AeHOL9QxlDpd1Lze2IL_s3soz" },
    { title: "Cybersecurity Essentials", issuer: "Cisco", date: "Jan 2024", imageUrl: "photos/certifications/cybersecurity.png", certificateUrl: "https://drive.google.com/drive/folders/119xzGZ56dg4ZHxX_AjXHomx3TWrqZKR1" },
    { title: "Data Analysis with Python", issuer: "freeCodeCamp", date: "Dec 2023", imageUrl: "photos/certifications/data-analys.png", certificateUrl: "https://www.freecodecamp.org/certification/reygasta/data-analysis-with-python-v7" },
    { title: "Machine Learning for Beginners", issuer: "Dicoding", date: "Nov 2023", imageUrl: "photos/certifications/machine-learning.png", certificateUrl: "https://drive.google.com/drive/folders/12ejfbTyjRcazsFbuuJj66lBOs61nCvyQ" }
  ];

  const skills = [
    { name: "HTML5", icon: "photos/icons/html-5.svg" },
    { name: "CSS3", icon: "photos/icons/css-3.svg" },
    { name: "React", icon: "photos/icons/react.svg" },
    { name: "Python", icon: "photos/icons/python.svg" },
    { name: "TensorFlow", icon: "photos/icons/tensorflow.svg" },
    { name: "Keras", icon: "photos/icons/keras.svg" },
    { name: "Machine Learning", icon: "photos/icons/machine-learning.svg" },
    { name: "IoT", icon: "photos/icons/iot.svg" },
    { name: "Git", icon: "photos/icons/git.svg" },
    { name: "Electronics Repair", icon: "photos/icons/electronics.svg" },
    { name: "PLC Systems", icon: "photos/icons/plc.svg" },
    { name: "SOLIDWORKS", icon: "photos/icons/solidworks.svg" },
    { name: "Crypto", icon: "photos/icons/crypto.svg" },
    { name: "Technical Analysis", icon: "photos/icons/technical-analysis.svg" }
  ];


  // ===================================================================================
  // II. DYNAMIC CONTENT RENDERING
  // Functions to build and inject HTML into the main document.
  // ===================================================================================

  /**
   * A generic function to render a section with a title, icon, and content.
   * @param {string} containerId - The ID of the section element to populate.
   * @param {string} title - The title of the section.
   * @param {string} iconSvg - The SVG string for the section's icon.
   * @param {string} contentHtml - The HTML content of the section.
   */
  function renderSection(containerId, title, iconSvg, contentHtml) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="flex items-center mb-8">
        ${iconSvg}
        <h2 class="text-2xl md:text-3xl font-bold text-gray-200 ml-3">${title}</h2>
      </div>
      ${contentHtml}
    `;
  }

  function renderExperienceSection() {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-light"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
    const content = `
      <div class="space-y-12">
        ${experiences.map(experience => `
          <div class="bg-secondary-dark/50 p-6 rounded-lg shadow-lg border border-accent-dark group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-accent-dark/30 hover:shadow-2xl flex flex-col lg:flex-row items-start gap-8">
            <div class="flex-grow">
              <div class="flex items-start gap-4">
                <img src="${experience.logoUrl}" alt="${experience.company} logo" class="w-16 h-16 rounded-md object-contain bg-primary-dark p-1 flex-shrink-0" />
                <div>
                  <p class="text-sm font-mono text-gray-500">${experience.period}</p>
                  <h3 class="text-xl font-bold text-gray-100">${experience.role}</h3>
                  <p class="text-lg text-secondary-light">${experience.company}</p>
                </div>
              </div>
              <ul class="list-disc list-inside space-y-1.5 text-secondary-light mt-4 ml-4">
                ${experience.tasks.map(task => `<li>${task}</li>`).join('')}
              </ul>
            </div>
            ${experience.images ? `
              <div class="flex-shrink-0 grid grid-cols-2 gap-3 w-full lg:w-1/3 mt-4 lg:mt-0">
                <div class="group"><img src="${experience.images[0]}" alt="Documentation 1" class="img-card filtered-image" /></div>
                <div class="group"><img src="${experience.images[1]}" alt="Documentation 2" class="img-card filtered-image" /></div>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
    renderSection('experience', 'Experience', icon, content);
  }

  function renderProjectsSection() {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-light"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    const content = `
      <div class="grid md:grid-cols-2 gap-8">
        ${projects.map(project => `
          <div class="bg-secondary-dark/50 rounded-lg shadow-lg border border-accent-dark overflow-hidden group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-accent-dark/30 hover:shadow-2xl">
            <div class="overflow-hidden h-48">
              <img src="${project.imageUrl}" alt="Image for ${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filtered-image"/>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-100">${project.title}</h3>
              <p class="text-primary-light font-semibold mb-2">${project.role}</p>
              <p class="text-secondary-light mb-4 min-h-[3rem]">${project.description}</p>
              <div class="flex flex-wrap gap-x-4 gap-y-2 items-center">
                ${project.tags.map(tag => `<span class="bg-muted-gray text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">${tag}</span>`).join('')}
                ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="text-primary-light font-medium hover:text-white text-sm">Repository</a>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    renderSection('projects', 'Projects', icon, content);
  }
    
  function renderSkillsSection() {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-light"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    const content = `
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        ${skills.map(skill => `
          <div class="group bg-secondary-dark/50 p-4 rounded-lg shadow-lg border border-accent-dark flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-accent-dark hover:-translate-y-2">
            <img src="${skill.icon}" alt="${skill.name} Icon" class="w-10 h-10">
            <p class="mt-3 text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">${skill.name}</p>
          </div>
        `).join('')}
      </div>
    `;
    renderSection('skills', 'Stack & Skills', icon, content);
  }

  function renderAchievementsSection() {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-light"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    const content = `
      <div class="bg-secondary-dark/50 rounded-lg shadow-lg border border-accent-dark overflow-hidden group flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-2 hover:shadow-accent-dark/30 hover:shadow-2xl">
        <div class="md:w-1/2 overflow-hidden">
          <img src="${achievement.imageUrl}" alt="Achievement image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filtered-image"/>
        </div>
        <div class="p-6 md:w-1/2 flex flex-col justify-center">
          <p class="text-gray-400 font-mono text-sm">${achievement.date}</p>
          <h3 class="text-xl font-semibold text-gray-100 mt-1">${achievement.title}</h3>
          <p class="text-secondary-light mt-2 text-justify">${achievement.description}</p>
        </div>
      </div>
    `;
    renderSection('achievements', 'Achievements', icon, content);
  }

  function renderCertificationsSection() {
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-light"><path d="M15.232 5.232a3 3 0 1 1 4.243 4.243l-9.5 9.5-4.243-4.243 9.5-9.5z"></path><path d="m13.5 7.5 4.5 4.5"></path><path d="M2 16l.7.7a3 3 0 0 0 4.243 0l1.414-1.414"></path></svg>`;
    const content = `
      <div class="grid md:grid-cols-2 gap-8">
        ${certifications.map(cert => `
          <div class="bg-secondary-dark/50 p-4 rounded-lg shadow-lg border border-accent-dark flex flex-col sm:flex-row items-center gap-5 group transition-all duration-300 hover:-translate-y-2 hover:shadow-accent-dark/30 hover:shadow-2xl">
            <a href="${cert.certificateUrl}" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 w-full sm:w-48 rounded-md overflow-hidden aspect-w-16 aspect-h-9">
              <img src="${cert.imageUrl}" alt="Certificate for ${cert.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 filtered-image"/>
            </a>
            <div class="flex-grow w-full">
              <h3 class="text-lg font-bold text-gray-100 mt-3 sm:mt-0">${cert.title}</h3>
              <p class="text-primary-light text-sm mb-1">${cert.issuer}</p>
              <p class="text-xs font-mono text-gray-500">${cert.date}</p>
              <a href="${cert.certificateUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-primary-light hover:text-white mt-2">
                View Certificate
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    renderSection('certifications', 'Certifications', icon, content);
  }

  // ===================================================================================
  // III. UI INTERACTIVITY
  // Functions to handle user interaction and animations.
  // ===================================================================================

  /** Initializes the looping typewriter effect for the hero section title. */
  function initTypewriter() {
    const nameElement = document.getElementById('typewriter-name');
    if (!nameElement) return;

    const fullText = "Rey Gasta Isrofiasrory";
    let currentText = '';
    let isDeleting = false;
    const typeSpeed = 120;

    function type() {
      const i = currentText.length;
      if (isDeleting) {
        currentText = fullText.substring(0, i - 1);
      } else {
        currentText = fullText.substring(0, i + 1);
      }

      nameElement.innerHTML = `${currentText}<span class="typewriter-cursor">&nbsp;</span>`;

      let timeout = isDeleting ? typeSpeed / 2 : typeSpeed;

      if (!isDeleting && currentText === fullText) {
        timeout = 2500; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        timeout = 500; // Pause before re-typing
      }

      setTimeout(type, timeout);
    }
    type();
  }

  /** Initializes the fade-in-on-scroll animation for designated elements. */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-element');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  }

  /** Sets up active link highlighting in the navigation bar based on scroll position. */
  function initNavScrollHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a, #mobile-menu a');
    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
          link.classList.add('active');
        }
      });
    });
  }

  /** Initializes the toggle functionality for the mobile navigation menu. */
  function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Hide menu when a link is clicked
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  /** Initializes the custom neon cursor effect. */
  function initNeonCursor() {
    const cursor = document.getElementById('neon-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .group');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
      });
    });
  }

  /** Sets the current year in the footer. */
  function initFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  /** Initializes the "Scroll to Top" button functionality. */
  function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================================================================================
  // IV. INITIALIZATION
  // Entry point to run all initialization functions.
  // ===================================================================================
  
  function main() {
    // Render all dynamic sections
    renderExperienceSection();
    renderProjectsSection();
    renderSkillsSection();
    renderAchievementsSection();
    renderCertificationsSection();

    // Initialize all interactive components
    initTypewriter();
    initScrollAnimations();
    initNavScrollHighlighting();
    initMobileMenu();
    initNeonCursor();
    initFooterYear();
    initScrollToTopButton();
  }
  
  main(); // Run the application
});