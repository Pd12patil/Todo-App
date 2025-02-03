
import { Trash2 as TrashIcon } from "lucide-react";

const TASK_PRIORITY_CLASSES = {
  High: "border-t-6 border-t-green-500",
  Medium: "border-t-6 border-t-yellow-500",
  Low: "border-t-6 border-t-red-500",
};

const BADGE_PRIORITY_CLASSES = {
  High: "text-green-500 border-green-500",
  Medium: "text-yellow-500 border-yellow-500",
  Low: "text-red-500 border-red-500",
}

function TodoCard({task, priority, onDelete, index}) {
  return (
    <div className={`bg-white p-5 m-5 shadow-lg rounded-md border-1 border-gray-200 min-h-[90px] relative ${TASK_PRIORITY_CLASSES[priority]}`}>
    <h1>{task}</h1>
    {/* <button onClick={() => {
      onDelete(index);
    }} className="bg-red-500 text-white text-center w-[100px] rounded-full mt-3 absolute right-2 bottom-2 cursor-pointer">Delete</button> */}
    <TrashIcon onClick={() => {
      onDelete(index);
    }} className="text-red-700 absolute right-10 bottom-2 cursor-pointer"/>

    <span className={`block w-[100px] border-1 rounded-full text-center absolute top-2 right-2 ${BADGE_PRIORITY_CLASSES[priority]}`}>{priority}</span>
  </div>
  )
}

export default TodoCard