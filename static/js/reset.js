module.exports=(function(){
    
        window.onresize=reset;
        function reset(n){
            console.log('ok')
            var innerWidth=window.innerWidth;
            var screenWidth=window.screen.width;
            document.querySelector('html').style.fontSize=100/750*innerWidth+'px';
            if(innerWidth>screenWidth&&n<=10){
                setTimeout(function(){
                    reset(++n)
                },100)
            }else{
                document.querySelector('body').style.opacity=1;
            }
        }
        setTimeout(function(){
            reset(0)
        },100)

})()