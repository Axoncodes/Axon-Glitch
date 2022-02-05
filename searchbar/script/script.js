const search_box = document.getElementById("axg_isearch");
const axg_searchform_res = document.getElementById("axg_searchform_res");
search_box.addEventListener("input", () => {
  if((search_box.value).length <= 0) {
    axg_searchform_res.innerHTML = '';
  } else {
    axg_searchform_res.innerHTML = '';
    for(i=0; i<all_posts_names.length; i++) {
      if((all_posts_names[i].toLowerCase().search(search_box.value.toLowerCase())) >= 0 ) {
        axg_searchform_res.innerHTML += '<li><a href="'+all_posts_links[i]+'">'+all_posts_names[i]+'</a></li>';
      }
    }
  }
});