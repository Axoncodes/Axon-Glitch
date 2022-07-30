var activationHandlerLoaded = false
var natId = 'axg_naturalizer';
var triggeredId = '';
class activationHandler {
  static init() {
    // Implement the naturalizer layer
    if (!activationHandlerLoaded) {
      activationHandlerLoaded = true
      const naturalizer = document.createElement("DIV");
      naturalizer.setAttribute('id', natId)
      document.body.appendChild(naturalizer);
    }
  }

  static start(triggeredIdArg) {
    triggeredId = triggeredIdArg
    const natEl = document.getElementById(natId);
    const triggeredElem = document.getElementById(triggeredId);
    activationHandlerTools.open(natEl)
    activationHandlerTools.startListener(natEl)
    activationHandlerTools.activeElem(triggeredElem)
  }

  static end(triggeredIdArg) {
    if (triggeredIdArg && typeof triggeredIdArg == 'string') triggeredId = triggeredIdArg
    const natEl = document.getElementById(natId);
    const triggeredElem = document.getElementById(triggeredId);
    activationHandlerTools.close(natEl)
    activationHandlerTools.endListener(natEl)
    activationHandlerTools.deactiveElem(triggeredElem)
    triggeredId = '';
  }
}

class activationHandlerTools {
  static open(natEl) {
    natEl.style.zIndex = '100';
  }

  static close(natEl) {
    natEl.style.zIndex = '-1';
  }

  static startListener(natEl) {
    natEl.addEventListener('click', activationHandler.end)
  }
  
  static endListener(natEl) {
    natEl.removeEventListener('click', activationHandler.end)
  }

  static activeElem(triggeredElem) {
    triggeredElem.classList.add('axg_active');
  }
  
  static deactiveElem(triggeredElem) {
    triggeredElem.classList.remove('axg_active');
  }
}