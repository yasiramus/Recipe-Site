const form = document.querySelector("#userLogin");
const userNameError = document.querySelector(".userNameError");
const passwordError = document.querySelector(".passwordError");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = form.userName.value
    const password = form.password.value;

    //resetting error message
    userNameError.textContent = "";
    passwordError.textContent = "";

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password })
        });

        const data = await response.json();
        console.log(data);
        //   error handling on the client side 
        if (data.errors){
            if(data.errors.split("").includes("userName")) {
                userNameError.textContent = data.errors;
            }
            else {
                passwordError.textContent = data.errors;
            }
        }

        if (data.isTheSame) {
            location.assign("/index");
        }
    } catch (error) {
        console.log(error);
    }
});
