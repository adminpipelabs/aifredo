(function () {
  'use strict';

  // Find the script tag to read config
  var script = document.currentScript;
  if (!script) return;

  var botId = script.getAttribute('data-bot-id');
  var position = script.getAttribute('data-position') || 'right'; // 'left' or 'right'
  var primaryColor = script.getAttribute('data-color') || '#4338CA';
  var baseUrl = script.getAttribute('data-base-url') || 'https://aifredo.chat';

  if (!botId) {
    console.warn('[Aifredo] Missing data-bot-id attribute');
    return;
  }

  var chatUrl = baseUrl + '/bot/' + botId + '?embed=1';
  var isOpen = false;

  // Create styles
  var style = document.createElement('style');
  style.textContent = [
    '.af-widget-btn{',
    '  position:fixed;bottom:20px;' + position + ':20px;',
    '  width:60px;height:60px;border-radius:50%;',
    '  background:' + primaryColor + ';',
    '  color:#fff;border:none;cursor:pointer;',
    '  box-shadow:0 4px 20px rgba(0,0,0,.2);',
    '  display:flex;align-items:center;justify-content:center;',
    '  z-index:999998;transition:transform .2s,box-shadow .2s;',
    '}',
    '.af-widget-btn:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(0,0,0,.25)}',
    '.af-widget-btn svg{width:28px;height:28px}',
    '.af-widget-frame{',
    '  position:fixed;bottom:90px;' + position + ':20px;',
    '  width:400px;height:600px;max-width:calc(100vw - 32px);max-height:calc(100dvh - 110px);',
    '  border:none;border-radius:16px;',
    '  box-shadow:0 10px 50px rgba(0,0,0,.2);',
    '  z-index:999999;',
    '  opacity:0;transform:translateY(16px) scale(.96);',
    '  transition:opacity .25s,transform .25s;',
    '  pointer-events:none;',
    '  background:#fff;',
    '}',
    '.af-widget-frame.af-open{',
    '  opacity:1;transform:translateY(0) scale(1);pointer-events:auto;',
    '}',
    '@media(max-width:480px){',
    '  .af-widget-frame{width:100vw;height:100dvh;max-width:100vw;max-height:100dvh;',
    '    bottom:0;' + position + ':0;border-radius:0;',
    '  }',
    '  .af-widget-frame.af-open~.af-widget-btn{opacity:0;pointer-events:none}',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // Create iframe
  var iframe = document.createElement('iframe');
  iframe.className = 'af-widget-frame';
  iframe.src = chatUrl;
  iframe.setAttribute('allow', 'clipboard-write');
  iframe.setAttribute('title', 'Chat with AI');
  document.body.appendChild(iframe);

  // Create toggle button
  var btn = document.createElement('button');
  btn.className = 'af-widget-btn';
  btn.setAttribute('aria-label', 'Chat');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0M21 12c0 4.97-4.03 9-9 9a9.003 9.003 0 01-4.716-1.33L3 21l1.33-4.284A9.003 9.003 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    isOpen = !isOpen;
    if (isOpen) {
      iframe.classList.add('af-open');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
    } else {
      iframe.classList.remove('af-open');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0M21 12c0 4.97-4.03 9-9 9a9.003 9.003 0 01-4.716-1.33L3 21l1.33-4.284A9.003 9.003 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"/></svg>';
    }
  });

  // Listen for close message from iframe
  window.addEventListener('message', function (e) {
    if (e.data === 'af-close-widget') {
      isOpen = false;
      iframe.classList.remove('af-open');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0M21 12c0 4.97-4.03 9-9 9a9.003 9.003 0 01-4.716-1.33L3 21l1.33-4.284A9.003 9.003 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"/></svg>';
    }
  });
})();
