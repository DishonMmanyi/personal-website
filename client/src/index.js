

// togle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}
// scroll sections
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // active navbar links
      navlinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
      // active sections for animation on scroll 
      sec.classList.add("show-animate");
    }
    // if want to use animation that repeats use this
    else {
      sec.classList.remove('show-animate')
    }
  });
  // sticky header
  let header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100);

  // remove toggle icon and navbar when user clicks on navbar link
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

  // animation footer on scroll 
  let footer = document.querySelector('footer');
  footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);



}

const contactForm = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const loaderIcon = document.getElementById('loading-container');

//form submission handler
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  loaderIcon.style.display = 'block';
  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;

  const formData = new FormData(e.target);

  fetch('https://dishon-website-d4988770f4fe.herokuapp.com//send-email', {
    method: 'POST',
    body: new URLSearchParams(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.text())
    .then((data) => {
      loaderIcon.style.display = 'none';
      const successModal = document.getElementById('successModal');
      successModal.style.display = 'block';
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      // Re-enable the submit button after the request is complete
      submitButton.disabled = false;
    });

});

const closeSuccessModalBtn = document.getElementById('closeSuccessModal');

closeSuccessModalBtn.addEventListener('click', () => {
  const successModal = document.getElementById('successModal');
  successModal.style.display = 'none';
});

