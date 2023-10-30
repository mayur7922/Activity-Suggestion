import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res)=>{
    try{
      const response = await axios.get("https://bored-api.appbrewery.com/random");
      const result = response.data;
      res.render("index.ejs",{data : result});
    } 
    catch(error){
      console.log("Error");
    }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post("/", async (req, res) => {
  const type = req.body.type;
  const p = req.body.participants;
  const url = "https://bored-api.appbrewery.com/filter?" + "type=" + type + "&" + "participants=" + p;
  try{
    const response1 = await axios.get(url);
    const result1 = response1.data;
    var num = getRandomInt(result1.length);
    res.render("index.ejs",{data : result1[num]});
  }
  catch(error){
    console.log("No activities that match your criteria.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
