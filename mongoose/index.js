const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/college")
.then(() => console.log("conntect successfully ..."))
.catch ((err) => console.log(err));

const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        uppercase:true,
        trim: true,
        minlength: [3, "Minimum Length is 3"],
        maxlength: [10, "Minimum Length is 3"],
        // enum: ["Muhib", "Shifa"],
        
    },
    age: {
        type: Number,
        required: true,
        min: 20,
        max: 30,
    },
    fees: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Student = new mongoose.model('Student', studentsSchema);

const createStudents = async () => {
    try {
        const createStudent1 = new Student({
            name: "Fahad",
            age: 56,
            fees: true
        })
        const createStudent2 = new Student({
            name: "Shifa",
            age: 23,
            fees: false
        })
        const createStudent3 = new Student({
            name: "Monir",
            age: 33,
            fees: true
        })
        
        const studentData = await Student.insertMany([createStudent1, createStudent2, createStudent3]);
        console.log(studentData)

    }catch(error){
        console.log(error.message);
    }
}

//createStudents();

const readDocuments = async () => {
    try {
        const result = await Student.find({fees:false}).select({name: 1, _id: 0}).limit(1);
        console.log(result)

    }catch (error) {
        console.log(error.message);
    }
}

//readDocuments();

const updateDocuments = async (_id) => {
    try {
        const data = await Student.findByIdAndUpdate({_id}, {
            $set: {
                name: "zzzz",
                age: 50,
                fees: false
            }
        }, { new:true})
        
        console.log(data)

    }catch (error) {
        console.log(error.message);
    }
}

//updateDocuments("62fb457b98c4340d96a59e70");

const deleteDocuments = async (_id) => {
    try {
        const data = await Student.findByIdAndDelete({_id}, { new:true})
        
        console.log(data)

    }catch (error) {
        console.log(error.message);
    }
}

deleteDocuments("62fb457b98c4340d96a59e70");


