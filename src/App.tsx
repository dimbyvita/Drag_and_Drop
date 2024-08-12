import { useDrag } from "./hooks/useDrag";

function App() {
    const { originWidgets, destinationWidgets, handleOnDrag, handleOnDrop, handleOnDragOver } = useDrag();

    const renderWidget = (widgetType: string, fromOrigin: boolean) => (
        <div>
          <div
              className={`w-full h-20 p-2 rounded-lg text-center text-white cursor-move ${
                // choix pour les widgets 
                  widgetType === "widget A" ? "w-60 bg-black" : 
                  widgetType === "widget B" ? "w-60 bg-blue-500" : 
                  "w-60 bg-amber-600"
              }`}
              draggable // sans ceci le composant ne peut pas être déplacer
              onDrag={(e) => handleOnDrag(e, widgetType, fromOrigin)}
          >
            {/* Retour / affichage du choix */}
              {widgetType === "widget A" ? "1" : widgetType === "widget B" ? "2" : "3"}  
          </div>
        </div>
    );

    return (
        <div className="flex justify-center gap-4 p-2 items-center w-[100vw] h-[100vh]">
            {/* Section 1 - Origin */}
            <div
                className="flex flex-col md:flex-row gap-3 h-full w-full"
                onDrop={(e) => handleOnDrop(e, true)}
                onDragOver={handleOnDragOver}
            >
                {originWidgets.map((widget, index) => (
                    <div key={index}>
                        {renderWidget(widget, true)}
                    </div>
                ))}
            </div>

            {/* Section 2 - Destination */}
            <div
                className="flex flex-col md:flex-row gap-3 border border-blue-700 border-dashed p-2 h-full w-full"
                onDrop={(e) => handleOnDrop(e, false)}
                onDragOver={handleOnDragOver}
            >
                {destinationWidgets.map((widget, index) => (
                    <div key={index}>
                        {renderWidget(widget, false)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
