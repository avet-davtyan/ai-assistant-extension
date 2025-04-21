import { ElementInfoCollectionHandler } from "./content/modules/element-info-collection-handler";
import { PopupEventHandler } from "./content/modules/popup-event-handler";
import { initializeReact } from "./content/ui/react-init";

function main(){

  PopupEventHandler.getInstance();
  ElementInfoCollectionHandler.getInstance();
  initializeReact();

}

main();
