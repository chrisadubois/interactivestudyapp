$( document ).on( "deviceready", function(){
    StatusBar.overlaysWebView( false );
    StatusBar.backgroundColorByName( "gray" );
});

$(document).ready(function() {

    $(document).on("pageshow", "#SDLC", function() {
        quizMaster.execute("q1.json", ".quizdisplay", function() {}
        );
    });

    $(document).on("pageshow", "#arrays", function() {
        quizMaster.execute("q2.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#lca", function() {
        quizMaster.execute("q3.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#architecturalstyles", function() {
        quizMaster.execute("q4.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#usecases", function() {
        console.log("page show");
        quizMaster.execute("q5.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#proplogic", function() {
        quizMaster.execute("q6.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#bigo", function() {
        quizMaster.execute("q7.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#quantifiers", function() {
        quizMaster.execute("q8.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#poly", function() {
        console.log("page show");
        //initialize the quiz
        quizMaster.execute("q9.json", ".quizdisplay", function() {
            console.dir();
        });
    });

    $(document).on("pageshow", "#bst", function() {
        quizMaster.execute("q10.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#ll", function() {
        quizMaster.execute("q11.json", ".quizdisplay", function() {
        });
    });

    $(document).on("pageshow", "#deriv", function() {
        quizMaster.execute("q12.json", ".quizdisplay", function() {
        });
    });

});