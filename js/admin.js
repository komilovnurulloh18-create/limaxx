/* LIMAX Admin Panel Logic */

document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.querySelector("#adminLoginForm");
  if (adminForm) {
    adminForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(adminForm).entries());
      if (data.email === "admin@limax.uz" && data.password === "Admin12345") {
        localStorage.setItem("limax_admin_logged", "1");
        window.location.href = "admin.html#dashboard";
      } else {
        alert("Wrong admin credentials.");
      }
    });
  }

  const zone = document.querySelector("#dropZone");
  const imageInput = document.querySelector("#productImages");
  const preview = document.querySelector("#imagePreview");

  const renderPreview = (files) => {
    if (!preview) return;
    preview.innerHTML = "";
    [...files].forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  if (zone && imageInput) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("glass");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("glass"));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      renderPreview(e.dataTransfer.files);
    });
    imageInput.addEventListener("change", () =>
      renderPreview(imageInput.files),
    );
  }
});
