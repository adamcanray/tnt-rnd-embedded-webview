// test cdn
class PopupWebview {
  constructor() {
    this.renderSnapPopup = this.renderSnapPopup.bind(this);
  }

  #createPopupElement(callbackOnClose) {
    const popupDiv = document.createElement("div");
    const that = this;

    popupDiv.id = "tnt_snap";
    popupDiv.style = `
        display: flex; 
        justify-content: center; 
        align-items: center; 
        position: fixed; 
        top: 0px; 
        left: 0px; 
        width: 100%; 
        height: 100%; 
        z-index: 999999; 
        background-color: rgba(0,0,0,0.5);
      `;
    popupDiv.onclick = function () {
      popupDiv.remove();
      that.#calbackOnClose(callbackOnClose);
    };

    return popupDiv;
  }

  #createPopupIframeElement(pageUrl) {
    const popupIframe = document.createElement("iframe");

    popupIframe.id = "tnt_snap_iframe";
    popupIframe.src = pageUrl;
    popupIframe.style = "border: 0px;";
    popupIframe.height = "480";

    return popupIframe;
  }

  #calbackOnClose(onClose) {
    if (!onClose) return;
    onClose();
  }

  renderSnapPopup(pageUrl, callbacks) {
    const popup = this.#createPopupElement(callbacks?.onClose);
    const popupIframe = this.#createPopupIframeElement(pageUrl);

    popup.appendChild(popupIframe);

    document.body.insertBefore(popup, document.body.firstChild);
  }
}

const popupWebviewObject = new PopupWebview();

window.popupwebview = {
  /**
   *
   * @param {string} pageUrl
   * @param {{onClose: () => void;}} callbacks
   */
  renderPopup: function (pageUrl, callbacks) {
    popupWebviewObject.renderSnapPopup(pageUrl, callbacks);
  },
};
