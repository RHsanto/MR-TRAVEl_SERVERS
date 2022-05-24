const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors')
const app =express();
const port = process.env.PORT || 8000;

//midalware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mr-travel-app.aqkf7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

  try {
    await client.connect();
    const database = client.db("allDataCollection");
    const CollectionOne = database.collection("collectionOne");
    const CollectionTwo = database.collection("collectionTwo");
    const CollectionThree = database.collection("collectionThree");
    const CollectionFour = database.collection("collectionFour");
    const CollectionFive = database.collection("offersCollection");
    const bookingCollection = database.collection("bookingCollection");
   

 // GET API REVIEWS
 app.get('/busInfo', async (req,res)=>{
  const cursor = CollectionOne.find({});
  const bus = await cursor.toArray();
  res.send(bus);

 });
 app.get('/tourInfo', async (req,res)=>{
  const cursor = CollectionTwo.find({});
  const tour = await cursor.toArray();
  res.send(tour);

 });
 app.get('/flightInfo', async (req,res)=>{
  const cursor = CollectionThree.find({});
  const flight = await cursor.toArray();
  res.send(flight);

 });
 app.get('/hotelInfo', async (req,res)=>{
  const cursor = CollectionFour.find({});
  const hotel = await cursor.toArray();
  res.send(hotel);

 });
 app.get('/offersInfo', async (req,res)=>{
  const cursor = CollectionFive.find({});
  const hotel = await cursor.toArray();
  res.send(hotel);

 });
 
  // GET SINGLE OFFERS
  app.get('/offers/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await CollectionFive.findOne(query)
  res.json(booking);
  });
  
  // GET SINGLE OFFERS
  app.get('/flights/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await CollectionThree.findOne(query)
  res.json(booking);
  });
  // GET SINGLE OFFERS
  app.get('/tours/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await CollectionTwo.findOne(query)
  res.json(booking);
  });
  // GET SINGLE OFFERS
  app.get('/bus/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await CollectionOne.findOne(query)
  res.json(booking);
  });
 
  // here put booking data
  app.post('/booking', async (req,res) => {
    const user = req.body;
    const result = await bookingCollection.insertOne(user);
    res.json( result)
  })




  } 
  
  finally {
   // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
  res.send('Running the server on Mr. Travel');
})
app.listen(port, () => {
  console.log('Running the server on Mr. Travel',port)
})
