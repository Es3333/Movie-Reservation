const screens =require('../models/sreens')
const Reservation = require('../models/reservation')
const user =require('../models/user.model')

exports.createReservation =async (req ,res)=>{

    const {screenId,seats} = req.body
    const userId= req.user.id
    try {

         const screen = await screens.findByPk(screenId)
        if(!screen){
            return res.json({message : 'no screen with this id'})
        }
        const availableSeats= screen.capacity - seats

        if(availableSeats <0){
            return res.json({message : 'no enough seats'})
        }

        const data =await Reservation.create({
            seats ,
            userId,
            showtimeId : screenId ,
        })
        console.log (availableSeats)
       const rows  =  await screens.update(
           {capacity : availableSeats },
           {where :{id :screenId}}
           )

        console.log('Reservation created:', data);
        console.log('Rows affected in update:', rows);
res.json({data,rows})
    }catch (err){
        res.json(err)
    }
}

exports.cancelReservation = async (req,res) =>{
    const { id } = req.params;


    try {
        const reservation = await Reservation.findOne({
            where: {id},
        });

        if (!reservation) {
            return res.status(404).json({message: 'Reservation not found.'});
        }


        const showtime = await screens.findByPk(reservation.showtimeId);

        if (new Date(showtime.date) <= new Date()) {
            return res
                .status(400)
                .json({message: 'Cannot cancel past or ongoing reservations.'});
        }

        await reservation.destroy();

        res.status(200).json({message: 'Reservation cancelled'});

    }catch (err){
        res.json(err)
    }

}

exports.getReservationsforUser = async (req,res) =>{
    const userId = req.user.id

    try {

const data = await Reservation.findAll({
    where : {userId}
})
        res.status(200).json(data);


    }catch (err){
        res.json(err)
    }
}
exports.getReservationsforAdmin =async (req,res)=>{
    const { showtimeId } = req.params;
    const ticketPrice = 5

    try {

        const reservations = await Reservation.findAll({
            where: { showtimeId },
            include: [
                { model: user, attributes: ['id', 'name', 'email'] },
                { model: screens, attributes: ['id', 'capacity', 'date', 'time'] },
            ],
        });

        const totalSeatsReserved = await Reservation.sum('seats', {
            where: { showtimeId },
        });


        res.status(200).json({
            reservations,
            totalSeatsReserved,
            revenue: totalSeatsReserved * ticketPrice
        });


    }catch (err){
        res.json(err)
    }



}