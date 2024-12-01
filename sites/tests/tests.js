const months = [
    { name: "January", length: 31, },
    { name: "Febuary", length: 28, },
    { name: "March", length: 31, },
    { name: "April", length: 30, },
    { name: "May", length: 31, },
    { name: "June", length: 30, },
    { name: "July", length: 31, },
    { name: "August", length: 31, },
    { name: "September", length: 30, },
    { name: "October", length: 31, },
    { name: "November", length: 30, },
    { name: "December", length: 31, },
]

const tests = [
    {
        title: "Example Test",
        description: "This is an example test",
        date: "2024-09-02",
    }
]


const tbody = document.getElementById("tbody");
const header = document.getElementById("header");
const test_div = document.getElementById("test_info");

let month_index = 0;
let year_index = 2024;

get_month(month_index, 2024);

function get_month(month_input, year_number) {
    let index = 0
    const number = (month_input+8)%12;

    
    const month = number < 10 ? `0${number+1}` : number+1;
    const year = number < 8 ? year_number+1 : year_number;

    header.innerHTML = `${months[number].name} ${year}`;
    tbody.innerHTML = "";
    
    for (let j = 1; j <= months[number].length; j++) {
        const day = j < 10 ? `0${j}` : j;
        const date = new Date(`${year}-${month}-${day}`);


        if (date.getDay() === 0 || date.getDate()===1) { 
            index++;
            tbody.innerHTML += `<tr class="calendar_row" id="row-${index}"></tr>`;
        }

        if(date.getDay()==6 || date.getDay()==0 ) continue;

        if(date.getDate()==1 && date.getDay()>1 && date.getDay()<6){
            for(let k = 0; k < date.getDay()-1; k++){
                const row = document.getElementById(`row-${index}`);
                row.innerHTML += `<td class="empty_calendar_cell"></td>`;
            }
        }


        const row = document.getElementById(`row-${index}`);
        row.innerHTML += `<td class="calendar_cell">${j}${get_tests(`${year}-${month}-${day}`)}<br><button class="create_new_test_button" id="${year}-${month}-${day}" onclick="create_new_test(this)">+</button></td>`;
    }
}

function update_month() {
    if (month_index == 10) {
        month_index = 0;
        year_index++;
    }
    if (month_index == -1) {
        month_index = 8;
        year_index--;
    }

    get_month(month_index, year_index);
}

function create_new_test(button) {    
    test_div.innerHTML = `
        <label class="new_test_title_label" for="title">Test Title</label>
        <input class="new_test_title" id="new_test_title" type="text" name="title"/>
        <br>
        <label class="new_test_description_label" for="description">Test Description</label>
        <br>
        <textarea class="new_test_description" id="new_test_description" name="description" rows="10" cols="40"></textarea>
        <br>
        <button class="add_test_button" onclick="add_test('${button.id}')">Add Test</button>
    `
}

function add_test(date) {
    const title = document.getElementById("new_test_title").value;
    const description = document.getElementById("new_test_description").value;

    tests.push({
        title: title,
        description: description,
        date: date,
    })

    test_div.innerHTML = `<h1 class="success_header">Successfully added test</h1>`

    update_month();
}

function get_tests(date) {
    let s = ``;
    let index = 0;

    for (let test of tests) {
        if (test.date != date) {
            continue;
        }

        s += `
            <br>
            <button class="display_test_button" onclick="display_test(${index})">${test.title}</button>
        `

        index++;
    }

    return s;
}

function display_test(index) {
    let test = tests[index];

    test_div.innerHTML = `
        <h1 class="test_title">${test.title}</h1>
        <h3 class="test_date"> ${test.date}</h3>
        <p class="test_description">${test.description}</p>
    `
}