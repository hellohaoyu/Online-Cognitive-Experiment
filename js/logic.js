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
window.player = {
    'ID': "0",
    'Name': "0",
    'GameId': "0",
    'Type': 'AddUser',
    'TimeCost': "0",
};

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


function prequestion(timer) {
    document.getElementById('continue').addEventListener('click', function() {
        document.getElementById('introduction').style.display = 'none';
        document.getElementById('quizs').style.display = 'inline';
        console.log("Click envent!");

    }, false);

    window.timer = new Tock({
        callback: function() {
            $('#clockface').val(window.timer.msToTime(window.timer.lap()));
        }
    });


    var resetClock = function() {
        window.timer.reset();
        $('#clockface').val('');
    };

    var startClock = function() {
        resetClock();
        window.timer.start($('#clockface').val());
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
            buildCoin();
            //Start the timer
            startClock();
        } else {
            alert("At least one of your answers are not correct, please review the three rules and then try again!");
            document.getElementById('introduction').style.display = 'inline';
            document.getElementById('quizs').style.display = 'none';
        }

    }, false);
}

function arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}

function checkWin() {
    var containerTwo = document.getElementById('container2').childNodes;
    var containerThr = document.getElementById('container3').childNodes;
    if (containerTwo) {
        container2Len = containerTwo.length;
    }
    if (container3) {
        container3Len = containerThr.length;
    }

    if ((container2Len === 3) || (container3Len === 3)) {
        return true;
    }
    return false;

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
    if (checkWin()) {
        window.player.TimeCost = $('#clockface').val();
        window.player.Type = "AddExperiment";

        window.player.ID = document.getElementById('userID').innerHTML;
        window.player.Name = document.getElementById('userName').innerHTML;
        window.player.GameId = "1";
        var time = $('#clockface').val();
        alert("Your time is " + $('#clockface').val());
        window.timer.reset();
        $('#clockface').val('');


        var victory_notification = document.getElementById('victory-notification');
        $('#congratulation').html( '<p id="congratulation">You took <span style="font-size: 1.5em"> ' + time + '</span></p>');
        victory_notification.style.display = 'block';

        document.getElementById('play-again').addEventListener('click', function() {
            victory_notification.style.display = 'none';
            buildCoin();
            window.timer.start($('#clockface').val());
        }, false);
        $.post('/', window.player);

        

    }
}

function buildCoin() {
    var lines = '<div id="container1" class="col-xs-4 coinContainner" ondrop="drop(event)" ondragover="allowDrop(event)">';
    lines += '<img id="1" src="img/1cent.png" ondragstart="drag(event)" draggable="true" width=80>';
    lines += '<img id="5" src="img/5cents.png" ondragstart="drag(event)" draggable="true" width=100>';
    lines += '<img id="100" src="img/1Do.png" ondragstart="drag(event)" draggable="true" width=120> </div>';
    lines += ' <div id="container2" class="col-xs-4 coinContainner" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';
    lines += '<div id="container3" class="col-xs-4 coinContainner" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';
    $("#CoinGameImage").html(lines);
}

// function warning(){
//     var warn = document.getElementById("warning");
//     warn.inner
// }
// init();