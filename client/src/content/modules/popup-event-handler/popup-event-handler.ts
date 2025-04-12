export class PopupEventHandler {

  public static instance: PopupEventHandler;

  public constructor() {

    chrome.runtime.onMessage.addListener((event: unknown) => {
      this.handlePopupEvent(event);
    });
  }

  public static getInstance(): PopupEventHandler {
    if (!PopupEventHandler.instance) {
      PopupEventHandler.instance = new PopupEventHandler();
    }
    return PopupEventHandler.instance;
  }

  async handlePopupEvent(
    event: unknown,
  ) {
    console.log("handling popup event", event);
  }

}
