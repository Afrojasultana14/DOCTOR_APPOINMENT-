const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "doctor_appointment"
});

db.connect(function(error) {
    if (error) {
        console.log("Database connection failed");
        console.log(error);
    } else {
        console.log("Database connected successfully");
    }
});

app.get("/doctors", function(req, res) {
    const sql = "SELECT * FROM doctors";

    db.query(sql, function(error, result) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
});

app.post("/appointment", function(req, res) {
    const patient_name = req.body.patient_name;
    const patient_phone = req.body.patient_phone;
    const doctor_id = req.body.doctor_id;
    const appointment_date = req.body.appointment_date;

    const sql = `
        INSERT INTO appointments
        (patient_name, patient_phone, doctor_id, appointment_date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [patient_name, patient_phone, doctor_id, appointment_date],
        function(error, result) {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json({
                    message: "Appointment booked successfully"
                });
            }
        }
    );
});

app.get("/appointments", function(req, res) {
    const sql = `
        SELECT
            appointments.id,
            appointments.patient_name,
            appointments.patient_phone,
            appointments.appointment_date,
            doctors.name AS doctor_name,
            doctors.specialization
        FROM appointments
        JOIN doctors
        ON appointments.doctor_id = doctors.id
    `;

    db.query(sql, function(error, result) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
});

app.listen(5000, function() {
    console.log("Server is running at http://localhost:5000");
});
