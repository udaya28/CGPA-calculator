var deleteButton = document.querySelectorAll('.delete');
// console.log(deleteButton)
// document.getElementsByClassName("delete")[0].addEventListener("click", display);

deleteButton.forEach((item) => {
  item.addEventListener('click', removeItem);
});

function removeItem(e) {
  // console.log(e)
  const parent = e.currentTarget.parentNode.parentNode;
  parent.remove();
}

var addButton = document.querySelector('.addButton');
// console.log(addButton);
addButton.addEventListener('click', addItem);

var subject = `<tr>
<td>
    <input type="text" class="form-control">
    <select name="credit" class="form-control select" >
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
  </div>
  
</td>

<td>
    <select name="grade" class="form-control" >
      <option value="10">O</option>
      <option value="9">A+</option>
      <option value="8">A</option>
      <option value="7">B+</option>
      <option value="6">B</option>
      <option value="0">RA</option>
      <option value="0">AB</option>
  </select>
  
</td>
<td>
    <input type="button" class="btn btn-danger  btn-sm delete" value="X">
</td>
</tr>
<tr>`;

function add() {
  var tr = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');

  inp = document.createElement('input');
  inp.setAttribute('class', 'form-control');
  inp.setAttribute('type', 'text');

  //select1
  var sel = document.createElement('select');
  sel.setAttribute('class', 'form-control select');
  sel.setAttribute('name', 'credit');
  // sel.setAttribute("style",'padding :6px 12px;')
  var op1 = document.createElement('option');
  op1.setAttribute('value', '0');
  op1.textContent = '0';
  sel.appendChild(op1);
  var op2 = document.createElement('option');
  op2.setAttribute('value', '1');
  op2.textContent = '1';
  sel.appendChild(op2);
  var op3 = document.createElement('option');
  op3.setAttribute('value', '2');
  op3.textContent = '2';
  sel.appendChild(op3);
  var op4 = document.createElement('option');
  op4.setAttribute('value', '3');
  op4.textContent = '3';
  sel.appendChild(op4);
  var op5 = document.createElement('option');
  op5.setAttribute('value', '4');
  op5.textContent = '4';
  sel.appendChild(op5);

  var space = document.createElement('span');
  space.innerHTML = '&nbsp;';
  td1.appendChild(inp);
  td1.appendChild(space);
  td1.appendChild(sel);

  var sel = document.createElement('select');
  sel.setAttribute('class', 'form-control');
  sel.setAttribute('name', 'grade');
  var op1 = document.createElement('option');
  op1.setAttribute('value', '10');
  op1.textContent = 'O';
  sel.appendChild(op1);
  var op2 = document.createElement('option');
  op2.setAttribute('value', '9');
  op2.textContent = 'A+';
  sel.appendChild(op2);
  var op3 = document.createElement('option');
  op3.setAttribute('value', '8');
  op3.textContent = 'A';
  sel.appendChild(op3);
  var op4 = document.createElement('option');
  op4.setAttribute('value', '7');
  op4.textContent = 'B+';
  sel.appendChild(op4);
  var op5 = document.createElement('option');
  op5.setAttribute('value', '6');
  op5.textContent = 'B';
  sel.appendChild(op5);
  var op6 = document.createElement('option');
  op6.setAttribute('value', '0');
  op6.textContent = 'RA';
  sel.appendChild(op6);
  var op7 = document.createElement('option');
  op7.setAttribute('value', '0');
  op7.textContent = 'AB';
  sel.appendChild(op7);

  td2.appendChild(sel);

  inp2 = document.createElement('input');
  inp2.setAttribute('class', 'btn btn-danger  btn-sm delete');
  inp2.setAttribute('type', 'button');
  inp2.setAttribute('value', 'X');
  td3.appendChild(inp2);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  subject = tr;
  return subject;
}

var table = document.getElementById('table');

function addItem() {
  table = document.getElementById('table');
  table.appendChild(add());
  addButton = document.querySelector('.addButton');
  // console.log(addButton);
  addButton.addEventListener('click', addItem);
  deleteButton = document.querySelectorAll('.delete');
  deleteButton.forEach((item) => {
    item.addEventListener('click', removeItem);
  });
}

var final_submit = document.getElementById('final_submit');
// console.log(final_submit);
final_submit.addEventListener('click', generateResult);

function generateResult() {
  var body = document.querySelectorAll('tbody');
  // console.log(body);
  var input = document.querySelectorAll('tbody input.form-control');

  // console.log(input);

  var credit = document.querySelectorAll('select.select');
  // console.log(credit);
  var grade = document.querySelectorAll('select[name="grade"]');
  // console.log(grade);

  const subArray = [];
  const creArray = [];
  const graArray = [];

  // console.log(input[0].value);
  for (let i = 0; i < input.length; i++) {
    subArray.push(input[i].value);
    creArray.push(parseInt(credit[i].value));
    graArray.push(parseInt(grade[i].value));
    // console.log(subArray);
    // console.log(creArray);
    // console.log(graArray);
  }
  // console.log(subArray);
  // console.log(creArray);
  // console.log(graArray);

  var isValid = inputValidation(subArray);
  // console.log(isValid);

  if (isValid[0]) {
    displayResult(creArray, graArray);
  } else {
    // alert('Subject can not be Empty');
    if (isValid[1] === 1) {
      swal('Invalid input', 'Every subject must be filled..');
    } else {
      swal('Invalid input', 'Subject name must not be number..');
    }
  }
}

function inputValidation(arr) {
  // console.log(arr);
  for (const i of arr) {
    if (i === '') {
      return [false, 1];
    }
    if (isnumber(i)) {
      return [false, 2];
      // !isNaN(parseInt(i))
    }
  }
  return [true, -1];
}

function displayResult(credit, grade) {
  var result = 0.0,
    points = 0;
  var totalCredit = sum(credit);
  for (let i = 0; i < credit.length; i++) {
    points += credit[i] * grade[i];
  }
  result = roundToTwo(points / totalCredit);
  if (isNaN(result)) {
    result = 0;
  }
  console.log(result);
  // var textnode = document.createTextNode(result);
  let span = document.getElementsByClassName('alert-link');
  //.appendChild(textnode);
  span[0].innerHTML = result;
  // console.log(textnode);
  // console.log(span);
}

function sum(arr) {
  var su = 0;
  for (let i = 0; i < arr.length; i++) {
    su += arr[i];
  }
  return su;
}

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

function isnumber(i) {
  var res = i.split('');
  // console.log(res);
  // console.log(isNaN(parseInt(res)));
  for (const i of res) {
    // console.log(i);
    // console.log(isNaN(parseInt(i)));
    if (isNaN(parseInt(i))) {
      return false;
    }
  }
  return true;
}
