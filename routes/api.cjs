const router = require("express").Router();
import Transaction from "../models/transaction";

router.post("/api/transaction", ({ body }, res) => {
Transaction.create(body)
.then(dbTransaction => {
    res.json(dbTransaction)
})
.catch(err => {
    res.status(400).json(err)
})
});

router.post("/api.transaction/bulk", ({ body }, res) => {
    Transaction.insertMany(body)
    .then(dbTransaction => {
        res.json(dbTransaction)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

router.get("/api/transaction", (req,res) => {
    Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
        res.json(dbTransaction)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

export default router;