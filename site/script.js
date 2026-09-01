// NC Gasfitería — landing page behavior: FAQ accordion + WhatsApp handoff.
(function () {
  "use strict";

  // --- FAQ accordion (single item open at a time) ---
  var faq = document.getElementById("faq");
  if (faq) {
    var items = Array.prototype.slice.call(faq.querySelectorAll(".faq-item"));
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var answer = item.querySelector(".faq-a");
      var sign = item.querySelector(".faq-sign");
      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        items.forEach(function (other) {
          if (other === item) return;
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-a").hidden = true;
          other.querySelector(".faq-sign").textContent = "+";
        });
        var next = !isOpen;
        btn.setAttribute("aria-expanded", String(next));
        answer.hidden = !next;
        sign.textContent = next ? "–" : "+";
      });
    });
  }

  // --- Enrollment form -> WhatsApp handoff ---
  var form = document.getElementById("enroll-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nombre = (data.get("nombre") || "").toString().trim();
      var telefono = (data.get("telefono") || "").toString().trim();
      var correo = (data.get("correo") || "").toString().trim();
      var grupo = (data.get("grupo") || "").toString();
      var pago = (data.get("pago") || "").toString();

      var lines = [
        "Hola, quiero inscribirme en el curso de Gasfitería Domiciliaria.",
        "",
        "Nombre: " + (nombre || "—"),
        "Teléfono: " + (telefono || "—"),
        "Correo: " + (correo || "—"),
        "Grupo: " + (grupo || "—"),
        "Forma de pago: " + (pago || "—")
      ];
      var msg = lines.join("\n");
      var url = "https://wa.me/56965753284?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }
})();
