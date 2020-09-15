const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', async () => {
    login_btn.innerHTML = "로그아웃"

});
const response_test = async () => {
    const response = await fetch('/main');
    const contents = await response.json();

    contents.forEach(element => {
        const el=document.createElement("div");
        const text=document.createTextNode(element['title']+": "+element['contents']);
        el.appendChild(text);
        document.body.appendChild(el);
    });
}
response_test();