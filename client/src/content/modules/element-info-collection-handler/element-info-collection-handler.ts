import { ElementInfoSchema } from "@ai-assistant/shared";
import { HtmlElementGeneral, IElementInfoInternal } from "./types";
import { PromptBoxController } from "../../ui/src/store/prompt-box-controller";
import { ElementInfoController } from "../../ui/src/store/element-info-controller";
import { ElementHighlightController } from "../../ui/src/store/element-highlight-controller";

export class ElementInfoCollectionHandler {

  private readonly promptBoxController: PromptBoxController;
  private readonly elementInfoController: ElementInfoController;
  private readonly elementHighlightController: ElementHighlightController;

  public static instance: ElementInfoCollectionHandler;
  private isInfoCollectionActive: boolean;
  private collectInfoTimeout: number;
  private currentTimeout: null | ReturnType<typeof setTimeout> = null;
  private currentInfoStringified: null | string = null;
  private maxInfoLength: number;

  private mousePositionLeft: number;
  private mousePositionTop: number;

  public constructor() {

    this.mousePositionLeft = 0;
    this.mousePositionTop = 0;

    this.collectInfoTimeout = 3000;
    this.maxInfoLength = 10000;
    this.isInfoCollectionActive = false;
    this.attachMouseMoveListener();

    this.promptBoxController = PromptBoxController.getInstance();
    this.elementInfoController = ElementInfoController.getInstance();
    this.elementHighlightController = ElementHighlightController.getInstance();
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

  private mouseOverListener(e: MouseEvent) {

    this.mousePositionLeft = e.clientX;
    this.mousePositionTop = e.clientY;

    console.log({
      left: this.mousePositionLeft,
      top: this.mousePositionTop,
    })

    const elementInfoInternal = this.getElementInfoStringifiedFromMouseEvent(e);

    if(elementInfoInternal === null) {
      return;
    }

    if(this.currentTimeout !== null) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {

      const left = this.mousePositionLeft;
      const top = this.mousePositionTop;

      this.promptBoxController.showAtPosition(
        left,
        top,
      );
    }, this.collectInfoTimeout);

    this.currentInfoStringified = elementInfoInternal.elementInfoStringified;
  }

  private mouseMoveListener(e: MouseEvent) {

    this.mousePositionLeft = e.clientX;
    this.mousePositionTop = e.clientY;

    const elementInfoInternal = this.getElementInfoStringifiedFromMouseEvent(e);

    if(elementInfoInternal === null) {
      return;
    }

    if(this.currentTimeout !== null) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.elementHighlightController.highlightElement(elementInfoInternal.elementInfo);
      this.promptBoxController.showAtPosition(this.mousePositionLeft, this.mousePositionTop);
    }, this.collectInfoTimeout);

    this.currentInfoStringified = elementInfoInternal.elementInfoStringified;
  }

  private getElementInfoStringifiedFromMouseEvent(
    e: MouseEvent,
  ): IElementInfoInternal | null {
    const target = e.target as HtmlElementGeneral;
    if (!target) return null;

    const info = this.collectElementInfo(target);

    const newInfoStringified = JSON.stringify(info);

    if(newInfoStringified === this.currentInfoStringified) {
      console.log("need to hide");
      // this.promptBoxController.hide();
      return null;
    }

    if(newInfoStringified.length > this.maxInfoLength) {
      return null;
    }

    return {
      elementInfo: info,
      elementInfoStringified: newInfoStringified
    };
  }

  public attachMouseOverListener() {
    document.addEventListener("mouseover", this.mouseOverListener.bind(this));
    this.isInfoCollectionActive = true;
  }

  public attachMouseMoveListener() {
    document.addEventListener("mousemove", this.mouseMoveListener.bind(this));
    this.isInfoCollectionActive = true;
  }

  private attachListeners() {
    this.attachMouseOverListener();
  }

  get isActive(): boolean {
    return this.isInfoCollectionActive;
  }

  private generateRandomId(): string {
    return `gen-id-${Math.random().toString(36).substr(2, 9)}`;
  }

}
