import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

function Footer({ company, isDark, themeClasses }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6 }}
      className={`border-t ${themeClasses.line} ${isDark ? 'bg-slate-950/55' : 'bg-white/70'}`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{company.name}</p>
          <p className={`mt-2 text-sm ${themeClasses.mutedText}`}>{company.tagline}</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className={themeClasses.mutedText}>{company.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${company.contactRaw}`} className={themeClasses.mutedText}>
              {company.contact}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${company.email}`} className={themeClasses.mutedText}>
              {company.email}
            </a>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <a href={company.website} target="_blank" rel="noreferrer" className={themeClasses.mutedText}>
              {company.website}
            </a>
          </p>
          <p className={themeClasses.mutedText}>GST: {company.gstNo}</p>
          <p className={themeClasses.mutedText}>Working Hours: {company.workingHours}</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
