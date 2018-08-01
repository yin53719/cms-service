'use strict';

module.exports = app => {
    app.router.post('/api/community/audit/getAuditInfoList', app.jwt,'community.auditManagement.getAuditInfoList');
    app.router.get('/api/community/audit/getAuditTypeList', app.jwt,'community.auditManagement.getAuditTypeList');
    app.router.post('/api/community/article/queryListArticle', app.jwt,'community.forum.queryListArticle');
};