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

    let Zno = localStorage.getItem('user');

    function getData(ZnoData){
        $.ajax({
            method:'POST',
            url:'http://192.168.253.1:3000/api/userindex',
            data:{
                Zno:ZnoData
            },
            success:function(res){
                let contentStr = template("userindex",res);
                //通过模板引擎将内容渲染到页面中
                $('#indexBody').html(contentStr);
            }
        })
    }
    
    $('.select h3').on('click',function(){
        getData(Zno);
    })

    getData(Zno);

    $('#exit').on('click',function(){
        localStorage.removeItem('user');
    })
})