$(function(){
    let boxFlag = 0;
    let oneFlag = 0;
    let twoFlag = 0;
    let threeFlag = 0;
    let flagOne = 0;
    let flagTwo = 0;
    let flagThree = 0;

    $('.department h3').siblings('ul').addClass('showhide');
    flagOne++;

    $('.department h3').on('click',function(){
        flagOne--;
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
        flagThree++;
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

    let Bn = '';

    $('#Bn').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Bn = $('#Bn').val().trim();
    },100));

    function getData(){
        $.ajax({
            method:'GET',
            url:'http://192.168.253.1:3000/api/rederingDepartment',
            success:function(res){
                //渲染失败
                if(res.status===1){
                    alert(res.err);
                }
                //渲染成功
                if(res.status===0){
                    let contentStr = template("deleteDepartment",res);
                    //通过模板引擎将内容渲染到页面中
                    $('#indexBody').html(contentStr);
                }
            }
        })
    }

    function deleteData(BnData){
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/deleteDepartment',
            data:{
                Bn:BnData
            },
            success:function(res){
                //后端验证不通过
                if(res.status===1){
                    alert(res.err);
                }
                //后端验证通过渲染页面
                if(res.status===0){
                    getData();
                }
            }
        })
    }

    //清空表单内容
    function clearText(){
        $('#Bn').val('');
    }

    //监听添加按钮的点击事件
    $("#deleteData").on('click',debounce(function(){
        //前端简单检测部门名称是否符合规则
        if(Bn.length===0){
            alert('部门名称不能为空');
            //提交完数据后表单全部清空
            clearText();
        }
        deleteData(Bn);
        //提交完数据后表单全部清空
        clearText();
    },1000))

    getData();

    $('#exit').on('click',function(){
        localStorage.removeItem('user');
    })
})