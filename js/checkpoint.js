const codeBlocks = [
    // Code block 1: Create a variable and assign a value to it
    {
        codeBlock: 'my_variable = 42',
        variables: [{'my_variable': '42'}],
        values: ['42', '32', '5'],
    },
    
    // Code block 2: Create a list and assign values to it
    {
        codeBlock: 'my_list = [1, 2, 3]',
        variables: [{'my_list[0]': '1'}, {'my_list[2]': '3'}, {'my_list': '[1, 2, 3]'}],
        values: ['1', '2', '3', '[1, 2, 3]'],
    },
    
    // Code block 4: Change the value of a variable
    {
        codeBlock: 'my_variable = 42\nmy_variable = 10',
        variables: [{'my_variable': '10'}],
        values: ['42', '10', '52'],
    },
    
    // Code block 5: Get the length of a list
    {
        codeBlock: 'my_list = [1, 2, 3]\nlist_length = len(my_list)',
        variables: [{'list_length': '3'}],
        values: ['2', '3', '4'],
    },

    {
        codeBlock: 'x = 5\ny = 10\nx = y, y = x * 2',
        variables: [{'x': '10'}, {'y': '20'}],
        values: ['5', '10', '15', '20']
    },

    {
        codeBlock: 'my_list = [1, 2, 3]\nelement = my_list[5]',
        variables: [{'element': 'n/a'}],
        values: ['2', 'n/a', '5', '3'],
    },
    {
        codeBlock: 'x = 10\ny = 5\nz = x + y\na = x + z\nb = z * y\nc = z + a',
        variables: [
            {'x': '10'},
            {'y': '5'},
            {'z': '15'},
            {'a': '25'},
            {'b': '75'},
            {'c': '40'},
        ],
        values: ['40', '25', '5', '10', '25', '15', '3', '75', '20'],
    },
    {
        codeBlock: `first_name = 'John'\nlast_name = 'Doe'\nage = 30\nmessage = 'My name is ' + first_name + ' ' + last_name + ' and I am ' + str(age) + ' years old.'`,
        variables: [
        {'first_name': 'John'},
        {'last_name': 'Doe'},
        {'age': '30'},
        {'message': 'My name is John Doe and I am 30 years old.'}
        ],
        values: ['Jane', 'Doe', '25', '30', 'My name is Jane Smith and I am 25 years old.', 'John', 'My name is John Doe and I am 30 years old.'],
    },
    {
        codeBlock: `name = 'Alice'\ngreeting = 'Hello, ' + name + '!' print(greeting)`,
        variables: [
        {'name': 'Alice'},
        {'greeting': 'Hello, Alice!'}
        ],
        values: ['Bob', 'Hello, Bob!', 'Charlie', 'Hello, Alice!', 'Alice'],
    },
    {
        codeBlock: `names = ['Alice', 'Bob', 'Charlie']\ngreeting = 'Hello, ' message = greeting + names[1]`,
        variables: [
            {'message': 'Hello, Bob'}
        ],
        values: ['Hello, Charlie', 'Hello, Alice', 'Hello, Bob'],
    }
];
var visitedIndices = new Set();
let remainingCount = codeBlocks.length;
function generateRandomCodeBlock() {
    var code = document.querySelector("#block");
    var vars = document.querySelector("#vars");
    var values = document.querySelector("#values");
    values.innerHTML = '';
    vars.innerHTML = '';
    // var index = Math.floor(Math.random() * codeBlocks.length)
    var randomIndex = Math.floor(Math.random() * codeBlocks.length);
    var block = codeBlocks[randomIndex];
    if(remainingCount > 0) {
        if (!visitedIndices.has(randomIndex)) {
            for (value in block.values) {
                values.innerHTML += `<div class="draggable" id="val${block.values[value]}" data-target="var${block.values[value]}" ondragstart="handleDragStart(event)">${block.values[value]}</div>`;
            }
            for (variable in block.variables) {
                vars.innerHTML += `${Object.keys(block.variables[variable])[0]}: <input type="text" id="var${Object.values(block.variables[variable])[0]}" class="droppable" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" readonly></input>`;
            }
            code.innerHTML = `<pre>${block.codeBlock}</pre>`;
            makeDraggable()
            visitedIndices.add(randomIndex);
            remainingCount--;
        } else {
            generateRandomCodeBlock();
            return;
        }
    } else {
        code.innerHTML = '<h2>Complete!</h2>';
    }
}

// JavaScript code for making the elements draggable
function makeDraggable() {
    var elements = document.getElementsByClassName("draggable");
    for (var i = 0; i < elements.length; i++) {
      elements[i].draggable = true;
    }
    document.getElementById("gameplay").onclick = '';
}

// JavaScript code for handling the drag and drop events
function handleDragStart(event) {
event.dataTransfer.setData("text", event.target.id);
}
function handleDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var element = document.getElementById(data);
    var target = event.target;
    while (target.className !== "droppable") {
        target = target.parentNode;
    }
    var targetId = target.id;
    if (element.dataset.target === targetId) {
        target.value = element.innerHTML;
        target.classList.add("correct");
        element.parentNode.removeChild(element);
    //   workingCss = document.getElementById("code");
    //   tag = workingCss.querySelector("#"+targetId);
    //   console.log(tag)
    //   tag.replaceWith(element.innerHTML);
    //   new_css = document.getElementById("code").innerHTML;
    //   var iframe = document.getElementById("old-webpage");
    //   var head = iframe.contentDocument.getElementsByTagName("head")[0];
    //   var style = head.getElementsByTagName("style")[0];
    //   style.innerHTML = new_css
    //   console.log(style.innerHTML)
        if(document.getElementsByClassName("droppable correct").length === document.getElementsByClassName("droppable").length){
            document.getElementById("gameplay").onclick = generateRandomCodeBlock();
        }

    } else {
        target.classList.add("incorrect");
        setTimeout(function() {
        target.classList.remove("incorrect");
        }, 1000);
    }
}

function handleDragOver(event) {
    event.preventDefault();
}
