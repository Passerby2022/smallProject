$(function(){
    let flag = 0;

    function showhide(){
        flag++;
        $(this).siblings('ul').toggleClass('showhide');
        $(this).parent().siblings('div').children('ul').removeClass('showhide');
        if(flag%2!==0){
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test');
        }else{
            $(this).children('#down').prop('class','').toggleClass('iconfont icon-icon-test1');
        }
    }

    $('.user h3').on('click',showhide);

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

    let username = localStorage.getItem('user');
    let oldPassword = '';
    let newPassword = '';

    $('#oldPassword').on('keyup',debounce(function(){
        oldPassword = $('#oldPassword').val().trim();
    },100))

    $('#newPassword').on('keyup',debounce(function(){
        newPassword = $('#newPassword').val().trim();
    },100))

    function userChangePsw(usernameData,oldPasswordData,newPasswordData){
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/userChangePSW',
            data:{
                username:usernameData,
                oldPassword:oldPasswordData,
                newPassword:newPasswordData
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
        $('#oldPassword').val('');
        $('#newPassword').val('');
    }

    $('#userChangePSW').on('click',function(){
        if((oldPassword.length===0)&&(newPassword.length===0)){
            alert('原密码和新密码不能为空');
            //提交完数据后表单全部清空
            clearText();
        }
        if(((oldPassword.length<6)||(oldPassword.length>12))||((newPassword.length<6)||(newPassword.length>12))){
            alert('请输入正确格式的原密码和新密码');
            //提交完数据后表单全部清空
            clearText();
        }
        userChangePsw(username,oldPassword,newPassword);
        clearText();
    })

    clearText();

    $('#exit').on('click',function(){
        localStorage.removeItem('user');
    })
})