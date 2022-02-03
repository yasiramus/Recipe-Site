
//currently this code isnt in use as i have commented the css in the recipe.css module
//  When the user clicks on the button,
// toggle between hiding and showing the dropdown content 
function myFunction() {
    document.querySelector('#mydrop').classList.toggle('show')  
;}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


