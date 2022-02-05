// counters
var dropdownsCount = 0;

// module handlers
customElements.define('ax-elements', class AxElements extends HTMLElement {
    connectedCallback() {
        switch(this.getAttribute('mode')) {
            case "searchbar": axCustomsearchbar(this); break;
            case "dropdown": axCustomDropdown(this); break;
            case "dropdownGroup": axCustomDropdownGroup(this); break;
            case "logo": axCustomLogo(this); break;
            case "sidebar": axCustomSidebar(this); break;
            case "scrolldownAnimation": axCustomScrolldownAnimation(this); break;
            default: break;
        }
    }
});

// axCustomsearchbar --start
function axCustomsearchbar(element) {
	const regExp = /[^'\x22]+/;
	element.innerHTML = `
    <div id="axg_searchbar">
			<form id="axg_searchform" method="POST">
			<label for="axg_searchform_button">search</label>
			<button type="submit" name="ax_submit" title="ax_submit" id="axg_searchform_button">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M447.615,64.386C406.095,22.866,350.892,0,292.175,0s-113.92,22.866-155.439,64.386 C95.217,105.905,72.35,161.108,72.35,219.824c0,53.683,19.124,104.421,54.132,144.458L4.399,486.366 c-5.864,5.864-5.864,15.371,0,21.236C7.331,510.533,11.174,512,15.016,512s7.686-1.466,10.617-4.399l122.084-122.083 c40.037,35.007,90.775,54.132,144.458,54.132c58.718,0,113.919-22.866,155.439-64.386c41.519-41.519,64.385-96.722,64.385-155.439 S489.134,105.905,447.615,64.386z M426.379,354.029c-74.001,74-194.406,74-268.407,0c-74-74-74-194.407,0-268.407 c37.004-37.004,85.596-55.5,134.204-55.5c48.596,0,97.208,18.505,134.204,55.5C500.378,159.621,500.378,280.028,426.379,354.029z" /></g></g></svg>
			</button>
			<label for="axg_isearch">search</label>
			<input id="axg_isearch" placeholder="search..." type="search" name="axg_isearch" pattern="${regExp}"/>
			</form>
    
			<div id="axg_searchform_res_cover">
				<ul id="axg_searchform_res"></ul>
			</div>
    </div>
  `;
}
// axCustomsearchbar --finish


// axCustomSidebar --start
function axCustomSidebar(element) {
    
}

// axCustomScrolldownAnimation --start
function axCustomScrolldownAnimation(element) {
    element.innerHTML = `<div class="lf_scrolldown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
    </div>`;
}



// dropdown group --start
function axCustomDropdownGroup(element) {
    var attrs = {
        mode: element.attributes.mode?element.attributes.mode.value:null,
        title: element.attributes.title?element.attributes.title.value:null,
        color: element.attributes.color?element.attributes.color.value:null,
        colorHover: element.attributes.colorHover?element.attributes.colorHover.value:null,
        activeBackground: element.attributes.activeBackground?element.attributes.activeBackground.value:null,
        headBackground: element.attributes.headBackground?element.attributes.headBackground.value:null,
        headBackgroundHover: element.attributes.headBackgroundHover?element.attributes.headBackgroundHover.value:null,
    };
}
// dropdown group --finish




// dropdown --start
function axCustomDropdown(element) {
    if(!element.getAttribute('nomain')){
        var attrs = {
            subTrigger: element.attributes.subTrigger?element.attributes.subTrigger.value:'click',
            targetLocator: element.attributes.targetLocator?element.attributes.targetLocator.value:null,
            color: element.attributes.color?element.attributes.color.value:null,
            exit: element.attributes.exit?element.attributes.exit.value:null,
            headTitle: element.attributes.headTitle?element.attributes.headTitle.value:null,
            headTitleColor: element.attributes.headTitleColor?element.attributes.headTitleColor.value:null,
            colorHover: element.attributes.colorHover?element.attributes.colorHover.value:null,
            activeBackground: element.attributes.activeBackground?element.attributes.activeBackground.value:null,
            headBackground: element.attributes.headBackground?element.attributes.headBackground.value:null,
            headBackgroundHover: element.attributes.headBackgroundHover?element.attributes.headBackgroundHover.value:null,
            title: element.attributes.title?element.attributes.title.value:null,
            icon: element.attributes.icon?element.attributes.icon.value:null,
            level: element.attributes.level?element.attributes.level.value:null,
            mode: element.attributes.mode?element.attributes.mode.value:null,
            background: element.attributes.background?element.attributes.background.value:null,
            structure: element.attributes.structure?element.attributes.structure.value:"simple",
            options: element.attributes.options?JSON.parse(element.attributes.options.value):null,
            width: parseInt(element.attributes.width?element.attributes.width.value:null),
            height: parseInt(element.attributes.height?element.attributes.height.value:'22'),
        };
        const childMode = `childMode="${attrs.mode}" childModeId="${dropdownsCount}" `;
        const inner = element.innerHTML; 

        const dropdownHead = `
            <div ${childMode} style="height:${attrs.height+"px"}; ${attrs.width?`width:${((attrs.width)+4)+"px"}`:``}" class="dropdownHead" subtrigger="${attrs.subTrigger}" mode="${attrs.structure}">
                <div ${childMode} 
                activeBackground="${attrs.activeBackground}" 
                colorHover="${attrs.colorHover}" 
                headBackgroundHover="${attrs.headBackgroundHover}" 
                color="${attrs.color}"
                headTitleColor="${attrs.headTitleColor}"
                headBackground="${attrs.headBackground}" 
                class="inner"
                style="
                    ${attrs.width?`min-width:${((attrs.width)-10)+"px"};
                    width:${((attrs.width)-10)+"px"}`:``};
                    grid-template-columns:${attrs.icon?`max-content auto max-content`:`max-content auto`};
                ">
                    ${attrs.icon?`<img ${childMode} class="icon" src="./dropdown/assets/icons/${attrs.icon}">`:``}
                    <span ${childMode}>${attrs.title}</span> 
                    <img ${childMode} class="dropicon" src="https://axoncodes.com/libraries//dropdown/assets/icons/down.svg">
                </div>
            </div>`;
            
        const dropdownList = dropdownContent_handler(attrs, attrs.options, childMode);
        const dropdownBody = `
            <div ${childMode} class="dropdownBody" mode="${attrs.structure}" style="${attrs.width?`min-width:${attrs.width+"px"}`:``}">
                <ul ${childMode} style="background-color:${attrs.background};" class="menu">
                    ${attrs.headTitle?`<h3 class="dropdown dropdownHeadTitle" ${childMode}>${attrs.headTitle}</h3>`:``}
                    ${attrs.exit?`<svg class="exitbutton" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`:``}
                    ${dropdownList}
                    ${inner}
                </ul>
            </div>`;
        if(attrs.targetLocator && attrs.targetLocator.length>0) {
            document.getElementById(attrs.targetLocator).classList.add(`dropdown-${dropdownsCount}`);
            document.getElementById(attrs.targetLocator).innerHTML = `<section ${childMode} class="dropdown">${dropdownBody}</section>`;
            element.innerHTML = `<section style="${attrs.width?`min-width:${attrs.width+"px"}`:``}" targetLocator="${attrs.targetLocator}" mode="${attrs.structure}" ${childMode} class="dropdown mainDropdown ${attrs.structure}">${dropdownHead}</section>`;
            dropdownsCount++;
        }else{
            dropdownsCount++;
            element.innerHTML = `<section style="${attrs.width?`min-width:${attrs.width+"px"}`:``}" mode="${attrs.structure}" ${childMode} class="dropdown mainDropdown ${attrs.structure}">${dropdownHead} ${dropdownBody}</section>`;
        }
    }
}


// dropdown content handler
/**
 * @item.subOpening : sub, side
 * @item.subTrigger : click, hover
 */
function dropdownContent_handler(attrs, data, childMode) {
    var content = ``;
    if(data) {
        data.map((item)=>{
            content += `
            <li ${childMode} subTrigger="${item.subTrigger?item.subTrigger:'click'}" class="list ${item.subOpening?item.subOpening:'sub'} ${item.level?item.level:''}">
                <div ${childMode} class="listHead ${attrs.structure}">
                    ${item.url?`<a ${childMode} href="${item.url}" class="inner">`:`<div class="inner">`}
                        ${item.icon?`<img ${childMode} src="./dropdown/assets/icons/${item.icon.url}"/>`:`<span></span>`}
                        ${item.title?`<span style="color:${item.color}" ${childMode}>${item.title}</span>`:``}
                        ${item.content?`<img ${childMode} class="icon" src="https://axoncodes.com/libraries//dropdown/assets/icons/down.svg">`:`<span></span>`}
                    ${item.url?`</a>`:`</div>`}
                </div>
                <ul ${childMode} class="listSubmenu">
                    ${item.content?dropdownContent_handler(attrs, item.content, childMode):``}
                </ul>
            </li>`;
        });
    }
    return content;

}
// dropdown --finish



// logo --start
function axCustomLogo(element) {
    var attrs = {
        alt: element.attributes.alt?element.attributes.alt.value:null,
        link: element.attributes.link?element.attributes.link.value:null,
        src: element.attributes.src?element.attributes.src.value:null,
        mode: element.attributes.mode?element.attributes.mode.value:null,
    };
    element.innerHTML = `
        <a href="${attrs.link}" class="headerLogo">
            <img width="100" src="${attrs.src}" alt="${attrs.alt}" />
        </a>
    `;
}
// logo --finish// counters
