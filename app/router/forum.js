'use strict';

module.exports = app => {
    app.router.post('/api/community/article/queryListBlock', app.jwt,'community.forum.queryListBlock');
    app.router.get('/api/community/article/queryDetailBlock', app.jwt,'community.forum.queryDetailBlock');
    app.router.post('/api/community/article/queryListArticle', app.jwt,'community.forum.queryListArticle');
};