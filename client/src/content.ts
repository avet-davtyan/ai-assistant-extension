import { ElementInfoCollectionHandler } from "./content/modules/element-info-collection-handler";
import { PopupEventHandler } from "./content/modules/popup-event-handler";

function main(){

  PopupEventHandler.getInstance();
  ElementInfoCollectionHandler.getInstance();

}

main();
