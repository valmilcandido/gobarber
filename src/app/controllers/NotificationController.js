/* eslint-disable linebreak-style */
import Notification from '../schemas/Notification';
import User from '../models/Users';

class NotificationController {
  async index(req, res) {
    const checkisProvider = User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkisProvider) {
      return res.status(401).json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    }).sort({ createdAt: 'desc' }).limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notificaion = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    return res.json(notificaion);
  }
  
}

export default new NotificationController();
