import videojs from 'video.js';

const changeVideoQuality = (quality: string) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('quality', quality);
  window.location.href = currentUrl.href;
};

let quality: string = '1080';

class QualitySelectorControllBar extends videojs.getComponent('Button') {
  constructor(player: any, options?: any) {
    super(player, options);
    this.addClass('vjs-quality-selector flex justify-center items-center');

    const iconElement = videojs.dom.createEl('i', {
      className: 'vjs-icon-hd text-xl',
    });
    this.el().appendChild(iconElement);

    const dropUpMenu = videojs.dom.createEl('div', {
      className: 'vjs-custom-dropup-menu absolute hidden',
    });

    dropUpMenu.innerHTML = `
      <ul class="bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1">
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white" data-quality="1080"">1080p</li>
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white" data-quality="720"">720p</li>
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white" data-quality="360"">360p</li>
      </ul>
    `;

    const dropUpMenuElement = this.el().appendChild(dropUpMenu) as HTMLElement;

    this.on('click', () => {
      const isVisible = dropUpMenuElement.style.display === 'block';
      dropUpMenuElement.style.display = isVisible ? 'none' : 'block';
    });
    this.on('touchend', (e: any) => {
      e.preventDefault();
      const isVisible = dropUpMenuElement.style.display === 'block';
      dropUpMenuElement.style.display = isVisible ? 'none' : 'block';
    });
    dropUpMenuElement.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', (e: any) => {
        quality = e.target.getAttribute('data-quality');
        console.log(quality);
        const currentUrl = new URL(window.location.href);
        if (quality !== currentUrl.searchParams.get('quality')) {
          changeVideoQuality(quality);
        }
        dropUpMenuElement.style.display = 'none';
      });
      item.addEventListener('touchend', (e: any) => {
        quality = e.target.getAttribute('data-quality');
        if (quality) {
          changeVideoQuality(quality);
        }
        dropUpMenuElement.style.display = 'none';
        dropUpMenuElement.style.display = 'none';
      });
    });
  }
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.changeVideoQuality = changeVideoQuality;
  videojs.registerComponent(
    'QualitySelectorControllBar',
    QualitySelectorControllBar,
  );
}

export default QualitySelectorControllBar;
