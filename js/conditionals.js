const codeBlocks = [
    {
        codeBlock: `a = 10 
b = 20
if a > b: 
    max_val = a
    min_val = b 
else: 
    max_val = b 
    min_val = a`,
        variables: [
        {'max_val': '20'},
        {'min_val': '10'}
        ],
        values: ['5', '20', '15', '10', '25', '30']
    },
    {
        codeBlock: `age = 35
if age < 18:
    status = 'minor'
elif age < 65:
    status = 'adult'
else:
    status = 'senior'`,
        variables: [
            {'status': 'adult'},
        ],
        values: ['adult', 'minor', '35', 'senior']
    },
    {
        codeBlock: `num1 = 10
num2 = 20
if num1 + num2 > 30:
    result = num1 * num2
else:
    result = num1 + num2`,
        variables: [
            {'result': '30'}
        ],
        values: ['30', '200', '20', '10']
    },
    {
        codeBlock: `x = 10
y = 5
z = 20
result = (z < x)`,
        variables: [
            {'result': 'False'}
        ],
        values: ['True', 'False']
    },
    {
        codeBlock: `x = 10
y = 5
var = x > y`,
        variables: [
            {'var': 'True'}
        ],
        values: ['True', 'False']
    },
    {
        codeBlock: `x = 10
y = 5
z = 7
result = x > y`,
        variables: [
            {'result': 'True'}
        ],
        values: ['True', 'False']
    },
    {
        codeBlock: `x = 10
y = 5
z = 7
result = (x > y) and (z < y)`,
        variables: [
            {'result': 'False'}
        ],
        values: ['True', 'False']
    },
    {
        codeBlock: 'x = 7\nresult = x < 10 and x > 5',
        variables: [{'result': 'True'}],
        values: ['False', 'True']
    },
    {
        codeBlock: 'my_list = ["apple", "banana", "orange"]\ncontains_element = "banana" in my_list',
        variables: [{'contains_element': 'True'}],
        values: ['False', 'True']
    },
    {
        codeBlock: 'num = 10\nbetween = num > 1 and num <= 5',
        variables: [{'between': 'False'}],
        values: ['False', 'True']
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
