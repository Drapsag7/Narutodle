/* --- LISTE PERSONNAGES --- */
const characters = [
  "Minato Namikaze","Itachi Uchiha","Naruto Uzumaki","Kakashi Hatake","Sakura Haruno","Shisui Uchiha",
  "Sakumo Hatake","Madara Uchiha","Obito Uchiha","Hinata Hyuga","Jiraiya","Sasuke Uchiha",
  "Shikamaru Nara","Neji Hyuga","Tobirama Senju","Hashirama Senju","Deidara","Gaara","Sasori",
  "Might Guy","Hidan","Rock Lee","Kushina Uzumaki","Orochimaru","Kurama","Zabuza Momochi",
  "Nagato","Kaguya Otsutsuki","Iruka Umino","Fugaku Uchiha","Tsunade","Haku","Tenten","Mito Uzumaki",
  "Yamato","Kisame Hoshigaki","Teuchi","Konan","Temari","Sai","Killer B","Indra Otsutsuki",
  "Hiruzen Sarutobi","Izuna Uchiha","Rin Nohara","Kiba Inuzuka","Kimimaro","Kakuzu","Might Duy",
  "Ino Yamanaka","Kankuro","Kabuto Yakushi","Mei Terumi","Shino Aburame","Suigetsu Hozuki",
  "Genma Shiranui","Hagoromo Otsutsuki","Asuma Sarutobi","Tayuya","Konohamaru Sarutobi","Akamaru",
  "Karin","Danzo Shimura","Hayate Gekko","Asura Otsutsuki","Utakata","Yagura Karatachi","Samui",
  "Black Zetsu","Darui","Yahiko","Shikaku Nara","Gamabunta","Ten-Tails","Chiyo","Mikoto Uchiha",
  "Shizune","Choji Akimichi","Hanzo","Pakkun","Omoi","Gamatatsu","Chojuro","Gengetsu Hozuki",
  "Yugito Nii","Mu","Karui","Baki","Homura Mitokado","Ebisu","Shima","Hiashi Hyuga","Katsuyu",
  "Gamakichi","Gyuki","Choza Akimichi","Fukasaku","Ao","Koharu Utatane","Mifune","Kurenai Yuhi",
  "Inoichi Yamanaka","Jugo","A Raikage","Onoki"
];

/* --- INDEX DU JOUR --- */
function getDailyIndex(offset = 0) {
  const now = new Date();
  const baseDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
  const seed = Math.floor(baseDay.getTime() / (1000 * 60 * 60 * 24));
  return (seed + offset) % characters.length;
}

/* --- TIMER — COMPTE À REBOURS --- */
function updateTimer(id) {
  const timerSpan = document.getElementById("timerText" + id);

  function refresh() {
    const now = new Date();
    let next8 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);

    if (now >= next8) next8.setDate(next8.getDate() + 1);

    let diff = next8 - now;

    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff / (1000 * 60)) % 60);

    timerSpan.textContent =
      `${hours}h ${minutes < 10 ? "0" : ""}${minutes}m avant le nouveau personnage`;
  }

  refresh();
  setInterval(refresh, 1000 * 60);
}

/* --- TEMPLATE BLOC JOUEUR --- */
function createPlayerBlock(id, index, playerName = "Personnage du jour") {
  return `
    <div class="content-container">
      <div class="scroll-end-left">
        <span class="timer-text" id="timerText${id}"></span>
      </div>

      <h2>${playerName}</h2>

      <div class="card" id="card${id}">
        <div class="image-frame">
          <div class="card-placeholder" id="placeholder${id}">
            🌀 Clique pour découvrir ton personnage 🌀
          </div>
          <div class="character-img" id="img${id}"></div>
        </div>
      </div>

      <button id="btn${id}">Découvrir</button>
    </div>
  `;
}

/* --- REVEAL --- */
function initReveal(id, index) {
  const btn = document.getElementById("btn" + id);
  const card = document.getElementById("card" + id);
  const img = document.getElementById("img" + id);
  const charName = characters[index];

  btn.addEventListener("click", () => {
    img.style.backgroundImage = `url('images/${charName.replace(/ /g, "_")}.png')`;
    card.classList.add("revealed");
    btn.textContent = charName;
    btn.style.backgroundColor = "#f8d7a2";
    btn.style.color = "#3b1d0a";
    btn.disabled = true;
  });
}

/* --- MODE 1 JOUEUR --- */
function loadOnePlayer() {
  const game = document.getElementById("gameArea");
  const idx = getDailyIndex();

  game.innerHTML = createPlayerBlock(1, idx);

  initReveal(1, idx);
  updateTimer(1);
}

/* --- MODE 2 JOUEURS --- */
function loadTwoPlayers() {
  const game = document.getElementById("gameArea");

  const i1 = getDailyIndex(3);
  const i2 = getDailyIndex(4);

  game.innerHTML =
    createPlayerBlock(2, i1, "KING KONG") +
    createPlayerBlock(3, i2, "Fils Kouachi");

  initReveal(2, i1);
  initReveal(3, i2);

  updateTimer(2);
  updateTimer(3);
}

/* --- BOUTON MODE --- */
let modeTwoPlayers = false;
const toggleBtn = document.getElementById("togglePlayersBtn");

toggleBtn.addEventListener("click", () => {
  modeTwoPlayers = !modeTwoPlayers;

  if (modeTwoPlayers) {
    loadTwoPlayers();
    toggleBtn.textContent = "Un joueur";
  } else {
    loadOnePlayer();
    toggleBtn.textContent = "Deux joueurs";
  }
});

/* --- DÉMARRAGE --- */
loadOnePlayer();


