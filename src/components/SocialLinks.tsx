import { Github, Linkedin, Instagram } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface SocialLinksProps {
  layout?: 'row' | 'column';
  showLabels?: boolean;
}

export default function SocialLinks({ layout = 'row', showLabels = false }: SocialLinksProps) {
  const socials = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abbas-dawood/' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/abbas-dawood' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/abbasdawood_07/' },
  ];

  return (
    <div className={`flex ${layout === 'column' ? 'flex-col gap-3' : 'flex-row gap-4'}`}>
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            aria-label={`Visit my ${social.name} profile`}
            className="group flex items-center gap-3 p-3 border border-cyan-900/30 bg-cyan-950/5 hover:bg-cyan-950/20 hover:border-cyan-500/50 transition-all rounded-sm"
          >
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            {showLabels && (
              <span className="font-mono text-xs uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors">
                {social.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
