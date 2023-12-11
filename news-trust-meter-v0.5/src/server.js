//express와 views 정의
const express=require('express');
const app=express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

//라우터
var rootRouter=require('./router/rootRouter');
var reportRouter=require('./router/reportRouter');

/*
//세션 모듈, 세션 DB 저장 모듈
var session=require('express-session');
var MySqlStore=require('express-mysql-session')(session);
var options={
    host: 'localhost',
    user: 'dbid233',
    password: 'dbpass233',
    database: 'db23303'
};
var sessionStore=new MySqlStore(options);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
*/

//bodyParser 모듈
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//정적 파일
app.use(express.static('public'));
app.use('/lib', express.static('lib'));


//라우터 호출
app.use('/', rootRouter);
app.use('/report', reportRouter);

const PORT=60018;
app.listen(PORT, () => {
  console.log(`서버가 http://ceprj.gachon.ac.kr:${PORT} 에서 실행 중입니다.`);
});