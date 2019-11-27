import * as Yup from 'yup';
import { startOfHour,parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment'; 
import User from '../models/Users';
import File from '../models/File';

class AppointmentController {


  async index(req,res){

    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where:{
        user_id: req.userId,
        cancelled_at: null,
      },
      attributes:['id','date'],
      limit: 2,
      offset: (page - 1) * 2,
      include:[
        {
          model:User,
          as:'provider',
          attributes:['id','name'],
          include:[
            {
              model:File,
              as:'avatar',
              attributes:['id','path','url']
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  async store(req,res){

    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id:  Yup.number().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:'Validation Fails'});
    };

    const {provider_id, date} = req.body;

    const isProvider = await User.findOne({
      where:{id:provider_id, provider:true}
    });

    const hourStart = startOfHour(parseISO(date));

    if(isBefore(hourStart,new Date())){
      return res.status(400).json({error:'Past dates are not permitted.'});
    }

    const checkAvailability = await Appointment.findOne({
      where:{
        provider_id,
        cancelled_at: null,
        date: date
      }
    });

    if (checkAvailability){
      return res.status(400).json({error:'Appointment date is not available'});
    }

    if(!isProvider){
      return res.status(401).json({error:'You can only create appointments with providers'});
    }

    const appointment = await Appointment.create({
      user_id:req.userId,
      provider_id,
      date:hourStart,
    }); 

    return res.json(appointment);
  }
}
export default new AppointmentController();