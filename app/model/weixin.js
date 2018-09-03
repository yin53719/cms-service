'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    signature: { type: String},
    appId: { type: String },
    timestamp: { type: String},
    nonceStr: { type: String },
    expires_in: { type: Number }
  });
  return conn.model('weixin', UserSchema);
};