const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '../public'));

app.use(express.json()); // using express to read the data  [ mideal were]
app.use(express.urlencoded({extended:false}));  // readting data from the webpage [ mideal were]

const static_path = path.join(__dirname, "../public");   // importing usign CSS file 
const template_path = path.join(__dirname, "../templates/views");      // importing usign views file 
const partials_path = path.join(__dirname, "../templates/partials");   // importing usign partials file 

app.set("view engine", "hbs");
app.use(express.static(static_path));  // usign CSS file
app.set("views", template_path);       // using views folder
hbs.registerPartials(partials_path);   // using partials folder 

// app.get("/", (req, res) => {
//     res.render("index");Email or Password Does't match..
// });


app.get("/", (req, res) => {
    res.render("login");
});


app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(useremail.password === password) {
            res.status(201).render("index");
            console.log("User is Live..!!");
        }else {
            res.send("Email or Password Does't match..!!")
        }
    }catch(e) {
        res.status(400).send("Invalid Email and Password!!")
    }
})

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword) {
            const newRegisteration  = new Register( {
                fullname: req.body.fullname,
                email: req.body.email,
                phone: req.body.phone,
                password:password,
                confirmpassword:cpassword
            })
            const registered = newRegisteration.save();
            res.status(201).render("login");
            console.log("data is save into database..!!");
        }else {
            res.send("Password Dont match..!!");
        }
    }catch(e) {
        res.status(400).send(e);
    }
});


/* lisrening at define port */
app.listen(port, () => {
    console.log('Server is Runing on port',port);
});

