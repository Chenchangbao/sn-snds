<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=9,Edge,chrome=1" />
    <link rel="shortcut icon" type="image/ico" href="https://www.suning.com/favicon.ico">
    <link rel="stylesheet" type="text/css" href="https://ssores.cnsuning.com/res/passport/snds/style/login.css">
    <script src="https://ssores.cnsuning.com/res/passport/snds/jquery-1.8.3.min.js" type="text/javascript"></script>
    <title>苏宁数据库服务系统SNDS</title>
</head>
<body>
    <div style="width:100%;height:340px;background:#4387b3">
        <h1 style="color:white">SNDS 苏宁数据库服务平台</h1>
    </div>
    <div class="row">
        <iframe id="frame" name="frame" src="" style="display:none"></iframe>
        <form id="form" name="form" action="https://oa.cnsuning.com/SuningUUMWeb/AuthenticationServlet" target="frame" method="post">
            <input type="hidden" name="j_username" value="">
            <input type="hidden" name="j_password" value="">
        </form>
        <form class="form" name="login_form" method="post" action="login">
            <input type="hidden" name="uuid" value="${uuid}" />
            <input type="hidden" name="service" value="${(service!'')?html}">
            <input type="hidden" name="loginTheme" value="${loginTheme!""}">
            <div class="control-group">
                <div class="control-icon">
                    <i class="icon1"></i>
                </div>
                <div class="controls">
                    <input type="text" placeholder="请输入用户名" class="text" id="username" name="username" maxlength="8" value="${username!""}" />
                </div>
            </div>
            <div class="control-group">
                <div class="control-icon pad-justice">
                    <i class="icon2"></i>
                </div>
                <div class="controls">
                    <input type="password" placeholder="请输入密码" class="text" id="password" maxlength="20" name="password"/>
                </div>
            </div>
            <div id="verifyCode"></div>
            <div id="error" style="color:red;"></div>
            <div class="control-group border-none mt9">
                <div class="controls">
                    <input type="button" value="登录" class="btn" onclick="submit_form();">
                </div>
            </div>
            <div id="error" style="color:red;">本系统仅支持Chrome52.0版本以上浏览器！</div>
        </form>
    </div>
    <script>
        var errorcode = "${errorCode!""}";
        var errorMessage= "${errorMessage!""}";

        if(errorcode == "badPassword.msg1"){
            errorMessage= errorMessage||"工号或密码不正确，请重新输入！";
            document.getElementById("error").innerHTML = errorMessage;
            document.getElementById("error").style.display = "block";
            document.login_form.username.focus();
        } else if(errorcode != ""){
            document.getElementById("error").innerHTML = errorMessage;
            document.getElementById("error").style.display = "block";
            document.login_form.username.focus();
        }

        document.onkeydown = function(event) {
            var e = window.event || event;
            if(e.keyCode == 13) {
                submit_form();
            }
        };

        function submit_form() {
            var re=/^\d{8}$/;
            var employeeName = document.login_form.username.value;
            if (employeeName == ""){
                document.getElementById("error").innerHTML = "工号不能为空";
                document.getElementById("error").style.display = "block";
                document.login_form.username.focus();
                return false;
            } else if(!re.test(employeeName)){
                document.getElementById("error").innerHTML = "工号只能为8位数字";
                document.getElementById("error").style.display = "block";
                document.login_form.username.focus();
                return false;
            } else if(document.login_form.password.value == ""){
                document.getElementById("error").innerHTML = "密码不能为空";
                document.getElementById("error").style.display = "block";
                document.login_form.password.focus();
                return false;
            }
            document.form.j_username.value = employeeName;
            document.form.j_password.value = document.login_form.password.value;
            document.login_form.submit(); 
        }

        function fun_getVcode() {
            document.getElementById("vcodeimg1").src = "${verifyCodeServiceUrl}/imageCode.htm?uuid="
                + "${uuid}" + "&yys=" + new Date().getTime();
        }
    </script>
</body>
</html>
