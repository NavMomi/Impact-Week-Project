const mongoose=require('mongoose');
// db connection
const db='mongodb+srv://navjotk:navjotkaur@cluster0.q5optfg.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db)
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err))