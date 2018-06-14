var categories = {
  BASE_URL: "http://staging.nairabox.com/foodhub/",
  init: function () {
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0","closeButton": true};
    categories.checkLogin();
  },


  checkLogin: function () {
    console.log("Nav to dashboard page");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log(isLoggedIn);

    if (isLoggedIn !== "true") {
      window.location.href = "../../pages/login/login.html";
      console.log("Not Logged In");
    } else {
      console.log("logged In");
      categories.getAllCategories();


    }
  },

  getAllCategories: function () {
    $("#preloaderNav").show();


    $("#categoriesTable").html("");
    console.log("Getting all categories");
    $.ajax({
      url: categories.BASE_URL + "categories/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (cat) {
      $("#preloaderNav").hide();

      console.log(cat);
      console.log(cat.message);
      console.log(cat.message.length);

var data = cat.message;

      $('#pagination-container').pagination({
        dataSource: cat.message,
        pageSize: 5,
        showPrevious: false,
        showNext: false,
        callback: function (data, pagination) {
          var dataLength = data.length;
          var html = simpleTemplating(data, dataLength);
          $('#categoriesTable').html("");
          $('#categoriesTable').append(html);
        }
      })

      function simpleTemplating(data, dataLength) {
        //var html = '<tr>';
        var html = '';

        for (var i = 0; i < dataLength; i++) {
          console.log(cat);

          html += "<tr>"
          + "<td><img src='" + data[i].image + "' style='width: 70px;margin-left: 32px'></td>"
          + "<td class='table_cell_link pointer' onclick='categories.openModalCategoryDetails(\"" + data[i].category + "\", \"" + i + "\",\"" + data[i]._id + "\")'>" + data[i].category + "</td>"
          + "<td>" + data[i].description + "</td>"
          + "<td><button class='btn_table' onclick='categories.openModalEditCategoryDetails(\"" + data[i]._id + "\",\"" + data[i].category + "\",\"" + data[i].description + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
          + "<td><button class='btn_table' onclick='categories.deleteCategory(\"" + data[i]._id + "\",\"" + data[i].category + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
          + "</tr>"
        }

        return html;
      }


      console.log(cat);
      console.log("Category Partner Name");

      // for (var i = 0; i < cat.message.length; i++) {
      //
      //   categories.allMenu = cat.message;
      //
      //   $("#categoriesTable").append("<tr>"
      //   + "<td><img src='" + cat.message[i].image + "' style='width: 70px;margin-left: 32px'></td>"
      //   + "<td class='table_cell_link pointer' onclick='categories.openModalCategoryDetails(\"" + cat.message[i].category + "\", \"" + i + "\",\"" + cat.message[i]._id + "\")'>" + cat.message[i].category + "</td>"
      //   + "<td>" + cat.message[i].description + "</td>"
      //   + "<td><button class='btn_table' onclick='categories.openModalEditCategoryDetails(\"" + cat.message[i]._id + "\",\"" + cat.message[i].category + "\",\"" + cat.message[i].description + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
      //   + "<td><button class='btn_table' onclick='categories.deleteCategory(\"" + cat.message[i]._id + "\",\"" + cat.message[i].category + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
      //   + "</tr>");
      // }

    });
  },


  openModalCategoryDetails: function (category, partnerIndex, categoryID) {
    var partnersArray = categories.allMenu[partnerIndex];


    console.log(category);

    console.log(partnersArray);
    $("#bundleCategoriesTable").html("");

    var bundleDetailsTemplate = "<div id='modalBundleDetails'>"
    + "<div class='multiList'><strong>Category</strong><p>" + category + "</p></div>"
    + "<div><strong>Partners</strong><table class='table table-striped'>" +
    "<thead>" +
    "<tr>" +
    "<th>Partner</th>" +
    "<th>State</th>" +
    "<th>City</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody id='bundleCategoriesTable'>" +
    "</tbody>" +
    "</table></div></div>";

    alertify.alert('Category Details', bundleDetailsTemplate).set({transition: 'zoom', label: ' OK '}).show();
    for (var i = 0; i < partnersArray.partners.length; i++) {
      var one = partnersArray.partners[i];
      categories.allPartnersID = partnersArray.partner_id;

      $("#bundleCategoriesTable").append("<tr>"
      + "<td>" + one.name + "</td>"
      + "<td>" + one.state + "</td>"
      + "<td>" + one.city + "</td>"
      + "<td><button class='btn_table' onclick='categories.deletePartnerFromCategory(\"" + categoryID + "\",\"" + i + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
      + "</tr>");
    }

  },

  openModalEditCategoryDetails: function (categoryID, category, description) {
    $("#preloaderNav").show();

    console.log("Edit Modal Clicked");
    console.log(category);
    console.log(description);
    //  console.log(categoryID);
    //
    // $.ajax({
    //     url: categories.BASE_URL + "category?category_id=" + categoryID,
    //     type: "GET",
    //     crossDomain: true,
    //     contentType: "application/json"
    //
    // }).done(function (category) {
    //     $("#preloaderNav").hide();
    //
    //     console.log("One Category Detail")
    //     console.log(category.message.partners.length);
    //     $("#categoriesPartnersTable").html("");
    //
    //
    //
    //
    // });

    var RegionEditDetaillsTemplate = "<div>"
    + "<div class='verticalInput'><strong>Category :  </strong><input id='modalCategoryInputCategory' type='text' value='" + category + "'></div>"
    + "<div class='verticalInput'><strong>Description :  </strong><textarea id='modalCategoryCategoryDescription' type='text'>" + description + "</textarea></div>"
    + "</div>";


    alertify.confirm('Edit Category', RegionEditDetaillsTemplate,
    function () {
      console.log("Category Modal ok clicked");
      categories.validateInput(categoryID);
    },
    function () {

    }
  ).set({transition: 'zoom', labels: {ok:'UPDATE', cancel: 'CANCEL'}}).show();

},

updateCategory: function (categoryID, category, description) {
  //  $("#preloaderNav").show();

  //  var updateCategory = $("#modalCategoryInputCategory").val();

  var categoryData = {category_id: categoryID, category: category, description:description};
  $.ajax({
    url: categories.BASE_URL + "category/update",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(categoryData),
    contentType: "application/json"
  }).done(function (category) {
    $("#preloaderNav").hide();

    console.log("Value Updated");
    categories.getAllCategories();

    if (category.error_code === 1) {
      toastr.error(category.message);
    } else {
      toastr.success(category.message);
    }
  });

},
deleteCategory: function (categoryID, category) {


  var deleteCategoryData = {category_id: categoryID};

  var deleteCategoryTemplate = "<div>"
  + "<h6 style='margin-bottom: 32px'>Are you sure you want to delete this ?</h6>"
  + "<div style='display: flex; flex-direction: column'>"
  + "<h6>Category </h6>"
  + "<p>" + category + "</p>"
  + "</div>"
  + "</div>";


  alertify.confirm("Conform delete action", deleteCategoryTemplate,
  function () {
    $("#preloaderNav").show();

    $.ajax({
      url: categories.BASE_URL + "category/delete",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(deleteCategoryData),
      contentType: "application/json"
    }).done(function (category) {
      $("#preloaderNav").hide();

      console.log("Value Deleted");
      categories.getAllCategories();
      if (category.error_code === 1) {
        toastr.error(category.message);
      } else {
        toastr.success(category.message);
      }
    });
  },
  function () {
  }).set({transition: 'zoom', labels: {ok:'DELETE', cancel: 'CANCEL'}}).show();

},

deletePartnerFromCategory: function (categoryID, partnerIndex) {


  var partnerID = categories.allPartnersID[partnerIndex];

  console.log("Partner ID");
  console.log(partnerID);

  console.log("Category ID");
  console.log(categoryID);

  //
  $("#preloaderNav").show();

  var deletePartnerFromCategoryData = {partner_id: partnerID, category_id: categoryID};


  $.ajax({
    url: categories.BASE_URL + "category/del/partner",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(deletePartnerFromCategoryData),
    contentType: "application/json"
  }).done(function (message) {
    $("#preloaderNav").hide();

    console.log(message);

    if (message.status === 200) {
      toastr.success(message.message);
      window.location.href = "../../pages/category/categories.html";
    } else {
      toastr.error(message.message);
    }

  })
},

validateInput: function (categoryID) {
  var category = $("#modalCategoryInputCategory").val();
  var description = $("#modalCategoryCategoryDescription").val();

  if( description === ""){
    $("#modalCategoryCategoryDescription").addClass("error_input");
  }else {
    $("#modalCategoryCategoryDescription").removeClass("error_input");
  }

  if (category === "") {
    $("#modalCategoryInputCategory").addClass("error_input");
  } else {
    $("#modalCategoryInputCategory").removeClass("error_input");
  }

  if( description !== "" && category !== ""){
    categories.updateCategory(categoryID, category, description);
  }else {
    toastr.warning("Invalid Input Values");
  }
}

}

categories.init();
