import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose.connect('mongodb://localhost:27017/Cloche', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default dbConnect;
