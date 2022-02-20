const form = document.querySelector(".Loginform");
const fullNameError=document.querySelector(".fullNameError");
const userNameError = document.querySelector(".userNameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");
// const confirmPasswordError=document.querySelector('.confirmPasswordError');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //getting the values when the user input their details and click on the signup btn
    const fullName = form.fullName.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    //resetting of errors 
    fullNameError.textContent = "";
    userNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    // confirmPasswordError.textContent = "";

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                fullName,
                userName,
                email,
                password,
                // confirmPassword,
            }),

        });

        const data = await response.json();
        console.log(data)

        // displaying error to the user
        if (data.errors) {
            fullNameError.textContent = data.errors.fullName;
            userNameError.textContent = data.errors.userName;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            // confirmPasswordError.textContent = data.errors.confirmPassword;
        }

        //checking the presence of the user
        if (data.newUsers) {
            //redirect the user to the login page after signing up
            location.assign("/login");
        }
    } catch (error) {
        console.log(error);
    }
});
