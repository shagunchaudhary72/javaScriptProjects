const newElement = document.getElementById("answer1");

const api = `/questions.json`;

const xhttl = new XMLHttpRequest(api);

xhttl.open("GET", api, true);

xhttl.onload = function () {
  if (this.status === 200) {
    const jsonFile = JSON.parse(this.responseText);

    console.log(jsonFile);

    const question = document.querySelector(".question");
    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const answers = document.querySelectorAll(".answer");
    const submit = document.querySelector("#submit");
    const scoreArea = document.querySelector("#score");

    let questionCount = 0;
    let marks = 0;
    const loadQuestion = () => {
      const questionList = jsonFile[questionCount];
      question.innerHTML = `Question ${questionList.srno} : ${questionList.name} `;

      option1.innerHTML = questionList.options[1];
      option2.innerHTML = questionList.options[2];
      option3.innerHTML = questionList.options[3];
      option4.innerHTML = questionList.options[4];
    };

    loadQuestion();

    const getCheckAnswer = () => {
      let answer;
      answers.forEach((currAnswer) => {
        if (currAnswer.checked) {
          answer = currAnswer.id;
        }
      });
      return answer;
    };

    const deselectAll = () => {
      answers.forEach((currAnswer) => {
        currAnswer.checked = false;
      });
    };
    submit.addEventListener("click", () => {
      const checkAnswer = getCheckAnswer();
      console.log(checkAnswer);
      
      if (checkAnswer == jsonFile[questionCount].answer) {
        marks++;
        console.log(jsonFile[questionCount].answer);
        
      }
      questionCount++;
      console.log(questionCount);
      if (questionCount <= jsonFile.length - 1) {
        loadQuestion();
        deselectAll();
      } else {
        scoreArea.innerHTML = `<div class="show"> 
            <h2>you obtained ${marks} out of ${jsonFile.length} </h2>
            <button class='btn' onclick="location.reload()">Attempt Again</button>
            </div>`;

        scoreArea.classList.remove("scoreArea");
      }
    });
  } else {
    console.log("Some Error Occured");
  }
};
xhttl.send();
