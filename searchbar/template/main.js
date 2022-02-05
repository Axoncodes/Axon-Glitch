if (document.getElementById("axg_searchform")) {
  document.getElementById("axg_searchform").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("axg_searchform_res_cover").style.display="block";
    activationHandler.start('axg_searchbar')
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