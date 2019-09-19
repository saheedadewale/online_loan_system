$(document).ready(function(){
$('.loginWrapper').hide();

$('.loginLink').click(function(e){
    e.preventDefault();
    $('.loginWrapper').fadeIn();
    $('.signupWrapper').hide();
})

$('.signuplink').click(function(e){
    e.preventDefault();
    $('.loginWrapper').hide();
    $('.signupWrapper').fadeIn();
})

//create account
$('#createAcct').click(function(e){
    event.preventDefault();
    const surname = $('#surname').val();
    const othername = $('#othername').val();
    const email = $('#email').val();
    const phoneno = $('#phoneno').val();
    const bvn = $('#bvn').val();
    //Check if user input is empty
    if (!surname || !othername || !email || !phoneno || !bvn) {
      $('.msg').html('Kindly fill in all fields');
      return;
    }
    //Make get request to check if the user already exist
    $.ajax({
      method: 'GET',
      url: `http://localhost:3004/userstable?email=${email}`,
      data: {
        email,
      },
      beforeSend: function() {
        $('.regMessage').html('Loading....');
      },
      success: function(response) {
        if (response.length) {
          $('.regMessage').html('User already exist');
        } else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3004/userstable',
            data: {
              surname,
              othername,
              email,
              phoneno,
              bvn,
            },
            beforeSend: function() {
              $('.regMessage').html('Loading....');
            },
            success: function() {
              $('.regMessage').html('Account Created Successfull');
            },
          });
        }
      },
    });
    
})

//login function
$('#login').click(function(event) {
    event.preventDefault();
    const emailLog = $('#emailLog').val();
    const phonenoLog = $('#phonenoLog').val();
    if (!emailLog || !phonenoLog) {
      $('.errLogin').html('You have not input your login details');
      return;
    }
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3004/userstable?email=${emailLog}&password=${phonenoLog}`,
      data: {
        email: emailLog,
        phoneno: phonenoLog,
      },
      beforeSend: function() {
        $('.loginSuccess').html('Loading....');
      },
      success: function(response) {
        if (response.length) {
          $('.loginSuccess').html('Login sucessful');
         // $('.checkLogin').html('You are logged in');
          localStorage.setItem('email', emailLogin);
          //redirect to home page if the login is successfull
          window.location.assign('dashboard.html');
        } else {
          $('.loginSuccess').html('Invalid Login Parameters');
        }
      },
    });
  });
});

