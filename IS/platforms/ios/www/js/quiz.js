var quizMaster = (function () {
    var name;
    var data;
    var loaded = false;
    var displayDom;

    function nextHandler(e) {
        e.preventDefault();

        var status = getUserStatus();
        if(status.question >= 0) {
            var checked = $("input[type=radio]:checked", displayDom);
            if(checked.length === 0) {
            }
            else
            {
                status.answers[status.question] = checked.val();
            }
        }
        status.question++;
        storeUserStatus(status);
        displayQuiz();
    }

    function backHandler(e) {
        e.preventDefault();

        var status = getUserStatus();

        status.question--;
        storeUserStatus(status);
        displayQuiz();
    }

    function showAnswerHandler(e) {
        e.preventDefault();

        var status = getUserStatus();
        var answer = getAnswer(status.question);
        var message = $("<span>Correct answer: " + answer + "</span>");
        displayDom.append(message);
        $(this).remove();
    }

    function displayQuiz() {

        var current = getQuiz();
        var html;
        var status = getUserStatus();

        if(current.state === "introduction") {
            html = "<h2 id='cntr'>Introduction</h2><p>" + current.introduction + "</p>" + nextButton();
            displayDom.html(html).trigger('create');
        } else if(current.state === "inprogress") {
            html = "<h2>" + current.question.question + "</h2><form><div data-role='fieldcontain'><fieldset data-role='controlgroup'>";
            for(var i=0; i<current.question.answers.length; i++) {
                if (status.answers[status.question] !== null)
                {
                    if (i == status.answers[status.question])
                    {
                        html += "<input type='radio' name='quizMasterAnswer' id='quizMasterAnswer_"+i+"' value='"+i+"' checked/><label for='quizMasterAnswer_"+i+"'>" + current.question.answers[i] + "</label>";
                    }
                    else
                    {
                        html += "<input type='radio' name='quizMasterAnswer' id='quizMasterAnswer_"+i+"' value='"+i+"'/><label for='quizMasterAnswer_"+i+"'>" + current.question.answers[i] + "</label>";
                    }
                }
                else
                {
                    html += "<input type='radio' name='quizMasterAnswer' id='quizMasterAnswer_" + i + "' value='" + i + "'/><label for='quizMasterAnswer_" + i + "'>" + current.question.answers[i] + "</label>";
                }
            }
            html += "</fieldset></div></form>" + "<div data-role='control-group' data-type='horizontal'>"+ nextButton() + backButton() + "</div>" + showAnswerButton();
            displayDom.html(html).trigger('create');
        } else if(current.state === "complete") {
            html = "<h2>Complete!</h2><p>The quiz is now complete. You got "+current.correct+" correct out of "+data.questions.length+".</p>";
            displayDom.html(html).trigger('create');
            removeUserStatus();
        }


        //Remove previous if there...
        //use touchend instead?
        displayDom.off("click", ".quizMasterNext", nextHandler);
        //Then restore it
        displayDom.on("click", ".quizMasterNext", nextHandler);

        displayDom.off("click", ".quizMasterBack", backHandler);

        displayDom.on("click", ".quizMasterBack", backHandler);

        displayDom.off("click", ".quizMasterShowAnswer", showAnswerHandler);

        displayDom.on("click", ".quizMasterShowAnswer", showAnswerHandler);

    }

    function getKey() {
        return "quizMaster_"+name;
    }


    function getQuestion(x) {
        return data.questions[x];
    }

    function getAnswer(x) {
        return data.questions[x].answers[data.questions[x].correct];
    }

    function getQuiz() {
        //Were we taking the quiz already?
        var status = getUserStatus();
        if(!status) {
            status = {question:-1,answers:new Array(data.questions.length)};
            storeUserStatus(status);
        }
        //If a quiz doesn't have an intro, just go right to the question
        if(status.question === -1 && !data.introduction) {
            status.question = 0;
            storeUserStatus(status);
        }

        var result = {
            currentQuestionNumber:status.question
        };

        if(status.question == -1) {
            result.state = "introduction";
            result.introduction = data.introduction;
        } else if(status.question < data.questions.length) {
            result.state = "inprogress";
            result.question = getQuestion(status.question);
        } else {
            result.state = "complete";
            result.correct = 0;
            for(var i=0; i < data.questions.length; i++) {
                if(data.questions[i].correct == status.answers[i]) {
                    result.correct++;
                }
            }
        }
        return result;
    }

    function getUserStatus() {
        var existing = window.sessionStorage.getItem(getKey());
        if(existing) {
            return JSON.parse(existing);
        } else {
            return null;
        }
    }

    function nextButton() {
        return "<a href='' class='quizMasterNext' data-role='button'>Next</a>";
    }

    function backButton() {
        return "<a href='' class='quizMasterBack' data-role='button'>Back</a>";
    }

    function showAnswerButton() {
        return "<button class='quizMasterShowAnswer'>Show Answer</button>";
    }

    function removeUserStatus() {
        window.sessionStorage.removeItem(getKey());
    }

    function storeUserStatus(s) {
        window.sessionStorage.setItem(getKey(), JSON.stringify(s));
    }

    return {
        execute: function( url, dom) {
            $.get(url, function(res) {
                name = url;
                data = res;
                displayDom = $(dom);
                loaded = true;
                displayQuiz();
            }, "json");
        }
    };
}());