// Client-side form submission handler
// - Expects the form to have id="contactForm" and a `data-endpoint` attribute
// - If `data-endpoint` is set to a Formspree endpoint (https://formspree.io/f/xxxxx) it will POST JSON there
// - If no endpoint is configured, it shows an error and offers a mailto fallback

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const endpoint =
    form.dataset.endpoint && form.dataset.endpoint !== ""
      ? form.dataset.endpoint
      : null;

  const statusEl = document.createElement("div");
  statusEl.className = "form-status";
  statusEl.style.marginTop = "12px";
  form.appendChild(statusEl);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    statusEl.textContent = "";

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      if (!endpoint) throw new Error("No endpoint configured");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        statusEl.style.color = "#0b3b8c";
        statusEl.textContent =
          "Thanks for contacting us. We would be in touch with you!";
        form.reset();
      } else {
        const errText = await res.text().catch(() => "Request failed");
        throw new Error(errText || "Submission failed");
      }
    } catch (err) {
      console.warn("Form submit error:", err);
      statusEl.style.color = "#b91c1c";
      statusEl.innerHTML =
        "There was an issue sending your message from this page." +
        ' <a href="#" id="mailtoFallback">Click to open your email client</a>';

      const mailtoLink = document.getElementById("mailtoFallback");
      if (mailtoLink) {
        mailtoLink.addEventListener("click", function (ev) {
          ev.preventDefault();
          // Build mailto with form fields
          const to = "Echomediahq@outlook.com";
          const subject = encodeURIComponent(
            data.subject || "Website contact — ECHOsystem"
          );
          const bodyParts = [];
          for (const k in data) {
            bodyParts.push(`${k}: ${data[k]}`);
          }
          const body = encodeURIComponent(bodyParts.join("\n"));
          window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
});
