/* Shared by the area pages: the special offer banner (set from the Round Book app) and the quote buttons.
   Both use enquiry-config.js in the website's main folder, the same file the home page uses. If it isn't set up,
   or can't be reached, the banner stays hidden and the quote buttons simply go to the contact box on the page. */
(function(){
  var cfg = window.ENQUIRY_CONFIG || {};
  var area = document.body.getAttribute('data-area') || '';
  var formOn = !!(cfg.endpoint && cfg.inbox && cfg.publicKey && window.crypto && crypto.subtle);
  var enquireHref = '../../?area=' + encodeURIComponent(area) + '#enquire';
  if(formOn){
    Array.prototype.forEach.call(document.querySelectorAll('[data-quote]'), function(a){ a.setAttribute('href', enquireHref); });
  }
  if(!cfg.endpoint || !cfg.inbox || !window.fetch) return;
  var banner = document.getElementById('offerBanner');
  if(!banner) return;
  fetch(cfg.endpoint.replace(/\/+$/, '') + '/v1/inbox/' + cfg.inbox + '/notice')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(j){
      var n = j && j.notice;
      if(!n || !n.text) return;
      var seen = '';
      try{ seen = sessionStorage.getItem('offerHidden') || ''; }catch(e){}
      if(seen === n.text) return; // hidden by the visitor on this visit
      document.getElementById('offerText').textContent = n.text;
      if(n.until){
        var d = new Date(n.until + 'T12:00:00');
        if(!isNaN(d)) document.getElementById('offerUntil').textContent = 'Ends ' + d.toLocaleDateString('en-GB', { day:'numeric', month:'long' });
      }
      document.getElementById('offerCta').setAttribute('href', formOn ? enquireHref : '#contact');
      banner.hidden = false;
      document.getElementById('offerX').addEventListener('click', function(){
        banner.hidden = true;
        try{ sessionStorage.setItem('offerHidden', n.text); }catch(e){}
      });
    })
    .catch(function(){ /* no banner */ });
})();
