// =====================================
// MAIN.JS | PART 1 – Initialization, AOS, Basic UX
// =====================================

// 🌐 Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🌍 DOM fully loaded & parsed");

  // 🚀 Page Loader
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.style.display = "none", 600);
    }, 1200);
  }

  // 🧩 Initialize AOS Animations
  AOS.init({
    once: true,
    offset: 80,
    duration: 1000,
    easing: "ease-in-out",
  });

  // 🔝 Back to Top Button Logic
  const backTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backTopBtn.classList.add("visible");
    } else {
      backTopBtn.classList.remove("visible");
    }
  });
  backTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 🎨 Theme Toggle Handler
  const themeSwitch = document.getElementById("themeToggle");
  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // 🔁 Remember Last Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  }

  // 📌 Sticky Navbar Active Link on Scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function activateNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateNav);

  // 🧠 Initialize Services Carousel Animation
  initServicesCarousel();

  // 🕹️ Developer Hotkey Panel
  initHotkeys();

  // 🪩 Easter Egg Detector
  initEasterEggs();
});

// =====================================
// Services Carousel Functionality
// =====================================
function initServicesCarousel() {
  const cards = document.querySelectorAll(".service-card");
  let index = 1;

  const updateCarousel = () => {
    cards.forEach((card, i) => {
      card.classList.remove("left", "center", "right", "active");
      if (i === (index - 1 + cards.length) % cards.length) card.classList.add("left");
      else if (i === index % cards.length) card.classList.add("center", "active");
      else if (i === (index + 1) % cards.length) card.classList.add("right");
    });
  };

  setInterval(() => {
    index = (index + 1) % cards.length;
    updateCarousel();
  }, 4000);

  updateCarousel();
}

// =====================================
// Developer Hotkeys (Shift + D)
// =====================================
function initHotkeys() {
  const hotkeyBox = document.createElement("div");
  hotkeyBox.classList.add("dev-hotkeys");
  hotkeyBox.innerHTML = `🔧 Press <strong>Shift+D</strong> for Dev Panel`;
  document.body.appendChild(hotkeyBox);

  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key.toLowerCase() === "d") {
      alert("🧪 Developer Panel Coming Soon!");
    }
  });
}

// =====================================
// Easter Egg Activation Logic
// =====================================
function initEasterEggs() {
  let code = "";
  const secret = "neonverse";

  document.addEventListener("keypress", (e) => {
    code += e.key.toLowerCase();
    if (code.includes(secret)) {
      document.querySelector(".easter-egg")?.classList.add("show");
      code = "";
    }
  });
}
// =====================================
// PART 2 – FAQ Toggle, Modal Logic, Ripple, Feedback & Promo Controls
// =====================================

(function() {
  // FAQ accordion toggle
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ans = btn.nextElementSibling;
      btn.classList.toggle("open");
      ans.style.maxHeight = ans.style.maxHeight ? "" : ans.scrollHeight + "px";
    });
  });

  // Modal contact popup (floating fab)
  const modal = document.getElementById("contactModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  openBtn?.addEventListener("click", () => modal?.classList.add("show"));
  closeBtn?.addEventListener("click", () => modal?.classList.remove("show"));

  // Ripple effect buttons
  document.querySelectorAll(".ripple-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.classList.add("ripple-animate");
      setTimeout(() => btn.classList.remove("ripple-animate"), 600);
    });
  });

  // Feedback slide-in
  const feedbackSlide = document.getElementById("feedbackSlide");
  const closeFeedback = document.getElementById("closeFeedback");
  setTimeout(() => feedbackSlide?.classList.add("show"), 3000);
  closeFeedback?.addEventListener("click", () => feedbackSlide?.classList.remove("show"));

  // Promo banner
  const promo = document.getElementById("promoBanner");
  const subBtn = document.getElementById("subBtn");
  setTimeout(() => promo?.classList.add("show"), 5000);
  subBtn?.addEventListener("click", () => promo?.classList.remove("show"));
})();
// =====================================
// PART 3 – Canvas Stars Background + Scroll Sync & Animation Metrics
// =====================================

// ⭐ Canvas Stars
function initCanvasStars() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    stars.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > w) s.vx *= -1;
      if (s.y < 0 || s.y > h) s.vy *= -1;
    });
  }

  draw();
  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
}
initCanvasStars();

// 📊 Scroll-triggered Counters
const counterEls = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.getAttribute("data-target");
    let count = 0;
    const increment = Math.ceil(target / 100);
    const update = () => {
      count += increment;
      if (count > target) count = target;
      el.innerText = count;
      if (count < target) requestAnimationFrame(update);
    };
    update();
    observer.unobserve(el);
  });
}, { threshold: 1 });

counterEls.forEach((el) => counterObserver.observe(el));

// 🔄 Scroll Sync for Animated Timeline
function initTimelineScroll() {
  const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  items.forEach((item) => observer.observe(item));
}
initTimelineScroll();

// 🗣️ Voice Command Init (coming in next part!)
console.log("🌐 Canvas + Scroll Animations Initialized!");
// =====================================
// PART 4 – Voice Command, Audio Visualizer & Parallax Layers
// =====================================

(function() {
  // 🎙️ Voice Mode Trigger
  const voiceBtn = document.getElementById("voiceBtn");
  let recognizing = false;
  let recognition;
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    voiceBtn.addEventListener("click", () => {
      recognizing = !recognizing;
      if (recognizing) {
        recognition.start();
        voiceBtn.textContent = "🛸 Listening...";
      } else {
        recognition.stop();
        voiceBtn.textContent = "🎙️ Voice Mode";
      }
    });

    recognition.onresult = (e) => {
      const cmd = e.results[0][0].transcript.toLowerCase();
      if (cmd.includes("contact")) document.getElementById("contactModal")?.classList.add("show");
      if (cmd.includes("dark")) document.body.classList.toggle("dark-mode");
    };
  } else {
    voiceBtn.disabled = true;
    voiceBtn.title = "Voice recognition not supported";
  }

  // 🎧 Audio Visualizer
  const audioCanvas = document.getElementById("audioCanvas");
  if (audioCanvas) {
    const ctx = audioCanvas.getContext("2d");
    audioCanvas.width = audioCanvas.offsetWidth;
    audioCanvas.height = audioCanvas.offsetHeight;
    const audio = new Audio("assets/audio/ambient_loop.mp3");
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const src = audioCtx.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyzer.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function drawVis() {
      requestAnimationFrame(drawVis);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
      const barWidth = audioCanvas.width / bufferLength;
      dataArray.forEach((val, i) => {
        const barHeight = val / 2;
        ctx.fillStyle = `rgb(${val + 100}, 50, 200)`;
        ctx.fillRect(i * barWidth, audioCanvas.height - barHeight, barWidth - 2, barHeight);
      });
    }

    audio.play();
    drawVis();
    audioCanvas.addEventListener("click", () => audio.paused ? audio.play() : audio.pause());
  }

  // 🖼️ Parallax Layers (mouse)
  document.querySelectorAll(".parallax-content, .parallax-layers .layer").forEach(layer => {
    layer.addEventListener("mousemove", (e) => {
      layer.style.transform = `translateX(${e.clientX / 50}px) translateY(${e.clientY / 50}px)`;
    });
  });
})();
// =====================================
// PART 5 – Showreel, Lazy Loading, Chat Widget & Outro
// =====================================

// 🎬 Showreel Video Modal
const videoModal = document.getElementById("videoModal");
const openVideoBtn = document.getElementById("openVideo");
const closeVideoBtn = document.getElementById("closeVideo");
const videoEl = document.getElementById("reelVideo");

openVideoBtn?.addEventListener("click", () => {
  videoModal?.classList.add("visible");
  videoEl?.play();
});
closeVideoBtn?.addEventListener("click", () => {
  videoModal?.classList.remove("visible");
  videoEl?.pause();
  videoEl.currentTime = 0;
});

// 🐢 Lazy load images
document.querySelectorAll("img[data-lazy]").forEach((img) => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = img.getAttribute("data-lazy");
        img.removeAttribute("data-lazy");
        obs.unobserve(img);
      }
    });
  });
  observer.observe(img);
});

// 💬 Chat Widget Toggle
const chatBtn = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
chatBtn?.addEventListener("click", () => {
  chatBox?.classList.toggle("active");
  chatBtn.classList.toggle("opened");
});

// 🔑 Easter Egg Panel (cheat code style)
let cheatCode = "";
const secret = "openpanel";
window.addEventListener("keypress", (e) => {
  cheatCode += e.key.toLowerCase();
  if (cheatCode.includes(secret)) {
    document.getElementById("secretPanel")?.classList.add("visible");
    cheatCode = ""; // Reset
  }
});

// 🏁 Outro Trigger on Scroll Bottom
window.addEventListener("scroll", () => {
  const footer = document.querySelector(".site-footer");
  const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
  if (scrollBottom && footer) {
    footer.classList.add("highlighted");
    setTimeout(() => footer.classList.remove("highlighted"), 3000);
  }
});

// 🧊 Confetti Surprise
function dropConfetti() {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = Math.random() * 100 + "%";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}
setInterval(dropConfetti, 1000);

// ✨ Final Word
console.log("%c🔥 Website JS Effects Fully Loaded!", "color: purple; font-size: 16px");
