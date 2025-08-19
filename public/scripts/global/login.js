let selectedUserType = "";
document.addEventListener("DOMContentLoaded", async function () {
  const doctorButton = document.getElementById("doctorButton");
  const patientButton = document.getElementById("patientButton");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessageElement = document.getElementById("error-message");
  const button = document.getElementById("loginButton");

  doctorButton.addEventListener("click", () => {
  selectedUserType = "doctor";
  doctorButton.classList.add("selected");
  patientButton.classList.remove("selected");

  // Update placeholder and value for doctor
  emailInput.placeholder = "Try: doctor@gmail.com";
  emailInput.value = "doctor@gmail.com";
  passwordInput.value = "demopass";
});

patientButton.addEventListener("click", () => {
  selectedUserType = "patient";
  patientButton.classList.add("selected");
  doctorButton.classList.remove("selected");

  // Update placeholder and value for patient
  emailInput.placeholder = "Try: patient@gmail.com";
  emailInput.value = "patient@gmail.com";
  passwordInput.value = "demopass";
});

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!selectedUserType) {
      errorMessageElement.textContent =
        "Please select a user type (doctor/patient).";
      errorMessageElement.style.display = "block";
      return;
    }

    button.disabled = true;
    errorMessageElement.style.display = "none";

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType: selectedUserType }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.redirect;
      } else {
        errorMessageElement.textContent = data.error || "Invalid credentials.";
        errorMessageElement.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessageElement.textContent = "An error occurred. Please try again.";
      errorMessageElement.style.display = "block";
    } finally {
      button.disabled = false;
    }
  });
});
