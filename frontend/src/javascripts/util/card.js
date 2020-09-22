export class Card{
    constructor(obj){
        this.title=obj.title;
        this.writer=obj.writer;
        this.id=obj.id;
    }
    add(column){
        const new_card=document.createElement('div');
        const new_card_title=document.createElement('div');
        const new_card_title_text=document.createTextNode(this.title);
        const new_card_icon=document.createElement('img');
        const new_card_icon_div=document.createElement('div');
        const new_card_writer=document.createElement('div');
        const new_card_writer_by=document.createElement('div');
        const new_card_writer_name=document.createElement('div');

        new_card_icon_div.className="card_icon";
        new_card_icon.setAttribute("src","./image/card_icon.svg");
        new_card_icon_div.appendChild(new_card_icon);
        new_card_title.appendChild(new_card_icon_div);
        new_card.className='card';
        new_card_title.className='card_title'
        new_card_title.appendChild(new_card_title_text);
        new_card_writer_by.innerHTML='Added by&nbsp';
        new_card_writer_by.className='card_writer_by';
        new_card_writer_name.innerHTML=this.writer;
        new_card_writer_name.className='card_writer_name';
        new_card_writer.className='card_writer';
        new_card_writer.appendChild(new_card_writer_by);
        new_card_writer.appendChild(new_card_writer_name);
        new_card.appendChild(new_card_title);
        new_card.appendChild(new_card_writer);

        document.getElementById(column).appendChild(new_card);
    }
}
