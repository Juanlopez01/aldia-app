import { transporter, from } from "@/config/nodemailer";

export async function sendVerificationRequest(params: { email: string; url: any; }) {
  const { email, url } = params
  const { host } = new URL(url)
  const htmlParams ={
     header:'Verifica tu email' ,
     callToAction:'Verificar Email', 
     footer:'Si no te quieres registrar'
}  
const result = await transporter.sendMail({
    to: email,
    from,
    subject: `Registate en ${host}`,
    text: `Verifica tu Email en ${host}`,
    html: html({ url, host, ...htmlParams }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) no se puedo enviar`)
  }
}


export async function sendMailToChangePassword(params: { email: string; url: any; }) {
  const { email, url } = params
  const { host } = new URL(url)
  const htmlParams ={
     header:'Cambia tu contraseña' ,
     callToAction:'Cambiar contraseña', 
     footer:'Si no te quieres cambiar tu contraseña'
}
const result = await transporter.sendMail({
    to: email,
    from,
    subject: `Recuperar cuenta ${host}`,
    text: `Recupera tu cuenta en ${host}`,
    html: html({ url, host, ...htmlParams }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) no se puedo enviar`)
  }
}

interface htmlParams {
  url: string
  host: string
  header: string
  callToAction: string
  footer: string
}

function html(params: htmlParams): string {
  const { url, host, header, callToAction, footer } = params



  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor =  "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        ${header} en <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> ${callToAction}</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        ${footer} en <strong>${escapedHost}</strong> puedes ignorar este mensaje.
      </td>
    </tr>
  </table>
</body>
`
}
