const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB URI and client setup
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.svllkb0.mongodb.net/`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-mern.qq3lbek.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-mern`;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');

    // Create db and collections
    const db = client.db('mernJobPortal');
    const jobsCollections = db.collection('demoJobs');

    // Routes
    app.post('/post-job', async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        console.log(result)
        res.status(200).send(result);
      } else {
        res.status(404).send({
          message: 'Cannot insert! Try again later',
          status: false,
        });
      }
    });
// get all jobs
    app.get('/all-jobs', async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      console.log("req recieved sending back the data ",jobs)
      res.send(jobs);
    });
// get jobs by email
     app.get("/myJobs/:email", async(req,res)=> {
       // console.log(req.params.email)
      const jobs = await jobsCollections.find({postedBy: req.params.email}).toArray();
      res.send(jobs)
     })

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

// // get jobs by emaill
// app.get("/myJobs/email", async(req,res)=> {
//   // console.log(req.params.email)
//   const jobs = await jobsCollections.find({postedBy: req.params.email}).toArray();
//   res.send(jobs)
// })