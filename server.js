const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const NewsRoutes = require("./routes/NewsRoutes");
const FaqRoutes = require("./routes/FaqRoutes");
const DocumentsRoutes = require("./routes/DocumentsRoutes");
const ExtraDocumentsRoutes = require("./routes/ExtraDocumentsRoutes");
const GovernmentDocsRoutes = require("./routes/GovernmentDocsRoute");
const DebtorsRoutes = require("./routes/DebtorsRoutes");

const app = express();

const PORT = 5000;
const EmailToSend = "nigkolsnt@yandex.ru";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/news/", NewsRoutes);
app.use("/api/faq/", FaqRoutes);
app.use("/api/docs/", DocumentsRoutes);
app.use("/api/extra-docs/", ExtraDocumentsRoutes);
app.use("/api/docs-government/", GovernmentDocsRoutes);
app.use("/api/debtors/", DebtorsRoutes);

app.get("/api/getSecret", (req, res) => {
    res.send(process.env.SECRET_CODE);
});

// NODEMAILER

const mailer = async (message) => {
    // Step 1
    const transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 587,
        secure: false, // true only for 465
        auth: {
            user: process.env.EMAIL_LOG,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Step 2
    return transporter
        .sendMail(message)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
};

app.post("/api/feedback", (req, res) => {
    console.log(req.body);

    const message = {
        from: `${req.body.fullName} <victor.ryabkov2000@yandex.ru>`,
        to: EmailToSend,
        subject: req.body.email,
        html: `
		<div>
			<h3>${req.body.time}</h3><br/>
			<hr>
			<p>${req.body.comment}</p>
		</div>
		`,
    };

    mailer(message)
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

app.get("/", (req, res) => {
    res.send("Hello server");
});

app.get("/api", (req, res) => {
    res.send("Hello /api/ server");
});

// Launch server

app.listen(PORT, () => {
    console.log(`Back server was started on port ${PORT}`);
});