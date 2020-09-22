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



show_cards('todo');