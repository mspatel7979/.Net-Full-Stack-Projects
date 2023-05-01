function enableLogin() {
    const login = document.getElementById('login')
    if(login.style.display == "none") {
        login.style.display = "block"
        login.style.zIndex = 1;
    }
    else login.style.display = "none";
}