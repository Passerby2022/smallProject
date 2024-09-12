$(function(){
    //防抖函数
    function debounce(fn,t){
        let timer;
        return function(){
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn();   
            }, t);
        }
    }

    //定义全局的用户名和密码变量来获取账号和密码
    let username='';
    let password='';

    let flag = 0;

    //获取用户名输入框填写的内容
    $('#userName').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        username = $('#userName').val().trim();
    },100))

    //获取密码输入框填写的内容
    $('#passWord').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        password = $('#passWord').val().trim();
    },100))

    $('#span').on('click',debounce(function(){
        flag++;
        if(flag%2!==0){
            $('#span').prop('class','').toggleClass('iconfont icon-yanjing_xianshi');
            $('#passWord').prop('type','text');
        }else{
            $('#span').prop('class','').toggleClass('iconfont icon-yanjing_yincang');
            $('#passWord').prop('type','password');
        }
    },100))

    //通过ajax提交请求，获取相应的信息，为跳转到首页做准备
    function getData(usernameData,passwordData){
        //将用户名和密码提交到后端进行验证
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/index',
            data:{
                username:usernameData,
                password:passwordData
            },
            //拿到服务器返回的数据
            success:function(res){
                //后端验证不通过
                if(res.status===1){
                    alert(res.err);
                }
                //后端验证通过
                if(res.status===0){
                    let str = `${res.data}`;
                    $('#aIndex').prop('href',str);
                    //将jquery对象转化成dom对象
                    //jquery的trigger不执行原生js的点击事件，因此trigger('click')无法触发
                    //因此trigger('click')只是相当于触发了本身的onclick，而不是像用户那样点击触发事件
                    //$("#aIndex")[0]得到的是原生dom对象，dom对象用click()可以触发点击事件
                    $('#aIndex')[0].click();
                }
            }
        })
    }

    function userData(usernameData,passwordData){
        //将用户名和密码提交到后端进行验证
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/user',
            data:{
                username:usernameData,
                password:passwordData
            },
            //拿到服务器返回的数据
            success:function(res){
                //后端验证不通过
                if(res.status===1){
                    alert(res.err);
                }
                //后端验证通过
                if(res.status===0){
                    let str = `${res.data}`;
                    $('#aIndex').prop('href',str);
                    //将jquery对象转化成dom对象
                    //jquery的trigger不执行原生js的点击事件，因此trigger('click')无法触发
                    //因此trigger('click')只是相当于触发了本身的onclick，而不是像用户那样点击触发事件
                    //$("#aIndex")[0]得到的是原生dom对象，dom对象用click()可以触发点击事件
                    $('#aIndex')[0].click();
                }
            }
        })
    }

    //清空表单内容
    function clearText(){
        $('#userName').val('');
        $('#passWord').val('');
    }

    //监听表单的提交事件
    $("#submit").on('click',function(e){
        console.log('监听到了表单的提交事件');
        //阻止表单的默认提交事件
        e.preventDefault();
        //前端简单检测账号和密码是否符合规则
        if((username.length===0)&&(password.length===0)){
            alert('用户名和密码不能为空');
            //提交完数据后表单全部清空
            clearText();
        }
        if(((username.length<1)||(username.length>10))||((password.length<6)||(password.length>12))){
            alert('请输入正确格式的用户名或密码');
            //提交完数据后表单全部清空
            clearText();
        }
        if(username==='program'){
            getData(username,password);
        }else{
            localStorage.setItem('user',username);
            userData(username,password);
        }
        //提交完数据后表单全部清空
        clearText();
    })
})
