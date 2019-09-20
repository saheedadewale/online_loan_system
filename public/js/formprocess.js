$(document).ready(function(){
let user = window.localStorage.getItem('username')
$('.user').html(user)
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

$('.allCustomers').hide();
$('.allLoans').hide();
$('.newAdmin').hide();
$('.myAccount').hide();

$('#adminHome').click(function(e){
    e.preventDefault();
$('.allCustomers').hide();
$('.allLoans').hide();
$('.newAdmin').hide();
$('.myAccount').hide();
$('.welcomes').fadeIn();
})

$('#updateCustomer').click(function(e){
    e.preventDefault();
$('.allCustomers').fadeIn();
$('.allLoans').hide();
$('.newAdmin').hide();
$('.myAccount').hide();
$('.welcomes').hide();
})

$('#allLoans').click(function(e){
    e.preventDefault();
$('.allCustomers').hide();
$('.allLoans').fadeIn();
$('.newAdmin').hide();
$('.myAccount').hide();
$('.welcomes').hide();
})

$('#newAdmin').click(function(e){
    e.preventDefault();
$('.allCustomers').hide();
$('.allLoans').hide();
$('.newAdmin').fadeIn();
$('.myAccount').hide();
$('.welcomes').hide();
})

$('#myAccount').click(function(e){
    e.preventDefault();
$('.allCustomers').hide();
$('.allLoans').hide();
$('.newAdmin').hide();
$('.myAccount').fadeIn();
$('.welcomes').hide();
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
      url: `http://localhost:3000/userstable?email=${email}`,
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
            url: 'http://localhost:3000/userstable',
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
      url: `http://localhost:3000/userstable?email=${emailLog}&phoneno=${phonenoLog}`,
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
        url: `http://localhost:3000/loantable?email=${mail}`,
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
                    <td><button class="btn btn-danger delete" value="${value.id}"><i class="fa fa-trash"></i></button></td>
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
        url: `http://localhost:3000/userstable?email=${email}`,
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
    const status = "Pending"
    isDelete = false;
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
            url : 'http://localhost:3000/loantable',
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
            url : 'http://localhost:3000/profile',
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
//user logout function
$('#logout').click(function(e){
    e.preventDefault()
    localStorage.clear();
   // $('.checkLogin').html('Kindly login');
    window.location.assign('signup.html');
})
//admin logout function
$('#adminLogout').click(function(e){
    e.preventDefault()
    localStorage.clear();
   // $('.checkLogin').html('Kindly login');
    window.location.assign('adminlogin.html');
})
//delete loan by custometers
$('body').on('click','.delete', function(e){
    e.preventDefault();
   let id = $(this).val()
   //alert(id)
   $.ajax({
    "url": "http://localhost:3000/loantable/" + id,
    "method": "DELETE",
    data:{id},
    beforeSend: function(){
        alert("Deleted?")
    },
    success: function(data){
       alert("Record Deleted Successfully")
    },
    error: function (e) {
        alert("", JSON.stringify(e))
    }
})
})


       $('#adminlogin').click(function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        if (!username || !password) {
          $('.errLogin').html('You have not input your login details');
          return;
        }
        //Check if the user is in the database
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/admin?username=${username}&password=${password}`,
          data: {
            username,
            password,
          },
          beforeSend: function() {
            $('.loginSuccess').html('Loading....');
          },
          success: function(response) {
            if (response.length) {
              $('.loginSuccess').html('Login sucessful');
             // $('.checkLogin').html('You are logged in');
              localStorage.setItem('username', username);
              localStorage.setItem('password', password);
              //redirect to home page if the login is successfull
              window.location.assign('admin_dashboard.html');
            } else {
              $('.loginSuccess').html('Invalid Login Parameters');
            }
          },
        });
      });

      //get all Users
      //fetch data 
function getUser(){
   // let mail = window.localStorage.getItem('email')
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/profile',
        success: function(data){
            let listUser = ''
            $.each(data, function(index, value){
                listUser +=`
                <tr>
                    <td>${index+1}</td>
                    <td>${value.surnames}</td>
                    <td>${value.othernames}</td>
                    <td>${value.emails}</td>
                    <td>${value.phonenos}</td>
                    <td>${value.sexs}</td>
                    <td>${value.dob}</td>
                    <td>${value.employers}</td>
                    <td>${value.banks}</td>
                    <td>${value.accountNo}</td>
                    <td>${value.bvns}</td>
                    <td><button class="btn btn-danger btn-sm deleteUser" value="${value.id}"><i class="fa fa-trash"></i></button> <button class="btn btn-danger btn-sm view" value="${value.id}"><i class="fa fa-eye"></i></button></td>
                </tr>
                 `
            })
           $('#myCustomer').html(listUser) 
        }
    })
}
getUser();
//get all Loans record
function getLoan(){
    // let mail = window.localStorage.getItem('email')
     $.ajax({
         method: 'GET',
         url: 'http://localhost:3000/loantable',
         success: function(data){
             let listLoan = ''
             $.each(data, function(index, value){
                listLoan +=`
                 <tr>
                     <td>${index+1}</td>
                     <td>${value.fullname}</td>
                     <td>${value.phoneno}</td>
                     <td>${value.email}</td>
                     <td>${value.amount}</td>
                     <td>${value.tenor}</td>
                     <td>${value.toDay}</td>
                     <td>${value.status}</td>
                     
                     <td><button class="btn btn-danger btn-sm approve" value="${value.id}"> Approve</button> <button class="btn btn-danger btn-sm deleteLoan" value="${value.id}"><i class="fa fa-trash"></i></button></td>
                 </tr>
                  `
             })
            $('#loans').html(listLoan) 
         }
     })
 }
 getLoan();

 //new Admin
 $('#createAdmin').click(function(e){
    const surnameAdmin = $('#surnameAdmin').val()
    const othernameAdmin = $('#othernameAdmin').val()
    const username = $('#username').val()
    const password = $('#password').val()
    const cpassword = $('#cpassword').val()
     
    //prevent empty submission
    if(!username || !password || !cpassword){
        $('.errMsg').html("You need to enter username and password")
        return
    }else if(password !== cpassword){
        $('.errMsg').html("Password mismatch")
        return
    }
    else{
        //add loan details to db.json
        $.ajax({
            method: 'POST',
            url : 'http://localhost:3000/admin',
            data:{
                surnameAdmin,
                othernameAdmin,
                username,
                password,   
            },
            beforeSend: function(){
                $('.succMessage').html("In Progress....")
            },
            success: function(){
                $('.succMessage').html("You have successfully Create a admin account")
            }
        })
    }
 })

 //change password
 
 $('#updatePassword').click(function(e){
     e.preventDefault();
     let getPass = window.localStorage.getItem('password')
     const oldPassword = $('#oldPassword').val();
     const newPassword = $('#newPassword').val();
     const cNewPassword = $('#cNewPassword').val();

     if(oldPassword !== getPass){
         $('.errPassword').html("Your Old Password not correct");
         return
     }else if(newPassword !== cNewPassword){
        $('.errPassword').html("Password Not Match");
         return
     }else if(!oldPassword || !newPassword || !cNewPassword){
        $('.errPassword').html("You have not enter required fields");
        return
     }
     else{
         //add loan details to db.json
        $.ajax({
            method: 'PATCH',
            url : 'http://localhost:3000/admin/1',
            data:{
                password:newPassword,   
            },
            beforeSend: function(){
                $('.succPassword').html("In Progress....")
            },
            success: function(){
                $('.succPassword').html("You have successfully changed your password")
            }
        })
     }
 })

 //delete customer by admin
$('body').on('click','.deleteUser', function(e){
    e.preventDefault();
   let userid = $(this).val()
   //alert(userid)
   $.ajax({
    "url": "http://localhost:3000/profile/" + userid,
    "method": "DELETE",
    data:{userid},
    beforeSend: function(){
    alert(confirm("Are you sure you wanna delete this record?"))
    },
    success: function(data){
       alert("User Record Deleted Successfully")
    },
    error: function (e) {
        alert("", JSON.stringify(e))
    }
    
})
})

 //delete Loan
 $('body').on('click','.deleteLoan', function(e){
    e.preventDefault();
   let userid = $(this).val()
  // alert(userid)
   $.ajax({
    "url": "http://localhost:3000/loantable/" + userid,
    "method": "DELETE",
    data:{userid},
    beforeSend: function(){
    alert(confirm("Are you sure you wanna delete this record?"))
    },
    success: function(data){
       alert("User Record Deleted Successfully")
    },
    error: function (e) {
        alert("", JSON.stringify(e))
    }  
})
})
//approve loan
$('body').on('click','.approve', function(e){
    e.preventDefault();
    let userid = $(this).val()
    //alert(userid)
    const status = "Approved"
    $.ajax({
        method: 'PATCH',
        url : 'http://localhost:3000/loantable/'+ userid,
        data:{
            status   
        },
        beforeSend: function(){
            alert("Approve in Progress")
        },
        success: function(){
            alert("Approve Successfully!")
        }
    })
  
})
 //view customer by admin  
 $('body').on('click','.view', function(e){
    e.preventDefault();
   let userid = $(this).val()
   //alert(userid)
   $.ajax({
    method: 'GET',
    url: `http://localhost:3000/profile?id=${userid}`,
    success: function(data){
        $.each(data, function(index, value){
       
         $('#getSurname').val(value.surnames)
         $('#getOthername').val(value.othernames)
         $('#getEmail').val(value.emails)
         $('#getPhone').val(value.phonenos)

         $('#getMarital').val(value.marital)
         $('#getSex').val(value.sexs)
         $('#getHomeaddress').val(value.homeaddress)
         $('#getNofchild').val(value.nofchild)
         $('#getNextname').val(value.nextName)
         $('#getRelation').val(value.relation)
         $('#getNextaddress').val(value.nextaddress)
         $('#getNextphone').val(value.nextphone)
         $('#getEmployers').val(value.employers)
         $('#getState').val(value.states)
         $('#getBanks').val(value.banks)
         $('#getAccountno').val(value.accountNo)
         $('#getBvn').val(value.bvns)
        })
    }
})
})
});


