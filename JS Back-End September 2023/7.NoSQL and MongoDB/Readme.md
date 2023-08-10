Summary 

NoSQL databases provide superior performance

Mongoise give us a schema-based solution - 
const modelSchema = new mongoose.Schema({ propString : String  });

Mongoose supports all CRUD operations

Chaining queries with Mongoose is possible
Student.find({}).where('firstName').equals('gosho').where('age').gt(18).lt(65).sort({age:1}).skip(10).limit(10)

