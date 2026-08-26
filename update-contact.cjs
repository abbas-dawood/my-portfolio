const fs = require('fs');
let code = fs.readFileSync('src/components/Contact.tsx', 'utf8');

const targetState = `  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    hidden: ''
  });`;

const replacementState = `  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
    hidden: ''
  });`;

code = code.replace(targetState, replacementState);

const targetSuccessClear = `          setFormData({ name: '', email: '', message: '', hidden: '' });`;
const replacementSuccessClear = `          setFormData({ name: '', email: '', purpose: '', message: '', hidden: '' });`;
code = code.replace(targetSuccessClear, replacementSuccessClear);

const targetSelect = `            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Return Channel (Email)</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
              />
            </div>`;

const replacementSelect = targetSelect + `
            <div className="flex flex-col gap-2">
              <label htmlFor="purpose" className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase">Transmission Purpose</label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange as any}
                required
                className="bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#020617] text-gray-500">Select purpose...</option>
                <option value="Collaboration" className="bg-[#020617] text-white">Collaboration</option>
                <option value="Business Inquiry" className="bg-[#020617] text-white">Business Inquiry</option>
                <option value="Project Inquiry" className="bg-[#020617] text-white">Project Inquiry</option>
                <option value="MUN / Diplomacy" className="bg-[#020617] text-white">MUN / Diplomacy</option>
                <option value="Speaking / Event" className="bg-[#020617] text-white">Speaking / Event</option>
                <option value="Internship / Opportunity" className="bg-[#020617] text-white">Internship / Opportunity</option>
                <option value="Technical Inquiry" className="bg-[#020617] text-white">Technical Inquiry</option>
                <option value="General Inquiry" className="bg-[#020617] text-white">General Inquiry</option>
                <option value="Other" className="bg-[#020617] text-white">Other</option>
              </select>
              {formData.purpose === 'Other' && (
                <input
                  type="text"
                  name="purpose"
                  placeholder="Please specify..."
                  onChange={handleChange}
                  required
                  className="mt-2 bg-black/40 border-b border-cyan-900/50 text-white font-sans px-4 py-3 outline-none focus:border-cyan-500 focus:bg-cyan-950/20 transition-all rounded-sm"
                />
              )}
            </div>`;

code = code.replace(targetSelect, replacementSelect);

const targetDirectContact = `              <div className="mt-8">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">External Profiles</p>
                <SocialLinks layout="row" showLabels={true} />
              </div>`;

const replacementDirectContact = `              <div className="mt-8">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Direct Contact</p>
                <div className="flex flex-col gap-3 mb-8">
                  <a href="mailto:abbassaifee43@gmail.com" className="flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                    <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">abbassaifee43@gmail.com</span>
                  </a>
                  <a href="tel:+919024328122" className="flex items-center gap-4 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 transition-colors rounded-sm group">
                    <span className="w-4 h-4 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 font-mono text-xs">#</span>
                    <span className="font-sans text-sm text-gray-300 group-hover:text-white transition-colors">+91 90243 28122</span>
                  </a>
                </div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">External Profiles</p>
                <SocialLinks layout="row" showLabels={true} />
              </div>`;

code = code.replace(targetDirectContact, replacementDirectContact);

fs.writeFileSync('src/components/Contact.tsx', code);
