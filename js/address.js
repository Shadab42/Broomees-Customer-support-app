let addressId = 0;
//get cities
let citiesData = [];
API_KEY = "AIzaSyBK73HewkhHBVVs9nI98-HY_N7cZM_kdjE";
$.ajax({
    type: 'GET',
    url: URL + "activeDBCities",
    dataType: 'json',
    beforeSend: function(request) {request.setRequestHeader("X-API-KEY", API_KEY);},
    success: function(data, status, xhr) {
        console.log('status: ' + status + ', data: ' + ":" + data + ":");
        if (status == "success") {
            if (data.status) {
                citiesData = data.data;
                let cityData = `<option value="0" selected="selected" disabled>Select City</option>`;
                citiesData.forEach((itemInner, index) => {
                    cityData += `<option data-id="${itemInner.id}" value="${itemInner.name}">${itemInner.name}</option>`;
                });
                // cityData += `<option value="Others">Others</option>`;
                $("#city").html(cityData);
                $('#city').on('change', function() {
                    if ($(this).find(":selected").val() == "Others") {
                        $("#customCityNameContainer").show();
                    } else {
                        $("#customCityNameContainer").hide();
                    }
                });
            }
        } else {
            console.log("ajax failed");
        }
    },
    error: function(xhr, textStatus, errorMessage) {
        // console.log('Error:' + errorMessage + ":::" + xhr.responseJSON.message);
    }
});

function getAddresses() {
    $.ajax({
        type: 'GET',
        url: URL + "addresses",
        data: {
            id: localStorage.getItem("id"), 
        },
        dataType: 'json',
        beforeSend: function(request) {request.setRequestHeader("X-API-KEY", API_KEY);},
        success: function(data, status, xhr) {
            console.log('status: ' + status + ', data: ' + ":" + data + ":");
            if (status == "success") {
                if (data.status) {
                    populateAddress(data.data);
                }
            } else {
                console.log("ajax failed");
            }
        },
        error: function(xhr, textStatus, errorMessage) {
            console.log('Error:' + errorMessage + ":::" + xhr.responseJSON.message);
        }
    });
}

function populateAddress(d) {
    let content = '';
    d.forEach(function(obj, index) {
        content +=
            `<div class="half-address-container mt-30" ${bookingCalled=='booking'?'onclick="selectAddress(this)"':''}>
                <div>
                <address>${formatAddress(obj)}</address> 
                </div> 
                <img src="img/cross.svg" alt="pen" onclick="removeAddress(${obj.id})" class="remove-btn">
                <img src="img/greypen.svg" onclick="prefillAddress(this)" data-json='${cleanJson(JSON.stringify(obj))}' alt="pen" class="edit-btn">
                </div>`;

    });
    if (d.length <= 5) {
        content += `<div class="half-address-container add-details-container">
                        <figure>
                        <img src="img/add.svg" onclick="viewNewAddress()" alt="add">
                        <figcaption>Add new Address</figcaption>
                        </figure>
                      </div>`;
    }
    $("#addressContainer").html(content);

     if(bookingCalled=='booking'){
      if(d.length>0){
        selectAddress($("#addressContainer").find(".half-address-container").eq(0));
      }
    }
}

 function selectAddress(curr){
    $("#newAddress").slideUp();
    $('.half-address-container').removeClass('active');
    $(curr).addClass('active');
    console.log($(curr).find('.edit-btn').attr('data-json'));
    selectedAddress = JSON.parse($(curr).find('.edit-btn').attr('data-json'));
    $("#page-1Err").html("");
  }


function showAddressEdit() {
    $("#addressAdd").show();
}

function hideAddressEdit() {
    $("#addressAdd").hide();
}


function viewNewAddress() {
    selectedAddress ="";
    addressId = 0;
    $("#address").val("");
    $("#pincode").val("");
    $("#city").val("0");
    $("#customCityName").val("");
    $("#customCityNameContainer").hide();
    $('#clickListenerAddNewAddress').attr('onclick', 'addNewAddress()');
    $('#clickListenerAddNewAddress').html("Add");
    $("#newAddress").slideDown();
    $(".half-address-container").removeClass('active');
}

let cancelNewAddress = () => {
    $("#newAddress").slideUp();
    $(".half-address-container").removeClass('active');
};


function addNewAddress() {
    const address = $("#address").val().trim();
    const pincode = $("#pincode").val().trim();
    //const members = $("#members").val().trim();
    //const size = $('#size').find(":selected").val();
    const city = $("#customCityNameContainer").is(':visible') ? $("#customCityName").val().trim() : $('#city').find(":selected").val();
    console.log(city);

    //address validation
    if (address == "") {
        $("#address").addClass('form-error-input');
        $('#addressErr').html("*Address is required");
        return false;
    }

    //address validation
    if (address.length < 10) {
        $("#address").addClass('form-error-input');
        $('#addressErr').html("Address must be 10 characters long");
        return false;
    }

    //Pincode validation
    var pincodeExp = /^\d{6}$/;
    if (!pincodeExp.test(pincode)) {
        $("#pincode").addClass('form-error-input');
        $('#pincodeErr').html("Pin Code is invalid");
        return false;
    }
    //console.log(city+":::"+size);
    if (city == "0") {
        $('#city').find('select').addClass('form-error-input');
        $('#cityErr').html("Please select a city");
        return false;
    }

    if (city == "" || city.length < 3) {
        $('#customCityName').addClass('form-error-input');
        $('#customCityNameErr').html("Please enter a valid city");
        return false;
    }

    // if(size=="0"){
    //   $('#size').find('select').addClass('form-error-input');
    //   $('#sizeErr').html("Please select a house size");
    //   return false;
    // }

    //members validation
    // var membersExp = /^[1-9][0-9]?$|^100$/;
    // if (!membersExp.test(members)) {
    //     $("#members").addClass('form-error-input');
    //     $('#membersErr').html("Members are invalid");
    //     return false;
    // }
    // toggleLoader(1);
    $.ajax({
        type: (addressId == 0 ? 'POST' : 'PUT'),
        url: URL + "addresses",
        data: { address, pincode, city, id: addressId == 0 ? localStorage.getItem("id") : addressId },
        dataType: 'json',
        beforeSend: function(request) {request.setRequestHeader("X-API-KEY", API_KEY);},
        success: function(data, status, xhr) {
            console.log('status: ' + status + ', data: ' + ":" + data + ":");
            if (status == "success") {
                if (data.status) {
                    // toggleLoader(0);
                    showNotifier(data.message);
                    refreshAddressData();
                }
            } else {
                console.log("ajax failed");
            }
        },
        error: function(xhr, textStatus, errorMessage) {
            // toggleLoader(0);
            console.log('Error:' + errorMessage + ":::" + xhr.responseJSON.message);
            $("#address").addClass('form-error-input');
            $('#addressErr').html(xhr.responseJSON.message);
        }
    });
}

function refreshAddressData() {
    cancelNewAddress();
    getAddresses();
}

function removeAddress(id) {
    //event.stopPropagation();
    if (confirm("Are you sure you want to remove this address?")) {
    //   toggleLoader(1);
        $.ajax({
            type: 'DELETE',
            url: URL + "addresses",
            data: { id },
            dataType: 'json',
            beforeSend: function(request) {request.setRequestHeader("X-API-KEY", API_KEY);},
            success: function(data, status, xhr) {
                console.log('status: ' + status + ', data: ' + ":" + data + ":");
                if (status == "success") {
                    if (data.status) {
                        // toggleLoader(0);
                        getAddresses();
                    }
                } else {
                    console.log("ajax failed");
                }
            },
            error: function(xhr, textStatus, errorMessage) {
                // toggleLoader(0);
                console.log('Error:' + errorMessage + ":::" + xhr.responseJSON.message);
            }
        });
    }
}

  function prefillAddress(curr) {
    event.stopPropagation();
      viewNewAddress();
      let json = JSON.parse($(curr).attr('data-json'));
      if($('#city option[value="' + json.city + '"]').length > 0){
        $('#city').val(json.city);
      }else{
        $('#city').val("Others");
        $("#customCityName").val(json.city);
        $("#customCityNameContainer").show();
      }
      //$('#size option[value="' + json.size + '"]').attr("selected", "selected");
      //console.log($('#city').find(":selected").val());
      addressId = json.id;
      $("#address").val(json.address);
      $("#pincode").val(json.pincode);
      //$("#members").val(json.members);
      $('#clickListenerAddNewAddress').html("Update");
      //$('#clickListenerAddNewAddress').attr('onclick', 'updateAddress()');
      $(curr).parents('.half-address-container').addClass('active');
  }


 function updateAddress() {
      addNewAddress();
  }