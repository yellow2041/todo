const login_btn = document.getElementById('login_btn');

login_btn.addEventListener('click', async () => {
    //login_btn.innerHTML = "로그아웃"

});
const response_test = async () => {
    const response = await fetch('/main');
    const contents = await response.json();
    //FE에 todo_id저장시킬 방법?
    contents[0].forEach(element => {
        element.forEach(todo => {
            const el = document.createElement("div");
            const text = document.createTextNode(todo['title'] + ": " + todo['contents']);
            const delete_btn=document.createElement('button');
            const btn_text=document.createTextNode('지우기');
            delete_btn.appendChild(btn_text);
            delete_btn.value=todo['todo_id'];
            el.appendChild(text);
            el.appendChild(delete_btn);
            document.body.appendChild(el);
            delete_btn.addEventListener('click', async()=>{
                await fetch('/todo/'+delete_btn.value,{
                    method: 'DELETE'
                })
            })
        })
    });
}
response_test();