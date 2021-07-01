let userTodoList;

window.onload = async function () {
  userTodoList = await axios.get('/userTodoList');
  userTodoList = userTodoList.data;

  $("body").fadeIn('slow');

  bootlint.showLintReportForCurrentDocument([], {
    hasProblems: false,
    problemFree: false
  });

  $('[data-toggle="tooltip"]').tooltip();

  $('.due-date-button').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
    startDate: new Date(),
    orientation: 'bottom right'
  });

  $('.due-date-button').on('click', function (event) {
    $('.due-date-button').datepicker('show').on('changeDate', function (dateChangeEvent) {
      $('.due-date-button').datepicker('hide');
      $('.due-date-label').text(dateChangeEvent.date.getFullYear() + '/' + (dateChangeEvent.date.getMonth() + 1) + '/' + dateChangeEvent.date.getDate());
      
      $('input').eq(0).focus();
    });
  });

  $('#filter').on('change', function() {
    let todo_list = $('#list').children();

    switch (this.value) {
      case 'all':
        todo_list.removeClass('d-none');
        break;

      case 'completed':        
        for (let todo of todo_list) {
          if ($(todo).hasClass('completed')) {
            $(todo).removeClass('d-none');
          } else if (!$(todo).hasClass('d-none')) {
            $(todo).addClass('d-none');
          }
        }
        break;

      case 'active':
        for (let todo of todo_list) {
          if ($(todo).hasClass('active')) {
            $(todo).removeClass('d-none');
          } else if (!$(todo).hasClass('d-none')) {
            $(todo).addClass('d-none');
          }
        }
        break;

      case 'has-due-date':
        for (let todo of todo_list) {
          if ($(todo).hasClass('has-due-date')) {
            $(todo).removeClass('d-none');
          } else if (!$(todo).hasClass('d-none')) {
            $(todo).addClass('d-none');
          }
        }
        break;
    }

    for (let todo of todo_list) {
      createFadeIn(todo);
    }
  });
};

function sortAscendingOrder() {
  let list_div_childNodes = $('#list').children();
    
  let todo_list = new Array();

  for (let list_div_childNode of list_div_childNodes) {
    todo_list.push(list_div_childNode);
  }

  let sort = $('#sort').val();

  if (sort === 'added-date') {
    todo_list.sort(function(a, b) {
      // 현재로는 만든 날짜만 존재할 수 있으니, 향후 구현
    });
  } else {
    todo_list.sort(function(a, b) {
      return ($(a).find('h6').html() === $(b).find('h6').html())
      ? 0
      : ($(a).find('h6').html() < $(b).find('h6').html()) ? -1 : 1;
    });
  }

  let list = $('#list');

  list.children().remove();

  for (let todo of todo_list) {
    list.append(todo);
    createFadeIn(todo);
  }
}

function sortDescendingOrder() {
  let list_div_childNodes = $('#list').children();
  
  let todo_list = new Array();

  for (let list_div_childNode of list_div_childNodes) {
    todo_list.push(list_div_childNode);
  }

  let sort = $('#sort').val();

  if (sort === 'added-date') {
    todo_list.sort(function(a, b) {
      // 현재로는 만든 날짜만 존재할 수 있으니, 향후 구현
    });
  } else {
    todo_list.sort(function(a, b) {
      return ($(a).find('h6').html() === $(b).find('h6').html())
      ? 0
      : ($(a).find('h6').html() > $(b).find('h6').html()) ? -1 : 1;
    });
  }

  let list = $('#list');

  list.children().remove();

  for (let todo of todo_list) {
    list.append(todo);
    createFadeIn(todo);
  }
}

var todo_idx = 0;

function click_event()
{
  if(!$('input').val())
  {
    alert('Please input your list')
  }
  else
  {
    addTodo(todo_idx);
    ++todo_idx;

    $('input').eq(0).val('');
  }
}

function addTodo(todo_idx) {
  let row = document.createElement('div');
  row.id = 'todo' + todo_idx;
  row.className = 'row px-3 align-items-center todo-item rounded active';

  createCheckBtn(row);
  createTodoText(row);
  createDeadline(row);
  createTodoActions(row, todo_idx);

  $('#list').append(row);
  $('#calendar_label').html("Due date not set");

  createFadeIn(row);
}

function createCheckBtn(row) {
  let check_btn_div = document.createElement('div');
  check_btn_div.className='col-auto m-1 p-0 d-flex align-items-center';

  let check_btn_h2 = document.createElement('h2');
  check_btn_h2.className = 'm-0 p-0';
  
  let uncheck_btn = document.createElement('todo_idx');
  uncheck_btn.className = 'fa fa-square-o text-primary btn m-0 p-0';

  let check_btn = document.createElement('todo_idx');
  check_btn.className = 'fa fa-check-square-o text-primary btn m-0 p-0 d-none';

  uncheck_btn.onclick = function() {
    row.classList.remove('active');
    row.className += ' completed';

    uncheck_btn.className += ' d-none';
    check_btn.classList.remove('d-none');
  }

  check_btn.onclick = function() {
    row.classList.remove('completed');
    row.className += ' active';

    check_btn.className += ' d-none';
    uncheck_btn.classList.remove('d-none');
  }

  check_btn_h2.appendChild(uncheck_btn);
  check_btn_h2.appendChild(check_btn);

  check_btn_div.appendChild(check_btn_h2);

  row.appendChild(check_btn_div);
}

function createTodoText(row) {
  let div = document.createElement('div');
  div.className='col px-1 m-1 d-flex align-items-center';

  let input_text = document.createElement('input');
  input_text.type = 'text';
  input_text.className = 'form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3';
  input_text.readOnly = true;
  input_text.value = $('input').val();
  
  let edit_text = document.createElement('input');
  edit_text.type = 'text';
  edit_text.className = 'form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none';
  edit_text.value = $('input').val();

  div.appendChild(input_text);
  div.appendChild(edit_text);
  
  row.appendChild(div);
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
  end_date_h6.innerHTML = $('#calendar_label').html();

  if (end_date_h6.innerHTML != 'Due date not set') {
    row.className += ' has-due-date';
  }

  hourglass_icon.onclick = function() {
    $(hourglass_icon).datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true,
      startDate: new Date(),
      orientation: 'top left'
    });

    changeDate(row, hourglass_icon, end_date_h6);
  };

  end_date_div.appendChild(hourglass_icon);
  end_date_div.appendChild(end_date_h6);

  end_date_row.appendChild(end_date_div);

  div.appendChild(end_date_row);

  row.appendChild(div);
}

function createTodoActions(row, todo_idx) {
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
    edit(todo_idx);
  }

  edit_icon_h5.appendChild(edit_icon);

  let delete_icon_h5 = document.createElement('h5');
  delete_icon_h5.className = 'm-0 p-0 px-2';

  let delete_icon = document.createElement('i');
  delete_icon.className = 'fa fa-trash-o text-danger btn m-0 p-0';

  delete_icon.onclick = function() {
    row.style.opacity = 0;

    setTimeout(function() {
      row.remove();
    }, 1000);
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

function changeDate(row, hourglass_icon, end_date_h6) {
  $(hourglass_icon).datepicker('show').on('changeDate', function (dateChangeEvent) {
    $(hourglass_icon).datepicker('hide');
    $(end_date_h6).text(dateChangeEvent.date.getFullYear() + '/' + (dateChangeEvent.date.getMonth() + 1) + '/' + dateChangeEvent.date.getDate());

    if (!row.classList.contains('has-due-date')) {
      row.className += ' has-due-date';
    }
  });
}

function edit(todo_idx) {
  let div = $('#todo' + todo_idx);

  let todo_text_div = div.children().eq(1);

  let input_text = todo_text_div.children().first();
  let edit_text = todo_text_div.children().last();

  input_text.addClass('d-none');
  edit_text.removeClass('d-none');

  edit_text.on('keypress', function() {
    if (event.keyCode == 13) {
      input_text.val(edit_text.val());
      
      input_text.removeClass('d-none');
      edit_text.addClass('d-none');

      div.find('.fa-pencil').removeClass('d-none');
    }
  });
}

function createFadeIn(row){
  row.style.opacity = 0;
  row.style.transition = "opacity 1s linear";

  setTimeout(function() {
    row.style.opacity = 1;
  }, 0);
}