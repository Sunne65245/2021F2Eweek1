var subjects = ['在地觀光', '特色飲食', '休閒住宿', '體驗活動'];
    var englishSubjects = ['Domestic tourism', 'Cuisine', 'Resort hotel', 'Experience'];
    var backgroundImgs = ['sightseeing', 'diet', 'lodging', 'activity'];
    var subject_index = 0, old_subject_index = -1;

    $(document).ready(function () {
        changeSubject();

        $('#subjectToLeft').on('click', function () {
            old_subject_index = subject_index--;
            if (subject_index < 0) {
                subject_index = subjects.length - 1;
            }
            changeSubject();
        });

        $('#subjectToRight').on('click', function () {
            old_subject_index = subject_index++;
            if (subject_index >= subjects.length) {
                subject_index = 0;
            }
            changeSubject();
        });

        $('#search').on('change',function(){
            let $this = $(this);
            let $option = $this.find('option:checked');
            
            $('.placeList a').show();
            if($option.val() != 0)
            {
                $('.placeList a').not(":contains('"+$option.text()+"')").hide();
            }

        });

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 50) {
                //$('.main-menu').addClass("anycolor");
                document.querySelector('.main-menu').classList.add('anycolor');

                //$('.classynav').addClass("link-black");
                document.querySelector('.classynav').classList.add('link-black');
                //$('.classynav').removeClass("link-white");
                document.querySelector('.classynav').classList.remove('link-white');

                document.getElementById("logo").src = "img/logo_black.png";
            }
            else {
                //$('.main-menu').removeClass("anycolor");
                document.querySelector('.main-menu').classList.remove('anycolor');

                // $('.classynav').addClass("link-white");
                document.querySelector('.classynav').classList.add('link-white');
                // $('.classynav').removeClass("link-black");
                document.querySelector('.classynav').classList.remove('link-black');

                document.getElementById("logo").src = "img/logo_white.png";
            }
        });
    });

    function changeSubject() {
        //$('#subject').text(subjects[subject_index]);
        document.querySelector('#subject').textContent = subjects[subject_index];
        document.querySelector('#englishSubject').textContent = englishSubjects[subject_index];

        $('#animation').addClass(backgroundImgs[subject_index]);
        if (old_subject_index >= 0) {
            $('#animation').removeClass(backgroundImgs[old_subject_index]);
        }
    }

//存放資料
let placeData ="";
const placeList = document.querySelector(".placeList");

//引入ＡＰＩ
const sightseeingAPI='https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=9&$format=JSON';

axios.get(
    sightseeingAPI,
    {
    headers: getAuthorizationHeader()
    }
)
.then(function (response) {
    placeData = response.data;
    console.log(placeData); 
    innerPlaceListCard();
})
.catch(function (error) {
    console.log(error);
}); 

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '4ad9f73726a0409a9376afd2b59e59a7';
    let AppKey = 'iR-j7mJI1CY924a-xfd6vhXZciM';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1','TEXT');
    ShaObj.setHMACKey(AppKey,'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}



// 印出下方卡片
//組卡片資訊字串    ━═━═━━═━═━◥◤━═━═━━═━═━
function innerPlaceListCard(){

    let placeListCardSrt="";

    placeData.forEach(function (item){

        var picUrl =item.Picture.hasOwnProperty('PictureUrl1') ? item.Picture.PictureUrl1 : "img/NoHaveImg.png";

        placeListCardSrt+=`<a href="">
    <div class="placeListCard">
        <div class="placeListCardImg">
            <div class="hoverGrey"></div>
            <img src="${picUrl}" alt="${item.Picture.PictureDescription1}">
        </div>
    
        <div class="placeText">
            <h4>${item.Name}</h4>
            <ul>
                <li class="listCardNews">
                    <span><img src="./img/location_on_black_24dp 1.svg" alt=""
                            class="filter-whiteBlack"></span>
                    <span class="listCardNews">${item.Address}</span>
                </li>
    
                <li class="listCardNews telLearnMore">
                    <div>
                        <span><img src="./img/call_black_24dp 1.svg" alt=""
                                class="filter-whiteBlack"></span>
                        <span class="${item.Phone}">${item.Phone}</span>
                    </div>
                    <div class="d-none more">
                        <span>了解更多</span>
                        <span><img src="./img/arrow_right_alt_black_24dp 1.png" alt=""></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </a>
    `
    });
    
   //渲染    ━═━═━━═━═━◥◤━═━═━━═━═━
    placeList.innerHTML = placeListCardSrt;

}