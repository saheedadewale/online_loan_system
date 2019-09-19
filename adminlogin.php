<!DOCTYPE html>
<html>
<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Admin-Online Loan Application </title>
<!--bootstrap cdn link -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">	
<link rel="stylesheet" href="css/style.css">
<style>
 
    .jumbotronFooter{
      height: 100px;
      background-color: black;
      padding: 20px;
      margin-bottom: 0px;
      border-radius: 0px;
        }
    .container{
        margin-top: 10px;
    }
    html,body{
        color: orange;
    }
    .loginLink a{
        color: orange;
        font-weight: bold;   
    }
    .loginLink a:hover{
        color: grey;
        font-weight: bold;   
    }
    .btn{
        background-color: orange;
        border:none;
    }
    .btn:hover{
        background-color: lightsalmon;
        border:none;
    }
    .btn:active{
        background-color: lightsalmon;
        border:none;
    }
    .lock{
        padding-top:30px;
    }
    .logTitle{
        color: grey;
        font-size: 20px;
        font-weight: bold;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    /* .main-content{
background-image: url('images/bg1.jpg');
background-size: cover;
content: "";
display: block;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -2;
opacity: 0.4;
}
    } */

</style>
</head>
<body>
<!-- navbar -->
<nav class="homeNav">
   <span class="logo">Online Loan System</span>
        <ul>
          <a href="index.html"><li>Home</li></a>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav><!--end nav-->
<!--main content -->
<main class="main-content">    
    <div class="container">
       <div class="row">
           <div class="col-lg-2">
                
           </div>
           <div class="col-lg-6 text-center">
               
                <!--begin login -->
               <div class="adminLogin">
                   <div class="row">
                       <div class="col-lg-5 col-md-5 col-sm-12 text-right lock">
                           <img src="images/lock.jpg">
                       </div>
                       <div class="col-lg-7 col-md-7 col-sm-12">
                            <p class="logTitle">Admin Login</p>
                            
                            <p class="errLogin" style="background-color:red; color:whitesmoke"></p>
                             <div class="form-group">
                                     <input type="text" name="username" id="username" class="form-control" placeholder="Username">
                                 </div>
                                 <div class="form-group">
                                     <input type="password" name="password" id="password" class="form-control" placeholder="Password">
                                 </div>
                                 <p class="loginSuccess" style="background-color:lightgreen; color:#fff"></p>
                         <div class="form-group text-left">
                             
                             <button class="btn btn-success btn-block" id="login">Login </button> 
                             
                             
                         </div>
                       </div>
                   </div>
               </div>
                <!--end Login -->

           </div>
           <div class="col-lg-3">
               
           </div>
       </div>
    </div>
</main><!--end main content --><!--footer -->
<footer> 
    <div class="jumbotron jumbotronFooter">
        <div class="container">
            <div class="row">                
                <div class="col-lg-4">
                </div>
            </div>
           <p class="text-center" style="color:#fff"> &copy; 2019 Decagon Software Institute</p>
        </div>
            
    </div>
</footer><!--end footer -->
<!--adding jQuery -->
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/formprocess.js"></script>

</body>
</html>