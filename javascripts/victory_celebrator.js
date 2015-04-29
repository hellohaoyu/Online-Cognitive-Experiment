function VictoryCelebrator(input_handler) {
    this.input_handler = input_handler;
}

VictoryCelebrator.prototype.on_victory = function() {
    this.input_handler.disable_input();

    


    window.player.TimeCost = $('#clockface').val();
    window.player.Type = "AddExperiment";

    window.player.ID = document.getElementById('userID').innerHTML;
    window.player.Name = document.getElementById('userName').innerHTML;
    window.player.GameId = "2";
    alert(window.player);
    $.post('/', window.player);
    var time = $('#clockface').val();
    alert(time);
    window.timer.reset();
    $('#clockface').val('');
    $('#congratulation').html( '<p id="congratulation">You took <span style="font-size: 1.5em"> ' + time + '</span></p>');
    var victory_notification = document.getElementById('victory-notification');
    victory_notification.style.display = 'block';
               
    document.getElementById('play-again').addEventListener('click', function() {
        victory_notification.style.display = 'none';
        // new Game(document.getElementById('disks-count').value);
        new Game(3);
        window.timer.start($('#clockface').val());
    }, false);
}