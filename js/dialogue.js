// 对话选项设计
// *******************************

// 李白内容数组
const li = [
    '王兄,许久不见。',
    '贤兄所言甚是，然李白心有浩然之气，欲以诗酒奔放自由。何必困居深山，隐遁不见世人？',
    '天下英雄尽入我诗句，繁华纷嚣皆寄于我笔端。山中虽寂静，却有清风拂面，溪水潺潺动人心弦。',
    '亦解王兄之意，山中有真知己，月下可独酌。吾何惧红尘之扰，喜欢自由行走在人间。',
    '才情如山川江河，大有浩瀚之美。是否埋没，就看个人眼界如何。我欲以世间为诗境，无论在何处，皆有我李白之存在。一身竟无托，远与孤蓬征。千里失所依，复将落叶并。中途偶良朋，问我将何行。欲献经济策，此心谁见明。海塞无交兵。壮士伏草间，沉忧乱纵横。飘飘不得意，昨发南都城。紫燕枥上嘶，青萍匣中鸣。投躯寄天下，长啸寻英豪。耻学琅玡人，龙璠事躬耕。富贵吾自取，建功及春荣。我愿执吾手，尔方达我情。相知同一己，岂唯弟与兄。抱子弄白云，琴声发清声。临别意难尽，各希存令名。',
    '谢忠告，我自当心存自重。惟愿王兄亦能明心见性，共享此一片无垠之诗境。愿吾友入山隐居，与山水相伴，共享天地之间。'
]

const li_dialogues = [
    {index: 0, content: li[0], point: 0},
    {index: 1, content: li[1], point: 1},
    {index: 2, content: li[2], point: 2},
    {index: 3, content: li[3], point: 3},
    {index: 4, content: li[4], point: 4},
    {end: true, index: 5, content: li[5], point: 1},
];

// 王昌龄内容数组
const wang = [
    '李白啊，你素闻天才之名，何不归隐山林，避世修身？',
    '但时世纷忧，烽火连天，若你留在尘世之中，应可成一代豪杰。可惜孤山寂寞，却无苍苍之志趣相伴。',
    '真是如此嘛？你若不归隐，又将如何过上无拘无束的诗人生活？',
    '李白，你的才情之壮丽让人敬佩，但其中是否有些许埋没？',
    '那就让你自由诗意地徜徉，但切记保重身体，勿被人间俗事困扰。',
]
const wang_dialogues = [
    {choose: false, index: 0, content: wang[0], point: 1},
    {choose: false, index: 1, content: wang[1], point: 2},
    {choose: false, index: 2, content: wang[2], point: 3},
    {choose: false, index: 3, content: wang[3], point: 4},
    {choose: false, index: 4, content: wang[4], point: 5},
    {choose: true, index: 5, content: [
        {index: 0, content: 'wang0-0 point-3', point: 3},
        {index: 1, content: 'wang0-1 point-4', point: 4},
        {index: 2, content: 'wang0-2 point-5', point: 7},
    ]},
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

// wang对话更新
function update_wang() {
    if(wang_click) {
        wang_index = li_dialogues[li_index].point;
        if(wang_dialogues[wang_index].choose) {
            choose(wang_dialogues[wang_index].content);
        } else {
            li_index = wang_dialogues[wang_index].point;
            show(wang_dialogue, wang_dialogues[wang_index].content);
        }
    }
    wang_click = false;
    li_click = true;
}

// li对话更新
function update_li() {
    console.log("li_index" + li_index)
    console.log(li_click)
    if(li_click) {
        if(li_dialogues[li_index].end) {
            show(li_dialogue, li_dialogues[li_index].content);
            setTimeout(()=>{dialogue_box.remove();}, 1000);
        } else {
            wang_index = li_dialogues[li_index].point;
            show(li_dialogue, li_dialogues[li_index].content);
            li_click = false;
            wang_click = true;
        } 
    }
}

// 选择
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
            show(wang_dialogue, li_1.innerHTML)
            li_index = arr[0].point
        }
        li_2.onclick = ()=>{
            removeChooseBox();
            show(wang_dialogue, li_2.innerHTML)
            li_index = arr[1].point
        }
        li_3.onclick = ()=>{
            removeChooseBox();
            show(wang_dialogue, li_3.innerHTML)
            li_index = arr[2].point
        }
        choose_flag = false;
    }
}

// 创建选择窗口
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

// 移除选择窗口
function removeChooseBox() {
    var chooseBox = document.querySelector('.choose-box');
    chooseBox.remove();
}

i = 0;
var msg = '';
// 文字逐个输出
function show(dialogue, str) {
    i = 0;
    msg = '';
    scroll(dialogue, str);
    console.log(li_dialogue.innerHTML)
    i = 0;
    msg = '';
}

function scroll(dialogue, str) {
    if(i < str.length) {
        if(msg.length > 100)
            msg  = ''
        msg+=str[i];
        i ++;
        dialogue.innerHTML = msg;
        setTimeout(()=>{
            scroll(dialogue, str)
        }, 100)
    }
}

