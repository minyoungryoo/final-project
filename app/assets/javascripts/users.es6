/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
$(document).on("turbolinks:load", function () {
  $(".js-dropbtn").on("click", myFunction);
});

function myFunction(event) {
    var className = $(event.currentTarget).data("id");
    $(".dropdown-content").each(function(){
      $(this).removeClass("show");
    });
    $("."+className).toggleClass("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  
}