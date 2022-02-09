//currently this code isnt in use as i have commented the css in the recipe.css module
//  When the user clicks on the button,

// toggle between hiding and showing the dropdown content
function myFunction() {
  document.querySelector("#mydrop").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// search section js
const container = document.querySelector(".search-container");
const inputbutton = document.querySelector("#search-input");
const btn = document.querySelector(".search-btn");
const overlay = document.getElementById("myOverlay");

btn.addEventListener("click", () => {
  container.classList.toggle("active");
  console.log("you just clicked me");
  // Open the full screen modal box
  overlay.classList.toggle("activeover");
  console.log("you just open a modal box");
});

// // Open the full screen search box
// function openSearch() {
//   document.getElementById("myOverlay").style.display = "block";
// }

// Close the full screen search box
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

function searchData(e) {
  const searchResponses = document.getElementById("searchResult");

  //explicit special character
  //the only thing which are allowed are only characters
  //regular expressions match value
  //^ means has to begin with
  let match =e.value.match(/\s*/);
  if (match ==e.value) {
    searchResponses.innerHTML='';
    return;
  };

  let match2 =e.value.match(/^[a-zA-Z]*/);
  if (match2[0]===e.value) {
  
  fetch("/getRecipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: e.value }),
  })
    .then((res) => res.json())
    .then(data => {
      let payload = data.payload;
      // console.log(payload);
      searchResponses.innerHTML = "";
      //if the user type which doesnt ext
      if (payload.length < 1) {
        searchResponses.innerHTML = `
                                  <div class="main-search-template">
                                        <div class="recipe-cards">
                                          <p class="card">Sorry nothing found</p>
                                        </div>
                                      </div>`;
        return;
      }
      //if what the user type exit
      //display the one entry which ext
      payload.forEach((item, index) => {
        if (index > 0) {
          // searchResponses.innerHTML += `<hr>`;
          searchResponses.innerHTML += ` <div class="main-search-template">
                                        <div class="recipe-cards">
                                          <p class="card">${item.recipeName}</p>
                                        </div>
                                      </div>`;
          // searchResponses.innerHTML += `<p>${item.category}</p>`
        }
      });
      return;
    })
    searchResponses.innerHTML='';
  }
}
