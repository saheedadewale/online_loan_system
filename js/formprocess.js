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
      const fullname = $('#fullname').val();
      const amount = $('#amount').val();
      const phoneno = $('#phoneno').val();
      
      const tenor = $('#tenor').val();
      const status = 'Not Yet Approve';

      //get current date
      let ddate = new Date();
      let month = ((ddate.getMonth().length+1) === 1)? (ddate.getMonth()+1) : '0' + (ddate.getMonth()+1);
      let currentDate = ddate.getDate() + "/" + month + "/" + ddate.getFullYear();

      //prevent user empty submission
      if(!amount || ! tenor){
        $('.errMsg').html('Please Fill all the required fields')
        return false;
      }else{
         //making post request to the loan endpoint
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3004/loantable', 
          data: {
            fullname,
            phoneno,
            amount,
            tenor,
            currentDate,
            status,
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
            <td>${index+1}</td>
                  <td>${value.fullname}</td>
                  <td>${value.phoneno}</td>
                  <td>${value.amount}</td>
                  <td>${value.tenor}</td>
                  <td>${value.currentDate}</td>
                  <td>${value.status}</td>
                  <td><button class="btn btn-danger btn-sm" id="deleteBtn"><i class="fa fa-trash"></i> Detele</button></td>
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
         $('#fullname').val(value.surname+" "+ value.othername);
         $('#phoneno').val(value.phoneno);
          })
        }

     });
    //  console.log(items);
   }
   fetchRec();
    
   //Delete Loan
   $('#deleteBtn').click(function(e){
     e.preventDefault();
     alert('Delete Toogled')
   });
//New Loan Button
$('#newLoan').click(function(e){
  e.preventDefault()
  alert('Delete Toogled')
});
    
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