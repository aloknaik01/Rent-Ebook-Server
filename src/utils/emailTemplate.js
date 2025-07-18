// export function generateVOtpTemplate (otp) {
//     return {
//         `<div style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, sans-serif;">
//     <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f7; padding: 20px 0;">
//       <tr>
//         <td align="center">
//           <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
//             <tr>
//               <td align="center" style="padding: 40px 20px;">
//                 <h1 style="color:#333333; font-size:24px; margin:0 0 20px;">Your Verification Code</h1>
//                 <p style="color:#555555; font-size:16px; margin:0 0 30px;">
//                   Use the code below to verify your email address:
//                 </p>
//                 <p style="display:inline-block; padding:12px 24px; background-color:#4f46e5; color:#ffffff; font-size:20px; letter-spacing:2px; border-radius:4px; text-decoration:none; margin:0 0 30px;">
//                   ${otp}
//                 </p>
//                 <p style="color:#555555; font-size:14px; line-height:1.5; margin:0;">
//                   This code will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.
//                 </p>
//                 <p style="color:#999999; font-size:12px; margin-top:30px;">
//                   &copy; ${new Date().getFullYear()} Erent. All rights reserved.
//                 </p>
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </div>
//         `;
//     }
// }

export function generateVOtpTemplate(otp) {
  return `
    <div style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f7; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <h1 style="color:#333333; font-size:24px; margin:0 0 20px;">Your Verification Code</h1>
                  <p style="color:#555555; font-size:16px; margin:0 0 30px;">
                    Use the code below to verify your email address:
                  </p>
                  <p style="display:inline-block; padding:12px 24px; background-color:#4f46e5; color:#ffffff; font-size:20px; letter-spacing:2px; border-radius:4px; text-decoration:none; margin:0 0 30px;">
                    ${otp}
                  </p>
                  <p style="color:#555555; font-size:14px; line-height:1.5; margin:0;">
                    This code will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.
                  </p>
                  <p style="color:#999999; font-size:12px; margin-top:30px;">
                    &copy; ${new Date().getFullYear()} Erent. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}
