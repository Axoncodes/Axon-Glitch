// counters
var dropdownsCount = 0;

// module handlers
customElements.define('ax-elements', class AxElements extends HTMLElement {
    connectedCallback() {
        switch(this.getAttribute('mode')) {
            case "dropdown": new axCustomDropdown(this); break;
            case "logo": axCustomLogo(this); break;
            default: break;
        }
    }
});



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
            structure: element.attributes.structure?element.attributes.structure.value:null,
            options: element.attributes.options?JSON.parse(element.attributes.options.value):null,
            width: parseInt(element.attributes.width?element.attributes.width.value:'220'),
            height: parseInt(element.attributes.height?element.attributes.height.value:'22'),
        };
        const childMode = `childMode="${attrs.mode}" childModeId="${dropdownsCount}" `;

        const dropdownHead = `
            <div ${childMode} style="height:${attrs.height+"px"}" class="dropdownHead" subtrigger="${attrs.subTrigger}" mode="${attrs.structure}">
                <div ${childMode} 
                activeBackground="${attrs.activeBackground}" 
                colorHover="${attrs.colorHover}" 
                headBackgroundHover="${attrs.headBackgroundHover}" 
                color="${attrs.color}"
                headTitleColor="${attrs.headTitleColor}"
                headBackground="${attrs.headBackground}" 
                class="inner">

                    ${attrs.icon?`<img ${childMode} class="icon" src="./dropdown/assets/icons/${attrs.icon}">`:`<span></span>`}
                    <span ${childMode}>${attrs.title}</span> 
                    <img ${childMode} class="dropicon" src="./dropdown/assets/icons/down.svg">

                </div>
            </div>`;
        const dropdownList = dropdownContent_handler(attrs.options, childMode);

        const dropdownBody = `
            <div ${childMode} class="dropdownBody" mode="${attrs.structure}" style="min-width:${attrs.width+"px"}">
                
                <ul ${childMode} style="background-color:${attrs.background}" class="menu">
                    ${attrs.headTitle?`<h3 class="dropdownHeadTitle">${attrs.headTitle}</h3>`:``}
                    ${dropdownList}
                </ul>
            </div>`;
        if(attrs.targetLocator && attrs.targetLocator.length>0) {
            document.getElementById(attrs.targetLocator).classList.add(`dropdown-${dropdownsCount}`);
            document.getElementById(attrs.targetLocator).innerHTML = `<section ${childMode} class="dropdown">${dropdownBody}</section>`;
            element.innerHTML = `<section targetLocator="${attrs.targetLocator}" mode="${attrs.structure}" ${childMode} class="dropdown ${attrs.structure}">${dropdownHead}</section>`;
            dropdownsCount++;
        }else{
            dropdownsCount++;
            element.innerHTML = `<section mode="${attrs.structure}" ${childMode} class="dropdown ${attrs.structure}">${dropdownHead} ${dropdownBody}</section>`;
        }
    }
}

// dropdown content handler
function dropdownContent_handler(data, childMode) {
    var content = ``;
    data.map((item)=>{
        content += `
        <li ${childMode} subTrigger="${item.subTrigger?item.subTrigger:''}" class="list ${item.subOpening?item.subOpening:''} ${item.level?item.level:''}">
            <div ${childMode} class="listHead">
                ${item.url?`<a ${childMode} href="${item.url}" class="inner">`:`<div class="inner">`}
                    ${item.icon?`<img ${childMode} src="./dropdown/assets/icons/${item.icon.url}"/>`:`<span></span>`}
                    <span style="color:${item.color}" ${childMode}>${item.title}</span>
                    ${item.content?`<img ${childMode} class="icon" src="./dropdown/assets/icons/down.svg">`:`<span></span>`}
                ${item.url?`</a>`:`</div>`}
            </div>
            <ul ${childMode} class="listSubmenu">
                ${item.content?dropdownContent_handler(item.content, childMode):``}
            </ul>
        </li>`;
    });
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
            <img src="${attrs.src}" alt="${attrs.alt}" />
        </a>
    `;
}
// logo --finish