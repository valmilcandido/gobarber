/* eslint-disable linebreak-style */
import mongoose from 'mongoose';
// eslint-disable-next-line linebreak-style

const NotificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Notification', NotificationSchema);
