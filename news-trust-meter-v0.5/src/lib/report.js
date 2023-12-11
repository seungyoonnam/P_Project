var db = require('./db');
var sanitizeHtml = require('sanitize-html');

var axios = require('axios');
var cheerio = require('cheerio');

const spawn = require('child_process').spawn;
const iconv = require('iconv-lite');

module.exports={
    naver: async (req, res) => {
        var post = req.body;
        var userInput = post.news_url;
      
        // 일단은 네이버 뉴스만 가능
        const urlRegex = /^https:\/\/n\.news\.naver\.com\//i;
      
        if (!urlRegex.test(userInput)) {
          // URL 형식이 아닌 경우
          res.send('<script type="text/javascript">alert("URL 형식이 바르지 않습니다"); window.location="/";</script>');
        }else{
      
            // URL 형식인 경우
            try {
            const response = await axios.get(userInput);
            const $ = cheerio.load(response.data);
        
            const newsTitle = $('#title_area span').html();
            const newsCategory = $('.Nlist_item._LNB_ITEM.is_active .Nitem_link_menu').html();
            const paragraphs = [];
        
            $('article, article div')
                .contents()
                .filter(function () {
                return this.nodeType === 3 && this.nodeValue.trim() !== '';
                })
                .each(function (index, element) {
                const text = element.nodeValue.trim();
                paragraphs.push(text);
                });
            var combinedString = paragraphs.join('');
        
            
            const result = spawn('python', ['model_load.py', combinedString]);

        
            let re;
            result.stdout.on('data', function (data) {
                re = iconv.decode(data, 'utf-8');
            });
        
            result.stderr.on('data', function (data) {
                console.log(data.toString());
            });

        
            result.on('close', function () {
                // Python 스크립트 실행 완료 후에 응답 처리
                console.log(re);
                var context = {
                    //background.ejs
                    title: 'Report',
                    header: 'header.ejs',
                    body: 'report.ejs',
                    footer: 'footer.ejs',
                    //report.ejs
                    newsTitle: newsTitle,
                    newsCategory: newsCategory,
                    paragraphs: combinedString,
                    re: re
                };
                req.app.render('background', context, (err, html) => {
                if (err) {
                    res.status(500).send(`Internal Server Error: ${err}`);
                    return;
                }
                res.end(html);
                });
            });
            } catch (error) {
            console.error(error);
            res.status(500).send(`Internal Server Error: ${error}`);
            }
        }
    },

    feedback:(req, res)=>{
        var yn=req.params.yn;
        var post=req.body;
        db.query('insert into feedback (newsCategory, newsTitle, newsContent, resultSatisYn) values (?,?,?,?)',
            [post.category, post.title, post.content, yn], (error, result)=>{
                if(error){
                    res.status(500).send(`Internal Server Error: ${error}`); // 에러 메시지를 클라이언트에게 전달
                    return; // 함수를 종료하여 더 이상의 처리를 중단
                }
                res.redirect('/');
            }
        )
    }
}