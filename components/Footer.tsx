import { FaWhatsapp, FaInstagram } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-sm">
        
        {/* Copyright */}
        <p className="opacity-70">© {new Date().getFullYear()} Yuyito Hierbas</p>
        
        {/* Contactos con iconos */}
        <div className="flex items-center gap-6">
          
          {/* WhatsApp joyas */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <FaWhatsapp className="w-5 h-5 text-green-500" />
            <span>WhatsApp</span>
          </a>

          {/* Instagram joyas */}
          <a
            href="https://instagram.com/yuyito_hierbas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <FaInstagram className="w-5 h-5 text-pink-500" />
            <span>Instagram</span>
          </a>

          {/* WhatsApp programador */}
        </div>

        {/* Tech credit */}
        <p className="opacity-70">
          Sitio desarrollado por <a href="https://wa.me/543644592618" className="underline hover:opacity-80">Fredi</a>
        </p>

      </div>
    </footer>
  )
}
