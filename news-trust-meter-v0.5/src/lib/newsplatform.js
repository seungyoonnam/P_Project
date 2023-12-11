window.onload = function() {
    var select = document.getElementById("platform-selector");
    select.selectedIndex = 0; // 첫 번째 option을 선택합니다.
    //select.disabled=true;
  
    var option1 = document.createElement("option");
    option1.value = "naver";
    option1.text = "Naver";
    select.appendChild(option1);
  
    var option2 = document.createElement("option");
    option2.value = "daum";
    option2.text = "Daum";
    select.appendChild(option2);

    var option3 = document.createElement("option");
    option3.value = "google";
    option3.text = "Google";
    select.appendChild(option3);
  
    select.onchange = changePlatform;
  }
  
function changePlatform() {
    var select = document.getElementById("platform-selector");
    var selectedValue = select.options[select.selectedIndex].value;

    var form = document.getElementById("news-url-form");
    var input = form.querySelector('input');
    var button = form.querySelector('button');

    var link = document.getElementById("news-shortcut-link");

    if (selectedValue === "naver") {
        form.action = "/report/naver";
        link.textContent = "Naver 뉴스 바로가기";
        link.href = "https://news.naver.com/";
        input.disabled=false;
        input.placeholder='https://news.naver.com';
        button.disabled=false;
    } else if (selectedValue === "daum") {
        form.action = "";
        link.textContent = "Daum 뉴스 바로가기";
        link.href = "https://news.daum.net/";

        //서비스하게되면 변경
        input.disabled=true;
        input.placeholder='서비스 준비중입니다';
        button.disabled=true;
    } else if (selectedValue === "google") {
        form.action = "";
        link.textContent = "Google 뉴스 바로가기";
        link.href = "https://news.google.com/home?hl=ko&gl=KR&ceid=KR:ko";

        //서비스하게되면 변경
        input.disabled=true;
        input.placeholder='서비스 준비중입니다';
        button.disabled=true;
    }
}
  