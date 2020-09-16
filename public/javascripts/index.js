const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', async () => {
    //login_btn.innerHTML = "로그아웃"

});
const response_test = async () => {
    const response = await fetch('/main');
    const contents = await response.json();

    contents[0].forEach(element => {
        element.forEach(todo => {
            const el = document.createElement("div");
            const text = document.createTextNode(todo['title'] + ": " + todo['contents']);
            el.appendChild(text);
            document.body.appendChild(el);
        })
    });
}
response_test();