// Add event listner to elements
// function init() {
//     var containers = document.getElementsByClassName("coinContainner");
//     var images = containers[0].childNodes;
//     for (var i = containers.length - 1; i >= 0; i--) {
//         containers[i].addEventListener("ondrop", drop);
//         containers[i].addEventListener("ondragover", allowDrop);
//     };

//     for (var i = images.length - 1; i >= 0; i--) {
//         images[i].addEventListener("ondragstart", drag);
//     };

// }


// var tower = angular.module('Tower', []);

// tower.controller('datecontroller',['$scope',function ($scope){
//     $scope.date = new Date();
// }]);

window.addEventListener('load', prequestion, false);

//Timer
// window.onload = function() {
//     var timer = new Tock({
//         callback: function() {
//             $('#clockface').val(timer.msToTime(timer.lap()));
//         }
//     });

//     var resetClock = function() {
//         timer.reset();
//         $('#clockface').val('');
//     };

//     var startClock = function() {
//         resetClock();
//         timer.start($('#clockface').val());
//     };

// };

function prequestion() {
    document.getElementById('continue').addEventListener('click', function() {
        document.getElementById('introduction').style.display = 'none';
        document.getElementById('quizs').style.display = 'inline';
        console.log("Click envent!");

    }, false);


    var timer = new Tock({
        callback: function() {
            $('#clockface').val(timer.msToTime(timer.lap()));
        }
    });

    var resetClock = function() {
        timer.reset();
        $('#clockface').val('');
    };

    var startClock = function() {
        resetClock();
        timer.start($('#clockface').val());
    };

    document.getElementById('start-new-game').addEventListener('click', function() {
        // Get the radio input which have been checked
        var checkedRadio = $("input:radio:checked");
        var correctAnswer = ["Rule1", "Rule2", "Rule3"];
        var correct = false;
        if (checkedRadio.length == 3) {
            correct = true;
            for (var i = checkedRadio.length - 1; i >= 0; i--) {
                if (arrayContains(checkedRadio[i].value, correctAnswer) === false) {
                    correct = false;
                }
                checkedRadio[i].checked = false;
            };
        }

        if (correct) {
            document.getElementById('quizs').style.display = 'none';
            //Start the timer
            startClock();
        } else {
            document.getElementById('introduction').style.display = 'inline';
            document.getElementById('quizs').style.display = 'none';
        }

    }, false);
}

function arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}


function drag(ev) {
    //alert("Drag ID: " + ev.target.id);
    var id = ev.target.id;
    var existImgs = ev.target.parentNode.childNodes;
    for (var i = existImgs.length - 1; i >= 0; i--) {
        if (Number(existImgs[i].id) > Number(id)) {
            //alert("Rule Violation: The biggest coin in its own fountain?");
            return;
        };
    };

    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function drop(ev) {
    ev.preventDefault();

    /*Only put image under the coincontainner*/
    if (!ev.target.classList.contains("coinContainner")) {
        return;
    }
    var existImgs = ev.target.childNodes;
    var data = ev.dataTransfer.getData("text");

    if (isEmpty(data)) {
        return;
    };
    if (existImgs.length > 0) {
        for (var i = existImgs.length - 1; i >= 0; i--) {
            if (Number(existImgs[i].id) > Number(data)) {
                //alert("Rule Violation: The biggest coin in the new fountain?");
                return;
            };
        };
    };

    ev.target.appendChild(document.getElementById(data));
}

// function warning(){
//     var warn = document.getElementById("warning");
//     warn.inner
// }
// init();