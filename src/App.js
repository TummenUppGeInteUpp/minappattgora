import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("Low");
  const [selectedCategory, setSelectedCategory] = useState("Arbete");
  const [reminderTime, setReminderTime] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleReminderChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegister = (username, password) => {
    // Implementera logik för användarregistrering
    // Exempel: Anropa en backend-API för att skapa användarkontot och spara användardata
    setUser({ username, password });
  };

  const handleLogin = (username, password) => {
    // Implementera logik för användarinloggning
    // Exempel: Anropa en backend-API för att autentisera användaren och hämta användardata
    setUser({ username, password });
  };

  const handleLogout = () => {
    // Implementera logik för användarutloggning
    // Exempel: Rensa användardata eller token från sessionslagring
    setUser(null);
  };

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([
        ...tasks,
        {
          text: inputValue,
          priority: selectedPriority,
          category: selectedCategory,
          reminder: reminderTime,
          notes: notes,
          completed: false,
        },
      ]);
      setInputValue("");
      setSelectedPriority("Low");
      setSelectedCategory("Arbete");
      setReminderTime("");
      setNotes("");
    }
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const moveTaskToCompleted = (index) => {
    const taskToMove = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToMove]);
  };

  const moveTaskToRemaining = (index) => {
    const taskToMove = completedTasks[index];
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
    setTasks([...tasks, taskToMove]);
  };

  const getCompletedTasksCount = () => {
    return completedTasks.length;
  };

  const getRemainingTasksCount = () => {
    return tasks.length;
  };

  const sortTasks = (tasks) => {
    if (sort === "Priority") {
      return tasks.sort((a, b) => {
        const priorityA = a.priority.toLowerCase();
        const priorityB = b.priority.toLowerCase();
        if (priorityA < priorityB) return -1;
        if (priorityA > priorityB) return 1;
        return 0;
      });
    } else if (sort === "Category") {
      return tasks.sort((a, b) => {
        const categoryA = a.category.toLowerCase();
        const categoryB = b.category.toLowerCase();
        if (categoryA < categoryB) return -1;
        if (categoryA > categoryB) return 1;
        return 0;
      });
    } else if (sort === "DateAdded") {
      return tasks.sort((a, b) => {
        const dateAddedA = new Date(a.dateAdded);
        const dateAddedB = new Date(b.dateAdded);
        return dateAddedA - dateAddedB;
      });
    } else if (sort === "ReminderDate") {
      return tasks.sort((a, b) => {
        const reminderDateA = new Date(a.reminder);
        const reminderDateB = new Date(b.reminder);
        return reminderDateA - reminderDateB;
      });
    } else {
      return tasks;
    }
  };

  const filterTasks = (tasks) => {
    if (filter === "All") {
      return tasks;
    } else if (filter === "Priority") {
      return tasks.filter((task) => task.priority === filter);
    } else if (filter === "Category") {
      return tasks.filter((task) => task.category === filter);
    } else if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "Remaining") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  };

  const filteredTasks = filterTasks(tasks);
  const filteredCompletedTasks = filterTasks(completedTasks);

  const sortedTasks = sortTasks(filteredTasks);
  const sortedCompletedTasks = sortTasks(filteredCompletedTasks);

  const searchedTasks = sortedTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shareTask = (index) => {
    const taskToShare = tasks[index];
    const shareText = `Check out this task: ${taskToShare.text} - Priority: ${taskToShare.priority}`;
    // Implementera den faktiska delningslogiken här, t.ex. dela via e-post eller inom applikationen
    console.log(shareText);
  };

  const handleTaskPriorityChange = (index, priority) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].priority = priority;
    setTasks(updatedTasks);
  };

  const handleCustomCategoryChange = (index, category) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].category = category;
    setTasks(updatedTasks);
  };

  const handleTaskTimeEstimate = (index, timeEstimate) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].timeEstimate = timeEstimate;
    setTasks(updatedTasks);
  };

  const handleTaskDeadline = (index, deadline) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].deadline = deadline;
    setTasks(updatedTasks);
  };

  const handleTaskImport = (importedTasks) => {
    setTasks([...tasks, ...importedTasks]);
  };

  const renderTasks = (tasks) => {
    return tasks.map((task, index) => (
      <li key={index}>
        <div>
          <strong>{task.text}</strong>
        </div>
        <div>Prioritet: {task.priority}</div>
        <div>Kategori: {task.category}</div>
        <div>Påminnelse: {task.reminder}</div>
        <div>Noteringar: {task.notes}</div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
        />
        <button onClick={() => moveTaskToCompleted(index)}>
          Flytta till avklarade
        </button>
        <button onClick={() => shareTask(index)}>Dela</button>
        <button onClick={() => editTask(index)}>Redigera</button>
        <button onClick={() => deleteTask(index)}>Ta bort</button>
      </li>
    ));
  };

  const renderCompletedTasks = (completedTasks) => {
    return completedTasks.map((task, index) => (
      <li key={index}>
        <div>
          <strong>{task.text}</strong>
        </div>
        <div>Prioritet: {task.priority}</div>
        <div>Kategori: {task.category}</div>
        <div>Påminnelse: {task.reminder}</div>
        <div>Noteringar: {task.notes}</div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
        />
        <button onClick={() => moveTaskToRemaining(index)}>
          Flytta till återstående
        </button>
      </li>
    ));
  };

  const renderCategories = (categories) => {
    return categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ));
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Välkommen, {user.username}!</h2>
          <button onClick={handleLogout}>Logga ut</button>
        </div>
      ) : (
        <div>
          <h2>Logga in</h2>
          <input type="text" placeholder="Användarnamn" />
          <input type="password" placeholder="Lösenord" />
          <button onClick={handleLogin}>Logga in</button>
          <h2>Registrera</h2>
          <input type="text" placeholder="Användarnamn" />
          <input type="password" placeholder="Lösenord" />
          <button onClick={handleRegister}>Registrera</button>
        </div>
      )}
      <h1>Att göra-lista</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <select value={selectedPriority} onChange={handlePriorityChange}>
        <option value="Low">Låg</option>
        <option value="Medium">Medium</option>
        <option value="High">Hög</option>
      </select>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="Arbete">Arbete</option>
        <option value="Personligt">Personligt</option>
        <option value="Studier">Studier</option>
      </select>
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={handleReminderChange}
      />
      <textarea
        placeholder="Noteringar"
        value={notes}
        onChange={handleNotesChange}
      ></textarea>
      <button onClick={addTask}>Lägg till</button>
      <div>
        <input
          type="text"
          placeholder="Sök uppgifter"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <h2>Återstående uppgifter</h2>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">Alla</option>
          <option value="Priority">Prioritet</option>
          <option value="Category">Kategori</option>
          <option value="Completed">Avklarade</option>
          <option value="Remaining">Återstående</option>
        </select>
        <select value={sort} onChange={handleSortChange}>
          <option value="None">Ingen</option>
          <option value="Priority">Prioritet</option>
          <option value="Category">Kategori</option>
          <option value="DateAdded">Datum tillagt</option>
          <option value="ReminderDate">Påminnelse</option>
        </select>
        <ul>{renderTasks(searchedTasks)}</ul>
      </div>
      <div>
        <h2>Avklarade uppgifter</h2>
        <ul>{renderCompletedTasks(sortedCompletedTasks)}</ul>
      </div>
      <div>
        Statistik:
        <p>Antal avklarade uppgifter: {getCompletedTasksCount()}</p>
        <p>Antal återstående uppgifter: {getRemainingTasksCount()}</p>
      </div>
    </div>
  );
}

export default App;
