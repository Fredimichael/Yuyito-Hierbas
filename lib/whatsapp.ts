import { WHATSAPP_PHONE } from './config'
import type { Product } from '@/data/products'

type Item = (Product & { qty: number })

export function buildWhatsAppMessage(items: Item[], total: number) {
  const lines = [
    `*Pedido ${new Date().toLocaleDateString('es-AR')}*`,
    '',
    ...items.map(i => `• ${i.title} x${i.qty} — $${(i.price * i.qty).toFixed(0)}`),
    '',
    `*Total:* $${total.toFixed(0)}`,
  ]
  return lines.join('\n')
}

export function getWhatsAppLink(text: string) {
  const encoded = encodeURIComponent(text)
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`
}
