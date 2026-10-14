#!/usr/bin/env bash
IP=$(hostname -I | awk '{print $1}')
echo "=========================================================="
echo " 🌿 YUYITO HIERBAS V2 - MODO DESARROLLO LOCAL"
echo "=========================================================="
echo " 💻 Desde tu PC:      http://localhost:3000"
echo " 📱 Desde tu Celular: http://$IP:3000"
echo " 🔐 Panel Admin:      http://$IP:3000/admin"
echo "=========================================================="
echo "Iniciando servidor Next.js en 0.0.0.0..."
pnpm dev
