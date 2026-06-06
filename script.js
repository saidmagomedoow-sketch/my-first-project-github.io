
let subjects = Object.keys(DB);

let currentSubject = 0;
let currentQ = 0;
let score = 0;
let time = 20;
let timer;

function startExam() {

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("examScreen").style.display = "block";

    showQuestion();
    startTimer();
}

function startTimer() {

    clearInterval(timer);

    time = 20;

    timer = setInterval(() => {

        document.getElementById("info").innerHTML =
            `⏳ Вақт: ${time} сония`;

        time--;

        if (time < 0) {

            clearInterval(timer);

            currentQ++;

            let subject = subjects[currentSubject];

            if (currentQ >= DB[subject].length) {
                currentSubject++;
                currentQ = 0;
            }

            if (currentSubject >= subjects.length) {
                showResult();
                return;
            }

            showQuestion();
            startTimer();
        }

    }, 1000);
}

function showQuestion() {

    let subject = subjects[currentSubject];
    let q = DB[subject][currentQ];

    document.getElementById("quiz").innerHTML = `

        <h3>📘 ${subject}</h3>

        <p>${q.q}</p>

        <button class="option"
            onclick="selectAnswer('${q.options[0]}','${q.a}')">
            A) ${q.options[0]}
        </button>

        <button class="option"
            onclick="selectAnswer('${q.options[1]}','${q.a}')">
            B) ${q.options[1]}
        </button>

        <button class="option"
            onclick="selectAnswer('${q.options[2]}','${q.a}')">
            C) ${q.options[2]}
        </button>

        <button class="option"
            onclick="selectAnswer('${q.options[3]}','${q.a}')">
            D) ${q.options[3]}
        </button>

    `;
}

function selectAnswer(selected, correct) {

    clearInterval(timer);

    if (
        selected.toLowerCase() ===
        correct.toLowerCase()
    ) {
        score += 10;
    }

    currentQ++;

    let subject = subjects[currentSubject];

    if (currentQ >= DB[subject].length) {
        currentSubject++;
        currentQ = 0;
    }

    if (currentSubject >= subjects.length) {
        showResult();
        return;
    }

    showQuestion();
    startTimer();
}

function showResult() {

    clearInterval(timer);

    let category = "";
    let advice = "";

    if (score >= 220) {

        category = "Тиббӣ";

        advice =
        "🔥 Натиҷаи аъло! Шумо имконияти хуб барои дохил шудан ба ихтисосҳои тиббӣ доред.";

    } else if (score >= 170) {

        category = "IT";

        advice =
        "💻 Натиҷаи хуб! Ихтисосҳои технология ва IT барои шумо мувофиқанд.";

    } else if (score >= 120) {

        category = "Иқтисод";

        advice =
        "📈 Шумо метавонед ихтисосҳои иқтисодӣ ва идоракуниро интихоб намоед.";

    } else if (score > 0) {

        category = "Омӯзгорӣ";

        advice =
        "📚 Ихтисосҳои омӯзгорӣ ва гуманитарӣ барои шумо мувофиқ мебошанд.";

    } else {

        document.getElementById("info").innerHTML = "";

        document.getElementById("quiz").innerHTML = "";

        document.getElementById("result").innerHTML = `

            <h2>🎓 Натиҷа</h2>

            <p>📊 Баҳо: 0</p>

            <p>
            🌱 Барои гирифтани тавсия аввал дониши худро беҳтар намоед ва дубора имтиҳон супоред.
            </p>

        `;

        return;
    }

    let majors =
        UNIVERSITIES[category].majors
        .map(m => `<li>${m}</li>`)
        .join("");

    let universities =
        UNIVERSITIES[category].universities
        .map(u => `<li>${u}</li>`)
        .join("");

    document.getElementById("info").innerHTML = "";

    document.getElementById("quiz").innerHTML = "";

    document.getElementById("result").innerHTML = `

        <h2>🎓 Натиҷаи AI</h2>

        <p><strong>📊 Хол:</strong> ${score}</p>

        <p>
        <strong>🎯 Самти тавсияшаванда:</strong>
        ${category}
        </p>

        <p>${advice}</p>

        <h3>📚 Ихтисосҳои тавсияшаванда</h3>

        <ul>
            ${majors}
        </ul>

        <h3>🏛 Донишгоҳҳои тавсияшаванда</h3>

        <ul>
            ${universities}
        </ul>

    `;
}