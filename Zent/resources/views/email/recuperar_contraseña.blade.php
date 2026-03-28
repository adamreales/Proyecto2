<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Recuperación de Contraseña</title>
</head>

<body style="margin:0; padding:0; background:#ffffff; font-family:Arial, Helvetica, sans-serif; color:#000;">

	<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff; padding:30px 0;">
		<tr>
			<td align="center">

				<!-- CONTENEDOR -->
				<table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width:620px; width:100%; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #00f7ff; box-shadow:0 0 20px rgba(0, 255, 255, 0.15);">

					<!-- HEADER -->
					<tr>
						<td style="background: linear-gradient(90deg, #00f7ff, #00c3ff); padding:20px; text-align:center;">
							<h1 style="margin:0; font-size:24px; color:#000; letter-spacing:1px;">
								🔐 Recuperación de Contraseña
							</h1>
						</td>
					</tr>

					<!-- BODY -->
					<tr>
						<td style="padding:25px; font-size:15px; line-height:1.7;">

							<p style="margin:0 0 14px 0;">Hola,</p>

							<p style="margin:0 0 14px 0;">
								Hemos recibido una solicitud para recuperar tu contraseña.
								Haz clic en el botón para establecer una nueva.
							</p>

							<!-- BOTON -->
							<p style="margin:30px 0; text-align:center;">
								<a href="{{ $resetLink }}"
								   style="display:inline-block; background:#000; color:#00f7ff; text-decoration:none; font-weight:bold; padding:14px 22px; border-radius:8px; border:1px solid #00f7ff; box-shadow:0 0 10px rgba(0,255,255,0.5);">
									⚡ Recuperar Contraseña
								</a>
							</p>

							<!-- INFO BOX -->
							<div style="background:#f5ffff; border-left:4px solid #00f7ff; padding:15px; border-radius:6px; margin-bottom:20px;">
								<p style="margin:0;">
									⏳ Este enlace expirará en <strong style="color:#00c3ff;">1 hora</strong>.
								</p>
							</div>

							<p style="margin:0 0 18px 0;">
								Si no solicitaste recuperar tu contraseña, puedes ignorar este correo.
							</p>

							<hr style="border:none; border-top:1px solid #00f7ff; margin:20px 0;">

							<p style="margin:0 0 6px 0; font-size:14px;">
								<strong>Email:</strong>
								<span style="color:#00c3ff;">{{ $email }}</span>
							</p>

							<p style="margin:0; font-size:14px;">
								<strong style="color:#00c3ff;">{{ config('app.name') }}</strong>
							</p>

						</td>
					</tr>

					<!-- FOOTER -->
					<tr>
						<td style="background:#000; color:#00f7ff; text-align:center; padding:15px; font-size:13px;">
							© Zent - Gaming Store 🎮
						</td>
					</tr>

				</table>

			</td>
		</tr>
	</table>

</body>
</html>
