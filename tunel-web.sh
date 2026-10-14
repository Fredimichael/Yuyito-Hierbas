#!/usr/bin/env bash
echo "=========================================================="
echo " 🚀 TÚNEL CLOUDFLARE - ACCESO WEB DESDE CUALQUIER LUGAR"
echo "=========================================================="
echo "Generando enlace público seguro HTTPS para ver tu tienda..."
echo "=========================================================="
cloudflared tunnel --url http://localhost:3000
