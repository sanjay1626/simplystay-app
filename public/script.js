function revealEmailForm() {
  document.getElementById("continue-btn").style.display = "none";
  document.getElementById("email-form").classList.remove("hidden");
}

// Handle email submission
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailInput = document.querySelector("#email-form input[type='email']");
    const formMessage = document.getElementById("form-message");

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "#b91c1c"; // red
      return;
    }

    formMessage.textContent = "Thanks! We’ll be in touch soon.";
    formMessage.style.color = "#2c7a1b"; // green
    console.log("📧 Submitted email:", email);
  });
});
