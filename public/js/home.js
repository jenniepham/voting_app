$(document).ready(function(){

  var noInput = 1;

$("#addOption").on("click", function(){
noInput ++;
$("Form").append('<input id="input' + noInput +'"name="option' + noInput + '" type="text" name="options"></input><br>');

});

$("#removeOption").on("click", function(){
$("#input" + noInput).remove();
$("br").remove();
noInput--;

});

$("#submit").on("click", function(){
$("#pollForm").submit();

});

});
