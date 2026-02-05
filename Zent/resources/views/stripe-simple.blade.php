<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Prueba Stripe</title>
</head>
<body>

    <h2>Prueba Stripe API</h2>

    <button id="pagar">Probar pago</button>

    <pre id="respuesta"></pre>

    <script>
        document.getElementById('pagar').addEventListener('click', async () => {

            document.getElementById('respuesta').innerText = 'Llamando a Stripe...';

            const response = await fetch('http://localhost:8000/api/crear_pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    precio: 1000,
                    moneda: 'eur'
                })
            });

            const data = await response.json();

            document.getElementById('respuesta').innerText =
                JSON.stringify(data, null, 2);
        });
    </script>

</body>
</html>
