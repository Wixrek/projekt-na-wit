let students = [
    {
        name: "Example Student 1",
        grades: [1, 2, 3, 4],
        notes: [
            {
                title: "Test Note",
                description: "This is a test note"
            }
        ],
    },
    {
        name: "Example Student 2",
        grades: [5, 6],
        notes: [
            {
                title: "Test Note 2",
                description: "This is a diffrent test note"
            }
        ]
    },
    {
        name: "Example Student 3",
        grades: [2, 3, 4],
        notes: [
            
        ]
    }
]

let grade_inputs = [];

let students_table = document.getElementById("students");

let grades_tag = document.getElementById("grades_tag");
let notes_tag = document.getElementById("notes_tag");
let note_div = document.getElementById("note");

students_table.innerHTML = generate_html();

function generate_html() {
    let new_html = ``

    let index = 0;
    for (let student of students) {
        let grades = generate_grades(student, index);
        let notes = generate_notes(student, index);

        new_html += `
            <tr class="student_row">
                <td class="student_name">
                    ${student.name}
                </td>
                ${grades}
                ${notes}
            </tr>
        `

        index++;
    }

    return new_html;
}



function generate_grades(student, index) {
    let max_length = get_max_grades_length();
    let grades = ``;
    let j = 0;

    student.grades.forEach(grade => {
        grades += `
            <td class="grade">
                <input type="text" class="grade_input" name="grade" id="grade_${index}_${j}" value="${grade}" oninput="validate_grade(this)">
            </td>
        `;

        grade_inputs.push(`grade_${index}_${j}`);

        j++;
    });
    

    for (j; j <= max_length; j++) {
        grades += `
            <td class="grade">
                <input type="text" class="grade_input" id="grade_${index}_${j}" name="new_grade" oninput="validate_grade(this)">
            </td>
        `

        grade_inputs.push(`grade_${index}_${j}`);
    }

    grades_tag.colSpan = max_length + 1;

    return grades;
}

function get_max_grades_length() {
    max_length = 0;

    for (let index in students) {
        grades_length = students[index].grades.length;

        if (grades_length <= max_length) {
            continue;
        }
            
        max_length = grades_length;
    }

    return max_length;
}

function get_grades() {
    grade_inputs.forEach(input => {
        indexes = input.split('_');
        value = document.getElementById(input).value;

        if (value != "") {
            if (students[indexes[1]].grades[indexes[2]]) {
                students[indexes[1]].grades[indexes[2]] = value;
            }
            else {
                students[indexes[1]].grades.push(value);
            }
        }
        
    });
}

function validate_grade(input) {
    let value = input.value;

    if (value == "n") {
        value = "nb";
    }

    if (!["1", "2", "3", "4", "5", "6", "nb"].includes(value)) {
        value = value.slice(0, -1);
    }

    input.value = value;

    update();
}




function generate_notes(student, index) {
    let max_length = get_max_notes_length();
    let notes = ``;
    let j = 0;
    
    student.notes.forEach(note => {
        notes += `
            <td class="note">
                <input type="button" class="note_button" name="note" id="note_${index}_${j}" value="${note.title}" onclick="display_note(this)">
            </td>
        `;

        j++;
    });

    for (j; j < max_length; j++) {
        notes += `
            <td class="note"></td>
        `
    }

    notes += `
        <td class="note_add">
            <input type="button" class="new_note_button" id="new_note_${index}" name="new_note" value="+" onclick="create_new_note(this)">
        </td>
    `

    notes_tag.colSpan = max_length + 1;

    return notes;
}

function get_max_notes_length() {
    max_length = 0;

    for (let index in students) {
        notes_length = students[index].notes.length;

        if (notes_length <= max_length) {
            continue;
        }
            
        max_length = notes_length;
    }

    return max_length;
}

function display_note(button) {
    let indexes = button.id.split("_");
    let note = students[indexes[1]].notes[indexes[2]];

    note_div.innerHTML = `
        <h1 class="note_title">${note.title}</h1>
        <p class="note_description">${note.description}</p>
    `
}

function create_new_note(button) {
    note_div.innerHTML = `
        <label class="new_note_title_label" for="title">Note Title</label>
        <input class="new_note_title" id="new_note_title" type="text" name="title"/>
        <br>
        <label class="new_note_description_label" for="description">Note Description</label>
        <br>
        <textarea class="new_note_description" id="new_note_description" name="description" rows="10" cols="40"></textarea>
        <br>
        <button class="add_note_button" onclick="add_note(${button.id.split("_")[2]})">Add Note</button>
    `
}

function add_note(student_index) {
    title = document.getElementById("new_note_title").value;
    description = document.getElementById("new_note_description").value;

    console.log(student_index);
    console.log(title);
    console.log(description);

    students[student_index].notes.push({
        title,
        description,
    });

    note_div.innerHTML = `<h1 class="success_header">Successfully added note</h1>`;

    update();
}





function update() {
    get_grades();
    students_table.innerHTML = generate_html();
}