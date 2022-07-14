/**
 * Function that wait until an element exits on DOM.
 * Example use:
 * - this.waitForElement("#tnt_snap_iframe").then((el) => { this.resizeIFrameToFitContent(el); });
 *
 */
function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Function that resize iframe to fit content.
 *
 */
function resizeIFrameToFitContent(iFrame) {
  iFrame.onload = function () {
    console.log(iFrame.contentWindow.document.body.scrollHeight); // kena cross origin
  };
  iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
  iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}

module.exports = { waitForElement, resizeIFrameToFitContent };
