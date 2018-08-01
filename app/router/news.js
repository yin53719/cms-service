'use strict';

module.exports = app => {
    app.post('/api/community/news/queryListNews',app.jwt,'community.news.queryListNews');
    app.post('/api/community/news/insertNews',app.jwt,'community.news.insertNews');
    app.post('/api/community/news/updateNews',app.jwt,'community.news.insertNews');
    app.get('/api/community/news/queryDetailNews',app.jwt,'community.news.queryListNews');
};