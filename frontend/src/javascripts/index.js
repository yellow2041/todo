import {Card} from './util/card.js';

const show_cards = async (column) => {
    const response = await fetch('http://localhost:3001/main');
    const contents = await response.json();
    console.log(contents);
    contents[0].forEach(element => {
        element.forEach(todo => {
            const card = new Card({title:todo['title'], writer:todo['name'], id:todo['todo_id']});
            console.log(card);
            card.add(column);
        });
    });
}

const login = async ()=>{
    document.getElementById('login_btn').addEventListener('click',async(event)=>{
        const response=await fetch('http://localhost:3001/login',{
            method:'POST'
        });
        console.log(response.json());
    });   
}

const insert_todo=async()=>{
    document.querySelectorAll('.btn add_btn').forEach(element=>{
        element.addEventListener('click',async (event)=>{
            await fetch('http://localhost:3001/todo-list',{
                method:'POST',
                body: JSON.stringify(document.body)
            });
        })
    })
}

const show_add_card=(el, index)=>{
    el.addEventListener('click',(event)=>{
        document.getElementById('column_add_card_'+index).style.display='block';
    })
}
const hide_add_card=(el, index)=>{
    el.addEventListener('click',(event)=>{
        document.getElementById('column_add_card_'+index).style.display='none';
    })
}
const active_add=()=>{
    document.querySelector('.add_btn').disabled=false;
}

const init=()=>{
    let idx=0;
    document.querySelectorAll('.todo_add_btn').forEach(element=>{
        idx++;
        show_add_card(element,idx);
    });
    idx=0;
    document.querySelectorAll('.cancel_btn').forEach(element=>{
        idx++;
        hide_add_card(element,idx);
    })
} 

show_cards('todo');
login();
insert_todo();
init();