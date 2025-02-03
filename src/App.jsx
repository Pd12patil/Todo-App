import { useEffect, useState } from 'react'
import TodoCard from './TodoCard';
import toast,{Toaster} from 'react-hot-toast';



function App() {
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  
  useEffect(() => {
    if(todoList.length == 0) return;

    localStorage.setItem("todoList",JSON.stringify(todoList));
  },[todoList]);


  //load list from localstorage on first render
  useEffect(() => {
    const listFromLS = JSON.parse(localStorage.getItem("todoList") || "[]");
    setTodoList(listFromLS);
  },[]);

  const onDelete = (index) =>  {
    const listAfterDeletion = todoList.filter((_, i) => i != index);
    setTodoList(listAfterDeletion);
    toast.success("Task Deleted Successfully");
  };
  return (
    <div className="bg-amber-100 min-h-screen">

      <div className="flex justify-around border-b-2 border-slate-500 pt-4">
        {/* <span className="bg-white px-10 py-2 text-lg">All</span>
        <span className="bg-white px-10 py-2 text-lg">High</span>
        <span className="bg-white px-10 py-2 text-lg">Medium</span>
        <span className="bg-white px-10 py-2 text-lg">Low</span> */}
        {["All", "High", "Medium", "Low"].map((tab, i)=>{
          return <span className={`block w-[80px] md:w-[250px] text-center text-lg md:text-xl rounded-tl-lg rounded-tr-lg py-1 cursor-pointer ${tab == selectedTab ? "bg-slate-800 text-white" : "bg-white"}`} 
           key={i}
           onClick={()=> setSelectedTab(tab)}
           >{tab}</span>
        })}
      </div>
      {/* <h1>Todo App</h1> */}

      <div className="h-[70vh] md:h-[85vh] overflow-scroll pb-16 md:pb-8">
        {todoList.map((taskItem, index) => {
          const {task, priority} = taskItem;

          if(selectedTab != "All" && priority != selectedTab){
            return null;
          }

          return <TodoCard task={task} priority={priority} key={index} index={index} onDelete= {onDelete}/>
          // (
            // <div key={index} className='bg-white p-5 m-5 shadow-lg rounded-md border-1 border-gray-200'>
            //   <h1>{task}</h1>
            //   <span>{priority}</span>
            // </div>
            
          // );
        })}
      </div>

      <div className='fixed bottom-0 left-0 w-full bg-slate-800 flex flex-col md:flex-row justify-center items-center p-10 gap-y-4'>
        <input type="text" 
        onChange={(e) => {
          setTodoItem({
            ...todoItem,
            task: e.target.value
          })
        }}
        value={todoItem.task}
        className='bg-white text-xl w-full md:w-[400px] p-2 focus:outline-none rounded-md'
        placeholder='Enter Task'
        />

        <select 
        onChange={(e) => {
          setTodoItem({
            ...todoItem,
            priority: e.target.value
          })
        }}
        value={todoItem.priority}
        className='text-xl bg-white p-2 rounded-md md:ml-5 w-full md:w-[200px]'>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className='bg-yellow-500 text-xl px-10 py-2 rounded-md ml-5 cursor-pointer'
        onClick={()=> {

          if(!todoItem.task){
            toast.error("Please Enter task");
            return;
          }

          if(!todoItem.priority){
            toast.error("Please Select priority");
            return;
          }

          // setSelectedTab(todoItem.priority);
          setSelectedTab("All");

          setTodoList([todoItem, ...todoList]);
          setTodoItem({
            task: "",
            priority: "",
          });
          toast.success("Task  Added Successfully")
        }}
        >Add</button>
      </div>
      <Toaster/>
    </div>
  )
}

export default App