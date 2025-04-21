import { ElementInfoSchema } from "@ai-assistant/shared";
import { useElementHighlightStore } from "./element-highlight-store";

export class ElementHighlightController {

  public static instance: ElementHighlightController;

  public constructor() {
  }

  public static getInstance(): ElementHighlightController {
    if (!ElementHighlightController.instance) {
      ElementHighlightController.instance = new ElementHighlightController();
    }
    return ElementHighlightController.instance;
  }

  public highlightElement(elementInfo: ElementInfoSchema) {

    if(elementInfo.id === null) {
      return;
    }

    const element = document.getElementById(elementInfo.id);

    if(element === null) {
      return;
    }

    const rect = element.getBoundingClientRect();

    console.log({rect});

    const {
      width,
      height,
    } = rect;

    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;

    useElementHighlightStore.getState().setPositionAndSize(left, top, width, height);
    useElementHighlightStore.getState().show();

  }

}
