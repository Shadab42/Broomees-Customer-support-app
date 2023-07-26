const URL = "https://broomees.com/api/";
const bookingURL = "https://broomees.com/apibooking/";
const imageUrl = "https://broomees.com/attachments/";
const API_KEY = "e1fae59664eb09955699f7a2b24aba9b";

if (!window.location.href.includes("index.html") && !window.location.href.includes("login.html") ) { 
  if(localStorage.length===0){
      location.href="index.html";    
  }  
}

$(".back-button").click(function() {
  history.back();
});

function logout(){
  localStorage.clear();
  location.href="index.html";
}


function validateEmail(email) {
  var regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexPattern.test(email);
}











// js start for booking page
window.onload = function() {
    // Add a class to trigger animation
    $("#myAnimation").addClass("animation-occure");
  };
  // js end for booking page

  // $('.dropdownSelect').on('click', function() {
  //   $(".five-glob").show();
  //   $(this).siblings().removeClass('active-green');
  //   $(this).addClass('active-green');            
  //   $(this).children('.green-glob').removeClass('d-none');  
  //   $(this).siblings().children('div.green-glob').addClass('d-none');
  // })

              $(document).ready(function() {
                $('#myFInput,#mySInput').on('input', function() {
                $("#mobile-error").hide();
                $("#fullname-error").hide();
              });
            });
               

              $(document).ready(function() {
                $('#myForm2').on('submit', function(e) {
                e.preventDefault();
                var fullname = $('#mySInput').val().trim();
                var mobileNumber = $('#myFInput').val().trim();
                var regexPattern = /^[0-9]{10}$/; // Regular expression for 10-digit mobile number validation
                var isValid = true;


              
                  if (!mobileNumber) {
                    $('#mobile-error').text('Please enter your mobile number');
                    isValid = false;
                  } else if (!regexPattern.test(mobileNumber)) {
                    $('#mobile-error').text('Invalid mobile number');
                    isValid = false;
                  }
              
                  if (isValid) {
                    $('#mobile-error').hide();
                    $("#inner-2").removeClass("d-none")
                      $("#login-4").removeClass("d-none")
                      $("#continue-btn").addClass("d-none")
              
                  } else {
                    $('#mobile-error').show();
              
                  }
        
                  if (!fullname) {
                    $('#fullname-error').text('Please enter your full name');
                    $('#fullname-error').show();
                    isValid = false;
                  } else if (fullname.length < 5) {
                    $('#fullname-error').text('Your name length must be 5 characters');
                    $('#fullname-error').show();
                    $('#check-2').hide();
              
                  
                    isValid = false;
                  }
                  else {
                    $('#fullname-error').text('');
                    $("#check-2").removeClass("d-none");
                    $("#check-2").css("bottom","17px");
                    $('#check-2').show();
                   
                  }
                  
                  if (isValid) {
                    $('#mobile-error').hide();
                    $('#fullname-error').hide();
                    document.getElementById("myForm").submit();
                  }
                });
              });

              


              // for refreshing page

            
           

function showNotifier(msg, via) {
  try{
      navigator.notification.beep(1);
      if (via == 'err') {
          navigator.vibrate(700);
      } else {
          navigator.vibrate(400);
      }    
  }catch(e){
      console.log(e);
  }
  
  if ($(".notifier").length == 0) {
      $('body').append(`<div class="notifier"><figure><img src="images/${via=='err'?'exclamation':'tick-notification'}.svg" alt="right"></figure><p></p></div>`);
  }
  $(".notifier p").text(msg);
  $('.notifier').animate({ top: '5%' }, 600);
  setTimeout(() => {
      $('.notifier').animate({ top: '-20%' }, 600);
  }, 2000);
}

function checkConnection() {
    
  var networkState = navigator.connection.type;
  // console.log(networkState);
  if (networkState == 'none' || networkState == 'unknown') { //||  networkState == undefined
      return false;
  } else {
      return true;
  }

  // return false;
 
}

// name input field validation
$(document).ready(function() {
  $('#name').on('input', function(event) {
    const inputValue = $(this).val();
    const regex = /^[A-Za-z]+$/;
    
    if (!regex.test(inputValue)) {
      $(this).val(inputValue.replace(/[^a-zA-Z\s]/g, ''));
    }
  });
});


function selection_click(){
  $('.dropdownSelect').on('click', function() {
      $(".five-glob").show();
      $(this).siblings().removeClass('active-green');
      $(this).addClass('active-green');            
      $(this).children('.green-glob').removeClass('d-none');  
      $(this).siblings().children('div.green-glob').addClass('d-none');
  })
  }




function showSuccessPop(){
  $("#popup").addClass("show")
  $(".my-popup").css("background","#c7c2c2")
  setTimeout(function() {
  $(".my-popup").css("background","white")
  popup.classList.remove('show');
  $(".my-popup").css("top","100%")
  $(".parent-popUp").css("visibility","hidden")
  $(".detail-add-to-cart").removeClass("d-none")
  $("#edit-booking").removeClass("d-none")
  $("#book-parentbtn").addClass("d-none")
  $(".grayout-sec").css("opacity","1")
  $(".book-parentbtn").prop('disabled', false);
}, 2000)
};

              
              
           
             

  
            
  
           
  
  
  
              
                
                
  
  
  
  