import { useEffect,  useState } from "react";
import AddTask from "./components/addTask";
import Tasks from "./components/Tasks";
import  { v4 } from "uuid";
import Title from "./components/Title";
// import Title from "./components/Title";
  // import './App.css';

function App() {
  /*
  serve para armazenar o estado das tarefas, e o useState é usado parainicializar, o estado com as tarefas salvas no localStorage ou com um array de tarefas padrão. O useEffect é usado para atualizar o localStorage sempre que o estado das tarefas mudar.*/
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []
);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTasks(data);
    };
    // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    // fetchTasks();
  }, []);


  // PEGAR OS DADOS QUE ELA RETORNA PARA O ESTADO DAS TAREFAS, ELA RETORNA UM ARRAY DE OBJETOS, CADA OBJETO REPRESENTA UMA TAREFA, E CADA OBJETO TEM UM ID, UM TITLE, UM DESCRIPTION E UM ISCOMPLETED. ENTÃO EU POSSO USAR O MAP PARA PEGAR CADA OBJETO E TRANSFORMAR EM UMA TAREFA QUE EU POSSO USAR NO MEU ESTADO.

  // AMAR O QUE ELA RETORNA, ELA RETORNA UM ARRAY DE OBJETOS, CADA OBJETO REPRESENTA UMA TAREFA, E CADA OBJETO TEM UM ID, UM TITLE, UM DESCRIPTION E UM ISCOMPLETED.

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //NÃO PRECISO ATUALIZAR O ESTADO AQUI, POIS O MAP JÁ RETORNA UM NOVO ARRAY COM OS VALORES ATUALIZADOS, ENTÃO BASTA RETORNAR O TASK
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4"> 
      <h1 className="text-yellow-500">
        Gerenciador de Tarefas
        </h1>
      <AddTask onAddTaskSubmit={onAddTaskSubmit} />
      <Tasks
      tasks={tasks}
      onTaskClick={onTaskClick} 
      onDeleteTaskClick={onDeleteTaskClick}
      />
      </div>
    </div>
  );
}


export default App;