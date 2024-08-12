import { useState } from "react";

export const useDrag = () => {
    const [originWidgets, setOriginWidgets] = useState<string[]>(["widget A", "widget B", "widget C"]);
    const [destinationWidgets, setDestinationWidgets] = useState<string[]>([]);
    const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
    const [isDraggingFromOrigin, setIsDraggingFromOrigin] = useState<boolean>(true);

    const handleOnDrag = (e: React.DragEvent, widgetType: string, fromOrigin: boolean) => {
        setDraggedWidget(widgetType);
        setIsDraggingFromOrigin(fromOrigin);
        e.dataTransfer.setData("widgetType", widgetType);
    };

    const handleOnDrop = (e: React.DragEvent, toOrigin: boolean) => {
        if (draggedWidget !== null) {
            if (toOrigin && !isDraggingFromOrigin) {
                // Déplacer de la destination à l'origine
                setDestinationWidgets(destinationWidgets.filter(widget => widget !== draggedWidget));
                setOriginWidgets([...originWidgets, draggedWidget]);
            } else if (!toOrigin && isDraggingFromOrigin) {
                // Déplacer de l'origine à la destination
                setOriginWidgets(originWidgets.filter(widget => widget !== draggedWidget));
                setDestinationWidgets([...destinationWidgets, draggedWidget]);
            }
            setDraggedWidget(null);
        }
    };


    const handleOnDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return { originWidgets, destinationWidgets, handleOnDrag, handleOnDrop, handleOnDragOver };
};
