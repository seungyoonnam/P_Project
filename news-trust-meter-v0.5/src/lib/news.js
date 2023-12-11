var db = require('./db');
var sanitizeHtml = require('sanitize-html');

module.exports={
  home:(req,res)=>{
    db.query('SELECT COUNT(newsID) FROM feedback', (error, result1)=>{
      db.query('SELECT newsCategory FROM feedback GROUP BY newsCategory ORDER BY COUNT(*) DESC LIMIT 1', (error, result2)=>{
        db.query("SELECT COUNT(*) FROM feedback WHERE resultSatisYn = 'Y'", (error, result3)=>{
          const resultNum = result1[0]['COUNT(newsID)'];
          const mostCategory = result2.length > 0 ? result2[0]['newsCategory'] : '없음';
          const satisYNum = result3[0]['COUNT(*)'];

          var context={
            title: "News Trust Meter",
            header: 'header.ejs',
            wwdo:'wwdo.ejs',
            who: 'who.ejs',
            resultNum: resultNum || 0,
            mostCategory: mostCategory,
            avgSatisfaction: resultNum ? (satisYNum/resultNum)*100 : 0,
            contact: 'contact.ejs',
            footer:'footer.ejs'
          }
          req.app.render('home', context, (err,html)=>{
            if (err) {
                res.status(500).send(`Internal Server Error: ${err}`);
                return;
            }
            res.end(html);
          })
        })
      })
    })
  },


    do:(req, res)=>{
      var context={
        //background.ejs
        title: 'What we do',
        header: 'header.ejs',
        body:'wwdo.ejs',
        footer: 'footer.ejs',
        //wwdo.ejs
      }
      req.app.render('background', context, (err,html)=>{
        if (err) {
            res.status(500).send(`Internal Server Error: ${err}`);
            return;
        }
        res.end(html);
      })
    },

    about:(req, res)=>{
      var context={
        //background.ejs
        title: 'About',
        header: 'header.ejs',
        body:'who.ejs',
        footer: 'footer.ejs',
        //who.ejs
      }
      req.app.render('background', context, (err,html)=>{
        if (err) {
            res.status(500).send(`Internal Server Error: ${err}`);
            return;
        }
        res.end(html);
      })
    },

    contact:(req, res)=>{
      var context={
        //background.ejs
        title: 'Contact',
        header: 'header.ejs',
        body:'contact.ejs',
        footer: 'footer.ejs',
        //contact.ejs
      }
      req.app.render('background', context, (err,html)=>{
        if (err) {
            res.status(500).send(`Internal Server Error: ${err}`);
            return;
        }
        res.end(html);
      })
    },

    contact_process: (req, res)=>{
      var post=req.body;
      db.query('insert into contact (userName, phone, email, messages) values (?, ?, ?, ?)',
          [post.name, post.phone, post.email, post.messages], (error, result)=>{
              if(error){
                  res.status(500).send(`Internal Server Error: ${error}`); // 에러 메시지를 클라이언트에게 전달
                  return; // 함수를 종료하여 더 이상의 처리를 중단
              }
              res.redirect('/');
          }
      )
    },

    subscribe_process: (req, res)=>{
      var post=req.body;
      db.query('insert into users (email) values (?)',
          [post.email], (error, result)=>{
              if(error){
                  res.status(500).send(`Internal Server Error: ${error}`); // 에러 메시지를 클라이언트에게 전달
                  return; // 함수를 종료하여 더 이상의 처리를 중단
              }
              res.redirect('/');
          }
      )
    }
}
