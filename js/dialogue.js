// 对话选项设计
// *******************************

// 李白内容数组
const li_dialogues = [
    {index: 0, content: 'li-0 point-1', point: 1},
    {index: 1, content: 'li-1 point-0', point: 0},
    {index: 2, content: 'li-2 point-3', point: 3},
    {index: 3, content: 'li-3 point-1', point: 1},
    {index: 4, content: 'li-4 point-2', point: 2},
    {index: 5, content: 'li-5 point-1', point: 1},
    {index: 6, content: 'li-6 point-7', point: 7},
    {end: true, index: 7, content: 'li-7 point-0', point: 0},
];

// 王昌龄内容数组
const wang_dialogues = [
    {choose: true, index: 0, content: [
        {index: 0, content: 'wang0-0 point-3', point: 3},
        {index: 1, content: 'wang0-1 point-4', point: 4},
        {index: 2, content: 'wang0-2 point-5', point: 7},
    ]},
    {choose: false, index: 1, content: 'wang1 point-1', point: 1}
];
// *******************************

// 图片点击元素

let wang_img = document.querySelector('.wangchangling-img');
let li_img = document.querySelector('.libai-img');

// 背景设置元素
let header = document.querySelector('.header');
let bk = document.querySelector(".background");
let dialogue_box = document.querySelector('.dialogue-box');
let option = 1;
header.innerHTML = '闻王昌龄左迁龙标遥有此寄';

// 对话元素
let li_dialogue = document.querySelector('.libai-dialogue');
let wang_dialogue = document.querySelector('.wangchangling-dialogue');

// 全局参数
let li_index = 0;
let wang_index = 0; 
let choose_flag = false;
let wang_click = true;
let li_click = false;

// 对话初始化
li_dialogue.innerHTML = li_dialogues[0].content;


// 图片点击事件
wang_img.onclick = ()=>{
    update_wang();
}

li_img.onclick = ()=>{
    update_li();
}

function update_wang() {
    if(wang_click) {
        wang_index = li_dialogues[li_index].point;
        if(wang_dialogues[wang_index].choose) {
            choose(wang_dialogues[wang_index].content);
        } else {
            li_index = wang_dialogues[wang_index].point;
            wang_dialogue.innerHTML = wang_dialogues[wang_index].content;
        }
    }
    wang_click = false;
    li_click = true;
}

function update_li() {
    if(li_click) {
        if(li_dialogues[li_index].end) {
            li_dialogue.innerHTML = li_dialogues[li_index].content;
            setTimeout(()=>{dialogue_box.remove();}, 1000);
        } else {
            wang_index = li_dialogues[li_index].point;
            li_dialogue.innerHTML = li_dialogues[li_index].content;
            li_click = false;
            wang_click = true;
        } 
    }
}

function choose(arr) {
    if(!choose_flag) {
        choose_flag = true;
        createChooseBox();

        var li_1 = document.querySelector('.li-1');
        var li_2 = document.querySelector('.li-2');
        var li_3 = document.querySelector('.li-3');

        li_1.innerHTML = arr[0].content;
        li_2.innerHTML = arr[1].content;
        li_3.innerHTML = arr[2].content;

        li_1.onclick = ()=>{
            removeChooseBox();
            wang_dialogue.innerHTML = li_1.innerHTML;
            li_index = arr[0].point
        }
        li_2.onclick = ()=>{
            removeChooseBox();
            wang_dialogue.innerHTML = li_2.innerHTML;
            li_index = arr[1].point
        }
        li_3.onclick = ()=>{
            removeChooseBox();
            wang_dialogue.innerHTML = li_3.innerHTML;
            li_index = arr[2].point
        }
        choose_flag = false;
    }
}

function createChooseBox() {
    var chooseBox = document.createElement('div');
    chooseBox.classList.add('choose-box');
    bk.appendChild(chooseBox);

    var head = document.createElement('span');
    head.classList.add('little-head')
    var li_1 = document.createElement('li');
    li_1.classList.add('li-1')
    var li_2 = document.createElement('li');
    li_2.classList.add('li-2')
    var li_3 = document.createElement('li');
    li_3.classList.add('li-3')

    chooseBox.appendChild(head);
    chooseBox.appendChild(li_1);
    chooseBox.appendChild(li_2);
    chooseBox.appendChild(li_3);

    head.innerHTML = '请从以下选择你的对话'
}

function removeChooseBox() {
    var chooseBox = document.querySelector('.choose-box');
    chooseBox.remove();
}

