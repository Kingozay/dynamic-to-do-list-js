document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add event listener to remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent.replace('Remove', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;

            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Add event listener to remove button
            removeButton.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });

            // Append the remove button to the list item
            li.appendChild(removeButton);

            // Append the list item to the task list
            taskList.appendChild(li);
        });
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the "Enter" key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
