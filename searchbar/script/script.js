const search_box = document.getElementById("axg_isearch");
const axg_searchform_res = document.getElementById("axg_searchform_res");
let all_posts_namesvar = []
if (all_posts_names) all_posts_namesvar = all_posts_names
else all_posts_namesvar = ['alien']
search_box.addEventListener("input", () => {
  if((search_box.value).length <= 0) {
    axg_searchform_res.innerHTML = '';
  } else {
    axg_searchform_res.innerHTML = '';
    for(i=0; i<all_posts_namesvar.length; i++) {
      if((all_posts_namesvar[i].toLowerCase().search(search_box.value.toLowerCase())) >= 0 ) {
        axg_searchform_res.innerHTML += '<li><a href="'+all_posts_links[i]+'">'+all_posts_namesvar[i]+'</a></li>';
      }
    }
  }
});

// searchbox handle
if(document.getElementById("axg_searchform"))document.getElementById("axg_searchform").addEventListener("click", e=>{
  e.preventDefault(); 
  document.getElementById("axg_searchform").classList.add("axg_active");
  document.getElementById("axg_searchform_res_cover").style.display = "block";
  // if(document.getElementById("lf_progressbar_num"))
  //     document.getElementById("lf_progressbar_num").style.opacity = 0;
});
// document.getElementById("axg_naturalizer").addEventListener("click", ()=>{
//     if(document.getElementById("axg_searchform"))document.getElementById("axg_searchform").classList.remove("axg_active");
//     document.getElementById("axg_searchform_res_cover").style.display = "none";
//     // if(document.getElementById("lf_progressbar_num"))
//     //     document.getElementById("lf_progressbar_num").style.opacity = 1;
// });
document.getElementsByTagName("main")[0].addEventListener("click", e=>{
  // e.preventDefault();
  document.getElementById("axg_searchform").classList.remove("axg_active");
  document.getElementById("axg_searchform_res_cover").style.display = "none";
  // document.getElementById("lf_progressbar_num").style.opacity = 1;
});
