#!/usr/bin/env bash
echo "=========================================================="
echo " 🌐 INSTALACIÓN DE TAILSCALE PARA ACCESO REMOTO SEGURO"
echo "=========================================================="
echo "Este script instalará Tailscale en tu sistema para que puedas"
echo "conectarte por SSH (Termius) desde el trabajo o datos móviles."
echo ""
curl -fsSL https://tailscale.com/install.sh | sh
echo ""
echo "Iniciando Tailscale..."
sudo tailscale up
echo ""
echo "Tu IP fija de Tailscale es:"
tailscale ip -4
echo "=========================================================="
