const form = document.querySelector(".Loginform");
const fullNameError = document.querySelector(".fullNameError");
const userNameError = document.querySelector(".userNameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");

//error message confirming password
const confirmPasswordError = document.querySelector('.confirmPasswordError');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //getting the values when the user input their details and click on the signup btn
    const fullName = form.fullName.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(password, confirmPasswordError, confirmPassword)

    //resetting of errors 
    fullNameError.textContent = "";
    userNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent="";

    //handling of the confirmation of password has been set at the fronend only
    // meaning confirming password isnt done at the database side 
    //if password do not match excute the code in the block
    if (password != confirmPassword) {
        confirmPasswordError.textContent = "Password don't match"
    }

    //confirming password
    //if password matches excute the code within the else block
    else {
        try {

            const response = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    fullName,
                    userName,
                    email,
                    password
                }),

            });

            const data = await response.json();
            //this will display the new user created id in the console
            // console.log(data)

            // displaying error to the user
            //these section error message has been set from the database
            if (data.errors) {
                fullNameError.textContent = data.errors.fullName;
                userNameError.textContent = data.errors.userName;
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            };

            //checking the presence of the user
            //meaning if user exit redirect the user to the login page
            if (data.newUsers) {
                //redirect the user to the login page after signing up
                location.assign("/get_login");
            };

        }
        catch (error) {
            console.log(error);
        }
    };
    
});
