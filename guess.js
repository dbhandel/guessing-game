// JQuery proof of life
$(function() {
  $('.guess-btn').on('click', function() {
    var high = " way too high!"
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "positionClass": "toast-bottom-full-width",
      "showDuration": "300",
      "hideDuration": "3000",
      "timeOut": "2000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.error("Sorry Charlie, your guess is" + high);
  });
})