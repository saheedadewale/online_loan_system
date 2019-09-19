$(document).ready(function(){
  $('.loginWrapper').hide()
    //hide login form
    $('.loginLink').click(function(event){
        event.preventDefault();
       $('.signupWrapper').hide();
       $('.loginWrapper').fadeIn();
    });

    $('.signuplink').click(function(event){
      event.preventDefault();
     $('.signupWrapper').fadeIn();
     $('.loginWrapper').hide();
  });

    $('#createAcct').click(function(event){
        event.preventDefault();
        const surname = $('#surname').val();
        const othername = $('#othername').val();
        const email = $('#email').val();
        const phoneno = $('#phoneno').val();
        const bvn = $('#bvn').val();
        //prevent epty input
      if(!surname || !othername|| !email || !phoneno || !bvn){
          $('.msg').html('Kindly fill all the required fields');
          return false;
      }else{
        $('.msg').html(''); 
      }

        //Make get request to the endpoint, to check if user already exist
    $.ajax({
        method: 'GET',
        url: `http://localhost:3004/userstable?email=${email}`,
        data: {
          email,
        },
        // beforeSend: function() {
        //   $('.regMessage').html('Please Waite While Loading...');
        // },
        success: function(response) {
          if (response.length) {
            $('.regMessage').html('User already exist');
          } else {
            //Submit the usertable
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
                $('.regMessage').html('Please Waite While Loading...');
              },
              success: function() {
                $('.regMessage').html('Account Created Successfull');
              },
            });
          }
        },
      });
    });

    //Login Function
  $('#login').click(function(event) {
    event.preventDefault();
    const emailLog = $('#emailLog').val();
    const phonenoLog = $('#phonenoLog').val();
    if (!emailLog || !phonenoLog) {
      $('.errLogin').html('Kindly fill in all fields');
      return;
    }
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3004/userstable?email=${emailLog}&phoneno=${phonenoLog}`,
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
          localStorage.setItem('email', emailLog);
          //redirect to home page if the login is successfull
          window.location.assign('dashboard.html');
        } else {
          $('.loginSuccess').html('Invalid Login Parameters');
        }
      },
    });
  });

});