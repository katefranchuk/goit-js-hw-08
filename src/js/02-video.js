import localStorageService from './localStorage';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const TIME_KEY = 'videoplayer-current-time';
const player = new Player(iframe);

player.on('timeupdate', throttle(saveVideoTime, 1000));

function saveVideoTime({ seconds }) {
  localStorageService.save(TIME_KEY, seconds);
}

player.setCurrentTime(localStorage.load(TIME_KEY) || 0);