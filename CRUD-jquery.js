$(function(){ 
var $nameInput = $(".js-name");
var $emailInput = $(".js-email");
var $saveBtn = $(".js-save");

function User(name, email) {
  this.email = typeof email === 'string' ? email: '';

  var emailRegEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  this.setName = function (newName) {
    this.name = typeof newName === 'string' ? newName : '';
  };

  this.setEmail = function (newEmail) {
    this.email = typeof newEmail === 'string' ? newEmail : '';
  };

  this.isValidEmail = function () {
    return emailRegEx.test(this.email);
  };

  this.isValidName = function () {
    return $nameInput.value.length >= 3;
  };

  this.isValidUser = function () {
    return this.isValidEmail() && this.isValidName();
  };

  this.getUser = function () {
    return {
      name: this.name,
      email: this.email,
    };
  };

  this.setName(name);
  this.setEmail(email);
}

function saveForm() {
  var user = new User($nameInput.val(), $emailInput.val());

  $nameInput.toggle("validation-error", !user.isValidName);
  $emailInput.toggle("validation-error", !user.isValidEmail);

  if (user.isValidUser()) {
    var list = getUserList();

    if ($saveBtn.data("index")) {
      list[$saveBtn.data("index")] = user.getUser();

      $saveBtn.data("index", "");
    } else {
      list.push(user.getUser());
    }

    localStorage.userList = JSON.stringify(list);

    $nameInput.val = ('');
    $emailInput.val = ('');

    renderTable();
  }

}

function getUserList() {
  try {
    var list = JSON.parse(localStorage.userList);
  } catch {
    var list = [];
  }

  return list;
}

$saveBtn.on("click", function () {
  saveForm();
});

$("input").on("keypress", function(event) {
  if (event.keyCode === 13) {
    saveForm();
  }
});

function renderTable() {
  var list = getUserList();

  var $userTableContent = $('.js-user-table');

  if (list.length === 0) {
    $(".js-user-table-wrapper").hide()

  
  }

  list.forEach(function (user, index) {
    var userInstance = new User(user.name, user.email);
    var $row = $(
      $('.js-row-template').html()
  )

  $row.find('.js-index').text(index + 1)
  $row.find('.js-name').text(userInstance.name)
  $row.find('.js-email').text(userInstance.email)
  $row.find('.js-edit, .js-delete').data('index', index)

  $('.js-user-table').append($row)
})


    //   `<tr>
    //     <td>` +
    //   (index + 1) +
    //   `</td>
    //   <td>` +
    //   userInstance.name +
    //   `</td>
    //   <td>` +
    //   userInstance.email +
    //   `</td>
    //     <td>
    //     <button class="js-edit"
    //             data-index="` +
    //   index +
    //   `">
    //              Edit 
    //     </button>
    //     <button class='js-delete' 
    //             data-index="` +
    //   index +
    //   `"> 
    //             Delete 
    //     </button>  
    //     </td>
    // </tr>`;

  //   tableContent = tableContent + row;
  // });

  // document.querySelector('.js-user-table').innerHTML = tableContent;

  // document
  //   .querySelectorAll(".js-user-table .js-delete")
  //   .forEach(function (button) {
  //     button.addEventListener("click", function () {
  //       var list = getUserList();

  //       list.splice(button.dataset.index, 1);

  //       localStorage.userList = JSON.stringify(list);
  //       renderTable();
  //     });
  //   });
  // document
  //   .querySelectorAll(".js-user-table .js-edit")
  //   .forEach(function (button) {
  //     button.addEventListener("click", function () {
  //       var list = getUserList();
  //       var user = list[button.dataset.index];

  //       var userInstance = new User();
  //       userInstance.setEmail(user.email);
  //       userInstance.setName(user.name);

  //       $nameInput.val('')
  //       $emailInput.val('')

  //       $saveBtn.data("index", button.dataset.index);
      // });
    // }
    // );
}
renderTable();
})