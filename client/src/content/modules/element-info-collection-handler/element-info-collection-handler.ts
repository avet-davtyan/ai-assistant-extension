import { ElementInfoSchema } from "@ai-assistant/shared";
import { HtmlElementGeneral } from "./types";

export class ElementInfoCollectionHandler {

  public static instance: ElementInfoCollectionHandler;
  private isInfoCollectionActive: boolean;
  private collectInfoTimeout: number;
  private currentTimeout: null | ReturnType<typeof setTimeout> = null;
  private currentInfoStringified: null | string = null;

  public constructor() {
    this.collectInfoTimeout = 3000;
    this.isInfoCollectionActive = false;
    this.attachListeners();
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
      textContent: null,
      children: [],
    };

    if(element.id) {
      elementInfo.id = element.id;
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

    if(element.textContent) {
      elementInfo.textContent = this.getVisibleText(element);
    }

    if (depth > 0) {
      for (const child of Array.from(element.children)) {
        const childInfo = this.collectElementInfo(child as HtmlElementGeneral, depth - 1);
        elementInfo.children.push(childInfo);
      }
    }

    return elementInfo;
  }

  private getVisibleText(
    element: HTMLElement,
  ): string | null {
    const text = element.innerText || element.textContent || "";
    const cleaned = text.trim().replace(/\s+/g, " ").slice(0, 300);
    if (cleaned.length === 0) return null;
    return cleaned;
  }

  private mouseHoverListener(e: MouseEvent) {

    const target = e.target as HtmlElementGeneral;
    if (!target) return;

    const info = this.collectElementInfo(target);

    const newInfoStringified = JSON.stringify(info);

    if(newInfoStringified === this.currentInfoStringified) {
      return;
    }

    if(this.currentTimeout !== null) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      console.log(info);
    }, this.collectInfoTimeout);

    this.currentInfoStringified = newInfoStringified;
    return;
  }

  private mouseLeaveListener() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    console.log("mouse leave")
  }

  public attachMouseMoveListener() {
    document.addEventListener("mouseover", this.mouseHoverListener.bind(this));
    // document.addEventListener("mouseleave", this.mouseLeaveListener.bind(this));
    this.isInfoCollectionActive = true;
  }

  private attachListeners() {
    this.attachMouseMoveListener();
  }

  get isActive(): boolean {
    return this.isInfoCollectionActive;
  }

}
