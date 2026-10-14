const jobSearch = document.getElementById("jobSearch");
const jobType = document.getElementById("jobType");
const jobCards = Array.from(document.querySelectorAll(".job-card"));
const noResults = document.getElementById("noResults");
const dialog = document.getElementById("infoDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogText = document.getElementById("dialogText");

function filterJobs() {
  const searchTerm = jobSearch.value.trim().toLowerCase();
  const selectedType = jobType.value;
  let visibleCount = 0;

  jobCards.forEach((card) => {
    const matchesSearch = card.dataset.search.includes(searchTerm);
    const matchesType = selectedType === "all" || card.dataset.type === selectedType;
    const shouldShow = matchesSearch && matchesType;
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount++;
  });

  noResults.hidden = visibleCount !== 0;
}

jobSearch.addEventListener("input", filterJobs);
jobType.addEventListener("change", filterJobs);

function showMessage(title, message) {
  dialogTitle.textContent = title;
  dialogText.textContent = message;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.alert(`${title}\n\n${message}`);
}

document.getElementById("loginButton").addEventListener("click", () => {
  showMessage("Welcome back!", "Login is a visual demo only. A real account system needs a backend and database.");
});

document.getElementById("getStartedButton").addEventListener("click", () => {
  showMessage("Let's get started", "Registration is not connected yet. For now, explore the sample jobs and test the search filters.");
});

document.querySelectorAll(".apply-button").forEach((button) => {
  button.addEventListener("click", () => {
    showMessage(button.dataset.job, "This is a sample listing. Applying, messaging, and employer responses will be added when the backend is built.");
  });
});

function closeDialog() {
  if (dialog.open) dialog.close();
}
document.getElementById("dialogClose").addEventListener("click", closeDialog);
document.getElementById("dialogOkay").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});
