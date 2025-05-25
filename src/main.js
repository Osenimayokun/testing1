const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Enhanced Tab Functionality for "How it Works" Section
document.addEventListener("DOMContentLoaded", () => {
  const tabLinks = document.querySelectorAll(".how__link");
  const tabContents = document.querySelectorAll(".how__tab");

  if (tabLinks.length > 0 && tabContents.length > 0) {
    function showTab(targetTab, activeLink) {
      // Hide all tabs first
      tabContents.forEach((tab) => {
        tab.classList.add("hidden");
        tab.classList.remove("active");
        tab.style.opacity = "0";
        tab.style.transform = "translateY(20px)";
      });

      // Remove active class from all links
      tabLinks.forEach((link) => {
        link.classList.remove("how__link-active");
      });

      // Add active class to the clicked link
      if (activeLink) {
        activeLink.classList.add("how__link-active");
      }

      // Show target tab with animation
      const targetTabElement = document.querySelector(
        `.how__tab--${targetTab}`
      );
      if (targetTabElement) {
        setTimeout(() => {
          targetTabElement.classList.remove("hidden");
          targetTabElement.classList.add("active");

          // Trigger reflow
          targetTabElement.offsetHeight;

          targetTabElement.style.opacity = "1";
          targetTabElement.style.transform = "translateY(0)";
        }, 100);
      }
    }

    // Add click event listeners to tab links
    tabLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const tabNumber = this.getAttribute("data-tab");

        // Show corresponding tab and pass the clicked link
        showTab(tabNumber, this);
      });
    });

    // Initialize first tab
    if (tabLinks[0]) {
      showTab("1", tabLinks[0]);
    }
  }
});

// Enhanced FAQ Accordion Functionality
document.addEventListener("DOMContentLoaded", () => {
  const faqSections = document.querySelectorAll(".faq__section");

  faqSections.forEach((section) => {
    const questionBox = section.querySelector(".question__box");
    const answerBox = section.querySelector(".answer__box");
    const icon = section.querySelector(".faq__icon");

    if (questionBox && answerBox && icon) {
      questionBox.addEventListener("click", () => {
        const isActive = section.classList.contains("active");

        // Close all other FAQ sections with animation
        faqSections.forEach((otherSection) => {
          if (
            otherSection !== section &&
            otherSection.classList.contains("active")
          ) {
            otherSection.classList.remove("active");
            const otherAnswer = otherSection.querySelector(".answer__box");
            const otherIcon = otherSection.querySelector(".faq__icon");

            if (otherAnswer && otherIcon) {
              otherAnswer.style.maxHeight = "0";
              otherIcon.style.transform = "rotate(0deg)";
            }
          }
        });

        // Toggle current section
        if (isActive) {
          section.classList.remove("active");
          answerBox.style.maxHeight = "0";
          icon.style.transform = "rotate(0deg)";
        } else {
          section.classList.add("active");
          answerBox.style.maxHeight = answerBox.scrollHeight + "px";
          icon.style.transform = "rotate(180deg)";
        }
      });

      // Add keyboard support
      questionBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          questionBox.click();
        }
      });

      // Make focusable
      questionBox.setAttribute("tabindex", "0");
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");

      // Add staggered animation for child elements
      const animatedChildren = entry.target.querySelectorAll(
        ".animate-card, .animate-faq-item, .animate-partnership-item"
      );
      animatedChildren.forEach((child, index) => {
        setTimeout(() => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add("animate-in");
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up, .feature-card, .partnership__box, .driver__section, .section__contact, .animate-faq-item"
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Enhanced Typewriter Effect
function typeWriter(element, text, speed = 80) {
  if (!element) return;

  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "3px solid";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 1000);
    }
  }

  // Start typing after a short delay
  setTimeout(type, 500);
}

// Initialize typewriter effects
document.addEventListener("DOMContentLoaded", () => {
  const typewriterElements = [
    { selector: ".typewriter", speed: 80 },
    { selector: ".typewriter-driver", speed: 70 },
    { selector: ".typewriter-faq", speed: 90 },
    { selector: ".typewriter-partnership", speed: 100 },
  ];

  typewriterElements.forEach(({ selector, speed }) => {
    const element = document.querySelector(selector);
    if (element) {
      const originalText = element.textContent;
      typeWriter(element, originalText, speed);
    }
  });
});

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Parallax effect for hero section (performance optimized)
const parallaxElements = document.querySelectorAll(".car-img");
const handleParallax = debounce(() => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;

  parallaxElements.forEach((element) => {
    element.style.transform = `translateY(${rate}px)`;
  });
}, 16);

if (parallaxElements.length > 0) {
  window.addEventListener("scroll", handleParallax);
}

// Enhanced Form submission handling
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"], .form__btn');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        const originalBg = submitBtn.style.backgroundColor;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = "Sent!";
          submitBtn.style.backgroundColor = "#28a745";
          submitBtn.classList.remove("loading");

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = originalBg;
            form.reset();

            // Add success animation
            submitBtn.style.transform = "scale(1.05)";
            setTimeout(() => {
              submitBtn.style.transform = "";
            }, 200);
          }, 2000);
        }, 1500);
      }
    });
  });
});

// Enhanced button hover effects
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn, .animate-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", () => {
      if (!button.disabled) {
        button.style.transform = "";
      }
    });
  });
});

// Animate elements on scroll with stagger effect
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".animate-card, .animate-faq-item, .animate-partnership-item"
  );

  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      setTimeout(() => {
        element.classList.add("animate-in");
      }, index * 100);
    }
  });
}

// Throttled scroll listener for better performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(animateOnScroll);
    ticking = true;
    setTimeout(() => {
      ticking = false;
    }, 16);
  }
}

window.addEventListener("scroll", requestTick);

// Add loading animation to page
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transform = "translateY(20px)";

  setTimeout(() => {
    document.body.style.transition = "all 0.6s ease";
    document.body.style.opacity = "1";
    document.body.style.transform = "translateY(0)";
  }, 100);
});

// Enhanced navigation link animations
// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll(".nav__links a, .animate-link");

//   navLinks.forEach((link) => {
//     link.addEventListener("mouseenter", () => {
//       link.style.transform = "translateY(-2px)";
//     });

//     link.addEventListener("mouseleave", () => {
//       link.style.transform = "";
//     });
//   });
// });

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Apply ripple effect to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(
    ".btn, .animate-button, .how__link"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", createRipple);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn, .animate-button, .how__link {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(rippleStyle);

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations to all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";

    setTimeout(() => {
      section.style.transition = "all 0.8s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 200);
  });
});
