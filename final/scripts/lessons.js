// =========================================================
// JAYK MUSIC STUDIO
// WDD231 Individual Project
// Lessons JavaScript Module
// =========================================================

const lessonList = document.querySelector("#lesson-list");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

const levelFilter = document.querySelector("#level-filter");
const ageFilter = document.querySelector("#age-filter");

const lessonModal = document.querySelector("#lesson-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDetails = document.querySelector("#modal-details");
const modalClose = document.querySelector("#modal-close");

let lessons = [];


// =========================================================
// FETCH LESSON DATA
// =========================================================

async function getLessons() {

    try {

        const response = await fetch("data/lessons.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        lessons = await response.json();

        loadingMessage.hidden = true;

        populateFilters(lessons);
        displayLessons(lessons);

    } catch (error) {

        console.error("Unable to load lesson data:", error);

        loadingMessage.hidden = true;
        errorMessage.hidden = false;
    }
}


// =========================================================
// DISPLAY LESSONS
// =========================================================

function displayLessons(items) {

    lessonList.innerHTML = "";

    if (items.length === 0) {

        lessonList.innerHTML = `
            <p class="no-results">
                No lessons match your selected filters.
            </p>
        `;

        return;
    }

    items.forEach((lesson) => {

        const card = document.createElement("article");

        card.classList.add("lesson-card");

        card.innerHTML = `
            <p class="lesson-level">${lesson.level}</p>

            <h3>${lesson.name}</h3>

            <p>
                <strong>Age:</strong> ${lesson.ageRange}
            </p>

            <p>
                <strong>Duration:</strong> ${lesson.duration}
            </p>

            <p>
                <strong>Price:</strong> ${lesson.price}
            </p>

            <button
                class="button button-secondary lesson-details"
                type="button"
                data-id="${lesson.id}"
            >
                View Details
            </button>
        `;

        lessonList.appendChild(card);
    });

    addModalListeners();
}


// =========================================================
// POPULATE FILTERS
// =========================================================

function populateFilters(items) {

    const levels = [...new Set(
        items.map((lesson) => lesson.level)
    )];

    levels.forEach((level) => {

        const option = document.createElement("option");

        option.value = level;
        option.textContent = level;

        levelFilter.appendChild(option);
    });


    const ageGroups = [...new Set(
        items.map((lesson) => lesson.ageRange)
    )];

    ageGroups.forEach((age) => {

        const option = document.createElement("option");

        option.value = age;
        option.textContent = age;

        ageFilter.appendChild(option);
    });
}


// =========================================================
// FILTER LESSONS
// =========================================================

function filterLessons() {

    const selectedLevel = levelFilter.value;
    const selectedAge = ageFilter.value;

    const filteredLessons = lessons.filter((lesson) => {

        const levelMatches =
            selectedLevel === "all" ||
            lesson.level === selectedLevel;

        const ageMatches =
            selectedAge === "all" ||
            lesson.ageRange === selectedAge;

        return levelMatches && ageMatches;
    });

    displayLessons(filteredLessons);

    // Remember the visitor's filter preferences
    localStorage.setItem(
        "preferredLessonLevel",
        selectedLevel
    );

    localStorage.setItem(
        "preferredLessonAge",
        selectedAge
    );
}


// =========================================================
// MODAL
// =========================================================

function addModalListeners() {

    const detailButtons =
        document.querySelectorAll(".lesson-details");

    detailButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const lessonId = Number(button.dataset.id);

            const selectedLesson =
                lessons.find((lesson) => lesson.id === lessonId);

            if (!selectedLesson) {
                return;
            }

            modalTitle.textContent = selectedLesson.name;

            modalDetails.innerHTML = `
                <p>
                    <strong>Level:</strong>
                    ${selectedLesson.level}
                </p>

                <p>
                    <strong>Age range:</strong>
                    ${selectedLesson.ageRange}
                </p>

                <p>
                    <strong>Lesson duration:</strong>
                    ${selectedLesson.duration}
                </p>

                <p>
                    <strong>Price:</strong>
                    ${selectedLesson.price}
                </p>

                <p>
                    ${selectedLesson.description}
                </p>
            `;

            lessonModal.showModal();
        });
    });
}


// =========================================================
// MODAL CLOSE EVENTS
// =========================================================

modalClose.addEventListener("click", () => {
    lessonModal.close();
});

lessonModal.addEventListener("click", (event) => {

    if (event.target === lessonModal) {
        lessonModal.close();
    }
});


// =========================================================
// FILTER EVENTS
// =========================================================

levelFilter.addEventListener("change", filterLessons);
ageFilter.addEventListener("change", filterLessons);


// =========================================================
// RESTORE SAVED PREFERENCES
// =========================================================

function restorePreferences() {

    const savedLevel =
        localStorage.getItem("preferredLessonLevel");

    const savedAge =
        localStorage.getItem("preferredLessonAge");

    if (savedLevel) {
        levelFilter.value = savedLevel;
    }

    if (savedAge) {
        ageFilter.value = savedAge;
    }
}


// =========================================================
// START
// =========================================================

getLessons().then(() => {
    restorePreferences();
    filterLessons();
});