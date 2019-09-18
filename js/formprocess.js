$(document).ready(function(){
    //hide login form
    $('.myloan').hide();
    $('.loanApplication').hide();
    $('.update').hide();
    
    $('#homeLink').click(function(e){
      e.preventDefault();
      $('.myloan').hide();
      $('.loanApplication').hide();
      $('.update').hide();
      $('.welcome').fadeIn();
    });

    $('#updateLink').click(function(e){
      e.preventDefault();
      $('.myloan').hide();
      $('.loanApplication').hide();
      $('.update').fadeIn();
      $('.welcome').hide();
    });

    $('#loanApplink').click(function(e){
      e.preventDefault();
      $('.myloan').hide();
      $('.loanApplication').fadeIn();
      $('.update').hide();
      $('.welcome').hide();
    });

    $('#myLoanlink').click(function(e){
      e.preventDefault();
      $('.myloan').fadeIn();
      $('.loanApplication').hide();
      $('.update').hide();
      $('.welcome').hide();
    })

    $('.loginLink').click(function(event){
        event.preventDefault();
       $('.loginFormWrapper').hide();
       $('.loginWrapper').fadeIn();
    });

    //fetching record
    // function getUserDetails(e){
    //  // e.preventDefault();
    //   $.getJSON("http://localhost:3004/profile",function(obj){
    //     let items =[];
    //     $.each(obj, function(key, value){
    //     items.push(value);
    //     }); 
    //   })
    //   console.log(items);
    // }
    // getUserDetails();

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

      //get current date
      let ddate = new Date();
      let month = ((ddate.getMonth().length+1) === 1)? (ddate.getMonth()+1) : '0' + (ddate.getMonth()+1);
      let currentDate = ddate.getDate() + "/" + month + "/" + ddate.getFullYear();

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
            currentDate,
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

    //fetch Application
    function getLoanDetails(){
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3004/loantable',
        success: function(data){
          let myLoan ='';
          $.each(data, function(index, value){
            myLoan +=`
            <tr>
            <td>1</td>
                  <td>${index}</td>
                  <td>${value.lesseramt}</td>
                  <td>${value.currentDate}</td>
                  <td>${value.tenor}</td>
                  <td>${value.status}</td>
                  <td><button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Detele</button></td>
            </tr>
            `;
          });
          $('#myList').html(myLoan);
        }
       
      });
    }
    //involke fetch function
    getLoanDetails();
   function fetchRec(){
     let items = [];
     let mail = "o.adewale17@gmail.com"
     $.ajax({
        method: 'GET',
        url:`http://localhost:3004/userstable?emails=${mail}`,
        success: function(data){
          $.each(data, function(key,value){
           // items.push(value);
           console.log(value)
           //$(`input[name='${key}']`).val(value)
         $('#surnames').val(value.surname)
         $('#othernames').val(value.othername)
         $('#emails').val(value.email)
         $('#phonenos').val(value.phoneno)
         $('#bvns').val(value.bvn)
          })
        }

     });
    //  console.log(items);
   }
   fetchRec();
    
   
   
    //LOAD INFORMATION FROM DB;
    // function userProf(fetch) { 

    //   var cout = new Array();
    //   var nm = new Array();
    //   var live = '';
    //   var strs = 
    //       $.ajax({
    //         url: "check.php",
    //         type: "POST",
    //         data: {fetch:fetch},
    //         success: function (data) { 

    //           if (data) { 
    //             cout = data.split('`>'); 
    //             for (var i= 1; i < cout.length; i++) {
    //               $('.in'+i).val(cout[i]);
    //               $('.p'+i).html(cout[i]);
    //               $('#pack'+i).html(cout[i]);
    //               $('#uploadPic'+i).attr('src',cout[i]);
    //               $('#pac'+i).html(formatCurrency(cout[i]));
    //               $('.count'+i).html(formatCurrency(cout[i]));
    //               if (i==5) {
    //                 live = cout[i];
    //               }if (i == 6) {
    //                 live = live + ", " +cout[i];
    //               }
    //               $('.p56').html(live); 
    //             }
    //           }
    //         }
    //       });
    // }

    
//update profile

$('#update').click(function(e){
e.preventDefault();
const surnames = $('#surnames').val();
const othernames = $('#othernames').val();
const phonenos = $('#phonenos').val();
const emails = $('#emails').val();
const bvns = $('#bvns').val();
const sexs = $('#sexs').val();
const dob = $('#dob').val();
const marital = $('#marital').val();
const nofchild = $('#nofchild').val();
const homeaddress = $('#homeaddress').val();
const nextName = $('#nextName').val();
const relation = $('#relation').val();
const nextphone = $('#nextphone').val();
const nextaddress = $('#nextaddress').val();
const employers = $('#employers').val();
const states = $('#states').val();
const banks = $('#banks').val();
const accountNo = $('#accountNo').val();
//prevent user empty submission
if(!surnames || !othernames || !phonenos || !employers || !accountNo || ! banks){
  alert("Field Left Unsupply");
  return false;
}else{
   //making post request to the loan endpoint
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3004/profile', 
    data: {
      surnames,
      othernames,
      phonenos,
      emails,
      bvns,
      sexs,
      dob,
      marital,
      nofchild,
      homeaddress,
      nextName,
      relation,
      nextphone,
      nextaddress,
      employers,
      states,
      banks,
      accountNo,
    },
    beforeSend: function() {
      $('.profilMessage').html('Please Waite While Loading...');
    },
    success: function() {
      $('.profilMessage').html('Profile Updated Successfully');
    },
  });
}
});
});