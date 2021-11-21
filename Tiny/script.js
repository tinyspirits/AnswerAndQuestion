const dataObjectExample = {
    1: "Số nào trong dãy khác loại với những số còn lại: 2, 7, 9, 15?",
    2: "Biết x > y, hãy xem trong những khẳng định sau, khẳng định nào không logic:",
    3: "Nếu chỉ có một que diêm, trong một ngày mùa đông giá rét, bạn bước vào căn phòng có một cây đèn, một bếp dầu, và một bếp củi, bạn thắp gì trước tiên?",
    4: "Cái gì đen khi bạn mua nó, đỏ khi dùng nó và xám xịt khi vứt nó đi?",
    5: "Số nào tiếp theo của dãy: 1, 1, 2, 3, 5, 8, 13, 21,...",
    6: "Số tiếp theo trong dãy: 5, 16, 49, 104,... ?",
    7: "Tìm số tự nhiên khi nhân với 3 và trừ đi 2 thì bằng số đảo ngược của chính nó?",
    8: "Có một đàn vịt, cho biết 1 con đi trước thì có 2 con đi sau, 1 con đi sau thì có 2 con đi trước, 1 con đi giữa thì có 2 con đi 2 bên. Hỏi đàn vịt đó có mấy con?",
    9: "Sở thú bị cháy, con gì chạy ra đầu tiên?",
    10: "Những loài thú nào sau đây ăn cơm?"
};
const answerExample = {
    1: [2, 7, 15, 9, { "answer": [0] }],
    2: ["x + 2 > y + 2.", "x + 3 > y + 1.", "x chia hết cho y.", "5x > 4y.", { "answer": [2] }],
    3: ["Que diêm", "Cây đèn", "Bếp củi", "Bếp dầu", { "answer": [0] }],
    4: ["Diêm", "Than", "Đít nồi", "Nhọ nồi", { "answer": [1] }],
    5: [22, 26, 28, 34, { "answer": [3] }],
    6: [181, 313, 401, 312, { "answer": [0] }],
    7: [28, 82, 2, 8, { "answer": [0] }],
    8: [1, 2, 3, 4, { "answer": [2] }],
    9: ["Con chim", "Con rắn", "Con người", "Con tê giác", { "answer": [2] }],
    10: ["Sư tử", "Mèo", "Hà Mã", "Chó", { "answer": [0, 1, 3] }]
}
localStorage.setItem("QuestionExample", JSON.stringify(dataObjectExample));
localStorage.setItem("AnwserExample", JSON.stringify(answerExample));

const retrievedObject = localStorage.getItem("QuestionExample");
const retrievedObjectAnswer = localStorage.getItem("AnwserExample");

const keyQuestion = document.getElementById("keyQuestion");
const valueQuestion = document.getElementById("valueQuestion");

const question = JSON.parse(retrievedObject);
const answer = JSON.parse(retrievedObjectAnswer);
const current = document.getElementsByClassName("active");
const btns = document.getElementsByClassName("list-question");

// get size object
Object.size = function (obj) {
    let size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const buttonPrevious = document.getElementById("button-previous");
const buttonNext = document.getElementById("button-next");

function showData(index) {
    keyQuestion.innerHTML = Object.keys(question)[index]; //index of obj
    valueQuestion.innerHTML = Object.values(question)[index];// cau hoi

    const answerQuestion = Object.values(answer)[index]; // list dap an
    const keyAnswer = document.getElementsByClassName("answer");

    for (let i = 0; i < answerQuestion.length; i++) {
        if (i < answerQuestion.length - 1) {
            keyAnswer[i].innerHTML = answerQuestion[i];// lay gia tri dap an
        }
    }
}

const d = new Date();

if (localStorage.getItem("countDown") === null || localStorage.getItem("countDown") <= 0) {
    d.setSeconds(300 + d.getSeconds());
    var countDownDate = d.getTime();
    localStorage.setItem("countDown", countDownDate);
}

const second = localStorage.getItem("countDown");
d.setTime(second);
var countDown = d.getTime();

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDown - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (seconds < 10) {
        document.getElementById("demo").innerHTML = minutes + ":" + "0" + seconds;
    } else {
        document.getElementById("demo").innerHTML = minutes + ":" + seconds;
    }
    if (distance < 0) {
        submit();
    }
}, 500);

//check size object
let size = Object.size(question);

if (localStorage.getItem("locationIndex") === null) {
    localStorage.setItem("locationIndex", 0);
    buttonPrevious.disabled = true;
}

if (localStorage.getItem("checkboxLocal") === null) {
    const createCheckboxLocal = {};
    const arr = [];
    localStorage.setItem("checkboxLocal", JSON.stringify(createCheckboxLocal));

    for (let i = 0; i < size; i++) {
        const checkboxLocal = JSON.parse(localStorage.getItem("checkboxLocal"));
        checkboxLocal[i] = arr;
        localStorage.setItem("checkboxLocal", JSON.stringify(checkboxLocal));
    }
}

for (var i = 0; i < size; i++) {
    btns[i].addEventListener("click", clickButton);
}

function listChecked(index) {
    const checkbox = document.getElementsByClassName("checkbox");//checked

    if (localStorage.getItem("checkboxLocal") === null) {
        const createCheckboxLocal = {};
        localStorage.setItem("checkboxLocal", JSON.stringify(createCheckboxLocal));
    }
    const arr = [];
    const checkboxLocal = JSON.parse(localStorage.getItem("checkboxLocal"));

    for (let i = 0; i < checkbox.length; i++) {

        if (checkbox[i].checked == true) {
            arr.push(i);
        }
    }
    checkboxLocal[index] = arr;
    localStorage.setItem("checkboxLocal", JSON.stringify(checkboxLocal));
}

const checkbox = document.getElementsByClassName("checkbox");//checked

//kiem tra checkbox 
function listCheckedOrNot(index) {
    const obj = JSON.parse(localStorage.getItem("checkboxLocal"));
    var value = Object.values(obj)[Number(index)];

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }

    for (let i = 0; i < value.length; i++) {
        var x = value[i];
        checkbox[x].checked = true;
    }
}

function checkQuestionComplete() {
    for (let i = 0; i < checkbox.length; i++) {

        if (checkbox[x].checked == true) {
            current[0].className += " done";
        }
    }
}

// kiem tra cau da lam
function checkCheckbox() {
    const check = JSON.parse(localStorage.getItem("checkboxLocal"));
    var doneCheck = Object.values(check);
    for (let i = 0; i < size; i++) {
        var checkColor = doneCheck[i];
        if (checkColor.length < 1) {
            btns[i].className = btns[i].className.replaceAll(" done", "");
        } else { btns[i].className += " done"; }
    }
}

// cham diem
function checkAnswer() {
    if (localStorage.getItem("point") === null) {
        localStorage.setItem("point", 0);
    }

    var values = Number(localStorage.getItem("point"));
    var point = Object.values(answer);
    const comparePoint = JSON.parse(localStorage.getItem("checkboxLocal"));
    var done = Object.values(comparePoint);

    for (let i = 0; i < size; i++) {
        var answerPoint = point[i][4].answer;
        var answerPerson = done[i];

        if (JSON.stringify(answerPoint) == JSON.stringify(answerPerson)) {
            values++;
        }
    }
    localStorage.setItem("point", values);
}

//danh sach cau hoi
function clickButton() {
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    showData(this.innerHTML - 1);
    listCheckedOrNot(this.innerHTML - 1);
    localStorage.setItem("locationIndex", this.innerHTML - 1);
    buttonPrevious.disabled = false;
    buttonNext.disabled = false;
}

// nop bai
function submit() {
    checkAnswer();
    localStorage.setItem("countDown", 0);
    document.getElementById("demo").innerHTML = localStorage.getItem("point") * 10;
    localStorage.setItem("point", 0);
    clearInterval(x);
    document.getElementById("show-point").innerHTML = "Điểm:";
    document.getElementById("button-submit").disabled = true;
    buttonPrevious.disabled = true;
    buttonNext.disabled = true;
    document.getElementById("reload").style.display = "block";
    document.getElementById("pagination").style.zIndex = -1;
    localStorage.clear();

}

//show du lieu 
function loadData() {
    var i = localStorage.getItem("locationIndex");
    listCheckedOrNot(i);
    showData(i);
    current[0].className = current[0].className.replace(" active", "");
    btns[i].className += " active";
    checkCheckbox();
}

//button
function next() {
    var i = localStorage.getItem("locationIndex");
    listChecked(i);
    checkCheckbox();

    try {
        listChecked(i);
        i++;
        localStorage.setItem("locationIndex", i);
        listCheckedOrNot(i);
        buttonPrevious.disabled = false;
        current[0].className = current[0].className.replace(" active", "");
        btns[i].className += " active";
        showData(i);
    } catch (err) {
        i--;
        localStorage.setItem("locationIndex", i);
        listCheckedOrNot(i);
        showData(i);
        current[0].className = current[0].className.replace(" active", "");
        btns[i].className += " active";
    }
}

function previous() {
    var i = localStorage.getItem("locationIndex");
    listChecked(i);
    localStorage.setItem("locationIndex", i);
    checkCheckbox();

    try {
        listChecked(i);
        i--;
        localStorage.setItem("locationIndex", i);
        listCheckedOrNot(i);
        buttonNext.disabled = false;
        current[0].className = current[0].className.replace(" active", "");
        btns[i].className += " active";
        showData(i);

    } catch (err) {
        i++;
        localStorage.setItem("locationIndex", i);
        listCheckedOrNot(i);
        showData(i);
        current[0].className = current[0].className.replace(" active", "");
        btns[i].className += " active";
    }
}

//Tính năng đang được update

// function start() {
//     const formQuestion = document.getElementById("question-answer");
//     const buttonStart = document.getElementById("start");
//     const example = document.getElementById("example");
//     buttonStart.style.display = "none";
//     example.style.display = "none";
//     localStorage.setItem("QuestionExample", JSON.stringify(dataObject));
// }
