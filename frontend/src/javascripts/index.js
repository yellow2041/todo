import { Card } from './util/card.js';


const show_cards = async (column) => {
    const response = await fetch('http://49.50.172.152:3001/main', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' },
        body: JSON.stringify({
            status: column
        })
    });
    const contents = await response.json();
    contents[0].forEach(element => {
        element.forEach(todo => {
            const card = new Card({ title: todo['title'], writer: todo['name'], id: todo['todo_id'] });
            card.add(column);
        });
    });
}

const login = async () => {
    document.getElementById('login_btn').addEventListener('click', async (event) => {
        const response = await fetch('http://49.50.172.152:3001/login', {
            method: 'POST'
        });
        //document.cookie=response.json();
        console.log(JSON.stringify(response));
    });
}

const insert_todo = async () => {
    document.querySelectorAll('.add_btn').forEach(element => {
        element.addEventListener('click', async (event) => {
            const input=element.closest('div').previousSibling.previousSibling.querySelector('textarea');
            const response = await fetch('http://49.50.172.152:3001/todo-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' },
                mode: 'cors',
                body: JSON.stringify({
                    title: input.value,
                    contents: '',
                    writer_id: document.cookie.id,
                    status: element.closest('.card_btn').dataset.status
                })
            });
            const status=await response.json();
            if (status['status'] === 'ok') {
                const card = new Card({ title: input.value, writer: 'jiyeon', id: -1 });
                card.add(element.closest('.card_btn').dataset.status);
            }
            input.value='';
            //추가한 데이터 가져와서 카드 만들기
        })
    })
}

const show_add_card = (el, index) => {
    const column_add_card = document.getElementById('column_add_card_' + index);
    el.addEventListener('click', (event) => {
        column_add_card.style.display = 'block';
        column_add_card.parentElement.nextElementSibling.style.height = '73%';
    })
}
const hide_add_card = (el, index) => {
    const column_add_card = document.getElementById('column_add_card_' + index);
    el.addEventListener('click', (event) => {
        column_add_card.style.display = 'none';
        column_add_card.parentElement.nextElementSibling.style.height = '94%';
    })
}

const init = () => {
    let idx = 0;
    document.querySelectorAll('.todo_add_btn').forEach(element => {
        idx++;
        show_add_card(element, idx);
    });
    idx = 0;
    document.querySelectorAll('.cancel_btn').forEach(element => {
        idx++;
        hide_add_card(element, idx);
    })
}

show_cards('todo');
show_cards('doing');
show_cards('done');
login();
insert_todo();
init();