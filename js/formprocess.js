$(document).ready(function(){
    //hide login form
    $('.loginLink').click(function(event){
        event.preventDefault();
       $('.loginFormWrapper').hide();
       $('.loginWrapper').fadeIn();
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

    //loan Application form process
    $('#apply').click(function(event){
      //getting value from the users
      event.preventDefault();
      const employer = $('#employer').val();
      const state = $('#state').val();
      const bank = $('#bank').val();
      const acctno = $('#acctno').val();
      const netsalary = $('#netsalary').val();
      const eligibleamt = $('#eligibleamt').val();
      const lesseramt = $('#lesseramt').val();
      const tenor = $('#tenor').val();

      //prevent user empty submission
      if(!employer || !bank || !acctno || !netsalary || !eligibleamt || ! tenor){
        alert("Field Left Unsupply");
        return false;
      }else{
         //making post request to the loan endpoint
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3004/loantable', 
          data: {
            employer,
            state,
            bank,
            acctno,
            netsalary,
            eligibleamt,
            lesseramt,
            tenor,
          },
          beforeSend: function() {
            $('.loanMessage').html('Please Waite While Loading...');
          },
          success: function() {
            $('.loanMessage').html('You Have Successfully Apply for loan');
          },
        });
      }
    });
});