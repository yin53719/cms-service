'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    userId: { type: Number},
    title: { type: String },
    newsSummary: { type: String },
    content: { type: String },
    titleImage: { type: String},
    releaseDate: { type: Date, default: Date.now },
    createDate: { type: Date, default: Date.now },
    isShow: { type: Number, default: 0},
    isFullpush: { type: Number , default: 0},
    sort: { type: Number, default: 0 },
    commentNumber:{type :Number,default:0},
    praiseNumber:{type :Number,default:0},
    browseNumber:{type :Number,default:0}
  });
  return conn.model('news', UserSchema);
};