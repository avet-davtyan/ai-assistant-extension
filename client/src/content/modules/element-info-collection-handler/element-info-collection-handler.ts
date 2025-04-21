import { ElementInfoSchema } from "@ai-assistant/shared";
import { HtmlElementGeneral } from "./types";
import { PromptBoxController } from "../../ui/src/store/prompt-box-controller";

export class ElementInfoCollectionHandler {

  private readonly promptBoxController: PromptBoxController;

  public static instance: ElementInfoCollectionHandler;
  private isInfoCollectionActive: boolean;
  private collectInfoTimeout: number;
  private currentTimeout: null | ReturnType<typeof setTimeout> = null;
  private currentInfoStringified: null | string = null;
  private maxInfoLength: number;

  public constructor() {
    this.collectInfoTimeout = 3000;
    this.maxInfoLength = 10000;
    this.isInfoCollectionActive = false;
    this.attachListeners();

    this.promptBoxController = PromptBoxController.getInstance();
  }

  public static getInstance(): ElementInfoCollectionHandler {
    if (!ElementInfoCollectionHandler.instance) {
      ElementInfoCollectionHandler.instance = new ElementInfoCollectionHandler();
    }
    return ElementInfoCollectionHandler.instance;
  }

  public collectElementInfo(
    element: HtmlElementGeneral,
    depth: number = 3,
  ): ElementInfoSchema {

    const elementInfo: ElementInfoSchema = {
      id: null,
      tag: element.tagName.toLowerCase(),
      className: null,
      name: null,
      type: null,
      role: null,
      innerText: null,
      textContent: null,
      innerHTML: null,
      children: [],
    };

    if(element.id) {
      elementInfo.id = element.id;
    }
    else {
      const randomId = this.generateRandomId();
      element.id = randomId;
      elementInfo.id = randomId;
    }

    if(element.className) {
      elementInfo.className = element.className;
    }

    if(element.name) {
      elementInfo.name = element.name;
    }

    if(element.type) {
      elementInfo.type = element.type;
    }

    if(element.role) {
      elementInfo.role = element.role;
    }

    if(element.innerText) {
      elementInfo.innerText = element.innerText;
    }

    if(element.textContent) {
      elementInfo.textContent = element.textContent;
    }

    if(element.innerHTML) {
      elementInfo.innerHTML = element.innerHTML;
    }

    for (const child of Array.from(element.children)) {
      const childInfo = this.collectElementInfo(child as HtmlElementGeneral, depth - 1);
      elementInfo.children.push(childInfo);
    }

    return elementInfo;
  }

  private mouseHoverListener(e: MouseEvent) {

    const infoStringified = this.getElementInfoStringifiedFromMouseEvent(e);

    if(infoStringified === null) {
      return;
    }

    if(this.currentTimeout !== null) {
      clearTimeout(this.currentTimeout);
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    this.currentTimeout = setTimeout(() => {
      console.log({mouseX, mouseY});
      this.promptBoxController.showAtPosition(mouseX, mouseY);
    }, this.collectInfoTimeout);

    this.currentInfoStringified = infoStringified;
  }

  private getElementInfoStringifiedFromMouseEvent(
    e: MouseEvent,
  ): string | null {
    const target = e.target as HtmlElementGeneral;
    if (!target) return null;

    const info = this.collectElementInfo(target);

    const newInfoStringified = JSON.stringify(info);

    if(newInfoStringified === this.currentInfoStringified) {
      console.log("need to hide");
      this.promptBoxController.hide();
      return null;
    }

    if(newInfoStringified.length > this.maxInfoLength) {
      return null;
    }

    return newInfoStringified;
  }

  public attachMouseMoveListener() {
    document.addEventListener("mouseover", this.mouseHoverListener.bind(this));
    this.isInfoCollectionActive = true;
  }

  private attachListeners() {
    this.attachMouseMoveListener();
  }

  get isActive(): boolean {
    return this.isInfoCollectionActive;
  }

  private generateRandomId(): string {
    return `gen-id-${Math.random().toString(36).substr(2, 9)}`;
  }

}
