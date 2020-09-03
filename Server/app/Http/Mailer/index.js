var nodemailer = require('nodemailer');

let sendMail = (req, res) => {
    let datos = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sispspi.notification@gmail.com',
            pass: 'PSPI 2020'
        }
    });

    var mailOptions = {
        from: 'PSPI <sispspi.notification@gmail.com>',
        to: 'edg.erraez@yavirac.edu.ec',
        subject: datos.asunto,
        html: `<table style="border-top: 10px;border-bottom: 10px; border-color: black; "><tr><th style="color: black; font-size: 7; text-align: center;"> ${datos.mensaje} </th></tr>    </table>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({
                ok: true,
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
