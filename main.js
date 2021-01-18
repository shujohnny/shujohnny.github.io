$(document).ready()

var RandomInt = (start, end) => {
    let n = end - start + 1
    r = Math.random() * n
    r = Math.floor(r)
    r = r + start
    return r
}
var is_end=false;

/**
 * 產生從 start 到 end 的整數亂數，每次執行打亂 Times 次
 * @param {number} start 亂數起始數值
 * @param {number} end  亂數結束數值
 * @param {number} Times 打亂的次數
 * @returns {number} 一個從start到end的整數亂數
 */
var RandomArray = (start, end, Times)=>{
    var randomArray = []
    for (let i = 0; i <end + 1; i++) {
        randomArray.push(i)
    }
    for (let i = 0; i < Times; i++) {
        // 隨機取出[r] 並與[0]交換
        let r = RandomInt(start, end)
        let temp = randomArray[r]
        randomArray[r] = randomArray[0]
        randomArray[0] = temp
    }
    return  randomArray;
}


//出題與作答設定
//儲存使用者的回答紀錄
var N = 0; //題號
var score = 0; //答對題數
var guestAns = []; //使用者所選之項目
var time =200000; //時間設定200秒
var timeUse = 0; //花費時間

//題庫
var ansName = ["思う","大会", "コーラ", "うん","ううん","おはよう",
    "こんにちは", "さようなら／　さよなら", "お疲れ様", "お休みなさい", "お元気ですか", "どういたしまして",  "別れる",
    "書類", "渡す", "世界", "～中", "間に合う", "勝つ","ダイエット", "総理大臣", "まあまあ", "アニメ", "ストーリー", "通勤ラッシュ", "都会", "仕方がない", "社会", "怖い", "日頃", "行い", "きっと", "どういう", "意味", "そうか", "ねえ", "ドラマ", "とっても", "実は", "いいわよ", "急[きゅう]", "変わる", "ドキドキする", "主人公", "おっ", "いいね", "いいよ", "俺", "外[そと]", "いいですよ", "曇る", "台風","残業"
    ];

// 產生本次的新題庫順序
var randomImg=[]; //隨機的出題順序(0-53)
var randomImg=RandomArray(0,53,100); //打亂題庫中的編號順序


// 更換題目的圖片位址
function changeURL(){
    randomImg[N];
    $('.imgplace').remove();
    let $div = $('.answer')
    $img = $('<img>').attr('class', 'imgplace')
    $div.append($img);
    $('.imgplace').attr('src', './img/' + randomImg[N] + '.jpg').attr('class', 'imgplace');  //產生第N題的圖片
}


var otherChoice = []; //隨機的出題選項
var otherChoice = RandomArray(0,80,300);


//在MC產生4個選項(含答案)
var MC =[];//含有答案的四個選項代號
function RandomFour(){
    // MC.splice(0,MC.length);
    MC = [];//清空上一題的選項
    MC.push(randomImg[N]);
    otherChoice = RandomArray(0,80,300);
    for(i=0; i<100;i++){
        if(MC.length<4){
            if(otherChoice[i]!=randomImg[N]){
                MC.push(otherChoice[i]);   
            }   else{
                continue;
            }
        }   else if(MC.lenght=4){
            return MC;
        }
    }  
};  

// 隨機排列選項
var choiceArray = ["A","B","C","D"]; //選項順序
var randomChoice = []; //0-3隨機整數陣列
var randomMC = []; //暫留4個隨機排列的選項名稱（包含答案）
var randomChoice = RandomArray(0,3,10)

function insertChoice(){
    randomChoice = RandomArray(0,3,10)
    for(i=0; i<4; i++){
        randomMC = choiceArray[randomChoice[i]];
        $('#'+choiceArray[randomChoice[i]]).text(ansName[MC[i]]);
    }
}

//呈現結果
function RESULT(){
    $('#test-area').remove('');
    $('#TIME').remove('');
    let $div = $('#alert-text');
    $btn = $('<button>').attr('class', 'btn').attr('id', 'result').text('查看結果');
    $div.append($btn);
    $('#left').remove();
    //檢視答題結果
    $('#result').on('click',()=>{
        Sound();
        Anssnd();
        $('#alert-text').remove();
        // 延遲顯示答案
        !function MyCounter(){
            if(wait<=0){
                $('#allResult').attr('class','showResult');
                $('#test-area').remove();
                $('#summary').text('您答對：'+score+'題；作答時間：'+ timeUse +'秒')
                $('#HOME').attr('class','showResult');
                $('#AGAIN').attr('class','showResult');
                $('#ADVANCE').attr('class','showResult');
                
                for(i=0; i<20;i++){
                    $('#' +i).attr('src', './img/' + randomImg[i] + '.jpg').attr('class', 'answerimg card-img-top');
                    $('#detail'+i).text(('正確答案是：'+ansName[randomImg[i]]));
                    $('#guest'+i).text('(您的答案：'+ guestAns[i] +')');
                    if(guestAns[i]!=ansName[randomImg[i]]){
                        $('#guest'+i).attr('style', 'color:red;');
                    }
                    if(document.getElementById('guest'+i).textContent=='(您的答案：undefined)'){
                        $('#guest'+i).text('您尚未作答本題').attr('style', 'color:red;');
                    }
                }
    
                //答題結果評價
                if(score==20){
                    $('#grade').text('全對！')
                }else if(score<=19&&score>=13){
                    $('#grade').text('還不錯喔!')
                } else if(score<=12&&score>=7){
                    $('#grade').text('ㄨㄚˊ~要加油喔!') 
                } else{
                    $('#grade').text('笑死！太爛了吧!') 
                } 
                $('#answering').attr('class', 'fade-in')  
            }else{
                setTimeout(MyCounter, 1000);
            }
            wait-=1000; 
        }();

        
    });
    
}


//按鈕音效
var snd = new Audio("music/Mouth-Pop.mp3");
function Sound(){
    snd.play();
    snd.currentTime=0;
}
//倒數
var count = new Audio("music/count200.mp3");
function Count(){
    count.play();
    count.currentTime=0;
}
//停止播放count
function myStop(){
    count.pause();
    count.currentTime = 0;
}
//倒數十秒
var countten = new Audio("music/10sec.mp3");
function CountTen(){
    countten.play();
    countten.currentTime=0;
}

//答案揭曉
var wait=1000;
var anssnd = new Audio("music/answer.mp3")
function Anssnd(){
    anssnd.play();
    anssnd.currentTime=0;
}

//btn-hover音效
var sndHov = new Audio("music/SoundHov.mp3");
function SoundHov(){
    sndHov.play();
    sndHov.currentTime=0;
}
//前面是音效

$(() => {
    $('#start').on('click',() => {
        var yes = confirm('準備好了嗎？');
        if (yes) {
            $('#start').remove();
            $('#Choice-test').remove();
            $('#Choice').attr('class','showResult');
            $('#info').attr('class','hideResult');
            $('#alert-text').text('');
            $('#left').text('第1/20題');
            Count();

            //倒數計時 
            !function MyCounter(){
                // console.log(is_end);
                if(!is_end){
                    if(time==10000){
                        myStop();
                        CountTen();
                        $('#TIME').attr('class', 'alertTen');
                        $('#TIME').text("您還剩下" + (time/1000) + "秒");
                        setTimeout(MyCounter, 1000);
                        timeUse=timeUse+1;
                    }else if(time==0){
                        is_end =true;
                        RESULT();
                        return;
                    } else if(time>10000){
                        $('#TIME').text("您還剩下" + (time/1000) + "秒");
                        setTimeout(MyCounter, 1000);
                        timeUse=timeUse+1;
                    } else{
                        $('#TIME').attr('class', 'alertTen');
                        $('#TIME').text("您還剩下" + (time/1000) + "秒");
                        setTimeout(MyCounter, 1000);
                        timeUse=timeUse+1;
                    }
                    time-=1000;
                }
            }();
            changeURL();  //產生下一張圖片
            RandomFour();  //產生4個順序打亂的選項代號(含答案)
            insertChoice();  //依序將打亂的選項代號對應的名稱填入選項中
        }
    })

    // 偵測選擇的內容是否正確，順便換題目
    $('.btn-choice').on('click',(e)=>{

        if(N<20){
            // console.log(e.target.id);
            let ida=e.target.id;
            if($('#'+ida).html()==ansName[randomImg[N]]){
                guestAns.push($('#'+ida).html());
                score=score+1; 
                N=N+1; 
            } else{
                guestAns.push($('#'+ida).html());
                // alert('答錯了，正確答案是'+ansName[randomImg[N]]);
                N=N+1; //加題號，換下一題
            }
            changeURL();  //產生下一張圖片
            RandomFour();  //產生4個順序打亂的選項代號(含答案)
            insertChoice();  //依序將打亂的選項代號對應的名稱填入選項中
            $('#left').text("第"+(N+1)+"/20題");   // 改變上方題號數
        } 

        //時限內作答完畢呈現答題結果
        if(document.getElementById('left').textContent=="第21/20題"){
            $('#test-area').remove('');
            $('#TIME').remove('');
            $('#left').remove();
            time =0;
            // RESULT();
            myStop();
        }
    });
})



