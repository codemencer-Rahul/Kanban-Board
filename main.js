const columns = document.querySelectorAll(".column");
let draggedTask = null;

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-btn')) {
        const text = prompt("Enter task!");

        if(!text) return;

        const task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('draggable', true);

        const taskContent = document.createElement('span');
        taskContent.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        task.appendChild(taskContent);
        task.appendChild(deleteBtn);

        const tasks = e.target.previousElementSibling;
        tasks.appendChild(task);
    }

    if(e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
})

document.addEventListener('dragstart', (e) => {
    if(e.target.classList.contains('task')) {
        e.target.classList.add('dragging');
        draggedTask = e.target;
    }
})

document.addEventListener('dragend', (e) => {
    if(e.target.classList.contains('task')) {
        e.target.classList.remove('dragging');
        draggedTask = null;
    }
})

// don't perform 'Event Delegation' in dragging, focus, blur as it causes performance issue
columns.forEach((col) => {
    col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
    })

    col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
    })

    col.addEventListener('drop', () => {
        col.classList.remove('drag-over');

        if(draggedTask) {
            col.querySelector('.tasks').appendChild(draggedTask);
        }
    })
})