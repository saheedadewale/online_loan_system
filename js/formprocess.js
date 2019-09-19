//console.log(window.localStorage.getItem('email'));

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
//fetch data 
function getUserData(e){
    e.preventDefault();
    $.ajax({
        method: 'GET',
        url: '',
        success: function(data){
            let list = ''
            $.each(data, function(index, value){
                list +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${value.surname}</td>
                    <td>${i+1}</td>
                    <td>${i+1}</td>
                    <td>${i+1}</td>
                    <td>${i+1}</td>
                </tr>
                `
            })
        }
    })
}

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