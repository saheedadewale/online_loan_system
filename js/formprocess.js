$(document).ready(function(){
    
    $('#createAcct').click(function(){
        const surname = $('#surname').val();
        const othername = $('#othername').val();
        const email = $('#email').val();
        const phoneno = $('#phoneno').val();
        const bvn = $('#bvn').val();
        //prevent epty input
      if(!surname || !othername|| !email || !phoneno || !bvn){
          $('.msg').html('Kindly fill all the required fields');
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
});