const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({ margin: 50, size: 'A4' });
doc.pipe(fs.createWriteStream('public/Abbas_Dawood_Resume.pdf'));

// Header
doc.fontSize(20).font('Helvetica-Bold').text('ABBAS DAWOOD', { align: 'center' });
doc.fontSize(11).font('Helvetica').text('Aspiring Commercial Pilot | Student Leader | Technology Enthusiast', { align: 'center' });
doc.moveDown(0.2);
doc.fontSize(9).text('Udaipur, Rajasthan | +91 90243 28122 | abbassaifee43@gmail.com | LinkedIn', { align: 'center' });
doc.moveDown(2);

// Section: Profile
doc.fontSize(12).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').text('Disciplined and driven Senior Secondary student (Science: Physics, Chemistry, Mathematics) with a clear aspiration toward a career as a Commercial Pilot. Demonstrates strong situational awareness, structured problem-solving, and composure under pressure, cultivated through active participation in Model United Nations conferences and independent research initiatives. Combines an analytical, safety-conscious mindset with proven adaptability and a growth-oriented approach to learning. Recognized for clear communication, sound decision-making, and a genuine passion for aviation, innovation, and cross-cultural diplomacy.', { align: 'justify' });
doc.moveDown(1.5);

// Section: Education
doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('National Institute of Open Schooling (NIOS) — Udaipur, Rajasthan', { continued: true });
doc.font('Helvetica-Oblique').text('                                Expected May 2027', { align: 'right' });
doc.fontSize(9).font('Helvetica-Oblique').text('Senior Secondary Education — Physics, Chemistry, Mathematics (PCM)');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').list([
  'Pursuing a rigorous PCM curriculum, building strong analytical and quantitative reasoning skills essential for flight training and technical decision-making',
  'Balances demanding academics with active extracurricular leadership through MUN participation',
  'Cultivates disciplined, self-directed study habits reflective of the structure required in aviation training environments'
], { bulletRadius: 2 });
doc.moveDown(1);

doc.fontSize(10).font('Helvetica-Bold').text('Delhi Public School (DPS) — Udaipur, Rajasthan', { continued: true });
doc.font('Helvetica-Oblique').text('                                        March 2020 - March 2026', { align: 'right' });
doc.fontSize(9).font('Helvetica-Oblique').text('Secondary Education, PCM Stream');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').list([
  'Completed foundational schooling (Class 6-11) across Physics, Chemistry, Mathematics, and Computer Science',
  'Developed core analytical thinking and teamwork skills through collaborative academic projects',
  'Engaged consistently in extracurricular activities, including Model United Nations, alongside core studies'
], { bulletRadius: 2 });
doc.moveDown(1.5);

// Section: Experience & Leadership
doc.fontSize(12).font('Helvetica-Bold').text('EXPERIENCE & LEADERSHIP');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('Model United Nations (MUN) Participant', { continued: true });
doc.font('Helvetica-Oblique').text('                                              November 2022 - Present', { align: 'right' });
doc.fontSize(9).font('Helvetica-Oblique').text('Various MUN Conferences, Udaipur, Rajasthan');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').list([
  'Represented assigned nations in structured multilateral debates on global diplomacy and policy issues, sharpening critical thinking under time pressure',
  'Cultivated advanced public speaking, negotiation, and persuasive communication skills across multiple conference settings',
  'Practiced composed, rational decision-making while navigating high-pressure debate scenarios and shifting positions',
  'Strengthened leadership presence and cross-cultural collaboration by engaging respectfully with diverse viewpoints'
], { bulletRadius: 2 });
doc.moveDown(1);

doc.fontSize(10).font('Helvetica-Bold').text('Independent Technology & Innovation Initiative', { continued: true });
doc.font('Helvetica-Oblique').text('                                          April 2021 - Present', { align: 'right' });
doc.fontSize(9).font('Helvetica-Oblique').text('Self-Directed, Udaipur, Rajasthan');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').list([
  'Spearheaded independent research into emerging technologies, digital tools, and innovation trends to build practical, real-world knowledge',
  'Managed self-directed learning projects end-to-end, applying structured problem-solving to translate concepts into working outcomes',
  'Analyzed startup ecosystems and “Make-in-India” innovation themes, developing a foundational understanding of entrepreneurial thinking',
  'Applied design tools (Figma, Canva) and video editing to independently plan and produce creative digital projects'
], { bulletRadius: 2 });
doc.moveDown(1.5);

// Section: Skills
doc.fontSize(12).font('Helvetica-Bold').text('KEY SKILLS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('Core Competencies: ', { continued: true });
doc.font('Helvetica').text('Critical Thinking · Decision-Making Under Pressure · Structured Problem-Solving · Analytical Mindset · Situational Awareness');
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('Leadership & Communication: ', { continued: true });
doc.font('Helvetica').text('Public Speaking · International Diplomacy · Team Collaboration · Adaptability');
doc.moveDown(0.3);
doc.fontSize(10).font('Helvetica-Bold').text('Digital & Design Tools: ', { continued: true });
doc.font('Helvetica').text('Figma · Canva · Video Editing');
doc.moveDown(1.5);

// Section: Certifications
doc.fontSize(12).font('Helvetica-Bold').text('CERTIFICATIONS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('Eureka! Junior 2025 — Entrepreneurship Program', { continued: true });
doc.font('Helvetica-Oblique').text('                                                            December 2025', { align: 'right' });
doc.fontSize(9).font('Helvetica-Oblique').text('Issued by: E-Cell, IIT Bombay');
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').list([
  'Selected as a participant in a national-level entrepreneurship program among a competitive applicant pool',
  'Cultivated problem-solving, idea validation, and entrepreneurial thinking through exposure to real startup ecosystems',
  'Analyzed business fundamentals and innovation frameworks, strengthening structured decision-making abilities'
], { bulletRadius: 2 });
doc.moveDown(1.5);

// Section: Hobbies & Interests
doc.fontSize(12).font('Helvetica-Bold').text('HOBBIES & INTERESTS');
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').list([
  'Aviation Tracking & Flight Mechanics Analysis',
  'Basic Coding & Web Development (Self-Learning Phase)',
  'Strategic Gaming Mechanics Analysis',
  'Public Speaking & Debates',
  'Traveling & Exploring New Places'
], { bulletRadius: 2 });
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica-Bold').text('Languages: ', { continued: true });
doc.font('Helvetica').text('English, Hindi');

doc.end();
console.log('PDF generated successfully');
