import { ElementInfoSchema } from "@ai-assistant/shared";
import { useElementInfoStore } from "./element-info-store";

export class ElementInfoController {

  public static instance: ElementInfoController;

  public constructor() {
  }

  public static getInstance(): ElementInfoController {
    if (!ElementInfoController.instance) {
      ElementInfoController.instance = new ElementInfoController();
    }
    return ElementInfoController.instance;
  }

  public updateElementInfo(elementInfo: ElementInfoSchema) {
    useElementInfoStore.getState().setLatestElementInfo(elementInfo);
  }

}
