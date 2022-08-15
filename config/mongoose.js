const mongoose=require('mongoose');
// db connection
const db='mongodb+srv://nav:navjot@cluster0.uvhfwwp.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db)
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err))