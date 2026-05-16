import fs from 'fs'

let s = fs.readFileSync('src/App.jsx', 'utf8')

const pairs = [
  ['        <motion.div style={{ flex: 1, maxWidth: 700 }}>', '        <motion.div className="hero-copy" style={{ flex: 1, maxWidth: 700 }}>'],
]

// Use div - build with string concat
const D = 'motion.div'
const pairs2 = [
  ['        <' + 'div style={{ flex: 1, maxWidth: 700 }}>', '        <' + 'motion.div className="hero-copy" style={{ flex: 1, maxWidth: 700 }}>'],
]

pairs2[0] = ['        <' + 'div style={{ flex: 1, maxWidth: 700 }}>', '        <' + 'div className="hero-copy" style={{ flex: 1, maxWidth: 700 }}>']

const P = [
  ['        <' + 'motion.div style={{ flex: 1, maxWidth: 700 }}>', '        <' + 'motion.div className="hero-copy" style={{ flex: 1, maxWidth: 700 }}>'],
]

P[0] = ['        <' + 'div style={{ flex: 1, maxWidth: 700 }}>', '        <' + 'div className="hero-copy" style={{ flex: 1, maxWidth: 700 }}>']
P[1] = ['        <' + 'div style={{ flexShrink: 0, display: \'flex\', flexDirection: \'column\', gap: \'0.875rem\', width: 240 }}>', '        <' + 'div className="hero-stats" style={{ flexShrink: 0, display: \'flex\', flexDirection: \'column\', gap: \'0.875rem\', width: 240 }}>']
P[2] = ['            <motion.div key={s.label} initial={{ opacity: 0, x: 24 }}', '            <motion.div className="hero-stat-card" key={s.label} initial={{ opacity: 0, x: 24 }}']
P[3] = ['        </' + 'motion.div>\n      </' + 'div>\n\n      {/* Hero footer */}', '        </' + 'div>\n      </' + 'motion.div>\n\n      {/* Hero footer */}']
P[4] = ['      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}\n        style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'1.25rem 0 2.5rem\', borderTop: \'1px solid rgba(255,255,255,0.06)\', position: \'relative\', zIndex: 1 }}', '      <motion.div className="hero-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}\n        style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'1.25rem 0 2.5rem\', borderTop: \'1px solid rgba(255,255,255,0.06)\', position: \'relative\', zIndex: 1 }}']
P[5] = ['        <' + 'div style={{ overflow: \'hidden\', maxWidth: 360 }}>', '        <' + 'div className="hero-footer-marquee" style={{ overflow: \'hidden\', maxWidth: 360 }}>']
P[6] = ['<motion.h1 initial={{ opacity: 0, y: 30 }}', '<motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }}']
P[7] = ['<section id="services" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\' }}>', '<section id="services" className="section-pad" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\' }}>']
P[8] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'4rem\', alignItems: \'flex-end\', marginBottom: \'4rem\' }}>', '      <' + 'div className="section-header-grid" style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'4rem\', alignItems: \'flex-end\', marginBottom: \'4rem\' }}>']
P[9] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: 1, border: T.border', '      <' + 'motion.div className="services-grid" style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: 1, border: T.border']
P[9] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: 1, border: T.border', '      <' + 'div className="services-grid" style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: 1, border: T.border']
P[10] = ['<section id="studio" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border, borderBottom: T.border }}>', '<section id="studio" className="section-pad" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border, borderBottom: T.border }}>']
P[11] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>', '      <' + 'div className="why-grid" style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>']
P[12] = ['        <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'1rem\' }}>', '        <' + 'div className="why-features-grid" style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'1rem\' }}>']
P[13] = ['<section id="work" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border }}>', '<section id="work" className="section-pad" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border }}>']
P[14] = ['      <' + 'motion.div style={{ display: \'flex\', alignItems: \'flex-end\', justifyContent: \'space-between\', marginBottom: \'3.5rem\' }}>', '      <' + 'motion.div className="work-header" style={{ display: \'flex\', alignItems: \'flex-end\', justifyContent: \'space-between\', marginBottom: \'3.5rem\' }}>']
P[14] = ['      <' + 'div style={{ display: \'flex\', alignItems: \'flex-end\', justifyContent: \'space-between\', marginBottom: \'3.5rem\' }}>', '      <' + 'div className="work-header" style={{ display: \'flex\', alignItems: \'flex-end\', justifyContent: \'space-between\', marginBottom: \'3.5rem\' }}>']
P[15] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: \'1.5rem\' }}>', '      <' + 'div className="work-grid" style={{ display: \'grid\', gridTemplateColumns: \'repeat(2,1fr)\', gap: \'1.5rem\' }}>']
P[16] = ['<section id="contact" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border }}>', '<section id="contact" className="section-pad" style={{ padding: \'7rem 3rem\', maxWidth: 1280, margin: \'0 auto\', borderTop: T.border }}>']
P[17] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'5fr 7fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>', '      <' + 'motion.div className="contact-grid" style={{ display: \'grid\', gridTemplateColumns: \'5fr 7fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>']
P[17] = ['      <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'5fr 7fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>', '      <' + 'div className="contact-grid" style={{ display: \'grid\', gridTemplateColumns: \'5fr 7fr\', gap: \'5rem\', marginTop: \'4rem\', alignItems: \'start\' }}>']
P[18] = ['          <' + 'div style={{ position: \'sticky\', top: \'7rem\' }}>', '          <' + 'div className="contact-aside" style={{ position: \'sticky\', top: \'7rem\' }}>']
P[19] = ['              <' + 'div style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'1rem\' }}>', '              <' + 'div className="form-row" style={{ display: \'grid\', gridTemplateColumns: \'1fr 1fr\', gap: \'1rem\' }}>']
P[20] = ['              <' + 'div style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', paddingTop: \'0.25rem\' }}>', '              <' + 'div className="form-actions" style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', paddingTop: \'0.25rem\' }}>']
P[21] = ['      className="grid-2" style={{ display: \'grid\', gridTemplateColumns: \'repeat(4,1fr)\'', '      className="grid-2 process-grid" style={{ display: \'grid\', gridTemplateColumns: \'repeat(4,1fr)\'']
P[22] = ['      <' + 'div className="grid-2" style={{ display: \'grid\', gridTemplateColumns: \'repeat(3,1fr)\'', '      <' + 'div className="grid-2 testimonials-grid" style={{ display: \'grid\', gridTemplateColumns: \'repeat(3,1fr)\'']
P[23] = ['<footer style={{ borderTop: T.border, padding: \'2.5rem 3rem\', maxWidth: 1280, margin: \'0 auto\', display: \'flex\'', '<footer className="footer-inner section-pad" style={{ borderTop: T.border, padding: \'2.5rem 3rem\', maxWidth: 1280, margin: \'0 auto\', display: \'flex\'']
P[24] = ['          style={{ position: \'fixed\', bottom: \'2rem\', right: \'2rem\', zIndex: 80', '          className="back-to-top"\n          style={{ position: \'fixed\', bottom: \'2rem\', right: \'2rem\', zIndex: 80']
P[25] = ['      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}\n      style={{\n        padding: \'2.75rem 2.5rem\'', '      className="service-card"\n      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}\n      style={{\n        padding: \'2.75rem 2.5rem\''],
]

for (const [from, to] of P) {
  if (!s.includes(from)) console.warn('missing:', from.substring(0, 50))
  else s = s.replace(from, to)
}

fs.writeFileSync('src/App.jsx', s)
console.log('ok')
