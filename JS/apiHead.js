

axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON',
    {
    headers: getAuthorizationHeader()
    }
)
.then(function (response) {
document.querySelector('body').textContent=JSON.stringify(response.data);
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

