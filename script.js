// ================================
// Audio-Elemente
// ================================
const noSound = document.getElementById("noSound");
const yesSound = document.getElementById("yesSound");
const bgMusic = document.getElementById("bgMusic");

// Lautstärken (sehr dezent)
noSound.volume = 0.6;
yesSound.volume = 0.8;
bgMusic.volume = 0.10; // trägt nur den Moment

// ================================
// App-Container (damit Musik weiterläuft)
// ================================
const app = document.getElementById("app");

// ================================
// Hintergrundmusik beim ersten Klick starten
// ================================
document.body.addEventListener(
  "click",
  () => {
    if (bgMusic.paused) {
      bgMusic.play();
    }
  },
  { once: true }
);

// ================================
// Buttons & Text
// ================================
const noButton = document.querySelector(".no-button");
const yesButton = document.querySelector(".yes-button");
const comment = document.getElementById("comment");

let noTexts = [
  "Bist du sicher? 😏",
  "Ganz sicher? 👀",
  "Das war frech 😤",
  "Ich liebe dich trotzdem 😌",
  "Okay… jetzt reicht’s 😈"
];

let comments = [
  "Mutige Entscheidung.",
  "Ich bin leicht beleidigt.",
  "Das merke ich mir.",
  "Du spielst ein gefährliches Spiel.",
  "Das Universum schaut zu."
];

let index = 0;

// ================================
// NO-Button: frech + Sound
// ================================
noButton.addEventListener("click", () => {
  noSound.currentTime = 0;
  noSound.play();

  noButton.textContent = noTexts[index];
  comment.textContent = comments[index];
  index = (index + 1) % noTexts.length;

  // Ja-Button wird größer
  let size = parseFloat(getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = size * 1.3 + "px";
});

// Nein-Button flieht
noButton.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
});

// ================================
// ❤️ Herzen-Animation (Hintergrund)
// ================================
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 5 + Math.random() * 3 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// alle 2 Sekunden ein Herz
setInterval(spawnHeart, 2000);

// ================================
// YES-Button: Sound + Endscreen + Fade-In + QR
// ================================
yesButton.addEventListener("click", () => {
  // Musik trägt den Moment minimal stärker
  bgMusic.volume = 0.14;

  yesSound.currentTime = 0;
  yesSound.play();

  // Endscreen verzögert anzeigen
  setTimeout(() => {
    app.innerHTML = `
      <div class="fade-in" style="
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background: linear-gradient(135deg, #ff9a9e, #fad0c4);
        text-align:center;
        padding:40px;
        font-family:'Comic Sans MS', Arial, sans-serif;
      ">
        <h1 style="font-size:48px; margin-bottom:20px;">
          Ich liebe dich ❤️
        </h1>

        <p style="font-size:22px; max-width:600px;">
          Danke, dass du <b>Ja</b> gesagt hast –  
          heute, morgen und für immer.
        </p>

        <p style="margin-top:25px;">
          💍 Scan mich 💍
        </p>

        <div id="qrcode" style="margin-top:20px;"></div>
      </div>
    `;

    new QRCode(document.getElementById("qrcode"), {
      text: "https://zyaxx22.github.io/Wedding/",
      width: 160,
      height: 160
    });

  }, 800);
});


