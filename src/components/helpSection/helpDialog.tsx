import React from 'react';
import DialogPage from './dialogPage';
import {
  SiInstagram,
  SiYoutube,
  SiX,
  SiGithub,
  SiNotion,
  SiGoogleplay,
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
      className="text-md flex items-center justify-center gap-2 rounded-md bg-white px-2 py-1 dark:bg-[#36353d] dark:hover:bg-[#363541]"
    >
      {icon}
      {label}
    </a>
  );
}

function Header() {
  return (
    <div className="grid justify-center gap-3 md:grid-cols-2 lg:flex">
      <HeaderElement
        href="https://projects.100xdevs.com/"
        icon={<SiNotion className="h-4 w-4 text-black dark:text-white" />}
        label="Slides"
      />
      <HeaderElement
        href="https://github.com/code100x/cms/issues"
        icon={<SiGithub className="h-4 w-4 text-black dark:text-white" />}
        label="Found an issue? Submit"
      />
      <HeaderElement
        href="https://play.google.com/store/apps/details?id=com.hundredx.devs"
        icon={<SiGoogleplay className="h-4 w-4 text-black dark:text-white" />}
        label="Mobile App"
      />
      <HeaderElement
        href="https://www.youtube.com/@harkirat1"
        icon={<SiYoutube className="h-4 w-4 text-black dark:text-white" />}
        label="YouTube"
      />
      <HeaderElement
        href="https://twitter.com/kirat_tw"
        icon={<SiX className="h-4 w-4 text-black dark:text-white" />}
        label="Twitter"
      />
      <HeaderElement
        href="https://www.instagram.com/kirat_ins/"
        icon={<SiInstagram className="h-4 w-4 text-black dark:text-white" />}
        label="Instagram"
      />
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded border-gray-700 text-sm font-normal lg:grid-cols-2">
      {children}
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
        className="mx-1 rounded border border-black bg-white px-1 dark:border-gray-300 dark:bg-[#1c1c35]"
      >
        {specialKeyMapping[key] || key.toUpperCase()}
      </kbd>
    ));
  });

  return (
    <div className="text-md flex justify-between rounded border border-gray-700 px-2 py-1 font-normal">
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
      <div className="mt-3 space-y-3">
        <Header />
        <h2 className="mb-1 border-b-2 border-b-gray-500 text-2xl font-bold">
          Keyboard shortcuts
        </h2>
        <div className="">
          <Section>
            <div>
              <Shortcut label="Toggle Play/Pause" shortcuts={['Space', 'K']} />
              <Shortcut label="Increase Volume" shortcuts={['Arrow Up']} />
              <Shortcut label="Decrease Volume" shortcuts={['Arrow Down']} />
              <Shortcut
                label="Seek Backward (5s)"
                shortcuts={['Arrow Left', 'J']}
              />
              <Shortcut
                label="Seek Forward (5s)"
                shortcuts={['Arrow Right', 'L']}
              />
              <Shortcut label="Toggle Fullscreen" shortcuts={['F']} />
            </div>
            <div>
              <Shortcut label="Restart Playback" shortcuts={['R']} />
              <Shortcut label="Mute/Unmute" shortcuts={['M']} />
              <Shortcut label="Toggle Subtitles" shortcuts={['C']} />
              <Shortcut
                label="Increase Playback Speed"
                shortcuts={['Shift+.']}
              />
              <Shortcut
                label="Decrease Playback Speed"
                shortcuts={['Shift+,']}
              />
            </div>
          </Section>
        </div>
      </div>
    </DialogPage>
  );
}
