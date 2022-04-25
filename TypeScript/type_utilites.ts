type ToDo = {
    title : string;
    description : string;
    completed : boolean;
};

// Readonly

const to_do : Readonly<ToDo> = {
    title : "Learn TypeScript",
    description : "Learn TypeScript and build a to-do app",
    completed : false
};

// Partial

function update_to_do(to_do : ToDo, fields_to_update : Partial<ToDo>) : ToDo { 
    
    // Partial<ToDo> deixa todos os tipos de ToDo como opcionais
    
    return {
        ...to_do, // Spread operator, basicamente faz um unpack do objeto.
        ...fields_to_update
    };
}

const to_do_2 : ToDo = update_to_do(to_do, {
    completed : true
});

// Pick

type ToDoPreview = Pick<ToDo, "title" | "completed">; // Permite escolher apenas os campos que queremos

const to_do_3 : ToDoPreview = {
    title : "Learn TypeScript",
    completed : false
};

// Omit

type ToDoPreview2 = Omit<ToDo, "description">; // Permite omitir um campo desejado.

const to_do_4 : ToDoPreview2 = {
    title : "Learn TypeScript",
    completed : false
};