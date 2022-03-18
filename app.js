const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = (todo) => {
// We create some HTML template including the user input (todo)
const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
`;

// We add the new html template to the existing list of todos
list.innerHTML += html;
};

addForm.addEventListener('submit', e =>{
    e.preventDefault();

    // We set the todo to be the user input, trimming it to avoid spaces
    const todo = addForm.add.value.trim();
    
    // Here we make sure that only if there was an input the function to generate the template will be fired. Also we reset the input field after generating the template
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }
    
});

// Delete todos
list.addEventListener('click', e => {
    // Here we check if where the user clicks contains the class "delete", in our html only the trash has this class. If the user clicks somewhere else nothing will happen
    if(e.target.classList.contains('delete')){
        // If yes, we target the parent element of this trash (the correct LI) and remove it from the list
        e.target.parentElement.remove();
    }
});

const filterTodos = (term) => {
    // We make an array of the LI list. Then we compare the text inside each LI with the input entered by user in the search field. By puting the ! we make sure that only if the
    // entered value does NOT match with the text inside the LI we will include it in the array. The idea is then to apply a CSS class ('filtered') to all those LI which do not 
    // match and hide them
    Array.from(list.children) 
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'))

    // Here we just create the opposite array. The ones that match with the search input will be in the array. Then we delete the class ('filtered') so that those LI items show
    Array.from(list.children) 
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'))

};

// Keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
})