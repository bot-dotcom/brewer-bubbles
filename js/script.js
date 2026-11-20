/* =========================================================
   Brewer Bubbles & Sons: page behaviour
   Each numbered lesson is one small feature. Read top to bottom.
   ========================================================= */


/* ---------------------------------------------------------
   Lesson 0: Progressive enhancement
   The page works with JavaScript turned off. This class tells
   the CSS that JS is running, so it's safe to hide things JS
   can bring back (like the folded-up mobile menu).
   index.html also adds it in <head> so the menu never flashes
   open while the page loads; this line is the backup.
   --------------------------------------------------------- */
document.documentElement.classList.add("js");


/* ---------------------------------------------------------
   Lesson 1: The mobile menu button
   Three steps you'll use constantly:
     1. Find elements      (document.querySelector)
     2. Listen for events  (addEventListener)
     3. Change the page    (attributes and classes)
   --------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");

function setMenu(open) {
  // aria-expanded tells screen readers the state; the class shows it on screen
  navToggle.setAttribute("aria-expanded", String(open));
  navMenu.classList.toggle("is-open", open);
}

navToggle.addEventListener("click", function () {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

// Choosing a link closes the menu so it doesn't cover the section
navMenu.addEventListener("click", function (event) {
  if (event.target.closest(".nav-link")) {
    setMenu(false);
  }
});

// Escape closes the menu and puts keyboard focus back on the button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    navToggle.focus();
  }
});


/* ---------------------------------------------------------
   Lesson 2: "You are here" (scroll spy)
   An IntersectionObserver tells you when an element enters a
   zone of the screen. Here the zone is a thin band across the
   middle, so whichever section crosses it is the current one.
   --------------------------------------------------------- */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

const spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + entry.target.id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  });
}, {
  // root: document measures against THIS page's window, even when the
  // page is shown inside an iframe (which is how CodePen displays pens)
  root: document,
  rootMargin: "-45% 0px -50% 0px"
});

sections.forEach(function (section) {
  spy.observe(section);
});


/* ---------------------------------------------------------
   Lesson 3: A friendlier form
   The browser already knows whether the email is valid
   (type="email" + required). We read its verdict from
   input.validity and show our own message next to the field
   instead of a pop-up bubble that disappears.
   --------------------------------------------------------- */
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const formStatus = document.querySelector("#form-status");

// Only switch off the browser's bubbles once our own messages exist
form.noValidate = true;

function showError(message) {
  emailError.textContent = message;
  email.setAttribute("aria-invalid", "true");
  email.focus();
}

function clearError() {
  emailError.textContent = "";
  email.removeAttribute("aria-invalid");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stay on this page instead of loading the action URL
  formStatus.textContent = "";

  if (email.validity.valueMissing) {
    showError("Please enter your email address.");
    return;
  }

  if (email.validity.typeMismatch) {
    showError("That doesn't look like an email address. Try something like you@example.com.");
    return;
  }

  clearError();

  // On a real site, this is where you'd send the address to your server:
  //   fetch("/subscribe", { method: "POST", body: new FormData(form) });
  formStatus.textContent = "Thanks! We'll email " + email.value + " when there's news.";
  form.reset();
});

// Clear the error as soon as the person fixes it
email.addEventListener("input", function () {
  if (email.getAttribute("aria-invalid") === "true" && email.validity.valid) {
    clearError();
  }
});


/* ---------------------------------------------------------
   Lesson 4: Selecting products (keeping state)
   Each button stores its product in data-name / data-price.
   aria-pressed is both the state AND what screen readers
   announce ("Select Lion Water, toggle button, pressed").
   --------------------------------------------------------- */
const productButtons = document.querySelectorAll(".products .btn");
const summary = document.querySelector("#order-summary");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function updateSummary() {
  const picked = Array.from(productButtons).filter(function (btn) {
    return btn.getAttribute("aria-pressed") === "true";
  });

  if (picked.length === 0) {
    summary.textContent = "No waters selected yet.";
    return;
  }

  const names = picked.map(function (btn) {
    return btn.dataset.name;
  });

  const total = picked.reduce(function (sum, btn) {
    return sum + Number(btn.dataset.price);
  }, 0);

  summary.textContent = "Your picks: " + names.join(", ") + ". Total: " + money.format(total) + ".";
}

productButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const pressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!pressed));
    updateSummary();
  });
});


/* ---------------------------------------------------------
   Lesson 5: Small automation
   The copyright year updates itself every January.
   --------------------------------------------------------- */
document.querySelector("#year").textContent = new Date().getFullYear();


/* ---------------------------------------------------------
   Lesson 6: Measuring the page
   The header's height changes with the screen size (the name
   wraps on small phones). A ResizeObserver reports its real
   height whenever it changes, and we hand that to the CSS as
   --header-h, so in-page links stop just below the header.
   --------------------------------------------------------- */
const header = document.querySelector("#header");

const headerWatcher = new ResizeObserver(function () {
  document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
});

headerWatcher.observe(header);
