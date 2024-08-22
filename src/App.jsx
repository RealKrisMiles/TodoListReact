import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {


  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(false) 
  // Load todos from localStorage when the component mounts

  // useEffect(() => {
  //  let todoString =  localStorage.getItem("todos")
  //  if(todoString){
  //   let todos = JSON.parse(localStorage.getItem("todos"))
  //   setTodos(todos)
  //  }
  // }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished=(e)=>{
    setshowfinished(!showfinished)
  }


  const handleEdit = (e,id) => {
    let t = todos.filter(items=>{
      return items.id == id;
    })
    console.log(t)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
     });
     setTodos(newTodos)
     saveToLS()
  }
  const handleDelete = (e,id) => {
   let newTodos = todos.filter(item=>{
    return item.id !== id;
   });
   setTodos(newTodos)
   saveToLS()
  }

  const handleAdd = () => {
      setTodos([...todos,{todo,id:uuidv4(),isCompleted:false}]);
      setTodo("");
      saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox= (e) => {
      let id = e.target.name;
      let index = todos.findIndex(item=>{
        return item.id == id;
      })
      console.log(index)
      let newTodos =[...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos)
      saveToLS()
  }
  


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-100 p-5 rounded-xl min-h-[80vh] ">
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add Todo</h2>
        
        <input onChange={handleChange} value={todo} type="text" className='w-80' />
        
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-600 hover:bg-violet-400 p-3 py-1 font-bold text-white rounded-lg m-6'>SAVE</button>
        </div>
       <input onChange={togglefinished} type="checkbox" value={showfinished} name="" id="" /> show finished
       
        
        <h2 className='tetx-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length==0 && <div className='flex items-center justify-center font-bold '> No todos to display</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo m-auto my-7 w-1/2 flex justify-between items-center bg-slate-200 rounded-lg">
               <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="button flex gap-3">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-600 hover:bg-violet-400 p-3 py-1 font-bold text-white rounded-lg m-6'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id), console.log(e)}} className='bg-violet-600 hover:bg-violet-400 p-3 py-1 font-bold text-white rounded-lg m-6'>Delete</button>
              </div>

            </div>
          })}

        </div>


      </div>
    </>
  )
}

export default App
