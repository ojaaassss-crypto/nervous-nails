const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const bookingForm = document.querySelector("[data-booking-form]");
const formStatus = document.querySelector("[data-form-status]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const request = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      vibe: formData.get("vibe"),
      createdAt: new Date().toISOString(),
    };

    const savedRequests = JSON.parse(localStorage.getItem("nervousNailsBookings") || "[]");
    savedRequests.push(request);
    localStorage.setItem("nervousNailsBookings", JSON.stringify(savedRequests));

    const bookingMessage = [
      "Nervous Nails booking request",
      `Name: ${request.name}`,
      `Contact: ${request.contact}`,
      `Service: ${request.service}`,
      `Date: ${request.date}`,
      `Time: ${request.time}`,
      `Nail vibe: ${request.vibe}`,
    ].join("\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingMessage).catch(() => {});
    }

    formStatus.textContent = `Thanks ${request.name}. Your request is saved and ready to DM to Harleen on Instagram.`;
    bookingForm.reset();
  });
}
