// ====== Navbar Hamburger Toggle ======
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
	hamburger.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		navLinks.classList.toggle("active");
	});
}

// ====== Smooth Scroll for Nav Links ======
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
			navLinks.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});
});

// ====== Scroll Animations ======
const revealElements = document.querySelectorAll(
	".section, .service-item, .project-item"
);

const revealOnScroll = () => {
	const triggerBottom = window.innerHeight * 0.85;
	revealElements.forEach((el) => {
		const boxTop = el.getBoundingClientRect().top;
		if (boxTop < triggerBottom) {
			el.classList.add("show");
		}
	});
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ====== Toast helper ======
function createToastIfMissing() {
	let t = document.getElementById("toast");
	if (!t) {
		t = document.createElement("div");
		t.id = "toast";
		t.className = "toast";
		document.body.appendChild(t);
	}
	return t;
}
const toast = createToastIfMissing();

function showToast(message, type = "success") {
	toast.textContent = message;
	toast.className = `toast show ${type}`;
	clearTimeout(showToast._timeout);
	showToast._timeout = setTimeout(() => {
		toast.classList.remove("show");
	}, 3000);
}

// ====== EmailJS integration (sendForm) ======
(function () {
	// initialize EmailJS with your public key
	if (typeof emailjs !== "undefined" && emailjs.init) {
		emailjs.init("2_da1t6wSjuDoCc7w");
	} else {
		console.warn(
			"EmailJS library not loaded. Make sure you added the EmailJS script in <head>."
		);
	}
})();

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
	contactForm.addEventListener("submit", (e) => {
		e.preventDefault();

		// Use sendForm so EmailJS maps form field names to template variables automatically.
		emailjs
			.sendForm("service_m9rwad9", "template_1ynemwi", contactForm)
			.then(() => {
				showToast("✅ Message sent successfully!", "success");
				contactForm.reset();
			})
			.catch((error) => {
				console.error("EmailJS error:", error);
				showToast(
					"❌ Failed to send message. Try again later.",
					"error"
				);
			});
	});
}
