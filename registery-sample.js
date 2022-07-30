// counters
var dropdownsCount = 0;

// module handlers
customElements.define('axg-element', class AxElements extends HTMLElement {
  connectedCallback() {
    switch(this.getAttribute('mode')) {
      case "searchbar": axCustomSearchbar(this); break;
      case "dropdown": axCustomDropdown(this); break;
      case "logo": axCustomLogo(this); break;
      case "scrolldownAnimation": axCustomScrolldownAnimation(this); break;
      case "heartBeat": axCustomHeartBeat(this); break;
      case "footer": axCustomFooter(this); break;
      case "fullFooter": axCustomFullFooter(this); break;
      case "icon": axCustomIcon(this); break;
      case "icons": axCustomIcons(this); break;
      case "text": axCustomText(this); break;
      case "bannerItem": axCustomBannerItem(this); break;
      case "bgshape": axCustomBgShape(this); break;
      case "button": axCustomButton(this); break;
      case "input": axCustomInput(this); break;
      case "stars": axCustomStars(this); break;
      case "statics": axCustomStatics(this); break;
      case "floatingImages": axCustomFloatingImages(this); break;
      case "filter": axCustomFilter(this); break;
      case "header": axCustomHeader(this); break;
      case "nav": axCustomNav(this); break;
      case "postsView": axPostsView(this); break;
      case "image": axImage(this); break;
      case "textLimit": axTextLimit(this); break;
      default: break;
    }
  }
});

function axTextLimit(element) {
  const input = inputHandler(element)
  let html = ''
  const exploited = input.obj.content.split(' ')
  let limit = input.obj.limit > exploited.length ? exploited.length : input.obj.limit
	for (let i=0; i < limit; i++) html += exploited[i]+' '
  html += '...'
  return returnHandler(input.toReturn, element, html)
}

function axImage(element) {
  const input = inputHandler(element)

  let generalimgexe = ".jpg";
	let imgmainsrc = input.obj.src;
	let baseimgsrc = imgmainsrc.substr(0, imgmainsrc.lastIndexOf('.'))
	let exeimgsrc = imgmainsrc.substr(imgmainsrc.lastIndexOf('.'))
	generalimgexe = exeimgsrc;

  // srcset
  let imgsrcsetqueue = "";
  input.obj.sizes.forEach(size => {
    if (size == "thumbnail") input.obj.src = `${baseimgsrc}-${size}${generalimgexe}`
    else if (size == "small") imgsrcsetqueue += `${baseimgsrc}-${size}${generalimgexe} 300w,`
    else if (size == "medium") imgsrcsetqueue += `${baseimgsrc}-${size}${generalimgexe} 900w,`
    else if (size == "large") imgsrcsetqueue += `${baseimgsrc}-${size}${generalimgexe} 1500w,`
  })

  const html = `<img
    loading='${input.obj.loading || 'auto'}'
    src='${decodeURIComponent(input.obj.src.replace(/\+/g, ' '))}'
    ${input.obj.id ? `id='${input.obj.id}'`:''}
    ${input.obj.alt ? `alt='${decodeURIComponent(input.obj.alt.replace(/\+/g, ' '))}'`:''}
    ${input.obj.customclass ? `class='${input.obj.customclass}'`:''}
    ${imgsrcsetqueue && `srcset='${decodeURIComponent(imgsrcsetqueue.replace(/\+/g, ' '))}'`}
  />`
  return returnHandler(input.toReturn, element, html)
}

function axPostsView(element) {
  const input = inputHandler(element)

  const postTemplate = ({link, thumbnail, title, categories, excerpt}) => {
    return `
    <div class="ax_item">
      <a href="${decodeURIComponent(link)}" target="_blank">
        <div class="ax_poster">
          ${axImage(thumbnail)}
        </div>
        <div class="ax_context">
          <h2 class="ax_heading">
            ${decodeURIComponent(title.replace(/\+/g, ' '))}
          </h2>
          <div class="ax_details">
            <div class="ax_tags">
              ${categories.map(cat => `<span>${cat}</span>`).join('')}
            </div>
          </div>
          <p class="ax_paragraph">
            ${axTextLimit({content: decodeURIComponent(excerpt.replace(/\+/g, ' ')), limit: 20})}
          </p>
        </div>
        <button name="btn" alt="btn" class="ax_button">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            ${input.obj.itemsbtntitle}
          </span>
        </button>
      </a>
    </div>`
  }

  const html = `
  <section class="postsview" style="background-color: ${input.obj.bg || "var(--bg1)"};">
    
    <div class="ax_h_title">
      <h2 class="ax_head">
        <a style="color: ${input.obj.color || "var(--txt1)"};" ${input.obj.hashlink && `href="${input.obj.hashlink}"`}>
          ${input.obj.title}
        </a>
      </h2>
    </div>
    
    <div class="ax_items">
      ${input.obj.posts && input.obj.posts.map(post => postTemplate(post)).join('')}
    </div>

    <div class="ax_item ax_btn_cover">
      <a href="${input.obj.link}" target="_bkank">
        <button name="btn" alt="btn" class="ax_button">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            ${input.obj.btntitle}
          </span>
        </button>
      </a>
    </div>

  </section>`

  return returnHandler(input.toReturn, element, html)
}

function axCustomNav(element) {
  const input = inputHandler(element)

  // const html = `<nav class="header" style="background-color: ${input.obj.bg || "var(--bg3)"};">
  const html = `<nav class="header">
    ${element.childNodes.length > 0 && [...element.childNodes].map(node => node.outerHTML).join('')}
  </nav>`

  return returnHandler(input.toReturn, element, html)
}

function axCustomHeader(element) {
  const input = inputHandler(element)

  const html = `<header class="header">
    ${axCustomLogo({link: input.obj.logolink, src: input.obj.logosrc, width: input.obj.width})}
    ${axCustomSearchbar({placeholder: input.obj.searchplaceholder})}
    ${element.childNodes.length > 0 && [...element.childNodes].map(node => node.outerHTML).join('')}
  </header>`

  return returnHandler(input.toReturn, element, html)
}

function axCustomFilter(element) {
  const input = inputHandler(element)
  // const [filters, setFilters] = useState([])
  let filters = []
  const handleFiltersClick = event => {
    const value = event.target.value.length > 0 ? event.target.value : event.target.name
    if (event.target.type == 'color') {
      colorScript(value)
    } else {
      let tmpFilters = []
      tmpFilters = !event.target.checked
      ? xjs.map(filters, (filter) => (filter != value ? filter : null))
      : [...filters, value]
      filters=tmpFilters
      filterScript(tmpFilters)
    }
  }

  const colorScript = color => {
    document.querySelectorAll(`#${input.obj.targetId} .${input.obj.filterPlacement} i`).forEach(element => element.style.color = color)
  }

  const filterScript = (tmpFilters) => {
    if (tmpFilters.length == 0)document.querySelectorAll(`#${input.obj.targetId} .${input.obj.filterPlacement}`).forEach(element => {element.classList.remove('hide')})
    else {
      document.querySelectorAll(`#${input.obj.targetId} .${input.obj.filterPlacement}`).forEach(element => {
        let toHide = false
        tmpFilters.forEach(filter => {
          if (!element.classList.contains(`${input.obj.filterPrefix}${filter}`)) toHide = true
        })
        if (toHide) element.classList.add('hide')
        else element.classList.remove('hide')
      })
    }
  }
  
  const html = `
    <div class="axg_filter body" id="${input.obj.elementId}">
      ${input.obj.elements.map((filter, i) => (
        `<div>
          ${axCustomText({tag:"p", text:filter.name})}
          <ul class="ul">${filter.items.map((item, j) => (
            `<li class="li">
              ${axCustomInput({
                preactive: filters.filter(filter => filter.toLowerCase() == item.name.toLowerCase()).length > 0,
                checked: filters.filter(filter => filter.toLowerCase() == item.name.toLowerCase()).length > 0,
                label: item.label,
                onInput: handleFiltersClick,
                id: `${input.obj.elementId}${i}${j}`,
                tag: item.tag,
                name: item.name,
                type: item.type,
              })}
            </li>`
          )).join('')}</ul>
        </div>`
      )).join('')}
    </div>
  `
  return returnHandler(input.toReturn, element, html)
}

function axCustomFloatingImages(element) {
  const input = inputHandler(element)
  const html = `
    <div class='axg_floatingImages subcontainer' style="display: block">
      ${input.obj.images.map(image => (
        `<div style="display:block; ${image.mode == 'main' ? `z-index:10` : `z-index:2`};" class="cover ${image.mode}" >
          <img width="${image.width}" height="${image.height}" src="${image.src}" />
        </div>`
      ))}
    </div>
  `
  return returnHandler(input.toReturn, element, html)
}

function axCustomStatics(element) {
  const input = inputHandler(element)
  const html = `
    <ul class="axg_statics ${input.obj.globalclass ? input.obj.globalclass.join(' ') : ''} ${input.obj.customclass ? input.obj.customclass.join(' '):''} ${input.obj.smode} subcontainer center" >
      ${input.obj.data.map(item => (
        `<li>
          <span class="${item[2] ? input.obj.name : input.obj.number}">${item[0]}</span>
          <span class="${item[2] ? input.obj.number : input.obj.name}">${item[1]}</span>
        </li>`
      ))}
    </ul>
  `
  return returnHandler(input.toReturn, element, html)
}

function axCustomStars(element) {
  const input = inputHandler(element)
  const rateArrF = (index) => {
    const arr = []
    for (let i = 0; i < 5; i++) {
      if (i == index) arr.push(1)
      else arr.push(0)
    }
    return arr
  }

  const html = `
    <div class="axg_stars ${ input.obj.rate ? '' : 'stars'}">
      ${rateArrF(input.obj.rate).map((star, key) => (
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          class="star ${ input.obj.rate ? (key < input.obj.rate ? 'active' : '') : `star${key}`}"
          width="15px"
          height="15px"
        ><g><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><g><polygon points="12,15.4 8.24,17.67 9.24,13.39 5.92,10.51 10.3,10.13 12,6.1 13.71,10.14 18.09,10.52 14.77,13.4 15.77,17.68"></polygon><path d="M22,9.24l-7.19-0.62L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27L18.18,21l-1.63-7.03L22,9.24z M12,15.4l-3.76,2.27 l1-4.28l-3.32-2.88l4.38-0.38L12,6.1l1.71,4.04l4.38,0.38l-3.32,2.88l1,4.28L12,15.4z"></path></g></g></svg>`
      ))}
      </div>
    `
      // {rateArrF(rate).map((star, key) => (
      //   <p class={`${style.tooltip} ${style[`tooltip${key}`]}`}>poor content</p>
      // ))}
  return returnHandler(input.toReturn, element, html)
}


function axCustomInput(element) {
  const input = inputHandler(element)
  input.obj.tag = input.obj.tag || 'input'
  input.obj.type = input.obj.type || 'text'
  // const html = const [inputstate, setInputstate] = useState(0)
  let inputstate = 0

  const haveChild = tag => {
    if (tag == 'input') return false
    return true
  }

  const selectOptions = options => {
    return options.map(option => (
      `<option value="${option[1]}">${option[0]}</option>`
    ))
  }

  const inputSecondaryHandler = (e) => {
    if (input.obj.preactive) e.target.checked = false
    inputstate = 1
    if (input.obj.onInput) input.obj.onInput(e)
  }

  const html = `
  <div
    class="axg_input ${input.obj.size ? input.obj.size : ''} ${input.obj.sidepadding ? 'sidepadding' : ''} ${input.obj.padding ? 'padding' : ''} div"
    style="width:${input.obj.width}; height: ${input.obj.height}; background-color: ${input.obj.bgColor}; color: ${input.obj.color}"
  >
    <${input.obj.tag}
      type="${input.obj.type}"
      name="${input.obj.name}"
      value="${input.obj.value}"
      id="${input.obj.id || input.obj.value}"
      onClick="${input.obj.onClick}"
      onInput="${inputSecondaryHandler}"
      checked="${input.obj.checked && input.obj.inputstate==0 ? input.obj.checked : null}"
      filterid="${input.obj.filterid}"
      style="background-color: ${input.obj.bgColor}; color: ${input.obj.color}"
      class="${input.obj.tag} ${input.obj.type}"
    >
      ${haveChild(input.obj.tag) && input.obj.options ? selectOptions(input.obj.options) : ''}
    </${input.obj.tag}>
    ${input.obj.label
      ? `
        <label
          for="${input.obj.id || input.obj.value}"
          class="lable"
        >
          ${input.obj.label}
        </label>
      `
      : ''
    }
  </div>`
  return returnHandler(input.toReturn, element, html)
}

function axCustomButton(element) {
  const input = inputHandler(element)
  input.obj.height = input.obj.height || "100%"
  input.obj.text = input.obj.text || "Button"
  input.obj.link = input.obj.link || "/"
  input.obj.bg = input.obj.bg || "var(--blue)"
  input.obj.color = input.obj.color || ""
  input.obj.size = input.obj.size || "normal"
  input.obj.bmode = input.obj.bmode || "button"
  const inner = (
    `<div style="height:${input.obj.height}" class="${input.obj.icon ? 'iconButton' : ''} inner">
      ${input.obj.icon ? axCustomIcon({size:input.obj.iconsize, src:input.obj.icon, plane:1 }) : ''}
      <span style="height:${input.obj.height}; background-color:${input.obj.bg}" class="buttonBg"></span>
      <span style="height:${input.obj.height}; color:${input.obj.color}" class="buttonText">${input.obj.text}</span>
    </div>`
  )

  const buttonBody = `<button style="${input.obj.size ? input.obj.size : `height: ${input.obj.height}`}" class="axg_button ${input.obj.size} button">${inner}</button>`
  const linkBody = `<a style="${input.obj.size ? input.obj.size :`height:${input.obj.height}`}" href="${input.obj.link}" class="axg_button ${input.obj.size} button">${inner}</a>`

  let html;

  switch (input.obj.bmode) {
    case 'button': html = buttonBody;break;
    case 'link': html = linkBody;break;
    default: html = buttonBody;break;
  }
  return returnHandler(input.toReturn, element, html)
}

function axCustomBgShape(element) {
  const input = inputHandler(element)
  const html = input.obj.shape ? `
  <div
    class=" axg_bgshape item ${input.obj.shape.positions.join(' ')}"
    style="background-color: ${input.obj.shape.color}"
  ></div>` : `<div class="axg_bgshape cover"></div>`
  return returnHandler(input.toReturn, element, html)
}

function axCustomText(element, children) {
  const input = inputHandler(element)
  input.obj.tag = input.obj.tag || 'h1'
  input.obj.color = input.obj.color || 'var(--dark)'
  input.obj.text = input.obj.text || ''
  input.obj.customClass = input.obj.customClass || ['']
  input.obj.nomargin = input.obj.nomargin || 0
  const inner = element.innerHTML || children
  const html = `<${input.obj.tag}
    class="axg_text default ${input.obj.customclass?input.obj.customclass.join(' '):''} ${input.obj.nomargin ? 'nomargin' : ''}"
    style="color: ${input.obj.color}; text-align: ${input.obj.align}; font-size: ${input.obj.size}">
      ${inner ||input.obj.text}
  </${input.obj.tag}>`
  return returnHandler(input.toReturn, element, html)
}

function axCustomIcon(element) {
  const input = inputHandler(element)
  input.obj.midactive = input.obj.midactive || 1
  input.obj.filterPlacement = input.obj.filterPlacement || 'filterPlacement'
  input.obj.boxshadow = input.obj.boxshadow || 1
  input.obj.plane = input.obj.plane || 0
  input.obj.isfont = input.obj.isfont || 1
  input.obj.size = input.obj.size || 'normal'
  input.obj.color = input.obj.color || '#000'
  input.obj.tags = input.obj.tags ? input.obj.tags.map(tag => `${input.obj.filterPrefix||''}${tag}`) : []
  if (input.obj.plane) {
    const classes = `rexfont_init i ${input.obj.isfont ? input.obj.src : ''} ${input.obj.size} ${input.obj.margin ? 'margin' : ''}`
    const html = input.obj.url
    ? (
        `<a href="${input.obj.url}" class="axg_icon ${input.obj.midactive ? 'midactive' : ''} ${input.obj.tags.join(' ')}" style="color: ${input.obj.color}">
          ${input.obj.isfont == 0
            ? `<img width="20" height="20" src="${input.obj.src}" alt="" />`
            : `<i style="color: ${input.obj.color}" class="${classes}" ></i>`
          }
        </a>`
    ) : (
      input.obj.isfont == 0
      ? `<img width="20" height="20" src="${input.obj.src}" alt="" class="axg_icon"/>`
      : `<i style="color: ${input.obj.color}" class="axg_icon ${input.obj.midactive ? 'midactive' : ''} ${input.obj.tags.join(' ')} ${classes}" ></i>`
    )
    return returnHandler(input.toReturn, element,  html)
  }

  const content = `
    <div class="background"></div>
    ${input.obj.isfont == 0
    ? `<img width="20" height="20" src="${input.obj.src}" alt="" />`
    :(`<div>
      <i style="color: ${input.obj.color}" class="rexfont_init iconPlaceholder ${input.obj.src}" ></i>
      <i style="color: ${input.obj.color}" class="rexfont_init i ${input.obj.src}" ></i>
    </div>`)}
    ${input.obj.name ? axCustomText({tag:'p', text:input.obj.name,  customclass:['boxTitle']}) : ''}
  `
  const classes = `${input.obj.margin ? 'margin' : ''} ${input.obj.limit ? 'limit' : ''} ${input.obj.boxshadow ? 'boxshadow' : ''} iconBody ${input.obj.size} ${input.obj.name ? 'split' : 'center'}`

  const html = input.obj.url
  ? `<a href="${input.obj.url}" class="axg_icon ${input.obj.midactive ? 'midactive' : ''} ${input.obj.filterPlacement || 'filterPlacement'} ${input.obj.tags.join(' ')} ${classes}">${content}</a>`
  : `<div ${input.obj.tags.join(' ')} class="axg_icon ${input.obj.midactive ? 'midactive' : ''} ${input.obj.filterPlacement || 'filterPlacement'} ${input.obj.tags.join(' ')} ${classes}">${content}</div>`
  return returnHandler(input.toReturn, element,  html)
}

function axCustomBannerItem(element) {
  const input = inputHandler(element)
  const html = `
  <div class='item'>
      <img width="100" height="60" src="${input.obj.image}" alt="" />
      <div class="context">
        ${axCustomText({tag:'h3', text:input.obj.text,  nomargin:1})}
        <Statics data={input.obj.statics}/>
        <Starts rate={input.obj.starRate} />
        <Button size="medium" text="Visit" mode="link" link={input.obj.link} color="var(--light)" bg="var(--green)" />
      </div>
    </div>`
    return returnHandler(input.toReturn, element,  html)
}

function inputHandler(params) {
  const obj = {}
  const toReturn = params.attributes ? false : true
  // convert the content to json if it is the convertible format
  const isJson = param => {
    if (typeof param == 'string' && (param.indexOf('[') == 0 || param.indexOf('{') == 0)) return JSON.parse(param)
    return param
  }
  // JS FUNCTION
  if (!params.attributes) Object.entries(params).forEach(param => obj[param[0]] = isJson(param[1]))
  // HTML TAG
  else Object.entries(params.attributes).forEach(param => obj[param[1].localName] = isJson(param[1].textContent))
  return ({obj, toReturn})
}

function returnHandler(toReturn, element, html) {
  if (toReturn) return html
  element.outerHTML = html
}

function axCustomIcons(element) {
  const input = inputHandler(element)
  const html = (
    `<div class="subcontainer vertical axg_icons">
      <div class="subcontainer horizontal megas" style="column-gap: '10px'">
        ${input.obj.icons.map(icon => icon.banner
          ? axCustomBannerItem({
          mode: "bannerItem",
          image: icon.image,
          boxshadow: icon.boxshadow,
          text: icon.name,
          statics: icon.statics,
          starRate: icon.starRate,
          link: icon.url,
 }) : '').join(' ')}
      </div>

      <div
        id="${input.obj.id}"
        class="
          subcontainer
          ${input.obj.margin ? 'margin' : ''}
          ${input.obj.limit ? 'limit' : ''}
        "
        style="column-gap: ${input.obj.columnGap ? '10px' : '0px'}"
      >
        ${input.obj.icons.map(({
          isfont,
          img,
          tags=[],
          unicode,
          size,
          boxshadow,
          name,
          url,
          color,
          plane,
          banner
        }) => banner
          ? '' : axCustomIcon({
            filterPlacement: input.obj.filterPlacement||'filterPlacement',
            tags: tags,
            filterPrefix: input.obj.filterPrefix,
            limit: input.obj.limit ? 1 : 0,
            src: unicode || img,
            isfont: isfont,
            size: size,
            boxshadow: boxshadow,
            name: name,
            url: url,
            color: color,
            margin: 1,
            plane: plane,
          })).join(' ')}
      </div>
    </div>`
  )
  return returnHandler(input.toReturn, element, html)
}

function axCustomFullFooter(element) {
  const input = inputHandler(element)
  // socket
  const socket = element.innerHTML || children
  const html = `
  <footer id="ax_footer">
    <div class="ax_items">
      <div class="ax_item ax_minabout">
        ${input.obj.mainintro && input.obj.mainintro.length ? `<h2 class="ax_title">${input.obj.mainintro}</h2>` : ''}
        ${input.obj.description && input.obj.description.length ? `<p class="ax_paragraph">${input.obj.description}</p>` : ''}
        ${input.obj.displaynewsletter == "true" ? `
          <form action="/caspian" method="POST" id="ax_scubscribersinput">
            <p>Sign up to our Newsletter</p>
            <div>
              <label for="ax_sub_email"></label>
              <div class="ax_sub_item">
                <button type="submit" title="newsletter" name="ax_sub_sibmit" id="axsubscribebtnn_email">Signup</button>
                <input id="ax_sub_email" type="text" name="ax_sub_email" required autocomplete placeholder="Email"/>
              </div>
            </div>
          </form>
        `:''}
      </div>
      
      ${input.obj.latestposts && input.obj.latestposts.length ? `<div class="ax_item ax_address" id="lf_footer_wkh">
        <div id="lf_footer_latestposts">
          <p class="ax_footer_title">${input.obj.latestpoststitle}</p>
          <div class="lf_items">
          ${input.obj.latestposts.map(post => `
            <div class="lf_item">
              <a href="${post.link}">
                <div class="lf_poster">
                  ${axImage(post.thumbnail)}
                </div>
                <div class="lf_context">
                  <p class="lf_title">
                    ${axTextLimit({content: post.title, limit: 4})}  
                  </p>
                  <div class="lf_meta">
                    <p class="lf_meta_item"><img alt="comment" width="17" height="17" src="https://axg.axoncodes.com/assets/icons/socialmedia/comment-dark.svg"><span>${post.commentscount}</span></p>
                    <p class="lf_meta_item"><img alt="calendar" width="17" height="17" src="https://axg.axoncodes.com/assets/icons/socialmedia/calendar-dark.svg"><span>${post.date}</span></p>
                  </div>
                </div>
              </a>
            </div>
          `).join('')}
          </div>
        </div>
      </div>`:''}

    </div>
    
    ${input.obj.menu && input.obj.menu.length ? `<div class="ax_items">
      <div class="ax_item ax_explore">
        <p class="ax_footer_title">${input.obj.mainsectorstitle}</p>
        <div class="ax_items">
          <div class="menu-footermenu-container">
            <ul id="menu-footermenu" class="menu">
              ${input.obj.menu.map(item => `
                <li><a href="${item.link}">${item.title}</a></li>              
              `).join('')}
            </ul>
          </div>
        </div>
      </div>`:''}

      ${input.obj.socialmedias && input.obj.socialmedias.length ? `<div class="ax_item">
        <div class="axg_packedTemplate">
          ${input.obj.socialmedias.map(media => `
            <a rel="noopener noreferrer"
              aria-label="${media.name}"
              href="${media.link}" 
              target="_blank" 
              class="ax_footer_btn"
            >
              <img 
                alt="${media.name}" 
                width="22px" 
                height="22px" 
                src="https://axg.axoncodes.com/assets/icons/socialmedia/${media.name}.svg"
              />
            </a>
          `).join('')}
        </div>`:''}
        
      </div>
    </div>
  </footer>
  ${socket ? `<div id="ax_socket">
    ${socket}
  </div>`: ''}
  `
  return returnHandler(input.toReturn, element,  html)
}

function axCustomFooter(element, children) {
  const input = inputHandler(element)
  const inner = element.innerHTML || children
  const linksBody = input.obj.links.map(col => (
    `<ul key={i}>
      ${col.map(item => `<li><a href="${item.link}"><a class="a">${item.text}</a></a></li>`).join(' ')}
    </ul>`
  )).join(' ')
  const iconsArr = input.obj.socialmedia.map(({icon: unicode, link: url, img}) => ({
    isfont:img ? 0 : 1,
    img,
    unicode,
    size:'tiny',
    color:'#fff',
    plane:1,
    boxshadow:0,
    url
  }))
  const html = `
    <footer class='axg_footer container vertical footer'>
      <section class='subcontainer horizontal spread'>
        ${linksBody}
      </section>

      <section class='subcontainer horizontal spread'>
        ${axCustomIcons({id:"footerSocialMedia", margin:'1', columnGap:'1', icons:iconsArr})}
        ${axCustomText({color:"var(--light)", tag:"p", nomargin:'1', customclass:['paragraph', 'center']}, inner)}
      </section>
    </footer>
  `
  return returnHandler(input.toReturn, element,  html)
}

function axCustomHeartBeat(element) {
  const input = inputHandler(element)
	const html = `
  <img
    alt="${input.obj.alt || null}"
    width="22px"
    height="22px"
    src="${window.location.href}/assets/images/heart.svg"
    style="
      width: 15px;
      height: auto;
      animation-name: heart;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      transform: translateY(2px) scale(1);
      transition: all .3s;
      margin: 0 5px;
  "/>`;
  return returnHandler(input.toReturn, element,  html)
}

// axCustomsearchbar --start
function axCustomSearchbar(element) {
	const regExp = /[^'\x22]+/;
  const input = inputHandler(element)
	const html = `
    <div id="axg_searchbar" hideAtTop="${input.obj.hideattop||null}">
        <form id="axg_searchform" method="POST">
        <label for="axg_searchform_button">search</label>
        <button type="submit" name="ax_submit" title="ax_submit" id="axg_searchform_button">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M447.615,64.386C406.095,22.866,350.892,0,292.175,0s-113.92,22.866-155.439,64.386 C95.217,105.905,72.35,161.108,72.35,219.824c0,53.683,19.124,104.421,54.132,144.458L4.399,486.366 c-5.864,5.864-5.864,15.371,0,21.236C7.331,510.533,11.174,512,15.016,512s7.686-1.466,10.617-4.399l122.084-122.083 c40.037,35.007,90.775,54.132,144.458,54.132c58.718,0,113.919-22.866,155.439-64.386c41.519-41.519,64.385-96.722,64.385-155.439 S489.134,105.905,447.615,64.386z M426.379,354.029c-74.001,74-194.406,74-268.407,0c-74-74-74-194.407,0-268.407 c37.004-37.004,85.596-55.5,134.204-55.5c48.596,0,97.208,18.505,134.204,55.5C500.378,159.621,500.378,280.028,426.379,354.029z" /></g></g></svg>
        </button>
        <label for="axg_isearch">search</label>
        <input
          customplaceholder="${input.obj.placeholder||null}"
          style="${input.obj.inputcolor?`background-color: ${input.obj.inputColor};`:null}"
          id="axg_isearch"
          placeholder="search..."
          type="search"
          name="axg_isearch"
          pattern="${regExp}"
        />
        </form>

        <div id="axg_searchform_res_cover">
            <ul id="axg_searchform_res"></ul>
        </div>
    </div>
  `;
  return returnHandler(input.toReturn, element,  html)
}
// axCustomsearchbar --finish

// axCustomScrolldownAnimation --start
function axCustomScrolldownAnimation(element) {
  const input = inputHandler(element)
  const html = `<div class="lf_scrolldown">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/></svg>
  </div>`;
  return returnHandler(input.toReturn, element,  html)
}

// dropdown --start
function axCustomDropdown(element, children) {
    if(!element.getAttribute('nomain')){
      const input = inputHandler(element)
      // update css variable for breakpoint
      let root = document.documentElement;
      root.style.setProperty('--dropdownGroup-breakpoint', input.obj.breakpoint + "px");

      const childMode = `childMode="${input.obj.mode}" childModeId="${dropdownsCount}" `;
      const inner = element.innerHTML || children; 

      const dropdownHead = `
      <div ${childMode} style="height:${input.obj.height+"px"}; ${input.obj.width?`width:${((input.obj.width)+4)+"px"}`:``}" class="dropdownHead" subtrigger="${input.obj.subtrigger}" mode="${input.obj.structure}">
        <div ${childMode} 
        activeBackground="${input.obj.activebackground}" 
        colorHover="${input.obj.colorhover}" 
        headBackgroundHover="${input.obj.headbackgroundhover}" 
        color="${input.obj.color}"
        headTitleColor="${input.obj.headtitlecolor}"
        headBackground="${input.obj.headbackground}" 
        class="inner"
        style="
          ${input.obj.width?`min-width:${((input.obj.width)-10)+"px"};
          width:${((input.obj.width)-10)+"px"}`:``};
          grid-template-columns:${input.obj.icon?`max-content auto max-content`:`max-content auto`};
        ">
          ${input.obj.icon?`<img ${childMode} class="icon" src="./dropdown/assets/icons/${input.obj.icon}">`:``}
          <span ${childMode}>${input.obj.link ? `<a style="${input.obj.structure!='link' ? `color:${input.obj.color};` : ''}" href="${input.obj.link}">`:''}${input.obj.title}${input.obj.link ? `</a>`:''}</span>
          ${input.obj.structure != 'link' ? `<img ${childMode} class="dropicon darkdown" width="12px" src="https://axg.axoncodes.com/dropdown/assets/icons/down.svg">` : ''}
          ${input.obj.structure != 'link' ? `<img ${childMode} class="dropicon whitedown off" width="12px" src="https://axg.axoncodes.com/dropdown/assets/icons/down-white.svg">` : ''}
        </div>
      </div>`;

    const dropdownList = dropdownContent_handler(input, input.obj.options, childMode);
    const dropdownBody = `
    <div ${childMode} class="dropdownBody" mode="${input.obj.structure}" style="${input.obj.width?`min-width:${input.obj.width+"px"}`:``}">
        <ul ${childMode} style="background-color:${input.obj.background};" class="menu">
            ${input.obj.headTitle?`<h3 class="dropdown dropdownHeadTitle" ${childMode}>${input.obj.headTitle}</h3>`:``}
            ${input.obj.exit?`<svg class="exitbutton" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`:``}
            ${input.obj.structure != 'link' ? dropdownList : ''}
            ${inner}
        </ul>
    </div>`;
    if (input.obj.structure != 'link') {
      if(input.obj.targetlocator && input.obj.targetlocator.length>0) {
          document.getElementById(input.obj.targetlocator).classList.add(`dropdown-${dropdownsCount}`);
          document.getElementById(input.obj.targetlocator).innerHTML = `<section ${childMode} class="dropdown">${dropdownBody}</section>`;
          const html = `<section ${childMode} class="ax_elements"><section style="${input.obj.width?`min-width:${input.obj.width+"px"}`:``}" targetlocator="${input.obj.targetlocator}" mode="${input.obj.structure}" ${childMode} class="dropdown mainDropdown ${input.obj.structure}">${dropdownHead}</section></section>`;
          dropdownsCount++;
          return returnHandler(input.toReturn, element,  html)
      }else{
          dropdownsCount++;
          const html = `<section class="ax_elements"><section style="${input.obj.width?`min-width:${input.obj.width+"px"}`:``}" mode="${input.obj.structure}" ${childMode} class="dropdown mainDropdown ${input.obj.structure}">${dropdownHead} ${dropdownBody}</section></section>`;
          return returnHandler(input.toReturn, element,  html)
        }
      } else {
      // dropdownsCount++;
      const html = `<section class="ax_elements"><section style="${input.obj.width?`min-width:${input.obj.width+"px"}`:``}" mode="${input.obj.structure}" ${childMode} class="dropdown mainDropdown ${input.obj.structure}">${dropdownHead}</section></section>`;
      return returnHandler(input.toReturn, element,  html)
    }
  }
}


// dropdown content handler
/**
 * @item.subOpening : sub, side
 * @item.subtrigger : click, hover
 */
function dropdownContent_handler(input, data, childMode) {
    var content = ``;
    if(data) {
        data.map((item)=>{
            content += `
            <li ${childMode} subTrigger="${item.subtrigger?item.subtrigger:'click'}" class="list ${item.subOpening?item.subOpening:'sub'} ${item.level?item.level:''}">
                <div ${childMode} class="listHead ${input.obj.structure}">
                    ${item.url?`<a ${childMode} href="${item.url}" class="inner">`:`<div class="inner">`}
                        ${item.icon?`<img ${childMode} src="./dropdown/assets/icons/${item.icon.url}"/>`:`<span></span>`}
                        ${item.title?`<span style="color:${item.color}" ${childMode}>${item.title}</span>`:``}
                        ${item.content?`<img ${childMode} class="icon darkdown" width="12px" src="https://axg.axoncodes.com/dropdown/assets/icons/down.svg">`:`<span></span>`}
                        ${item.content?`<img ${childMode} class="icon whitedown off" width="12px" src="https://axg.axoncodes.com/dropdown/assets/icons/down-white.svg">`:`<span></span>`}
                    ${item.url?`</a>`:`</div>`}
                </div>
                <ul ${childMode} class="listSubmenu">
                    ${item.content?dropdownContent_handler(input, item.content, childMode):``}
                </ul>
            </li>`;
        });
    }
    return content;

}
// dropdown --finish



// logo --start
function axCustomLogo(element) {
  const input = inputHandler(element)
  const html = `
      <a href="${input.obj.link}" class="headerLogo">
          <img width="${input.obj.width || 100}" src="${input.obj.src}" alt="${input.obj.alt}" />
      </a>
  `;
  return returnHandler(input.toReturn, element,  html)
}
// logo --finish// counters
