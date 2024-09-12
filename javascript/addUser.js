$(function(){
    let boxFlag = 0;
    let oneFlag = 0;
    let twoFlag = 0;
    let threeFlag = 0;
    let flagOne = 0;
    let flagTwo = 0;
    let flagThree = 0;

    $('.user h3').siblings('ul').addClass('showhide');
    flagThree++;

    $('.department h3').on('click',function(){
        flagOne++;
        $(this).parent().siblings('div').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(flagOne%2!==0){
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings('div').children('h3').children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        flagTwo = 0;
        flagThree = 0;
        boxFlag = 0;
    });

    $('.staff h3').on('click',function(){
        flagTwo++;
        $(this).parent().siblings('div').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(flagTwo%2!==0){
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings('div').children('h3').children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        flagOne = 0;
        flagThree = 0;
        boxFlag = 0;
    });

    $('.user h3').on('click',function(){
        flagThree--;
        $(this).parent().siblings('div').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(flagThree%2!==0){
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings('div').children('h3').children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        flagTwo = 0;
        flagOne = 0;
        boxFlag = 0;
    });

    $('.wages h3').on('click',function(){
        boxFlag++;
        $('.wages h3').parent().siblings('div').children('ul').removeClass('showhide');
        $('.wages h3').siblings('ul').toggleClass('showhide');
        if(boxFlag%2!==0){
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings('div').children('h3').children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        flagTwo = 0;
        flagOne = 0;
        flagThree = 0;
    });

    $('.one').on('click',function(){
        oneFlag++;
        $(this).parent().siblings('li').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(oneFlag%2!==0){
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings().children('h4').children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        twoFlag=0;
        threeFlag=0;
    })

    $('.two').on('click',function(){
        twoFlag++;
        $(this).parent().siblings('li').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(twoFlag%2!==0){
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings().children('h4').children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        oneFlag=0;
        threeFlag=0;
    })

    $('.three').on('click',function(){
        threeFlag++;
        $(this).parent().siblings('li').children('ul').removeClass('showhide');
        $(this).siblings('ul').toggleClass('showhide');
        if(threeFlag%2!==0){
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
        $(this).parent().siblings().children('h4').children('#downDown').prop('class','').toggleClass('iconfont icon-icon-test1');
        oneFlag=0;
        twoFlag=0;
    })

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

    let username = '';
    let password = '';

    $('#username').on('keyup',debounce(function(){
        username = $('#username').val().trim();
    },100))

    $('#password').on('keyup',debounce(function(){
        password = $('#password').val().trim();
    },100))

    function userChangePsw(usernameData,passwordData){
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/puserdata',
            data:{
                username:usernameData,
                password:passwordData
            },
            success:function(res){
                if(res.status===1){
                    alert(res.err);
                }
                if(res.status===0){
                    alert(res.err);
                }
            }
        })
    }

    //清空表单内容
    function clearText(){
        $('#username').val('');
        $('#password').val('');
    }

    $('#userChangePSW').on('click',function(){
        if((username.length===0)&&(password.length===0)){
            alert('原密码和新密码不能为空');
            //提交完数据后表单全部清空
            clearText();
        }
        if((password.length<6)||(password.length>12)){
            alert('请输入正确格式的原密码和新密码');
            //提交完数据后表单全部清空
            clearText();
        }
        userChangePsw(username,password);
        clearText();
    })

    clearText();

    $('#exit').on('click',function(){
        localStorage.removeItem('user');
    })
})