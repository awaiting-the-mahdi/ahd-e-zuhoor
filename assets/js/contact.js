/* AHD-E-ZUHOOR: the public contact address.
   Put the address between the quotes (e.g. "hello@example.org") and the Contact link in the
   home page footer and the Contact section on the About page appear. Leave it empty to hide them. */
window.AZ_CONTACT = "";

document.addEventListener("DOMContentLoaded", function () {
  var email = window.AZ_CONTACT;
  if (!email) return;
  document.querySelectorAll("[data-needs-contact]").forEach(function (el) { el.hidden = false; });
  document.querySelectorAll("[data-contact-link]").forEach(function (a) {
    a.href = "mailto:" + email;
    a.textContent = email;
  });
});
