const prisma=require("../config/db");

exports.createReview=async(req,res)=>{

const review=await prisma.review.create({

data:req.body

});

res.json(review);

};

exports.getReviews=async(req,res)=>{

const reviews=await prisma.review.findMany({

where:{

approved:true

}

});

res.json(reviews);

};



exports.approveReview = async (req, res) => {
  try {
    const review = await prisma.review.update({
      where: { id: Number(req.params.id) },
      data: { approved: req.body.approved ?? true },
    });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};