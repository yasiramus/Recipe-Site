const form = document.querySelector(".Loginform");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = form.fullName.value;
    const userName = form.userName.value
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.password.value

    try {
        const response = await fetch("/signup", {
            method: "POST",
            body: JSON.stringify({ fullName, userName, email, password, confirmPassword }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
});
console.log(form);