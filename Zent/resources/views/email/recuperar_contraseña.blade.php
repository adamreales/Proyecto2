<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Recuperacion de Contrasena</title>
</head>
<body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif; color:#1f2937;">
	<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb; padding:24px 0;">
		<tr>
			<td align="center">
				<table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,0.08);">
					<tr>
						<td style="background:#0f766e; color:#ffffff; padding:20px 24px; font-size:22px; font-weight:700;">
							Recuperacion de Contrasena - ZENT
						</td>
					</tr>
					<tr>
						<td style="padding:24px; font-size:15px; line-height:1.7;">
							<p style="margin:0 0 14px 0;">Hola,</p>
							<p style="margin:0 0 14px 0;">
								Hemos recibido una solicitud para recuperar tu contrasena. Haz clic en el boton para establecer una nueva contrasena.
							</p>
							<p style="margin:24px 0; text-align:center;">
								<a href="{{ $resetLink }}" style="display:inline-block; background:#0f766e; color:#ffffff; text-decoration:none; font-weight:700; padding:12px 20px; border-radius:8px;">
									Recuperar Contrasena
								</a>
							</p>
							<p style="margin:0 0 10px 0;">Este enlace expirara en 1 hora.</p>
							<p style="margin:0 0 18px 0;">Si no solicitaste recuperar tu contrasena, puedes ignorar este correo.</p>
							<hr style="border:none; border-top:1px solid #e5e7eb; margin:18px 0;">
							<p style="margin:0 0 6px 0; font-size:14px;"><strong>Email de la cuenta:</strong> {{ $email }}</p>
							<p style="margin:0; font-size:14px; color:#6b7280;">{{ config('app.name') }}</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
