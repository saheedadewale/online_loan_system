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
$('.myloan').hide();
$('.loanApplication').hide();
$('.update').hide();

$('#homeLink').click(function(e){
    e.preventDefault();
    $('.myloan').hide();
    $('.loanApplication').hide();
    $('.update').hide();
    $('.welcome').fadeIn();
})

$('#updateLink').click(function(e){
    e.preventDefault();
    $('.myloan').hide();
    $('.loanApplication').hide();
    $('.update').fadeIn();
    $('.welcome').hide();
})
$('#loanApplink').click(function(e){
    e.preventDefault();
    $('.myloan').hide();
    $('.loanApplication').fadeIn();
    $('.update').hide();
    $('.welcome').hide();
})
$('#myLoanlink').click(function(e){
    e.preventDefault();
    $('.myloan').fadeIn();
    $('.loanApplication').hide();
    $('.update').hide();
    $('.welcome').hide();
})

$('#newLoan').click(function(e){
    e.preventDefault();
    $('.myloan').hide();
    $('.loanApplication').fadeIn();
    $('.update').hide();
    $('.welcome').hide();
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
          localStorage.setItem('email', emailLog);
          //redirect to home page if the login is successfull
          window.location.assign('dashboard.html');
        } else {
          $('.loginSuccess').html('Invalid Login Parameters');
        }
      },
    });
  });

  //console.log(window.localStorage.getItem('email'));


//fetch data 
function getLoan(){
    let mail = window.localStorage.getItem('email')
    $.ajax({
        method: 'GET',
        url: `http://localhost:3004/loantable?email=${mail}`,
        success: function(data){
            let list = ''
            $.each(data, function(index, value){
                list +=`
                <tr>
                    <td>${index+1}</td>
                    <td>${value.fullname}</td>
                    <td>${value.phoneno}</td>
                    <td>${value.email}</td>
                    <td>${value.amount}</td>
                    <td>${value.tenor}</td>
                    <td>${value.toDay}</td>
                    <td>${value.status}</td>
                    <td><button class="btn btn-danger"><i class="fa fa-trash"></i></button></td>
                </tr>
                 `
            })
           $('#myList').html(list) 
        }
    })
}
getLoan();

function loadRec(){
    let email = window.localStorage.getItem('email')
    $.ajax({
        method: 'GET',
        url: `http://localhost:3004/userstable?email=${email}`,
        success: function(data){
            $.each(data, function(index, value){
             $('#fullname').val(value.surname+" "+ value.othername)
             $('#phoneno').val(value.phoneno)

             $('#surnames').val(value.surname)
             $('#othernames').val(value.othername)
             $('#emails').val(value.email)
             $('#phonenos').val(value.phoneno)
             $('#bvns').val(value.bvn)
            })
        }
    })
    
}
loadRec();

$('#apply').click(function(e){
    e.preventDefault();
    const fullname = $('#fullname').val()
    const phoneno = $('#phoneno').val()
    const amount = $('#amount').val()
    const tenor = $('#tenor').val()
    const email = window.localStorage.getItem('email')
    const status = "Not Yet Approve"
    //get current date
    const ddate = new Date()
    const month = ((ddate.getMonth().length+1) === 1)? (ddate.getMonth()+1): '0' +(ddate.getMonth()+1)
    const toDay = ddate.getDate()+"/"+ month +"/"+ddate.getFullYear()

    //prevent empty submission
    if(!amount || !tenor){
        $('.errMsg').html("Hindly fill all the required fields")
        return
    }else{
        //add loan details to db.json
        $.ajax({
            method: 'POST',
            url : 'http://localhost:3004/loantable',
            data:{
                fullname,
                phoneno,
                amount,
                tenor,
                email,
                status,
                toDay,
            },
            beforeSend: function(){
                $('.loanMessage').html("In Progress....")
            },
            success: function(){
                $('.loanMessage').html("You have successfully apply for Loan")
            }
        })
    }

})
$('#update').click(function(e){
    e.preventDefault();
    const surnames = $('#surnames').val()
    const othernames = $('#othernames').val()
    const phonenos = $('#phonenos').val()
    const emails = $('#emails').val()

    const bvns = $('#bvns').val()
    const sexs = $('#sexs').val()
    const dob = $('#dob').val()
    const marital = $('#marital').val()
    const nofchild = $('#nofchild').val()
    const homeaddress = $('#homeaddress').val()
    const nextName = $('#nextName').val()
    const relation = $('#relation').val()
    const nextphone = $('#nextphone').val()
    const nextaddress = $('#nextaddress').val()
    const employers = $('#employers').val()
    const states = $('#states').val()
    const banks = $('#banks').val()
    const accountNo = $('#accountNo').val()
    
    
     //prevent empty submission
     if(!accountNo || !banks || !employers || !surnames || !othernames || !emails){
        $('.errMessage').html("Kindly fill all the required fields")
      
        return
    }else{
        //add loan details to db.json
        $.ajax({
            method: 'POST',
            url : 'http://localhost:3004/profile',
            data:{
                surnames,
                othernames,
                phonenos,
                emails,
                bvns,
                sexs,
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
            beforeSend: function(){
                $('.profileMessage').html("In Progress....")
            },
            success: function(){
                $('.profileMessage').html("You have successfully apply for Loan")
            }
        })
    }
})

$('#logout').click(function(e){
    e.preventDefault()
    localStorage.clear();
   // $('.checkLogin').html('Kindly login');
    window.location.assign('signup.html');
})
});


