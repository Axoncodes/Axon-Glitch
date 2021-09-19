var dropdownsCount = 0;
customElements.define('ax-elements', class AxElements extends HTMLElement {
    connectedCallback() {
        switch(this.getAttribute('mode')) {
            case "dropdown": axCustomDropdown(this); break;
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
            title: element.attributes.title?element.attributes.title.value:null,
            icon: element.attributes.icon?element.attributes.icon.value:null,
            mode: element.attributes.mode?element.attributes.mode.value:null,
            structure: element.attributes.structure?element.attributes.structure.value:null,
            options: element.attributes.options?JSON.parse(element.attributes.options.value):null,
            width: parseInt(element.attributes.width?element.attributes.width.value:'220'),
            height: parseInt(element.attributes.height?element.attributes.height.value:'22'),
        };
        const childMode = `childMode="${attrs.mode}" childModeId="${dropdownsCount}" `;

        // if(attrs.targetLocator) {
        const dropdownHead = `
            <div ${childMode} class="dropdownHead" subtrigger="${attrs.subTrigger}" mode="${attrs.structure}">
                <div ${childMode} class="inner">
                    ${attrs.icon?`<img ${childMode} class="icon" src="./assets/icons/${attrs.icon}">`:`<span></span>`}
                    <span ${childMode}>${attrs.title}</span> 
                    <img ${childMode} class="dropicon" src="./assets/icons/down.svg">
                </div>
            </div>`;
        const dropdownList = dropdownContent_handler(attrs.options, childMode);

        const dropdownBody = `
            <div ${childMode} class="dropdownBody" mode="${attrs.structure}" style="min-width:${attrs.width+"px"}">
                <ul ${childMode} class="menu">${dropdownList}</ul>
            </div>`;
        if(attrs.targetLocator && attrs.targetLocator.length>0) {
            document.getElementById(attrs.targetLocator).classList.add(`dropdown-${dropdownsCount}`);
            document.getElementById(attrs.targetLocator).innerHTML = `<section ${childMode} class="dropdown">${dropdownBody}</section>`;
            element.innerHTML = `<section ${childMode} class="dropdown">${dropdownHead}</section>`;
            dropdownsCount++;
        }else{
            dropdownsCount++;
            element.innerHTML = `<section ${childMode} class="dropdown">${dropdownHead} ${dropdownBody}</section>`;
        }
    }
}

// dropdown content handler
function dropdownContent_handler(data, childMode) {
    // if(!element.getAttribute('nomain')){
    var content = ``;
    data.map((item)=>{
        content += `
        <li ${childMode} subTrigger="${item.subTrigger?item.subTrigger:'hover'}" class="list ${item.subOpening?item.subOpening:''}">
            <div ${childMode} class="listHead">
                ${item.url?`<a ${childMode} href="${item.url}" class="inner">`:`<div class="inner">`}
                    ${item.icon?`<img ${childMode} src="./assets/icons/${item.icon.url}"/>`:`<span></span>`}
                    <span ${childMode}>${item.title}</span>
                    ${item.content?`<img ${childMode} class="icon" src="./assets/icons/down.svg">`:`<span></span>`}
                ${item.url?`</a>`:`</div>`}
            </div>
            <ul ${childMode} class="listSubmenu">
                ${item.content?dropdownContent_handler(item.content, childMode):``}
            </ul>
        </li>`;
    });

    return content;
// }
}
function saySasho() {
    console.log('sasho');
}
// dropdown --end
