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


var tower = angular.module('Tower', []);

tower.controller('datecontroller',['$scope',function ($scope){
    $scope.date = new Date();
}]);


function drag(ev) {
    //alert("Drag ID: " + ev.target.id);
    var id = ev.target.id;
    var existImgs = ev.target.parentNode.childNodes;
    for (var i = existImgs.length - 1; i >= 0; i--) {
        if (Number(existImgs[i].id) > Number(id)) {
                    alert("Rule Violation: The biggest coin in its own fountain?");
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
        if(!ev.target.classList.contains("coinContainner")){
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
                    alert("Rule Violation: The biggest coin in the new fountain?");
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