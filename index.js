
//External Modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//App Variables
const player = require("./routes/player.route");
const member = require("./routes/member.route");
const table = require("./routes/table.route");
const team = require("./routes/team.route");
const playerModel = require("./models/player.model");
const memberModel = require("./models/member.model");
const tableModel = require("./models/table.model");
const teamModel = require("./models/team.model");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/player", player);
app.use("/member", member);
app.use("/table", table);
app.use("/team", team);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


const mongoose = require('mongoose');
const { table_findall } = require("./controllers/table.controller");
const { nextTick } = require("process");
const { callbackify } = require("util");
let dev_db_url = 'mongodb+srv://cgray:123admin@marchmadness.lkqne.mongodb.net/MarchMadness?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let port = 1234;

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

app.get("/backend", async (req, res) => {
	let tableData = await tableModel.find().populate({path: "members", select: "name"});
	let teamData = await teamModel.find().populate({path: "players", select: "name"});
	let memberData = await memberModel.find().populate("players");

	res.render("backend", { 
		title: "Backend",
		tableData: tableData,
		teamData: teamData,
		memberData: memberData
	});
});

app.listen(port, () => {
	console.log("Server is up and running on port number " + port);
});






