window.onload = function () {
    bootlint.showLintReportForCurrentDocument([], {
        hasProblems: false,
        problemFree: false
    });

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        );
    }

    var currentDate = formatDate(new Date());

    $('.due-date-button').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: 'bottom right'
    });

    $('.due-date-button').on('click', function (event) {
        $('.due-date-button')
            .datepicker('show')
            .on('changeDate', function (dateChangeEvent) {
                $('.due-date-button').datepicker('hide');
                $('.due-date-label').text(formatDate(dateChangeEvent.date));
            });
    });
};

var i = 0;

function click_event()
{
    var add = document.querySelector('input').value;

    /* 어떠한 글도 입력하지않을 경우 */
    if(!add)
    {
        alert('Please input your list')
    }
    else
    {
        addTodo(i);
        /* 글 추가 기능 */
        //additional(add, i, 'node', 'list');
        /* 완료 버튼 */
        //doneBotton(i); 
        /* 제거 버튼 생성 */
        //removeButton(i);
        /*개행 처리 태그*/
        //Next(i, 'br', 'list');
        ++i;

        document.querySelector('input').value = '';
    }
}

function addTodo(i) {
    let row = document.createElement('div');
    row.id = 'todo' + i;
    row.className = 'row px-3 align-items-center todo-item rounded';

    /* 체크 버튼 */
    createCheckBtn(row);
    /* 할 일 텍스트 */
    createTodoText(row);
    /* 할 일 마감 시간*/
    createDeadline(row);
    /* 할 일 수정 및 삭제 */
    createTodoActions(row, i);

    document.querySelector('#list').appendChild(row);
    document.querySelector('#calendar').innerHTML = "Due date not set";
}

function createCheckBtn(row) {
    let check_btn_div = document.createElement('div');
    check_btn_div.className='col-auto m-1 p-0 d-flex align-items-center';

    let check_btn_h2 = document.createElement('h2');
    check_btn_h2.className = 'm-0 p-0';
    
    let uncheck_btn = document.createElement('i');
    uncheck_btn.className = 'fa fa-square-o text-primary btn m-0 p-0';

    let check_btn = document.createElement('i');
    check_btn.className = 'fa fa-check-square-o text-primary btn m-0 p-0 d-none';

    uncheck_btn.onclick = function() {
        uncheck_btn.className += ' d-none';
        check_btn.classList.remove('d-none');
    }

    check_btn.onclick = function() {
        check_btn.className += ' d-none';
        uncheck_btn.classList.remove('d-none');
    }

    check_btn_h2.appendChild(uncheck_btn);
    check_btn_h2.appendChild(check_btn);

    check_btn_div.appendChild(check_btn_h2);

    row.appendChild(check_btn_div);
}

function createTodoText(row) {
    let todo_text_div = document.createElement('div');
    todo_text_div.className='col px-1 m-1 d-flex align-items-center';

    let todo_text_input = document.createElement('input');
    todo_text_input.type = 'text';
    todo_text_input.className = 'form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3';
    todo_text_input.readOnly = true;
    todo_text_input.value = document.querySelector('input').value;
    
    let todo_text_edit = document.createElement('input');
    todo_text_edit.type = 'text';
    todo_text_edit.className = 'form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none';
    todo_text_edit.value = document.querySelector('input').value;

    todo_text_div.appendChild(todo_text_input);
    todo_text_div.appendChild(todo_text_edit);
    
    row.appendChild(todo_text_div);
}

function createDeadline(row) {
    let div = document.createElement('div');
    div.className='col-auto m-1 p-0 px-3';

    let end_date_row = document.createElement('div');
    end_date_row.className = 'row'

    let end_date_div = document.createElement('div');
    end_date_div.className = 'col-auto d-flex align-items-center rounded bg-white border border-warning';

    let hourglass_icon = document.createElement('i');
    hourglass_icon.className = 'fa fa-hourglass-2 my-2 px-2 text-warning btn';

    let end_date_h6 = document.createElement('h6');
    end_date_h6.className = 'text my-2 pr-2';
    end_date_h6.innerHTML = document.querySelector('#calendar').innerHTML;

    end_date_div.appendChild(hourglass_icon);
    end_date_div.appendChild(end_date_h6);

    end_date_row.appendChild(end_date_div);

    div.appendChild(end_date_row);

    row.appendChild(div);
}

function createTodoActions(row, i) {
    let div = document.createElement('div');
    div.className='col-auto m-1 p-0 todo-actions';

    let icons_div = document.createElement('div');
    icons_div.className = 'row d-flex align-items-center justify-content-end';
    
    let edit_icon_h5 = document.createElement('h5');
    edit_icon_h5.className = 'm-0 p-0 px-2';

    let edit_icon = document.createElement('i');
    edit_icon.className = 'fa fa-pencil text-info btn m-0 p-0';

    edit_icon.onclick = function() {
        edit_icon.className += ' d-none';
        edit(i);
    }

    edit_icon_h5.appendChild(edit_icon);

    let delete_icon_h5 = document.createElement('h5');
    delete_icon_h5.className = 'm-0 p-0 px-2';

    let delete_icon = document.createElement('i');
    delete_icon.className = 'fa fa-trash-o text-danger btn m-0 p-0';

    delete_icon.onclick = function() {
        document.querySelector('#todo' + i).remove();
    }

    delete_icon_h5.appendChild(delete_icon);

    icons_div.appendChild(edit_icon_h5);
    icons_div.appendChild(delete_icon_h5);

    let create_info_div = document.createElement('div');
    create_info_div.className = 'row todo-created-info';
    
    let create_info_items_div = document.createElement('div');
    create_info_items_div.className = 'col-auto d-flex align-items-center pr-2';

    let create_info_icon = document.createElement('i');
    create_info_icon.className = 'fa fa-info-circle my-2 px-2 text-black-50 btn';

    let create_info_date = document.createElement('label');
    create_info_date.className = 'date-label my-2 text-black-50';

    let date = new Date();
    create_info_date.innerHTML = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    create_info_items_div.appendChild(create_info_icon);
    create_info_items_div.appendChild(create_info_date);

    create_info_div.appendChild(create_info_items_div);

    div.appendChild(icons_div);
    div.appendChild(create_info_div);

    row.appendChild(div);
}

function edit(i) {
    let div = document.querySelector('#todo' + i);

    let todo_text_div = div.childNodes[1];

    let todo_text_input = todo_text_div.childNodes[0];
    let todo_text_edit = todo_text_div.childNodes[1];

    todo_text_input.className += ' d-none';
    todo_text_edit.classList.remove('d-none');

    todo_text_edit.onkeypress = function() {
        if (event.keyCode == 13) {
            todo_text_input.value = todo_text_edit.value;
            
            todo_text_input.classList.remove('d-none');
            todo_text_edit.className += ' d-none';

            div.childNodes[3].firstChild.firstChild.firstChild.classList.remove('d-none');
        }
    }
}

/* 글 추가 기능 및 수정 */
function additional(text, n, id, spot)
{
    /* 입력한 값 SPAN 태그로 추가하기*/
    var node = document.createElement('SPAN');
    var textnode = document.createTextNode(text);
    node.id = id + n;
    node.appendChild(textnode);
    document.getElementById(spot).appendChild(node);

    node.onclick = function(){
        modify(node.id);
    }
    document.getElementById('input').value = '';
}

/* 완료 버튼 생성 */
function doneBotton(n)
{
    var check_btn_div = document.createElement('BUTTON');
    check_btn_div.id = 'done' + n;
    check_btn_div.className='fas fa-check';
    document.getElementById('list').appendChild(check_btn_div);

    check_btn_div.onclick = function(){
        done(n);
    };
}

/* To do list의 목록들 완료 처리 */
function done(n)
{
    var value = document.getElementById('node' + n).innerHTML;
    
    additional(value, n, 'node_d', 'done');
        
    /* Done list 삭제 버튼 */
    var remove_btn = document.createElement('BUTTON');
    remove_btn.id = 'bnt' + n;
    remove_btn.className='fas fa-minus';
    document.getElementById('done').appendChild(remove_btn);

    remove_btn.onclick = function(){
        remove_d('node_d' + n, remove_btn.id, 'br_d' + n);
    };

    Next(n, 'br_d', 'done');
    remove(n);
}

/* To do list 목록의 삭제 버튼 */
function removeButton(n)
{
    var remove_btn = document.createElement('BUTTON');
    remove_btn.id = n;
    remove_btn.className='fas fa-minus';
    remove_btn.onclick = function(){
        remove(remove_btn.id);
    };
    document.getElementById('list').appendChild(remove_btn);
}

/* To do list에 있는 글과 버튼 삭제 */
function remove(n)
{
    var arr = ['node', 'br', 'done', ''];

    for(var i = 0; i < 4; i++)
    {
        var b = document.getElementById(arr[i] + n);
        b.style.display = 'none';
    }
}

/* 글 수정 */
function modify(spot)
{
    var value = prompt('Modify', 'What is your list?');
    
    /* 수정하는 글에 어떠한 내용도 넣지않는다면 기존의 글 유지 */
    if(value)
    {
        document.getElementById(spot).innerHTML = value;
    }
}

/* Done list 목록에 있는 글과 버튼 삭제 */
function remove_d(node, bnt, br)
{
    var arr = [node, bnt, br];

    for(var i = 0; i < 3; i++)
    {
        var a = document.getElementById(arr[i]);
        a.style.display = 'none';
    }
}

/* br 태그 생성 */
function Next(n, id, spot)
{
    var br = document.createElement('BR');
    br.id= id + n;
    document.getElementById(spot).appendChild(br);
}