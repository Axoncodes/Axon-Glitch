function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[]\]/g, '\$&'); // $& means the whole matched string
}
function replaceAll2(str, match, replacement){
    return str.replace(new RegExp(escapeRegExp(match), 'g'), ()=>replacement);
}
const ul_content_list = document.querySelectorAll(".lf_landing_right_sub");
const lf_list_title = document.querySelectorAll("#lf_landing_main_contexts h2, #lf_landing_main_contexts h3");
const ul_li_content_list = document.querySelectorAll(".lf_landing_right_sub li");
const lf_page_titles_a = document.querySelectorAll(".lf_page_titles_a");
const lf_page_titles_a_txt = document.querySelectorAll(".lf_page_titles_a span");
var content_list_arr = [];
var content_list_id_arr = [];
var content_list_top_arr = [];
let content_list_count=0;
var lf_i=0;
var content_list_arr_underscore = [];

for(i=0; i<lf_list_title.length; i++) {
    content_list_arr.push(lf_list_title[i].innerText);
    content_list_arr_underscore.push(replaceAll2(content_list_arr[i], ' ', '_'));
    lf_list_title[i].id = content_list_arr_underscore[i];
    lf_list_title[i].innerHTML += '<a href="#'+content_list_arr_underscore[i]+'"><img alt="main headings link" width="21" height="21" src="'+wp_dir_url+'/assets/icons/link.svg" /></a>';
    content_list_id_arr.push(lf_list_title[i].getAttribute("id"));
    content_list_count++;
}

window.addEventListener("load", ()=>{
    content_list_top_arr=[];
    for(i=0; i<lf_list_title.length; i++) {
        content_list_top_arr.push(lf_list_title[i].offsetTop-300);
    }
});

window.addEventListener("resize", ()=>{
    content_list_top_arr=[];
    for(i=0; i<lf_list_title.length; i++) {
        content_list_top_arr.push(lf_list_title[i].offsetTop-300);
    }    
});


ul_content_list.forEach(item=>{
    for(i=0; i<content_list_arr.length; i++) {
        let secondlistclass = "";
        if(lf_list_title[i].tagName == "H3") secondlistclass = "secondlistclass";
        item.innerHTML += '<li class="'+secondlistclass+'"><a class="lf_page_titles_a" href="#'+content_list_arr_underscore[i]+'"><span>'+content_list_arr[i]+'</span></a></li>';
    }
});




// content list progress

var the_current_i_a, the_current_i_li, j;
let lf_content_paint_access=1;
const lf_right_content_list_bg = document.getElementById("lf_right_content_list_bg");

window.addEventListener("scroll", content_list_highlighter);
window.addEventListener("touchmove", content_list_highlighter);
    
function content_list_highlighter() {
    the_current_i_a = document.querySelectorAll(".lf_landing_right_sub li a");
    the_current_i_li = document.querySelectorAll(".lf_landing_right_sub li");
    lf_content_paint_access=1;
    let thei = the_current_i_li.length-1, theiafter = the_current_i_li.length/2-1;
    for(i=thei; i>theiafter; i--) {
        if(lf_content_paint_access==1) {
            if(document.scrollingElement.scrollTop > (content_list_top_arr[i-the_current_i_li.length/2]+window.innerHeight/2)) {
                if(the_current_i_li[i].innerText == "Short Quiz") lf_right_content_list_bg.style.backgroundColor = "#a92626";
                else lf_right_content_list_bg.style.backgroundColor = "var(--ax_span_color)";
                lf_content_paint_access=0;
                the_current_i_a[i].style.color = "#fff";
                lf_right_content_list_bg.style.maxWidth = (the_current_i_li[i].clientWidth+11)+"px";
                lf_right_content_list_bg.style.maxHeight = (the_current_i_li[i].clientHeight+4)+"px";
                lf_right_content_list_bg.style.transform = "translateY("+(the_current_i_li[i].offsetTop-23)+"px)";
                
            } else if(document.scrollingElement.scrollTop < content_list_top_arr[0]) {
                lf_right_content_list_bg.style.maxWidth = "0px";
                the_current_i_a[the_current_i_li.length/2].style.color = "var(--txt1)";
                
            } else the_current_i_a[i].style.color = "var(--txt1)";
        }else the_current_i_a[i].style.color = "var(--txt1)";
    }
}
