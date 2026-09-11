(function () {
  'use strict';

  // Read Agency ID from script tag attributes
  var currentScript = document.currentScript;
  var agencyId = currentScript ? currentScript.getAttribute('data-agency') || 'default' : 'default';

  // Create Chat Widget Floating Launcher Button
  var button = document.createElement('div');
  button.id = 'propel-chat-launcher';
  button.style.position = 'fixed';
  button.style.bottom = '24px';
  button.style.right = '24px';
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#2563eb';
  button.style.color = '#ffffff';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.5)';
  button.style.cursor = 'pointer';
  button.style.zIndex = '999999';
  button.style.transition = 'transform 0.2s ease';
  button.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

  // Create Embedded Chat Frame Container
  var container = document.createElement('div');
  container.id = 'propel-chat-container';
  container.style.position = 'fixed';
  container.style.bottom = '96px';
  container.style.right = '24px';
  container.style.width = '380px';
  container.style.height = '520px';
  container.style.backgroundColor = '#020617';
  container.style.borderRadius = '16px';
  container.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)';
  container.style.border = '1px solid #1e293b';
  container.style.display = 'none';
  container.style.flexDirection = 'column';
  container.style.overflow = 'hidden';
  container.style.zIndex = '999999';

  // Inject Iframe routing to local chat engine sandbox
  var iframe = document.createElement('iframe');
  iframe.src = 'https://propelrealty.ai/chat?agency=' + encodeURIComponent(agencyId) + '&embed=true';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  container.appendChild(iframe);
  document.body.appendChild(button);
  document.body.appendChild(container);

  // Toggle Chat Window State
  var isOpen = false;
  button.addEventListener('click', function () {
    isOpen = !isOpen;
    container.style.display = isOpen ? 'flex' : 'none';
    button.style.transform = isOpen ? 'scale(0.9) rotate(90deg)' : 'scale(1) rotate(0deg)';
  });
})();
