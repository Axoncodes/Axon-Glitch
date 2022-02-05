if (document.getElementById("axg_searchform")) {
  document.getElementById("axg_searchform").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("axg_searchform_res_cover").style.display="block";
    activationHandler.start('axg_searchbar')
  });
}