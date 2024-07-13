import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Column from "./components/column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Add test to homePage",
    },
    {
      id: 2,
      title: "Fix styling",
    },
    {
      id: 3,
      title: "Earn how",
    },
  ]);
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  return (
    <div>
      <h2>My tasks</h2>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
};

export default App;
