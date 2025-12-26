const header = document.getElementById('site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const currentYear = document.getElementById('current-year');
const form = document.getElementById('anfrage-form');

// Update copyright year
if (currentYear) {
  currentYear.textContent = '2026';
}

// Mobile navigation toggle
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Smooth scrolling for nav links and buttons
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      navLinks?.classList.remove('open');
    }
  });
});

// Header shadow on scroll & back-to-top button visibility
const handleScroll = () => {
  if (window.scrollY > 40) {
    header?.classList.add('scrolled');
    backToTop?.classList.add('visible');
  } else {
    header?.classList.remove('scrolled');
    backToTop?.classList.remove('visible');
  }
};

window.addEventListener('scroll', handleScroll);

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form validation helper
const validators = {
  name: (value) => value.trim().length > 1,
  email: (value) => /\S+@\S+\.\S+/.test(value),
  anfrageart: (value) => value.trim().length > 0,
  termin: (value) => value.trim().length > 0,
  ort: (value) => value.trim().length > 0,
};

const errorMessages = {
  name: 'Bitte geben Sie Ihren Namen ein.',
  email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  anfrageart: 'Bitte wählen Sie eine Kategorie aus.',
  termin: 'Bitte nennen Sie Ihren Wunschtermin oder Zeitraum.',
  ort: 'Bitte geben Sie den Veranstaltungsort an.',
};

const showError = (input, message) => {
  const errorField = input.parentElement.querySelector('.error-message');
  if (errorField) {
    errorField.textContent = message || '';
  }
  input.classList.toggle('has-error', Boolean(message));
};

const validateField = (input) => {
  const { name, value } = input;
  if (validators[name]) {
    const isValid = validators[name](value);
    showError(input, isValid ? '' : errorMessages[name]);
    return isValid;
  }
  return true;
};

form?.addEventListener('input', (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
    validateField(event.target);
  }
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form) return;

  const formElements = Array.from(form.elements).filter((el) => el.name);
  let allValid = true;

  formElements.forEach((element) => {
    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      const valid = validateField(element);
      if (!valid) {
        allValid = false;
      }
    }
  });

  const successBox = form.querySelector('.form-success');

  if (allValid) {
    const data = {};
    formElements.forEach((element) => {
      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
        data[element.name] = element.value;
      }
    });
    console.log('Anfrage gesendet:', data);
    successBox?.classList.add('visible');
    if (successBox) {
      successBox.textContent = 'Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze mit weiteren Details.';
    }
    form.reset();
  } else {
    successBox?.classList.remove('visible');
    if (successBox) {
      successBox.textContent = '';
    }
  }
});
