use db23303;

CREATE TABLE sourceDataInfo (
    newsID VARCHAR(20) NOT NULL,  -- 기사ID
    newsCategory VARCHAR(50),     -- 기사카테고리
    newsSubcategory VARCHAR(50),  -- 기사하위카테고리
    newsTitle VARCHAR(200),       -- 기사제목
    newsSubTitle VARCHAR(200),    -- 기사부제목
    newsContent TEXT,             -- 기사본문
    partNum VARCHAR(10),          -- 세부번호
    useType INT,                  -- 용도유형
    processType VARCHAR(10),      -- 처리유형
    processPattern VARCHAR(10),   -- 처리패턴
    processLevel VARCHAR(10),     -- 처리수준(난이도)
    sentenceCount INT,            -- 문장수
    processSentencenum INT,       -- 처리문장수
    PRIMARY KEY (newsID)
);

CREATE TABLE sentenceInfo (
    newsID VARCHAR(20) NOT NULL,  -- 기사ID
    sentenceNo INT,               -- 문장번호
    sentenceContent TEXT,         -- 문장내용
    sentenceSize INT,             -- 문장길이
    PRIMARY KEY (newsID, sentenceNo),
    FOREIGN KEY (newsID) REFERENCES sourceDataInfo (newsID)
);

CREATE TABLE labeledDataInfo (
    newsID VARCHAR(20) NOT NULL,  -- 기사ID
    clickbaitClass INT,           -- 낚시기사분류
    PRIMARY KEY (newsID),
    FOREIGN KEY (newsID) REFERENCES sourceDataInfo (newsID)
);

CREATE TABLE processSentenceInfo (
    newsID VARCHAR(20) NOT NULL,  -- 기사ID
    sentenceNo INT,               -- 문장번호
    sentenceContent TEXT,         -- 문장내용
    subjectConsistencyYn CHAR(1), -- 주제일치여부
    PRIMARY KEY (newsID, sentenceNo),
    FOREIGN KEY (newsID) REFERENCES labeledDataInfo (newsID)
);

select * from sourceDataInfo;
select * from sentenceInfo;
select * from labeledDataInfo;
select * from processSentenceInfo;
