/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 * Define Global Variables
 * 
**/
// 建立一个内容数组用来储存模块信息，用来灵活增加删除信息模块
let content = [
    [["管理游戏"],["在玩的游戏太多？活动日期记不清楚？"],["我们来啦~扭蛋日程主要为您提供专业的游戏活动管理服务，帮助您更轻松愉快玩耍！"]],
    [["贴心提醒"],["错过精彩活动感觉损失一个亿？"],["当活动开始时我们会在您绑定的社交软件上发出提醒，您再也不用担心错过活动忘记领活动白送奖励拉~"]],
    [["活动攻略"],["感觉这次的游戏活动好复杂啊？","怎么办不会打，好想抄作业？"],["请关注我们即将推出的活动解析以及攻略，为您提供更白话的活动描述，帮助您理解活动要领。"],["游戏活动攻略提供各种格式的作业供君抄袭通关！也欢迎用户后台联系我们成为课代表哦~"]],
    [["中文支持"],["此外，我们还提供对于日本服韩国服游戏的活动中文翻译。"],["以后跨服也能愉快玩耍啦~"]],
    [["素材计算"],["刷材料不知道怎么刷更好更划算？"],["素材计算器功能帮助您为各个游戏素材进行计算！好赞哦！"]],
    [["关于我们"],["人均95后的业余兴趣开发团队，欢迎勾搭交流，欢迎关注我们的微博微信官方号提供应援！"]],
    [["支持我们"],["欢迎加入我们的QQ群对我们表示支持！！！"],["官方群1：123456789"],["官方群2：123456789"]]
];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// 建立往页面添加模块的函数式
function addSection(x){
    let sections = document.querySelector('section');
    for (var y=1; y<x.length; y+=1){
        sections.insertAdjacentHTML('afterend', `<section><div class="landing__container"></div></section>`);
    }
}
// 建立往模块内添加内容的函数式
function addContent(x){
    let addcontent = document.querySelectorAll(".landing__container");
    for(var y=0; y<x.length; y+=1){
        let addlist = [];
        for (var i=0; i<x[y].length; i+=1){
            if (i===0){
                addlist.push(`<h2> ${x[y][i]} </h2>`);
            } else{
                addlist.push(`<p> ${x[y][i]} </p>`);
            }
        };
        for (var i=0; i<x[y].length; i+=1){
            addcontent[y].insertAdjacentHTML('beforeend', addlist[i]);
        };
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
// 建立导航栏，通过读取数组来获得列表内的元素
function navBar(x){
    let addnavbar = document.querySelector("#navbar__list");
    for(var y=0; y<x.length; y+=1){
        addnavbar.insertAdjacentHTML('beforeend',`<li id="${y}" class="nav_list"> ${x[y][0]} </li>`);
    };
}

// build toTop Button
function toTop(){
    let top = setInterval(function (){
　　　　 let current = document.documentElement.scrollTop;
　　　　 if(current === 0){
            clearInterval(top);
　　　　 }
　　　　 ele.scrollTop = current - 100
　　　　 } , 16)
}
// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
// Scroll to section on link click
// Set sections as active
let ele = document.documentElement;
let bod = document.body;
window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = ele.clientHeight || bod.clientHeight;
    let scrollHeight = ele.scrollHeight || bod.scrollHeight;
    // 当页面滚动超过主标题，导航栏渐显示。反之当页面回到主标题栏，导航栏隐藏。
    let navbar = document.querySelector(".page__header");
    let opacity = 0;
    let navbarF = function() {
        if (scrollTop >= (windowHeight-200)) {
            opacity = 1;
        } else {
            opacity = 0;
        }
    }();
    navbar.style.opacity = opacity;
    //-------------------------------------------------------------------------------------------------------------------------
    // back to top button的渐隐特效
    let totop = document.querySelector("#backToTop");
    let opacity2 = 0;
    let w2=windowHeight * 2
    let toTopF = function() {
        if (scrollTop+w2<scrollHeight) {
            opacity2 = 0
        } else if (scrollTop+w2>= scrollHeight){
            opacity2 = 1 - ((scrollHeight - scrollTop - windowHeight) * 0.001);
        }
         else {
            opacity2 = 1;
        };
    }();
    totop.style.opacity = opacity2;
    //-------------------------------------------------------------------------------------------------------------------------
    // 当页面滚动到模块时，导航栏的相应模块标题高亮。当页面从模块移开时，高亮标题取消。
    let li_before_style = {'color':'#999999','font-size': '1.1em','font-weight': 'lighter',}
    let li_after_style = {'color':'#2F54EB','font-size': '1.2em','font-weight': 'bold',}
    let navbar_active = function() {
        for(i=0; i<=6; i++){
            if (scrollTop<=windowHeight*(i+1) && scrollTop > windowHeight*i){
                $('li').css(li_before_style);
                $('#'+i).css(li_after_style);
            }
        }
    }()
    //-------------------------------------------------------------------------------------------------------------------------
    // 当点击导航栏的标题时，页面跳转到相应模块的位置。
    let navbar_click_active = function() {
        $('.nav_list').click(function(){
            let listId = parseFloat($(this).attr("id"));
            ele.scrollTop = (listId+1) * windowHeight * 0.87
        })
    }()
}

window.addEventListener("load",function() {
    addSection(content)
    addContent(content)
    navBar(content)
})