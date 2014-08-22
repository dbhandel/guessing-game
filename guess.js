// JQuery proof of life
$(function() {
  $('h1').on('click', function() {
    $('body').toggleClass('jqWorking');
  });
})