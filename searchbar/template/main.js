if (document.getElementById("axg_searchform")) {
  document.getElementById("axg_searchform").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("axg_searchform_res_cover").style.display="block";
    if (document.getElementById("axg_isearch").value.length > 0) activationHandler.start('axg_searchbar')
  });

  document.getElementById("axg_isearch").addEventListener("input", e => {
    if (e.target.value.length > 0) activationHandler.start('axg_searchbar')
    else activationHandler.end('axg_searchbar')
  });

  // hideAtTop
  const searchbar = document.getElementById('axg_searchbar')
  const hideAtTop = parseInt(searchbar.getAttribute('hideAtTop'))
  if (hideAtTop) {
    searchbar.classList.add('axg_hide')
    if (window.scrollY > 200) searchbar.classList.remove('axg_hide')
  }
  window.addEventListener("scroll", () => {
    if (hideAtTop) {
      searchbar.classList.add('axg_hide')
      if (window.scrollY > 300) searchbar.classList.remove('axg_hide')
    }
  });
}