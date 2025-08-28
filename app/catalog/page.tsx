import { Suspense } from 'react'
import CatalogContent from './CatalogContent'

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CatalogContent />
    </Suspense>
  )
}