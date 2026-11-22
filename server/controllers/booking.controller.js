const prisma = require("../config/db");

exports.createBooking = async (req, res) => {

try {

const booking = await prisma.booking.create({

data: req.body

});

res.status(201).json(booking);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

exports.getBookings = async(req,res)=>{

const bookings=await prisma.booking.findMany({

orderBy:{

createdAt:"desc"

}

});

res.json(bookings);

};


exports.updateBooking = async (req, res) => {

    const booking = await prisma.booking.update({

        where: {

            id: Number(req.params.id),

        },

        data: req.body,

    });

    res.json(booking);

};

exports.deleteBooking = async (req, res) => {

    await prisma.booking.delete({

        where: {

            id: Number(req.params.id),

        },

    });

    res.json({

        message: "Deleted Successfully",

    });

};