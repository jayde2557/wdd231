// =========================================================
// JAYK MUSIC STUDIO
// Music JavaScript Module
// =========================================================

const musicList = document.querySelector("#music-list");

async function getMusic() {

    try {

        const response = await fetch("data/music.json");

        if (!response.ok) {
            throw new Error("Could not load music data.");
        }

        const music = await response.json();

        displayMusic(music);

    } catch (error) {

        console.error(error);

        musicList.innerHTML = `
            <p>
                Sorry, the music could not be loaded right now.
            </p>
        `;
    }
}


function displayMusic(music) {

    musicList.innerHTML = "";

    music.forEach((song) => {

        const card = document.createElement("article");

        card.classList.add("music-card");

        card.innerHTML = `
            <img
                src="${song.cover}"
                alt="${song.title} cover art"
                loading="lazy"
            >

            <p class="music-meta">${song.type} · ${song.genre}</p>

            <h3>${song.title}</h3>

            <p class="music-meta">
                Released: ${song.releaseDate}
            </p>

            <a
                class="button button-secondary"
                href="${song.link}"
                target="_blank"
                rel="noopener"
            >
                Listen
            </a>
        `;

        musicList.appendChild(card);
    });
}


getMusic();