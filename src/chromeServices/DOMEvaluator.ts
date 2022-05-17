import { DOMMessage, DOMMessageResponse } from "../types";

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log("[content.js]. Message received", msg);

  const headlines = Array.from(document.getElementsByTagName<"h1">("h1")).map(
    (h1) => h1.innerText
  );
  const location = Array.from(
    document.getElementsByClassName(
      "text-body-small inline t-black--light break-words"
    )
  ).map((location) => location.textContent);

  const info = Array.from(
    document.getElementsByClassName("visually-hidden")
  ).map((element) => element.textContent);

  // Prepare the response object with data from the site
  const response: any = {
    headlines,
    location,
    info,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
