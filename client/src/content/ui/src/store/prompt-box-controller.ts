import { usePromptBoxStore } from "./prompt-box-store";

export class PromptBoxController {

  public static instance: PromptBoxController;

  public constructor() {
  }

  public static getInstance(): PromptBoxController {
    if (!PromptBoxController.instance) {
      PromptBoxController.instance = new PromptBoxController();
    }
    return PromptBoxController.instance;
  }

  public showAtPosition(left: number, top: number) {
    usePromptBoxStore.getState().setPosition(left, top);
    usePromptBoxStore.getState().show();
  }

  public hide() {
    usePromptBoxStore.getState().hide();
  }

}
