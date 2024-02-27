const apiUrl = "https://random-hadith-generator.vercel.app/bukhari";
const hadithContent = document.querySelector("#hadithContent");
const narator = document.querySelector("#Narator");
const refrence = document.querySelector("#Refrence");
const newHadithButton = document.querySelector("#newHadith");
const previousHadithButton = document.querySelector("#previousHadith");
let hadithList = [];
let currentHadithIndex = -1;

async function fetchHadith() {
    try {
        newHadithButton.innerText = "Loading Hadith...";
        const response = await fetch(apiUrl);
        const data = await response.json();

        const hadithEnglish = data.data.hadith_english;
        const narratorInfo = data.data.header;
        const refNo = data.data.refno;

        hadithList.push({ hadithEnglish, narratorInfo, refNo });
        currentHadithIndex = hadithList.length - 1;
        hadithContent.innerText = hadithEnglish;
        narator.innerText = narratorInfo;
        refrence.innerText = refNo;

        newHadithButton.innerText = "New Hadith";
    } catch (error) {
        console.error("Error fetching Hadith:", error);
        hadithContent.innerText = "Failed to load Hadith";
    }
}

function showPreviousHadith() {
    if (currentHadithIndex > 0) {
        currentHadithIndex--;
        const { hadithEnglish, narratorInfo, refNo } = hadithList[currentHadithIndex];
        hadithContent.innerText = hadithEnglish;
        narator.innerText = narratorInfo;
        refrence.innerText = refNo;
    } else {
        hadithContent.innerText = "No previous Hadith available";
    }
}

newHadithButton.addEventListener("click", fetchHadith);
previousHadithButton.addEventListener("click", showPreviousHadith);

// Fetch the first Hadith when the page loads
fetchHadith();