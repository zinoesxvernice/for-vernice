const panels = Array.from(document.querySelectorAll(".panel"));
let current = 0;

const navLeft = document.querySelector(".arrow-left");
const navRight = document.querySelector(".arrow-right");

const music = document.getElementById("music");
const playBtn = document.getElementById("play-music");

// Flags for one-time animations
let countdownStarted = false;
let messageCountStarted = false;
let timelineStarted = false;

// ---------------- SHOW PANEL ----------------
function showPanel(index) {
  if (index < 0 || index >= panels.length) return;

  current = index;
  panels.forEach((panel, i) => panel.classList.toggle("hidden", i !== index));

  navLeft.classList.toggle("visible", current > 0);
  navRight.classList.toggle("visible", current < panels.length - 1);

  // Run animations only once per panel
  if (current === 1 && !countdownStarted) {
    countdownStarted = true;
    startCountdown();
  }
  if (current === 2 && !messageCountStarted) {
    messageCountStarted = true;
    startMessageCounter();
  }
  if (current === 3 && !timelineStarted) {
    timelineStarted = true;
    startTimeline();
  }
}

// ---------------- NAVIGATION ----------------
function nextPanel() { showPanel(current + 1); }
function prevPanel() { showPanel(current - 1); }

navLeft.addEventListener("click", prevPanel);
navRight.addEventListener("click", nextPanel);

// ---------------- FOR VERNICE ----------------
document.getElementById("forVernice").addEventListener("click", () => {
  showPanel(1); // Always go to Days panel, do NOT auto-advance
  music.play().catch(() => { playBtn.style.display = "inline-block"; });
});

playBtn.addEventListener("click", () => {
  music.play();
  playBtn.style.display = "none";
});

// ---------------- FLOATING HEARTS ----------------
const heartsContainer = document.querySelector(".hearts-container");
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 16) + "px";
  heart.textContent = "❤️";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 500);

// ---------------- COUNTERS ----------------
function daysSinceDate() {
  const start = new Date("2024-12-30");
  const today = new Date();
  return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

function animateClockNumber(finalNumber, containerId, suffix = "") {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  [...finalNumber.toString()].forEach((num, i) => {
    const span = document.createElement("span");
    span.className = "digit";
    span.textContent = "0";
    container.appendChild(span);

    let currentDigit = 0;
    const interval = setInterval(() => {
      span.textContent = currentDigit;
      currentDigit = (currentDigit + 1) % 10;
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      span.textContent = num;
    }, 800 + i * 400);
  });

  if (suffix) {
    setTimeout(() => {
      const suffixSpan = document.createElement("span");
      suffixSpan.textContent = suffix;
      suffixSpan.style.marginLeft = "4px";
      suffixSpan.style.color = "#ff3b3b";
      suffixSpan.style.fontWeight = "800";
      container.appendChild(suffixSpan);
    }, 800 + finalNumber.toString().length * 400);
  }
}

function startCountdown() {
  setTimeout(() => animateClockNumber(daysSinceDate(), "number"), 300);
}

function startMessageCounter() {
  setTimeout(() => animateClockNumber(64725, "msg-number", "k+"), 300);
}

// ---------------- TIMELINE ----------------
const timelineEvents = [
  { date: "Dec 30, 2024", label: "First met" },
  { date: "Jan 15, 2025", label: "First message" },
  { date: "Feb 14, 2025", label: "First Valentine’s" },
  { date: "Mar 01, 2025", label: "First date" },
  { date: "Apr 10, 2025", label: "Special memory" }
];

function startTimeline() {
  const container = document.querySelector("#panel4 .timeline-container");
  if (!container) return;

  container.innerHTML = `<div class="timeline-line"></div>`;
  const line = container.querySelector(".timeline-line");
  line.style.width = "0";

  setTimeout(() => line.style.width = "100%", 300);

  setTimeout(() => {
    timelineEvents.forEach((event, i) => {
      const percent = (i / (timelineEvents.length - 1)) * 100;

      // Branch
      const branch = document.createElement("div");
      branch.className = "timeline-branch";
      branch.style.left = percent + "%";
      branch.style.top = "50%";
      container.appendChild(branch);
      setTimeout(() => branch.style.height = "50px", i * 300);

      // Point
      const point = document.createElement("div");
      point.className = "timeline-point";
      point.style.left = percent + "%";
      container.appendChild(point);
      setTimeout(() => {
        point.style.opacity = "1";
        point.style.transform = "translate(-50%, -150%)";
      }, i * 400 + 800);

      // Label top/bottom
      const label = document.createElement("div");
      label.className = "timeline-label";
      label.style.left = percent + "%";
      label.style.top = (i % 2 === 0) ? "calc(50% - 60px)" : "calc(50% + 20px)";
      label.textContent = `${event.date} – ${event.label}`;
      label.style.opacity = "0";
      label.style.transition = "all 0.5s ease";
      container.appendChild(label);

      setTimeout(() => {
        label.style.opacity = "1";
        label.style.transform = "translateY(0)";
      }, i * 500 + 1000);
    });
  }, 2000);
}
