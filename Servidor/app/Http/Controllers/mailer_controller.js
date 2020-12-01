var nodemailer = require('nodemailer');

let sendMail = (req, res) => {
    let datos = req.body;
    console.log(datos);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sispspi.notification@gmail.com',
            pass: 'PSPI 2020'
        }
    });

    var mailOptions = {
        from: 'Biometrico <bio.notification@gmail.com>',
        to: datos.emails,
        subject: datos.asunto,
        html: `<table style="border-top: 10px;border-bottom: 10px; border-color: black; "><tr><th style="color: black; font-size: 7; text-align: center;"> ${datos.body} </th></tr>    </table>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({
                ok: false,
                action: error,
            })
        } else {
            return res.status(200).json({
                ok: true,
                action: 'Correo Enviado',
                mensaje: info
            })
        }
    });
};



module.exports = {
    sendMail
};
