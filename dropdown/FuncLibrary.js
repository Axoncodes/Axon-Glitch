// var dropdownSubMenuDiv = [];
window.addEventListener("load", ()=>{
    
  // dropdown handler
  const dropdowns = document.querySelectorAll("ax-elements .dropdown");
  const dropdownHeaders = document.querySelectorAll("ax-elements .dropdown .dropdownHead");
  const dropdownSubMenuDiv = document.querySelectorAll("ax-elements .dropdown .dropdownBody .menu li[subtrigger='click'] > div");
  const dropdownSubMenu = document.querySelectorAll("ax-elements .dropdown .dropdownBody .menu li[subtrigger='click']");

  // handle submenu clicks
  dropdownSubMenuDiv.forEach((element, key)=>{
    element.addEventListener("click", (event)=>{
      const currentmenu = dropdownSubMenu[key];
      event.preventDefault();
      currentmenu.classList.contains("subopen")
        ?currentmenu.classList.remove("subopen")
        :currentmenu.classList.add("subopen");
    });
  });

  dropdownHeaders.forEach((element, key)=>{
    dropdownTrigger(
      dropdownHeaders[key].getAttribute("subtrigger"), 
      dropdowns[key], 
      dropdownHeaders[key], 
      key
    );
  });

  // click away handler
  // hover:
  document.querySelectorAll("ax-elements .dropdown li[subtrigger='hover']").forEach((element, key) => {
    document.querySelectorAll("ax-elements .dropdown li[subtrigger='hover'] li").forEach((subElement) => {
      subElement.addEventListener("mouseleave", ()=>{
        if(subElement.classList.contains("subopen")) {
          subElement.classList.remove("subopen");
        }
      });
    });
  });
  // click:
  window.addEventListener("click", (event)=>{

    const dropdowns = document.querySelectorAll("ax-elements .dropdown");
    const dropdownHeaders = document.querySelectorAll("ax-elements .dropdown .dropdownHead");
    const dropdownBody = document.querySelectorAll("ax-elements .dropdown .dropdownBody");
    const dropdownMenu = document.querySelectorAll("ax-elements .dropdown .dropdownBody .menu");
    // if the click is on a dropdown
    let triggerOnDropdown = false;
    if(event.target.getAttribute("childmode") == "dropdown" ) triggerOnDropdown = true;

    if(!triggerOnDropdown) {
      dropdownHeaders.forEach((dom, key)=>{
        const currentmenu = document.querySelectorAll(`ax-elements .dropdown:nth-child(${key}) .dropdownBody .menu li[subtrigger='click'].subopen`);
        currentmenu.forEach((element, key)=>{element.classList.remove("subopen")});
        closeDom(
          document.querySelectorAll(`ax-elements .dropdown[childmodeid='${key}']`), 
          document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownBody`), 
          document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownHead`), 
          document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownBody .menu`),
        );
      });
    }
    else{
      dropdownHeaders.forEach((dom, key)=>{
        if (event.target.getAttribute("childmodeid") != dom.getAttribute("childmodeid")) {
          const currentmenu = document.querySelectorAll(`ax-elements .dropdown:nth-child(${key}) .dropdownBody .menu li[subtrigger='click'].subopen`);
          currentmenu.forEach((element, key)=>{
            if(!isDescendant(element, event.target))
              element.classList.remove("subopen")
          });
          closeDom(
            document.querySelectorAll(`ax-elements .dropdown[childmodeid='${key}']`), 
            document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownBody`), 
            document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownHead`), 
            document.querySelector(`ax-elements .dropdown[childmodeid='${key}'] .dropdownBody .menu`),
          )
        }
      });
    }
  });

  // handle side submenues whether its out of view or not
  document.querySelectorAll(`ax-elements .dropdown .dropdownBody .menu li.side > ul`).forEach(dom=>{
    dom.addEventListener("change", ()=>{
    })
  });

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
  }

  function dropdownTrigger(trigger, dropdown, dropdownHeader, key) {
    switch(trigger) {
      case 'click': dropdownClickTrigger(dropdownHeader, key); break;
      case 'hover': dropdownHoverTrigger(dropdown, key); break;
      default: break;
    }
  }

  function dropdownHoverTrigger(element, key) {
    element.addEventListener("mouseenter", ()=>{dropdownHandler(key)});
    element.addEventListener("mouseleave", ()=>{
      const currentmenu = document.querySelectorAll(`ax-elements:nth-child(${key+1}) .dropdown .dropdownBody .menu li[subtrigger='click'].subopen`);
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
      console.log('event', (element.scrollTop)/56);
      element.querySelector(".dropdownHeadTitle").style.opacity = element.scrollTop === 0 ? 1 : 1-((element.scrollTop)/56);
    });
  });


  // head title settings
  document.querySelectorAll(`ax-elements:not([nomain="true"]) > section.dropdown`).forEach((element)=>{
    const inner = element.querySelector(".dropdownHead .inner");
    document.querySelector(`.dropdownBody[childmode=${element.getAttribute("childmode")}] .menu .dropdownHeadTitle`).style.color = inner.getAttribute("headTitleColor");
  });


  // style on hover
  document.querySelectorAll(`ax-elements:not([nomain="true"]) > section.dropdown`).forEach((element)=>{
    const inner = element.querySelector(".dropdownHead .inner");
    element.addEventListener("mouseover", ()=>{
      if(!element.classList.contains("open")) {
        element.querySelector(".dropdownHead .inner .dropicon").src = "./dropdown/assets/icons/down-white.svg";
        inner.style.backgroundColor = inner.getAttribute("headbackgroundhover");
        inner.style.color = inner.getAttribute("colorhover");
        
      }
    });

    element.addEventListener("mouseout", ()=>{
      if(!element.classList.contains("open")) {
        element.querySelector(".dropdownHead .inner .dropicon").src = "./dropdown/assets/icons/down.svg";
        inner.style.backgroundColor = inner.getAttribute("headbackground");
        inner.style.color = inner.getAttribute("color");
      }
    });
  });


  function dropdownHandler(key) {

    // declare
    
    const dropdown = document.querySelectorAll(`ax-elements .dropdown[childmodeid='${key}']`);
    const head = document.querySelector(`ax-elements .dropdown .dropdownHead[childmodeid='${key}']`);
    const body = document.querySelector(`ax-elements .dropdown .dropdownBody[childmodeid='${key}']`);
    const menu = document.querySelector(`ax-elements .dropdown .dropdownBody .menu[childmodeid='${key}']`);
    const lists = document.querySelectorAll(`ax-elements .dropdown[childmodeid='${key}'] .dropdownBody .menu li`);
    
    // open/close handler
    dropdown[0].classList.contains("open") 
      ?closeDom(dropdown, body, head, menu)
      :openDom(dropdown, body, head, lists, menu);
      
    // subopening handler
    document.querySelectorAll(`ax-elements:nth-child(${key+1}) .dropdown .dropdownBody .menu li.side > ul`).forEach((dom, key2)=>{
      handleTheDropdownsFallingOutOfView(key+1, dom);
      console.log('handleTheDropdownsFallingOutOfView');
      // dom.style.left = dom.clientWidth+"px";
    });

    // custom --mega
    if(body.getAttribute('mode') == "mega") {
      body.style.left = "-"+dropdown.offsetLeft+"px";
    }
  }

  function handleTheDropdownsFallingOutOfView(key, actualdom) {
    var dom = document.querySelector(`ax-elements:nth-child(${key}) .dropdown`);
    let righthand = dom.scrollWidth + dom.offsetLeft + actualdom.clientWidth;
    if(window.innerWidth <= righthand) {
      actualdom.style.left = "unset";
      actualdom.style.right = actualdom.clientWidth+"px";
    } else {
      actualdom.style.right = "unset";
      actualdom.style.left = actualdom.clientWidth+"px";
    }
  }

  function closeDom(dropdown, body, head, menu) {
    if(dropdown.length>1) {
      dropdown[0].classList.remove("open");
      dropdown[1].classList.remove("open");
    }else dropdown[0].classList.remove("open");
    body.classList.remove("open");
    head.classList.remove("open");
    head.querySelector(".inner").style.backgroundColor=head.querySelector(".inner").getAttribute("headbackground");
    head.querySelector(".inner").style.color=head.querySelector(".inner").getAttribute("color");
    head.querySelector(".inner .dropicon").src="./dropdown/assets/icons/down.svg";
    menu.style.maxHeight = 0, 
    body.style.maxHeight = 0
  }

  function openDom(dropdown, body, head, lists, menu) {
    var height = 0, minMenuHeight = menu.clientHeight;
    if(dropdown.length>1) {
      dropdown[0].classList.add("open");
      dropdown[1].classList.add("open");
    } else dropdown[0].classList.add("open");
    body.classList.add("open");
    head.classList.add("open");
    head.querySelector(".inner").style.backgroundColor=head.querySelector(".inner").getAttribute("activebackground");
    head.querySelector(".inner").style.color=head.querySelector(".inner").getAttribute("colorhover");
    head.querySelector(".inner .dropicon").src="./dropdown/assets/icons/down-white.svg";
    lists.forEach((list)=>{
      height += list.clientHeight;
      menu.style.maxHeight = (height+minMenuHeight)+"px";
      body.style.maxHeight = (height+minMenuHeight)+"px";
    });
  
    if(dropdown[0].getAttribute("mode").indexOf("mega") >= 0) {
      const thereductionrate = dropdown[0].getAttribute("targetlocator")?45:18;

      const megaheight = (window.innerHeight - body.offsetTop)-thereductionrate;
      body.style.height = megaheight+"px";
      body.querySelector(".menu").style.height = megaheight+"px";
    }
  }

  // active megadropdown height handler
  function megaheighthandler() {
    document.querySelectorAll('.dropdown.open').forEach(element => {
      if(element.getAttribute("mode") && element.getAttribute("mode").indexOf("mega") >= 0) {
        var body;
        if(element.getAttribute("targetlocator")) body = document.querySelector(`#${element.getAttribute("targetlocator")} .dropdownBody`);
        else body = element.querySelector(".dropdownBody");
        console.log('body.offsetTop', body.offsetTop);
        console.log('element.offsetTop', element.offsetTop);
        const thereductionrate = element.getAttribute("targetlocator")?72:9;
        const megaheight = (window.innerHeight - (body.offsetTop + element.offsetTop))-thereductionrate;
        body.style.height = megaheight+"px";
        body.querySelector(".menu").style.height = megaheight+"px";
      }
    })
  } window.addEventListener("resize", megaheighthandler);



  // dropdownGroup
  function dropdownGroup() {
    
  }


});