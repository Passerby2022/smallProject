$(function(){
    let boxFlag = 0;
    let oneFlag = 0;
    let twoFlag = 0;
    let threeFlag = 0;
    let flagOne = 0;
    let flagTwo = 0;
    let flagThree = 0;

    $('.staff h3').siblings('ul').addClass('showhide');
    flagTwo++;

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
        flagTwo--;
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

    let Zn = '';
    let Sex = '';
    let Age = '';
    let Phone = '';
    let Education = '';
    let Bno = '';
    let Duties = '';
    let Title = '';

    $('#Zn').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Zn = $('#Zn').val().trim();
    },100));

    $('#Sex').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Sex= $('#Sex').val().trim();
    },100));

    $('#Age').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Age= $('#Age').val().trim();
    },100));

    $('#Phone').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Phone= $('#Phone').val().trim();
    },100));

    $('#Education').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Education= $('#Education').val().trim();
    },100));

    $('#Bno').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Bno= $('#Bno').val().trim();
    },100));

    $('#Duties').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Duties= $('#Duties').val().trim();
    },100));

    $('#Title').on('keyup',debounce(function(){
        //trim()是清除字符串前后的空格符
        Title= $('#Title').val().trim();
    },100));

    function getData(){
        $.ajax({
            method:'GET',
            url:'http://192.168.253.1:3000/api/rederingStaff',
            success:function(res){
                //渲染失败
                if(res.status===1){
                    alert(res.err);
                }
                //渲染成功
                if(res.status===0){
                    let contentStr = template("addStaff",res);
                    //通过模板引擎将内容渲染到页面中
                    $('#indexBody').html(contentStr);
                }
            }
        })
    }

    function addStaffData(ZnData,SexData,AgeData,PhoneData,EducationData,BnoData,DutiesData,TitleData){
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/addStaff',
            data:{
                Zn:ZnData,
                Sex:SexData,
                Age:AgeData,
                Phone:PhoneData,
                Education:EducationData,
                Bno:BnoData,
                Duties:DutiesData,
                Title:TitleData
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
        $('#Zn').val('');
        $('#Sex').val('');
        $('#Age').val('');
        $('#Phone').val('');
        $('#Education').val('');
        $('#Bno').val('');
        $('#Duties').val('');
        $('#Title').val('');
    }

    //前端验证规则函数
    function inspectText(length,text){
        if(length===0){
            alert(`${text}不能为空`);
            //提交完数据后表单全部清空
            clearText();
            return false;
        }
        return true;
    }

    //监听添加按钮的点击事件
    $("#addStaffData").on('click',debounce(function(){
        //前端简单检测是否符合规则
        let ZnFlag = inspectText(Zn.length,'职员名称');
        let SexFlag = inspectText(Sex.length,'性别');
        let AgeFlag = inspectText(Age.length,'年龄');
        let PhoneFlag = inspectText(Phone.length,'电话号码');
        let EducationFlag = inspectText(Education.length,'学历');
        let BnoFlag = inspectText(Bno.length,'部门编号');
        let DutiesFlag = inspectText(Duties.length,'职务');
        let TitleFlag = inspectText(Title.length,'职称');
        if(ZnFlag&&SexFlag&&AgeFlag&&PhoneFlag&&EducationFlag&&BnoFlag&&DutiesFlag&&TitleFlag){
            addStaffData(Zn,Sex,Age,Phone,Education,Bno,Duties,Title);
            //提交完数据后表单全部清空
            clearText();
        }
    },1000))

    getData();

    $('#exit').on('click',function(){
        localStorage.removeItem('user');
    })
})