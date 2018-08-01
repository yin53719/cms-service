'use strict';

module.exports = app => {
    app.get('/api/community/user/saicUser/findOfficialUser',app.jwt,'community.user.findOfficialUser');
    app.post('/api/community/user/getListUser',app.jwt,'community.user.getListUser');
};