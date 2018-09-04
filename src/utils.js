import config from './config';
import {setUserId, getUserId} from './storage';
import {track} from './analytics';

export function log(...messages) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...messages);
}

export function amplitudeApiKey() {
  if (process.env.NODE_ENV === 'production') {
    return config.amplitude.api_key;
  }
  return 'test_api_key';
}

export function init() {
  chrome.runtime.setUninstallURL('https://manojvivek.typeform.com/to/c0VaBs');
  chrome.runtime.onInstalled.addListener(details => {
    if (!getUserId()) {
      setUserId(new Date().getTime().toString());
    }
    if (details.reason != 'install') {
      track('INSTALLED');
    }
  });
}