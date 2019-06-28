$("#login").click(function () {
let username = $("#username").val();
let password = $("#password").val();
if (username != "" && password != "") {
    $.post("http://47.104.244.134:8080/userlogin.do",
      {
        name: username,
        password: password
      }
    ).done(function (data) {
      if (data.code == 0) {
        console.log(data);
        localStorage.setItem("token",data.data.token)
       alert("登陆成功");
    $(location).attr('href', 'index.html');
      }else if(data.code==1){
      	alert("登陆失败")
      }
      })
    }
})
      