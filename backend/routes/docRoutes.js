const multer =require( "multer")
const express =require( "express")
const Doc =require("../models/docModel.js")
const reqAuth =require("../middleware/reqAuth.js")
const router=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

router.post('/upload-files',upload.single('file'),async (req,res)=>{
    console.log(req.file)
    const title=req.body.title
    const fileName=req.file.filename
    const teacher_id=req.body.teacher_id
    try{
        const newDoc=await Doc.create({
            title:title,
            file:fileName,
            teacher_id:teacher_id
        })
        res.send({status:'ok'})
    }
    catch(err){
        res.send({ status: err });
    }
})
router.get("/get-files", async (req, res) => {
    try {
      const docs=await Doc.find({}).sort({createdAt:-1})
      console.log(docs)
      res.send({ status: "ok", docs:docs });
    } catch (err) {
      res.send({ status: err });
    }
});

router.get("/search/:title", async (req, res) => {
    let title=req.params.title
    title=title.toLowerCase()
    console.log(title)
    try {
      const docs=await Doc.find({}).sort({createdAt:-1})
      const docsFiltered=docs.filter((doc)=>{return doc.title.includes(title)})
      console.log(docsFiltered)
      res.send({ status: "ok", docs:docsFiltered });
    } catch (err) {
      res.send({ status: err });
    }
});

router.get("/filter/:id", async (req, res) => {
    try {
      const id=req.params.id
      const docs=await Doc.find({teacher_id:id}).sort({createdAt:-1})
      console.log(docs)
      res.send({ status: "ok", docs:docs });
    } catch (err) {
      res.send({ status: err });
    }
});

router.delete("/deletedoc/:id", async (req, res) => {
    try {
      const id=req.params.id
      const doc=await Doc.findByIdAndDelete(id)
      console.log(doc)
      res.send({ status: "ok", doc:doc });
    } catch (err) {
      res.send({ status: err });
    }
});

module.exports=router