const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
doc.pipe(fs.createWriteStream('public/Abbas_Dawood_Resume.pdf'));

// Header
doc.fontSize(24).font('Helvetica-Bold').text('ABBAS DAWOOD', { align: 'center' });
doc.fontSize(12).font('Helvetica').text('Aspiring Commercial Pilot | Tech & Digital Enthusiast', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(10).text('Udaipur, Rajasthan, India | +91 90243 28122 | abbassaifee43@gmail.com', { align: 'center' });
doc.moveDown(2);

// Section: Profile
doc.fontSize(14).font('Helvetica-Bold').text('PROFILE');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').text('Dedicated aspiring commercial pilot with a strong foundation in aviation, technology, and leadership. Experienced in flight simulation, Model United Nations diplomacy, and digital systems. Possesses a unique blend of technical acumen and operational discipline, aiming to leverage these skills in the aviation sector.');
doc.moveDown(1.5);

// Section: Education
doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('Central Public School, Udaipur');
doc.fontSize(10).font('Helvetica').text('Class XII (PCM) | 2024 - 2025');
doc.moveDown(0.5);
doc.fontSize(11).font('Helvetica-Bold').text('Central Public School, Udaipur');
doc.fontSize(10).font('Helvetica').text('Class X | 2022 - 2023 | Percentage: 87.2%');
doc.moveDown(1.5);

// Section: Experience & Leadership
doc.fontSize(14).font('Helvetica-Bold').text('EXPERIENCE & LEADERSHIP');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').text('Technical Head & Member');
doc.fontSize(10).font('Helvetica').text('CPS Alumni Association | 2024');
doc.list([
  'Managed technical infrastructure and digital presence for alumni events.',
  'Coordinated with team members to ensure smooth execution of technical requirements.'
], { bulletRadius: 2 });
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').text('Secretariat Member & USG IT');
doc.fontSize(10).font('Helvetica').text('CPS MUN | 2023 - 2024');
doc.list([
  'Served as Under-Secretary-General for Information Technology.',
  'Developed and maintained the MUN website and digital registration systems.',
  'Ensured seamless technical operations during the conference.'
], { bulletRadius: 2 });
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').text('Vice Head Boy');
doc.fontSize(10).font('Helvetica').text('Central Public School | 2023 - 2024');
doc.list([
  'Led the student council and coordinated school-wide events and assemblies.',
  'Acted as a liaison between students and school administration.'
], { bulletRadius: 2 });
doc.moveDown(1.5);

// Page 2
doc.addPage();

// Section: Skills
doc.fontSize(14).font('Helvetica-Bold').text('SKILLS & COMPETENCIES');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').text('• Aviation: Flight Simulation (X-Plane 12), Instrument Scanning, Basic Aerodynamics');
doc.text('• Technology: IT Infrastructure, Basic Web Development, Hardware Troubleshooting');
doc.text('• Soft Skills: Leadership, Public Speaking, Diplomacy, Team Management, Critical Thinking');
doc.moveDown(1.5);

// Section: Certifications & Achievements
doc.fontSize(14).font('Helvetica-Bold').text('CERTIFICATIONS & ACHIEVEMENTS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').list([
  'Class 2 Medical Certified (DGCA) - 2024',
  'Best Delegate - Various Model United Nations Conferences',
  'High Commendation - MUN Diplomacy Events',
  'Certificate of Excellence - CPS Alumni Association'
], { bulletRadius: 2 });
doc.moveDown(1.5);

// Section: Hobbies & Interests
doc.fontSize(14).font('Helvetica-Bold').text('HOBBIES & INTERESTS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').text('Flight Simulation, Reading Aviation Literature, Exploring Emerging Technologies, Debating.');

doc.end();
console.log('PDF generated successfully');
