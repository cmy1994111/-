// 扫码 账号登陆  封装选项卡构造函数 es6语法
class xxk {
  constructor(titlesel, bodysel) {
    this.titlesel = titlesel;
    this.bodysel = bodysel;
    this.title = $(this.titlesel + " li");
    this.body = $(this.bodysel + " > li");
    this.btnLiShow();
  }
  btnLiShow() {
    for (let a = 0; a < this.title.length; a++) {
      this.title[a].onclick = function () {
        this.showLiShow(a);
      }.bind(this)
    }
  }
  showLiShow(num) {
    for (let b = 0; b < this.body.length; b++) {
      this.body[b].style.display = 'none';
    }
    this.body[num].style.display = 'block';
  }
}
new xxk(".login-t", ".login-m-ul");

// 清空文本框内容
$(".clear-btn").click(function () {
  let ipt = $(this).prev();
  ipt.val("");
});

// 登陆按钮
$(".btn-login").click(function () {
  let username = $(".username-ipt").val();
  let password = $(".password-ipt").val();
  if (username != "" && password != "") {
    $.post("http://47.104.244.134:8080/userlogin.do",
      {
        name: username,
        password: password
      }
    ).done(function (data) {
      if (data.code == 0) {
        console.log(data);
        console.log("登陆成功");
        $(location).attr('href', '../html/index.html');
      } else if (data.code == 1) {
        $(".error-msg").css({ "visibility": "visible" });
        $(".error-msg span").text("用户名或密码错误");
      }
    });
  } else {
    $(".error-msg").css({ "visibility": "visible" });
    $(".error-msg span").text("用户名或密码均不能为空");
  }
});