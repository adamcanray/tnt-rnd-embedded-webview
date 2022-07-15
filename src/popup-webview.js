/**
 * Type definition
 *
 * @description Common type
 * @typedef {{iframeStyle: string; onClose: () => void;}} TOptions
 *
 * @description Typeof PopupWebview method
 * @typedef {(callbackOnClose: () => void) => HTMLDivElement} Tprivate_createPopupElement
 * @typedef {(pageUrl: string, iframeStyle: string) => HTMLIFrameElement} Tprivate_createPopupIframeElement
 * @typedef {(onClose: () => void) => void} Tprivate_callbackOnClose
 * @typedef {(pageUrl: string, options: TOptions) => void} TrenderPopupElement
 *
 * @description Typeof window.popupwebview global variable
 * @typedef {TrenderPopupElement} TrenderPopup
 * @typedef {{renderPopup: TrenderPopup}} TPopupWebview
 *
 */

/**
 * PopupWebview class
 * @class
 * @method #createPopupElement
 * @method #createPopupIframeElement
 * @method #calbackOnClose
 * @method renderPopupElement
 */
class PopupWebview {
  constructor() {
    this.renderPopupElement = this.renderPopupElement.bind(this);
  }

  /**
   * Create popup element
   * @type {Tprivate_createPopupElement}
   */
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
        overflow-y: auto;
      `;
    popupDiv.onclick = function () {
      popupDiv.remove();
      that.#calbackOnClose(callbackOnClose);
    };

    return popupDiv;
  }

  /**
   * Create popup iframe element
   * @type {Tprivate_createPopupIframeElement}
   */
  #createPopupIframeElement(
    pageUrl,
    iframeStyle = "border: 0px; height: 480px;"
  ) {
    const popupIframe = document.createElement("iframe");

    popupIframe.id = "tnt_snap_iframe";
    popupIframe.src = pageUrl;
    popupIframe.style = iframeStyle;

    return popupIframe;
  }

  /**
   * Callback method that fires when popup is closed (removed from DOM)
   * @type {Tprivate_callbackOnClose}
   */
  #calbackOnClose(onClose) {
    if (!onClose) return;
    onClose();
  }

  /**
   * Render popup elements to DOM
   * @type {TrenderPopupElement}
   */
  renderPopupElement(pageUrl, options) {
    const popup = this.#createPopupElement(options?.onClose);
    const popupIframe = this.#createPopupIframeElement(
      pageUrl,
      options?.iframeStyle
    );

    popup.appendChild(popupIframe);

    document.body.insertBefore(popup, document.body.firstChild);
  }
}

/**
 * @type {TPopupWebview}
 */
window.popupwebview = {
  renderPopup: function (pageUrl, options) {
    const popupWebviewObject = new PopupWebview();
    popupWebviewObject.renderPopupElement(pageUrl, options);
  },
};
