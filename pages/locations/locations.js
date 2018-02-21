var locations = {

  BASE_URL: "http://staging.nairabox.com/foodhub/",


  init: function () {
    toastr.options = {"positionClass": "toast-bottom-right", "timeOut": "0", "closeButton": true};
    locations.checkLogin();
    //  locations.updateTimepicker();
    locations.IsTimerClicked = false;
  },

  updateTimepicker:function(){
    console.log("update Time picker");

    executed = locations.IsTimerClicked;
    if (!executed) {
      executed = true;
      console.log("logging for true");
    }
    $("#modalLocationCutOffTime").wickedpicker();

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
      locations.getAllLocations();
    }
  },

  getAllLocations: function () {
    $("#preloaderNav").show();

    $("#locationsTable").html("");
    console.log("Getting all locations");
    $.ajax({
      url: locations.BASE_URL + "locations/all",
      type: "GET",
      crossDomain: true,
      contentType: "application/json"
    }).done(function (locations) {
      $("#preloaderNav").hide();

      console.log(locations);
      console.log("Category Partner Name");

      for (var i = 0; i < locations.message.length; i++) {

        $("#locationsTable").append("<tr>"
        + "<td>" + locations.message[i].location + "</td>"
        + "<td>" + locations.message[i].address + "</td>"
       + "<td>" + locations.message[i].cut_off_time + "</td>"
        + "<td>" + locations.message[i].alias_id + "</td>"
        + "<td>" + locations.message[i].country + "</td>"
        + "<td>" + locations.message[i].state + "</td>"
        + "<td>" + locations.message[i].city + "</td>"
        + "<td><button class='btn_table' onclick='locations.openEditLocationsDetailsModal(\"" + locations.message[i]._id + "\",\"" + locations.message[i].location + "\", \"" + locations.message[i].address + "\", \"" + locations.message[i].alias_id + "\", \"" + locations.message[i].cut_off_time + "\")'><i class='icon_green fa fa-pencil' aria-hidden='true'></i></button></td>"
        + "<td><button class='btn_table' onclick='locations.deleteLocation(\"" + locations.message[i]._id + "\",\"" + locations.message[i].location + "\")'><i class='icon_red fa fa-trash-o' aria-hidden='true'></i></button></td>"
        + "</tr>");
      }
    });
  },

  openEditLocationsDetailsModal: function (locationID, location, address, aliasID,cutOffTime) {
    console.log("Edit Modal");
    console.log(locationID);
    console.log(address);
    console.log(aliasID);

    var LocationEditDetaillsTemplate = "<div>"
    + "<div class='verticalInput'><strong>Location :  </strong><input id='modalLocationName' type='text' value='" + location + "'></div>"
    + "<div class='verticalInput'><strong>Address :  </strong><input id='modalLocationAddress' type='text' value='" + address + "'></div>"
    + "<strong>Cut-Off Timer</strong>"
    + "<div class='verticalInput' onclick='locations.updateTimepicker()'><p>Cut-Off Time :  </p><input id='modalLocationCutOffTime' type='text' name='timepicker' class='timepicker' value='" + cutOffTime + "' readonly></div>"
    + "</div>";


    alertify.confirm("Edit Location", LocationEditDetaillsTemplate,
    function () {

      locations.validateInput(locationID);

    }, function () {

    }
  ).set({transition: 'zoom', labels: {ok: 'UPDATE', cancel: 'CANCEL'}}).show();


},
updateLocation: function (locationID) {

  var location = $("#modalLocationName").val();
  var address = $("#modalLocationAddress").val();
  var cutoff = $("#modalLocationCutOffTime").val();


  console.log("Updating Location info");
  console.log(location);
  console.log(address);
  console.log(locationID);

  var updateLocationData = {location_id: locationID, location: location, address: address, cut_off_time:cutoff};

  $.ajax({
    url: locations.BASE_URL + "location/update",
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(updateLocationData),
    contentType: "application/json"
  }).done(function (location) {
    //console.log()
    console.log(location);
    if (location.error_code === 1) {
      toastr.error(location.message);
      //   locations.getAllLocations()
    } else {
      toastr.success(location.message);
    }
  });
},

deleteLocation: function (locationID, location) {
  console.log("Edit Modal Clicked");

  var screensaverDeleteModalTemplate = "<div>"
  + "<h6 style='margin-bottom: 32px'>Are you sure you want to delete this ?</h6>"
  + "<div style='display: flex; flex-direction: column'>"
  + "<h6>Location </h6>"
  + "<p>" + location + "</p>"
  + "</div>"
  + "</div>";

  alertify.confirm("Confirm Delete Action", screensaverDeleteModalTemplate,
  function () {

    $("#preloaderNav").show();

    var locationData = {location_id: locationID};
    $.ajax({
      url: locations.BASE_URL + "location/delete",
      type: "POST",
      crossDomain: true,
      data: JSON.stringify(locationData),
      contentType: "application/json"
    }).done(function (location) {
      $("#preloaderNav").hide();

      console.log("Value Updated");
      console.log(location);
      locations.getAllLocations();

      if (location.error_code === 0) {
        toastr.error(location.message);
      } else {
        toastr.success(location.message);
      }
    });

  }, function () {

  }
).set({transition: 'zoom', labels: {ok: 'DELETE', cancel: 'CANCEL'}}).show();
},

validateInput: function (locationID) {

  var location = $("#modalLocationName").val();
  var address = $("#modalLocationAddress").val();
  var cutoff = $("#modalLocationCutOffTime").val();


  if (location === "") {
    $("#modalLocationName").addClass("error_input");
  } else {
    $("#modalLocationName").removeClass("error_input");
  }

  if (address === "") {
    $("#modalLocationAddress").addClass("error_input");
  } else {
    $("#modalLocationAddress").removeClass("error_input");
  }

  if (cutoff === "") {
    $("#modalLocationCutOffTime").addClass("error_input");
  } else {
    $("#modalLocationCutOffTime").removeClass("error_input");
  }

  if (location !== "" && address !== "" && cutoff !== "") {
    console.log("All Data Correct");
    locations.updateLocation(locationID);
    locations.getAllLocations();

  } else {
    toastr.warning("Invalid Input Value");
  }

},

}

locations.init();


//JQUERY
// $( document ).ready(function() {
//     console.log( "ready!" );
//     $("#modalLocationCutOffTime").timepicker();
//
// });
