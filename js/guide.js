/* ==========================================
   guide.js
   AI 스마트 도슨트
========================================== */


/* ==========================================
   URL에서 전시물 ID 가져오기
========================================== */

function getGuideId(){

    const params = new URLSearchParams(window.location.search);

    return params.get("id");

}


/* ==========================================
   현재 전시 불러오기
========================================== */

function loadGuide(){

    const id = getGuideId();

    const guide = guideManager.get(id);

    if(!guide){

        document.getElementById("title").innerHTML =
        "전시물을 찾을 수 없습니다.";

        return;

    }

    // 진행률 표시
    const current =
    guideManager.getCurrentIndex(id);

    const total =
    guideManager.getCount();

    document.getElementById("progress").innerHTML =
    `📍 전시 ${current} / ${total}`;

    displayGuide(guide);
    displayMission(guide);

}


/* ==========================================
   화면 출력
========================================== */

function displayGuide(guide){

    document.getElementById("zone").innerHTML =
    guide.zoneName;

    document.getElementById("title").innerHTML =
    guide.title;

    document.getElementById("subtitle").innerHTML =
    guide.subtitle;

    document.getElementById("summary").innerHTML =
    guide.summary;

    const level =
    loadLevel();

    document.getElementById("description").innerHTML =
    guide.levels[level];

    document.getElementById("story").innerHTML =
    guide.story;

    updateWeatherTip(guide);

    displayQuiz(guide);

}

function displayMission(guide){

    if(!guide.mission){

        return;

    }

    document.getElementById("missionTitle").innerHTML =
    guide.mission.title;

    document.getElementById("missionDesc").innerHTML =
    guide.mission.description;

}


/* ==========================================
   오늘의 날씨와 연결
========================================== */

function updateWeatherTip(guide){

    const weather =
    loadWeather();

    let tip = "";

    if(weather.rain > 0 && guide.todayWeather.rainy){

        tip =
        guide.todayWeather.rainy;

    }

    else if(weather.temp >= 30 && guide.todayWeather.hot){

        tip =
        guide.todayWeather.hot;

    }

    else if(weather.temp <= 5 && guide.todayWeather.cold){

        tip =
        guide.todayWeather.cold;

    }

    else if(weather.wind >= 8 && guide.todayWeather.windy){

        tip =
        guide.todayWeather.windy;

    }

    else{

        tip =
        guide.todayWeather.normal;

    }

    document.getElementById("weatherTip").innerHTML =
    tip;

}


/* ==========================================
   퀴즈
========================================== */

let currentQuiz = null;


function displayQuiz(guide){

    const quizArea =
    document.getElementById("quiz");

    if(!guide.quiz || guide.quiz.length===0){

        quizArea.innerHTML =
        "<p>준비 중입니다.</p>";

        return;

    }

    currentQuiz =
    guide.quiz[0];

    let html = "";

    html += `
    <div class="quiz-question">
        ${currentQuiz.question}
    </div>
    `;

    currentQuiz.choices.forEach((choice,index)=>{

        html += `
        <button
        class="quiz-choice"
        onclick="checkAnswer(${index})">

        ${choice}

        </button>
        `;

    });

    html += `
    <div id="quizResult"></div>
    `;

    quizArea.innerHTML =
    html;

}


function checkAnswer(index){

    const result =
    document.getElementById("quizResult");

    if(index===currentQuiz.answer){

        addScore();

        result.innerHTML=`

        <div class="quiz-correct">

        🎉 정답입니다!

        <br><br>

        ${currentQuiz.explanation}

        </div>

        `;

    }

    else{

        result.innerHTML=`

        <div class="quiz-wrong">

        ❌ 다시 생각해보세요.

        </div>

        `;

    }

}


/* ==========================================
   이전 전시
========================================== */

function movePrev(){

    const prev =
    guideManager.getPrev(getGuideId());

    if(prev===null){

        alert("첫 번째 전시입니다.");

        return;

    }

    location.href =
    "guide.html?id="+prev;

}


/* ==========================================
   다음 전시
========================================== */

function moveNext(){

    const next =
    guideManager.getNext(getGuideId());

    if(next===null){

        alert("모든 전시를 관람했습니다.");

        return;

    }

    location.href =
    "guide.html?id="+next;

}


/* ==========================================
   버튼 연결
========================================== */

document
.getElementById("prevBtn")
.onclick =
movePrev;

document
.getElementById("nextBtn")
.onclick =
moveNext;


/* ==========================================
   시작
========================================== */

window.onload=function(){

    loadGuide();

};
