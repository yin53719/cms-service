'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('back');

  const UserSchema = new Schema({
    id: { type: Number },
    userId: { type: Number, unique: true },
    title: { type: String },
    newsSummary: { type: String },
    content: { type: Number },
    titleImage: { type: String},
    releaseDate: { type: Date, default: Date.now },
    isShow: { type: Number, default: 0},
    isFullpush: { type: Number , default: 0},
    sort: { type: Number, default: 0 }
  }, {
    usePushEach: true,
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' },
  });
  return conn.model('News', UserSchema);
};