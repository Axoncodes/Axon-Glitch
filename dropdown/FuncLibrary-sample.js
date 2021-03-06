// var dropdownSubMenuDiv = [];
window.addEventListener("load", ()=>{

  // dropdown handler
  const dropdowns = document.querySelectorAll(".ax_elements .dropdown");
  const dropdownHeaders = document.querySelectorAll(".ax_elements .dropdown .dropdownHead");
  const dropdownSubMenuDiv = document.querySelectorAll(".ax_elements .dropdown .dropdownBody .menu li[subtrigger='click'] > div");
  const dropdownSubMenu = document.querySelectorAll(".ax_elements .dropdown .dropdownBody .menu li[subtrigger='click']");

  // handle submenu clicks
  dropdownSubMenuDiv.forEach((element, key) => {
    if(!element.classList.contains("singletab")) 
      element.addEventListener("click", (event) => {
        const currentmenu = dropdownSubMenu[key];
        event.preventDefault();
        currentmenu.classList.contains("subopen")
          ? currentmenu.classList.remove("subopen")
          : currentmenu.classList.add("subopen");
      });
  });

  dropdownHeaders.forEach((element, key)=>{
    dropdownTrigger(
      element.getAttribute('subtrigger'),
      dropdowns[key], 
      element, 
      element.getAttribute('childmodeid')
    );
  });

  // click away handler
  // hover:
  document.querySelectorAll(".ax_elements .dropdown li[subtrigger='hover']").forEach((element, key) => {
    document.querySelectorAll(".ax_elements .dropdown li[subtrigger='hover'] li").forEach((subElement) => {
      subElement.addEventListener("mouseleave", ()=>{
        if(subElement.classList.contains("subopen")) {
          subElement.classList.remove("subopen");
        }
      });
    });
  });
  // click:
  window.addEventListener("click", (event)=>{

    const dropdownHeaders = document.querySelectorAll(".ax_elements .dropdown .dropdownHead");
    // if the click is on a dropdown
    let triggerOnDropdown = false;
    if(event.target.getAttribute("childmode") == "dropdown" ) triggerOnDropdown = true;

    if (!triggerOnDropdown) {
      dropdownHeaders.forEach((dom, key)=>{
        const currentmenu = document.querySelectorAll(`.ax_elements .dropdown .dropdown[childmodeid='${key}'] .dropdownBody .menu li[subtrigger='click'].subopen`);
        currentmenu.forEach((element, key)=>{element.classList.remove("subopen")});
        if (document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`))
          closeDom(
            document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}']`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownHead`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody .menu`),
          );
      });
    }
    else{
      dropdownHeaders.forEach((dom, key)=>{
        if (event.target.getAttribute("childmodeid") == dom.getAttribute("childmodeid") && document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`) && document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`).length>=0) {
        // if (event.target.getAttribute("childmodeid") != dom.getAttribute("childmodeid") && document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`)) {
          const currentmenu = document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody .menu li[subtrigger='click'].subopen`);
          currentmenu.forEach((element, key)=>{
            if(!isDescendant(element, event.target))
              element.classList.remove("subopen")
          });
          closeDom(
            document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}']`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownHead`), 
            document.querySelector(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody .menu`),
          )
        }
      });
    }
  });


  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) return true;
        node = node.parentNode;
    }
    return false;
  }

  function dropdownTrigger(trigger, dropdown, dropdownHeader, key) {
    switch(trigger) {
      case 'click': dropdownClickTrigger(dropdownHeader, key); break;
      case 'hover': dropdownHoverTrigger(dropdown, key); break;
      // The default is for the structures such as link structure that do not need any eventListener
      default: break;
    }
  }

  function dropdownHoverTrigger(element, key) {
    element.addEventListener("mouseenter", ()=>{dropdownHandler(key)});
    element.addEventListener("mouseleave", ()=>{
      const currentmenu = document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key+1}'] .dropdownBody .menu li[subtrigger='click'].subopen`);
      currentmenu.forEach((element1, key)=>{
        element1.classList.remove("subopen");
      });
      dropdownHandler(key)
    });
  }

  function dropdownClickTrigger(element, key) {
    element.addEventListener("click", ()=>{dropdownHandler(key)});
  }

  document.querySelectorAll(".dropdown.mega .dropdownBody .menu").forEach(element=>{
    element.addEventListener("scroll", (event)=>{
      element.querySelector(".dropdownHeadTitle").style.opacity = element.scrollTop === 0 ? 1 : 1-((element.scrollTop)/56);
    });
  });


  // head title settings
  document.querySelectorAll(`.ax_elements:not([nomain="true"]) > section.dropdown`).forEach((element)=>{
    if(document.querySelector(`.dropdown .dropdownBody[childmodeid='${element.getAttribute("childmodeid")}'] .menu .dropdownHeadTitle`)) {
      const inner = element.querySelector(".dropdownHead .inner");
      document.querySelector(`.dropdown .dropdownBody[childmodeid='${element.getAttribute("childmodeid")}'] .menu .dropdownHeadTitle`).style.color = inner.getAttribute("headTitleColor");
    }
  });


  // style on hover
  document.querySelectorAll(`.ax_elements:not([nomain="true"]) > section.dropdown`).forEach((element)=>{
    const inner = element.querySelector(".dropdownHead .inner");
    element.addEventListener("mouseover", ()=>{
      if(!element.classList.contains("open")) {
        // if (element.querySelector(".dropdownHead .inner .dropicon")) element.querySelector(".dropdownHead .inner .dropicon").src = "https://axg.axoncodes.com/dropdown/assets/icons/down-white.svg";
        if (element.querySelector(".dropdownHead .inner .dropicon")) {
          element.querySelector(".dropdownHead .inner .dropicon.whitedown").classList.remove('off');
          element.querySelector(".dropdownHead .inner .dropicon.darkdown").classList.add('off');
        }
        inner.style.backgroundColor = inner.getAttribute("headbackgroundhover");
        inner.style.color = inner.getAttribute("colorhover");
        
      }
    });

    element.addEventListener("mouseout", ()=>{
      if(!element.classList.contains("open")) {
        // if (element.querySelector(".dropdownHead .inner .dropicon")) element.querySelector(".dropdownHead .inner .dropicon").src = "https://axg.axoncodes.com/dropdown/assets/icons/down.svg";
        if (element.querySelector(".dropdownHead .inner .dropicon")) {
          element.querySelector(".dropdownHead .inner .dropicon.whitedown").classList.add('off');
          element.querySelector(".dropdownHead .inner .dropicon.darkdown").classList.remove('off');
        
          // element.querySelector(".dropdownHead .inner .dropicon").classList.add('darkdown');
        }
        inner.style.backgroundColor = inner.getAttribute("headbackground");
        inner.style.color = inner.getAttribute("color");
      }
    });
  });


  function dropdownHandler(key) {

    const dropdown = document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}']`);
    const head = document.querySelector(`.ax_elements .dropdown .dropdownHead[childmodeid='${key}']`);
    const body = document.querySelector(`.ax_elements .dropdown .dropdownBody[childmodeid='${key}']`);
    const menu = document.querySelector(`.ax_elements .dropdown .dropdownBody .menu[childmodeid='${key}']`);
    const lists = document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}'] .dropdownBody .menu li`);
    
    // close other dropdowns
    const otherKeys = [...new Set([...document.querySelectorAll(`.ax_elements .dropdown:not([childmodeid='${key}'])`)].map(dropdown => dropdown.getAttribute('childmodeid')).filter(key => key))]
    otherKeys.forEach(key => {
      closeDom(
        document.querySelectorAll(`.ax_elements .dropdown[childmodeid='${key}']`),
        document.querySelector(`.ax_elements .dropdown .dropdownBody[childmodeid='${key}']`),
        document.querySelector(`.ax_elements .dropdown .dropdownHead[childmodeid='${key}']`),
      )
    })


    // open/close handler
    if (body) dropdown[0].classList.contains("open") 
      ?closeDom(dropdown, body, head, menu)
      :openDom(dropdown, body, head, lists, menu);
      
    // // subopening handler
    // document.querySelectorAll(`.ax_elements .dropdown[childmodeid="${key+1}"] .dropdownBody .menu li.side > ul`).forEach((dom, key2)=>{
    //   handleTheDropdownsFallingOutOfView(key+1, dom);
    // });

    // custom --mega
    if(body && body.getAttribute('mode') == "mega") {
      body.style.left = "-"+dropdown.offsetLeft+"px";
    }


  }

  function handleTheDropdownsFallingOutOfView(key, actualdom) {
    let righthand = document.documentElement.offsetWidth-actualdom.getBoundingClientRect().x-actualdom.getBoundingClientRect().width;
    if(righthand<0) {
      actualdom.style.left = "unset";
      actualdom.style.right = "-"+(actualdom.getBoundingClientRect().width+actualdom.getBoundingClientRect().right)+"px";
    } else {
      actualdom.style.right = "unset";
      actualdom.style.left = actualdom.getBoundingClientRect().width+"px";
    }
  }

  function closeDom(dropdown, body, head) {
    // only perform the closing function if the dropdown header contains the open class
    if (head.classList.contains("open")) {
      if(dropdown.length>1) {
        dropdown[0].classList.remove("open");
        dropdown[1].classList.remove("open");
      }
      else dropdown[0].classList.remove("open");
      if (body) {
        body.classList.remove("open");
        body.style.maxHeight = 0;
      }
      if (head) {
        head.classList.remove("open");
        head.querySelector(".inner").style.backgroundColor=head.querySelector(".inner").getAttribute("headbackground");
        head.querySelector(".inner").style.color=head.querySelector(".inner").getAttribute("color");
        // console.log(head.querySelector(".inner .dropicon"));
        // if (head.querySelector(".inner .dropicon")) head.querySelector(".inner .dropicon").src = "https://axg.axoncodes.com/dropdown/assets/icons/down.svg";
        if (head.querySelector(".inner .dropicon")) {
          head.querySelector(".inner .dropicon.whitedown").classList.add('off')
          head.querySelector(".inner .dropicon.darkdown").classList.remove('off')
        }
      }
      // menu.style.maxHeight = 0;
    }
  }

  function openDom(dropdown, body, head, lists, menu) {
    console.log('open');
    var height = 0, minMenuHeight = menu.clientHeight;

    dropdown[0].classList.add("open")
    if (dropdown.length > 1) dropdown[1].classList.add("open");

    body.classList.add("open");
    head.classList.add("open");
    head.querySelector(".inner").style.backgroundColor=head.querySelector(".inner").getAttribute("activebackground");
    head.querySelector(".inner").style.color=head.querySelector(".inner").getAttribute("colorhover");
    // if (head.querySelector(".inner .dropicon")) head.querySelector(".inner .dropicon").src="https://axg.axoncodes.com/dropdown/assets/icons/down-white.svg";
    if (head.querySelector(".inner .dropicon")) {
      head.querySelector(".inner .dropicon.whitedown").classList.remove('off');
      head.querySelector(".inner .dropicon.darkdown").classList.add('off');

      // head.querySelector(".inner .dropicon").classList.add('darkdown');
    }
    lists.forEach((list)=>{
      height += list.clientHeight;
      // menu.style.maxHeight = (height+minMenuHeight)+"px";
      body.style.maxHeight = (height+minMenuHeight)+"px";
    });
  
    if(dropdown[0].getAttribute("mode").indexOf("mega") >= 0) {
      const thereductionrate = dropdown[0].getAttribute("targetlocator")?148:18;
      const megaheight = (window.innerHeight - body.offsetTop)-thereductionrate;
      body.style.height = megaheight+"px";
      body.querySelector(".menu").style.height = (megaheight)+"px";
      body.querySelector(".menu").style.width = (document.documentElement.offsetWidth-0.18*document.documentElement.offsetWidth)+"px";
    }
    if(dropdown[0].getAttribute("mode").indexOf("simple") >= 0) {
      if(document.querySelector(`section.dropdown ul.menu[childmodeid="${body.getAttribute("childmodeid")}"]`)) {
        const mainDropdownLeft = document.querySelector(`section.dropdown.mainDropdown[childmodeid="${body.getAttribute("childmodeid")}"]`).getBoundingClientRect().x;
        document.querySelector(`section.dropdown ul.menu[childmodeid="${body.getAttribute("childmodeid")}"]`).style.left = `${mainDropdownLeft}px`;
      }
      // handleTheDropdownsFallingOutOfView(body.getAttribute("childmodeid"), menu);

    }
    
  }


  // active megadropdown size handler
  function megasizehandler() {
    document.querySelectorAll('.dropdown.open').forEach(element => {
      if(element.getAttribute("mode") && element.getAttribute("mode").indexOf("mega") >= 0) {
        var body;
        if(element.getAttribute("targetlocator")) body = document.querySelector(`#${element.getAttribute("targetlocator")} .dropdownBody`);
        else body = element.querySelector(".dropdownBody");
        const thereductionrate = element.getAttribute("targetlocator")?148:9;
        const megaheight = (window.innerHeight - (body.offsetTop + element.offsetTop))-thereductionrate;
        body.style.height = megaheight+"px";
        body.querySelector(".menu").style.height = (megaheight)+"px";
        body.querySelector(".menu").style.width = (document.documentElement.offsetWidth-0.18*document.documentElement.offsetWidth)+"px";
      }
    });


    document.querySelectorAll('.dropdown').forEach(element => {
      if(element.getAttribute("mode") && element.getAttribute("mode").indexOf("simple") >= 0) {
        // the 'left' for simple dropdowns with 'nomain'
        if(document.querySelector(`section.dropdown ul.menu[childmodeid="${element.getAttribute("childmodeid")}"]`)) {
          const mainDropdownLeft = document.querySelector(`section.dropdown.mainDropdown[childmodeid="${element.getAttribute("childmodeid")}"]`).getBoundingClientRect().x;
          document.querySelector(`section.dropdown ul.menu[childmodeid="${element.getAttribute("childmodeid")}"]`).style.left = `${mainDropdownLeft}px`;
        }
      }
    });

  } window.addEventListener("resize", megasizehandler);
  megasizehandler();


});