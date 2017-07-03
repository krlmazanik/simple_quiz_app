var typeQuestion = 'What is the capital of ';
var listQuestions = [{
    question: typeQuestion + 'Great Britain?',
    choices: ['Brasilia', 'London', 'Paris', 'I don\'t know'],
    correctAnswer: 1
  },
  {
    question: typeQuestion + 'France?',
    choices: ['Paris', 'New York', 'Philadelphia', 'I don\'t know'],
    correctAnswer: 0
  },
  {
    question: typeQuestion + 'Canada?',
    choices: ['Vancouver', 'Toronto', 'Ottawa', 'Winnipeg'],
    correctAnswer: 2
  },
  {
    question: typeQuestion + 'Brazil?',
    choices: ['Brasilia', 'Rio De Janeiro', 'San Paulo', 'San Sebastian'],
    correctAnswer: 0
  },
  {
    question: typeQuestion + 'Australia?',
    choices: ['Sydney', 'Brisbane', 'Melbourne', 'Canberra'],
    correctAnswer: 3
  },
  {
    question: typeQuestion + 'China?',
    choices: ['Harbin', 'Xi\'an', 'Hong Kong', 'Beijing'],
    correctAnswer: 3
  },
  {
    question: typeQuestion + 'India?',
    choices: ['Agra', 'Bangalore', 'New Delhi', 'Calicut'],
    correctAnswer: 2
  },
  {
    question: typeQuestion + 'Saudi Arabia?',
    choices: ['Mecca', 'Riyadh', 'Judah', 'Kayla'],
    correctAnswer: 1
  },
  {
    question: typeQuestion + 'Japan?',
    choices: ['N\`Djamena', 'Stockholm', 'Apia', 'Tokyo'],
    correctAnswer: 3
  },
  {
    question: typeQuestion + 'Switzerland?',
    choices: ['Zurich', 'Geneva', 'Bern', 'Lucerne'],
    correctAnswer: 2
  }
];

var amountCorrect = 0;

var main = function() {

  $('#start').click(function() {
    //Removes start button from the page
    // $('#welcome').addClass('hidden');
    $('#welcome').remove();
    $('.slider-nav').removeClass('hidden');

    for (var i = 0; i < listQuestions.length; i++) {
      //messy chunk of code
      //Creates div element for each question
      var question = listQuestions[i].question;
      var questionDiv = document.createElement('DIV');
      questionDiv.setAttribute('class', 'quest');
      var text = document.createElement('P');
      var textnode = document.createTextNode(question);
      text.appendChild(textnode);
      questionDiv.appendChild(text);
      document.getElementById('question-box').appendChild(questionDiv);

      //populates radio buttons and labels
      var options = listQuestions[i].choices;
      var name = 'radio' + i;
      for (var opt in options) {

        var radioEle = document.createElement('input');
        radioEle.type = 'radio';
        radioEle.value = options[opt];
        radioEle.name = name;
        questionDiv.appendChild(radioEle);
        var label = document.createElement('Label');
        label.innerHTML = options[opt];
        questionDiv.appendChild(label);
      }
    }

    //makes first element visible
    $(".quest").first().fadeIn(600);
    $(".quest").first().addClass('active');

    //Scripting NEXT QUESTION Button
    $("#gonext").click(function() {
      var currentQuestion = $('.active');
      var nextQuestion = currentQuestion.next();

      //changes questions
      currentQuestion.hide().removeClass('active');
      nextQuestion.fadeIn(600).addClass('active');

      //Here we are using for loop in order to cycle through every radio button on the page to get the value
      for (var i = 0; i < listQuestions.length; i++) {
        var radios = document.getElementsByName('radio' + i);
        var correctAnswerIndex = listQuestions[i].correctAnswer;
        var getCorrectAnswer = listQuestions[i].choices[correctAnswerIndex];
        for (var j = 0; j < radios.length; j++) {
          var radio = radios[j];
          if (radio.value == getCorrectAnswer && radio.checked) {
            amountCorrect++;
            //We need to change value of CHECKED radio button
            //in order not to count right answer twice
            radio.value = 'answered';
          }
        }
      }

      //Result page spawn
      if (nextQuestion.length === 0) {
        //Creating of result div and h2 of it
        var resultDiv = document.createElement('DIV');
        resultDiv.setAttribute('class', 'result');
        var resultHeading = document.createElement('H2');
        var textHeading = document.createTextNode('Congratulations!');
        resultHeading.appendChild(textHeading);
        resultDiv.appendChild(resultHeading);
        //Posting the results
        var userResult = document.createElement('P');
        var textuserResult = document.createTextNode('You have answered ' + amountCorrect + ' questions from ' + listQuestions.length);
        userResult.appendChild(textuserResult);
        resultDiv.appendChild(userResult);
        document.getElementById('main-window').appendChild(resultDiv);

        //hides nav bar
        $('.slider-nav').hide();
      }

      console.log(amountCorrect);
    });

    //Scripting PREVIOUS QUESTION Button
    $('#goback').click(function() {
      var currentQuestion = $('.active');
      var prevQuestion = currentQuestion.prev();

      currentQuestion.hide().removeClass('active');
      prevQuestion.fadeIn(600).addClass('active');

      //not working
      if (prevQuestion.length === 0) {
        $('#goback').prop('disabled', true);
      }
    });
  });

};

$(document).ready(main);
