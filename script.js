// Panels
const panels = [
  document.getElementById("panel1"),
  document.getElementById("panel2"),
  document.getElementById("panel3")
];
let current = 0;
const navLeft = document.querySelector(".arrow-left");
const navRight = document.querySelector(".arrow-right");

// Counters
let countdownStarted = false;
let messageCountStarted = false;

// Music
const music = document.getElementById("music");
const playBtn = document.getElementById("play-music");

// Show panel function
function showPanel(i) {
  panels[current].classList.add("hidden");
  current = i;
  panels[current].classList.remove("hidden");

  if (current >= 1) {
    navLeft.classList.add("visible");
    navRight.classList.add("visible");

    if (current === 1 && !countdownStarted) startCountdown();
    if (current === 2 && !messageCountStarted) startMessageCounter();
  } else {
    navLeft.classList.remove("visible");
    navRight.classList.remove("visible");
  }
}

// Navigation
function nextPanel() { if (current < panels.length - 1) showPanel(current + 1); }
function prevPanel() { if (current > 0) showPanel(current - 1); }

// Days since Dec 30, 2024
function daysSinceDate() {
  const start = new Date("2024-12-30");
  const today = new Date();
  return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

// Clock-ticking number animation
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

// Start counters
function startCountdown() {
  countdownStarted = true;
  setTimeout(() => { animateClockNumber(daysSinceDate(), "number"); }, 300);
}

function startMessageCounter() {
  messageCountStarted = true;
  setTimeout(() => { animateClockNumber(64725, "msg-number", "k+"); }, 300);
}

// Click FOR VERNICE → show panel2 + play music
document.getElementById("forVernice").addEventListener("click", () => {
  showPanel(1);
  music.play().catch(() => { playBtn.style.display = "inline-block"; });
});

// Fallback play button
playBtn.addEventListener("click", () => {
  music.play();
  playBtn.style.display = "none";
});

// Floating hearts (front layer)
const heartsContainer = document.querySelector(".hearts-container");
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 12 + Math.random() * 16 + "px";
  heartsContainer.appendChild(heart);
  heart.textContent = "❤️";

  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 500);

// Background hearts (behind panels)
function createBackgroundHeart() {
  const heart = document.createElement("div");
  heart.classList.add("bg-heart");
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 24 + Math.random() * 24 + "px";
  heart.style.opacity = 0.2 + Math.random() * 0.3; // soft background
  heartsContainer.appendChild(heart);
  heart.textContent = "❤️";

  heart.animate([
    { transform: `translateY(0px)`, opacity: heart.style.opacity },
    { transform: `translateY(-800px)`, opacity: 0 }
  ], {
    duration: 15000 + Math.random() * 10000,
    iterations: 1,
    easing: 'linear'
  });

  setTimeout(() => heart.remove(), 15000 + Math.random() * 10000);
}
setInterval(createBackgroundHeart, 1000);
