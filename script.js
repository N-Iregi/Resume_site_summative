// script.js

// -------------------------------------------
// 1. Toggle responsive navbar on small screens
// -------------------------------------------
// Wait until the page content is fully loaded
window.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const toggleBtn = document.createElement("button");

  // Add hamburger icon and style class
  toggleBtn.textContent = "☰";
  toggleBtn.classList.add("menu-toggle");

  // Insert the toggle button before the navbar
  navbar.parentElement.insertBefore(toggleBtn, navbar);

  // Show or hide navbar when toggle is clicked
  toggleBtn.addEventListener("click", () => {
    navbar.classList.toggle("visible");
  });
});

// -------------------------------------------
// 2. Simple form validation before submitting
// -------------------------------------------
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  const name = form.querySelector("input[type='text']");
  const email = form.querySelector("input[type='email']");
  const message = form.querySelector("textarea");

  // Check for empty fields
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert("Please fill in all fields before submitting.");
    e.preventDefault(); // Prevent form from submitting
  } 
  // Check for a basic valid email structure
  else if (!email.value.includes("@")) {
    alert("Please enter a valid email address.");
    e.preventDefault();
  } 
  else {
    alert("Message sent successfully!");
    form.reset(); // Clear form fields after success
  }
});

// ----------------------------------------------------
// 3. Simple auto-scrolling slider for project cards
// ----------------------------------------------------
const slider = document.querySelector(".projects-container");
let scrollAmount = 1; // Number of pixels to scroll

function autoScrollSlider() {
  if (!slider) return;

  // Move the scroll position
  slider.scrollLeft += scrollAmount;

  // If slider reaches end or start, reverse direction
  if (
    slider.scrollLeft + slider.clientWidth >= slider.scrollWidth ||
    slider.scrollLeft <= 0
  ) {
    scrollAmount *= -1; // Reverse direction
  }
}

// Scroll the slider every 50 milliseconds
setInterval(autoScrollSlider, 50);

// -------------------------------------------
// 4. Modal popup for profile image
// -------------------------------------------
const profileImg = document.querySelector(".profile-img");

if (profileImg) {
  profileImg.style.cursor = "pointer";

  profileImg.addEventListener("click", () => {
    // Create a modal container with enlarged image
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <img src="${profileImg.src}" alt="Enlarged Image" class="modal-img">
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal when close button is clicked
    modal.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    // Close modal if background (outside image) is clicked
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  });
}

// ------------------------------------------------------
// 5. Smooth scroll when navigation links are clicked
// ------------------------------------------------------
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Stop the default jump behavior
    const targetId = this.getAttribute('href');
    const section = document.querySelector(targetId);

    if (section) {
      // Smoothly scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });

      // Highlight section temporarily
      document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active-section');
      });
      section.classList.add('active-section');

      // Remove highlight after 2 seconds
      setTimeout(() => {
        section.classList.remove('active-section');
      }, 2000);
    }
  });
});

// ---------------------------------------------------
// 6. Animate sections to fade in when they appear
// ---------------------------------------------------
const revealSections = document.querySelectorAll('main section');

// Create an intersection observer to track visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add class to fade in the section
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.15 }); // Trigger when 15% of section is visible

// Attach observer to each section
revealSections.forEach(section => observer.observe(section));
