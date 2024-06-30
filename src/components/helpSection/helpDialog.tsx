import React from 'react';
import DialogPage from './dialogPage';
import {
  SiInstagram,
  SiYoutube,
  SiX,
  SiGithub,
  SiNotion,
} from '@icons-pack/react-simple-icons';

function HeaderElement({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="px-2 py-1 bg-gray-400 dark:bg-[#292830] dark:hover:bg-[#363541] text-md rounded-md flex justify-center items-center gap-2"
    >
      {icon}
      {label}
    </a>
  );
}

function Header() {
  return (
    <div className="grid md:grid-cols-2 lg:flex gap-3 justify-center">
      <HeaderElement
        href="https://projects.100xdevs.com/"
        icon={<SiNotion className="text-black dark:text-white w-4 h-4 " />}
        label="Slides"
      />
      <HeaderElement
        href="https://github.com/code100x/cms/issues"
        icon={<SiGithub className="text-black dark:text-white w-4 h-4 " />}
        label="Found an issue? Submit"
      />
      <HeaderElement
        href="https://www.youtube.com/@harkirat1"
        icon={<SiYoutube className="text-black dark:text-white w-4 h-4 " />}
        label="YouTube"
      />
      <HeaderElement
        href="https://twitter.com/kirat_tw"
        icon={<SiX className="text-black dark:text-white w-4 h-4 " />}
        label="Twitter"
      />
      <HeaderElement
        href="https://www.instagram.com/kirat_ins/"
        icon={<SiInstagram className="text-black dark:text-white w-4 h-4 " />}
        label="Instagram"
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="font-normal text-sm border border-gray-700 rounded">
        {children}
      </div>
    </div>
  );
}

const specialKeyMapping: { [key: string]: string } = {
  'Arrow Up': 'Arrow Up (↑)',
  'Arrow Down': 'Arrow Down (↓)',
  'Arrow Left': 'Arrow Left (←)',
  'Arrow Right': 'Arrow Right (→)',
};

function Shortcut({
  label,
  shortcuts,
}: {
  label: string;
  shortcuts: string[];
}) {
  const splitShortcutKeys = shortcuts.map((shortcut) => {
    const keys = shortcut.split('+');
    return keys.map((key) => (
      <kbd
        key={key}
        className="bg-white dark:bg-[#1c1c35] border border-black dark:border-gray-300 rounded px-1 mx-1"
      >
        {specialKeyMapping[key] || key.toUpperCase()}
      </kbd>
    ));
  });

  return (
    <div className="flex justify-between py-1 px-2 font-normal text-md rounded border border-gray-700">
      <div>{label}</div>
      <div>
        {splitShortcutKeys.reduce<React.ReactNode[]>(
          (acc, el, idx) =>
            idx === 0
              ? [el]
              : [...acc, <span key={`or-${idx}`}>&nbsp;or&nbsp;</span>, el],
          [],
        )}
      </div>
    </div>
  );
}

export default function HelpDialog({ onClose }: { onClose: () => void }) {
  return (
    <DialogPage onCloseRequest={onClose} title="Help & Shortcuts">
      <div className="space-y-3 mt-3">
        <Header />
        <h2 className="text-xl font-bold mb-1 border-b-2 border-b-gray-500">
          Keyboard shortcuts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Playback Controls">
            <Shortcut label="Toggle Play/Pause" shortcuts={['Space', 'K']} />
            <Shortcut label="Increase Volume" shortcuts={['Arrow Up']} />
            <Shortcut label="Decrease Volume" shortcuts={['Arrow Down']} />
            <Shortcut label="Toggle Fullscreen" shortcuts={['F']} />
            <Shortcut label="Restart Playback" shortcuts={['R']} />
            <Shortcut label="Mute/Unmute" shortcuts={['M']} />
            <Shortcut label="Toggle Subtitles" shortcuts={['C']} />
            <Shortcut label="Increase Playback Speed" shortcuts={['Shift+.']} />
            <Shortcut label="Decrease Playback Speed" shortcuts={['Shift+,']} />
          </Section>
          <Section title="Seeking">
            <Shortcut label="Seek Backward (5s)" shortcuts={['Arrow Left']} />
            <Shortcut label="Seek Forward (5s)" shortcuts={['Arrow Right']} />
            <Shortcut label="Seek Backward (10s)" shortcuts={['J']} />
            <Shortcut label="Seek Forward (10s)" shortcuts={['L']} />
            <Shortcut label="Seek to Start" shortcuts={['0']} />
            <Shortcut label="Seek to 10%" shortcuts={['1']} />
            <Shortcut label="Seek to 20%" shortcuts={['2']} />
            <Shortcut label="Seek to 30%" shortcuts={['3']} />
            <Shortcut label="Seek to 40%" shortcuts={['4']} />
            <Shortcut label="Seek to 50%" shortcuts={['5']} />
            <Shortcut label="Seek to 60%" shortcuts={['6']} />
            <Shortcut label="Seek to 70%" shortcuts={['7']} />
            <Shortcut label="Seek to 80%" shortcuts={['8']} />
            <Shortcut label="Seek to 90%" shortcuts={['9']} />
          </Section>
        </div>
      </div>
    </DialogPage>
  );
}
