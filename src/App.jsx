import { useState ,useEffect } from 'react'
import Navbar from './component/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
crypto.randomUUID()

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const [showFinished, SetshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if(todoString){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    SetshowFinished(!showFinished);
  }
  
  

  const handleEdit = (e , id) => {
    let t = todos.filter(item=>item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !=id
    });
    setTodos(newTodos)
    saveToLS();
  }

  const handleDelete = (e , id) => {
    let newTodos = todos.filter(item=>{
      return item.id !=id
    });
    setTodos(newTodos)
    saveToLS(); 
  }

  const handleAdd = () => {
    setTodos([...todos, { id: crypto.randomUUID(), todo, isComplete: false }])
    setTodo("")
    console.log(todo);
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
      saveToLS();
    })

    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    
  }
  

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='flex justify-center font-bold text-xl'>iTask - Manage your Todos at one place</h1>


    <div className="addTodo my-5">
  <h2 className="text-lg font-bold mb-2">Add a Todo</h2>

  <div className="flex flex-col md:flex-row gap-3">
    <input
      onChange={handleChange}
      value={todo}
      type="text"
      className="w-full md:w-3/4 border rounded-sm p-2"
    />

    <button
      onClick={handleAdd}
      disabled={todo.length < 3}
      className="bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md md:mx-2 disabled:bg-violet-400"
    >
      Save
    </button>
  </div>
</div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished}  />  Show All Task
        <hr className="my-4 border-gray-400" />
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">


          {todos.length ===0 && <div className='m-5'>No todos to display</div> }
          {todos.map(item => {

            return (showFinished || !item.isComplete) &&  <div key={item.id} className="todo flex md:w-full

             my-3 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.todo.isComplete} id='' />
              <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=>{handleEdit(e ,item.id)}} className='bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e ,item.id)}} className='bg-violet-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'><MdDelete /></button>
              </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
