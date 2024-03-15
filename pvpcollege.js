const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup
const college_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "college"
});

college_connection.connect((error) => {
    if (error) {
        console.error("Error while connecting to college database:", error);
        process.exit(1);
    } else {
        console.log("College database connected");
    }
});

const student_connection_pvp = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: "pvp45"
});

student_connection_pvp.connect((error) => {
    if (error) {
        console.error("Error while connecting to AMRT student database:", error);
        process.exit(1);
    } else {
        console.log("AMRT Student database connected");
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "student_login.html"));
});

app.post('/login', (req, res) => {
    const stud_username = req.body.stud_username;
    const stud_password = req.body.stud_password;
    const college_code = req.body.college_code;

    const query_college = 'SELECT * FROM college_list WHERE college_code = ?';
    college_connection.query(query_college, college_code, (err, result_college) => {
        if (err) {
            console.error("Error executing college code query", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result_college.length === 0) {
            return res.status(404).json({ error: "College code not found" });
        }

        const query_pvp = 'SELECT * FROM student WHERE stud_username = ? AND stud_password = ?';
        student_connection_pvp.query(query_pvp, [stud_username, stud_password], (err, result_pvp) => {
            if (err) {
                console.error("Error executing Amrt student query", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result_pvp.length > 0) {
                // return res.redirect('/profile_login.html');
         
                res.status(200).json({alert:"successfully login" });
                 //res.status(200).json({ userType: "Prec", data: result_prec[0] });
                
            }else{
                 return res.status(404).json({ error: "Student data not found" });
                
            }

           

        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
