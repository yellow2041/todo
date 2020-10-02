export class Card {
    constructor(obj) {
        this.title = obj.title;
        this.writer = obj.writer;
        this.id = obj.id;
        this.card = document.createElement('div');
    }
    add=(column)=> {
        const new_card_icon = document.createElement('img');
        new_card_icon.setAttribute("src", "./image/card_icon.svg");

        const new_card_icon_div = document.createElement('div');
        new_card_icon_div.className = "card_icon";
        new_card_icon_div.appendChild(new_card_icon);

        const new_card_title = document.createElement('div');
        new_card_title.appendChild(new_card_icon_div);
        new_card_title.className = 'card_title';

        const new_card_title_text = document.createTextNode(this.title);
        new_card_title.appendChild(new_card_title_text);

        const delete_card_icon = document.createElement('img');
        delete_card_icon.setAttribute("src", "./image/delete.svg");
        delete_card_icon.setAttribute("height", "15");
        delete_card_icon.className = 'card_delete';
        delete_card_icon.addEventListener('click',this.delete);

        const new_card_div = document.createElement('div');
        new_card_div.className = 'card_top';
        new_card_div.appendChild(new_card_title);
        new_card_div.appendChild(delete_card_icon);

        const new_card_writer_by = document.createElement('div');
        new_card_writer_by.innerHTML = 'Added by&nbsp';
        new_card_writer_by.className = 'card_writer_by';

        const new_card_writer_name = document.createElement('div');
        new_card_writer_name.innerHTML = this.writer;
        new_card_writer_name.className = 'card_writer_name';

        const new_card_writer = document.createElement('div');
        new_card_writer.className = 'card_writer';
        new_card_writer.appendChild(new_card_writer_by);
        new_card_writer.appendChild(new_card_writer_name);

        this.card.className = 'card';
        this.card.appendChild(new_card_div);
        this.card.appendChild(new_card_writer);
        document.getElementById(column).appendChild(this.card);
    }
    delete=async(event)=>{
        console.log(event.target.closest('.card'));
        const response=await fetch('http://127.0.0.1:3001/todo/'+this.id,{
            method: 'DELETE'
        });
        const status=await response.json();
        if(status['status']==='ok'){
             event.target.closest('.card').style.display='none';
        }
    }
}
