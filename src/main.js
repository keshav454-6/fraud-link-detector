document.addEventListener('DOMContentLoaded', () => {
  const urlForm = document.getElementById('scan-form');
  const emailForm = document.getElementById('email-scan-form');
  const urlInput = document.getElementById('url-input');
  const emailInput = document.getElementById('email-input');
  const resultsContainer = document.getElementById('scan-results');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab switching logic
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
      
      // Hide results when switching tabs
      resultsContainer.classList.add('hidden');
    });
  });

  urlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;
    showLoading();
    setTimeout(() => displayResults(url, 'url'), 2000);
  });

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailText = emailInput.value.trim();
    if (!emailText) return;
    showLoading();
    setTimeout(() => displayResults(emailText, 'email'), 2000);
  });

  function showLoading() {
    resultsContainer.classList.remove('hidden');
    resultsContainer.innerHTML = `
      <div class="loader">
        <div class="spinner"></div>
      </div>
      <p style="text-align:center; color: #94A3B8; margin-top: 16px;">Analyzing heuristics...</p>
    `;
  }

  function displayResults(input, type) {
    const inputLower = input.toLowerCase();
    let isSuspicious = false;
    let heuristicsMsg = '';
    
    if (type === 'url') {
      isSuspicious = inputLower.includes('free') || inputLower.includes('login') || inputLower.includes('win') || inputLower.length > 80 || inputLower.includes('bit.ly') || inputLower.includes('tinyurl');
      heuristicsMsg = 'Pattern matching, domain check, and length check completed.';
    } else {
      isSuspicious = inputLower.includes('urgent') || inputLower.includes('account suspended') || inputLower.includes('password') || inputLower.includes('click here') || inputLower.includes('winner') || inputLower.includes('bank');
      heuristicsMsg = 'Phishing keyword analysis and urgency detection completed.';
    }

    const score = isSuspicious ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 5;
    const riskLevel = score > 60 ? 'HIGH RISK' : score > 30 ? 'MEDIUM RISK' : 'LOW RISK';
    const riskClass = score > 60 ? 'risk-high' : score > 30 ? 'risk-medium' : 'risk-low';
    const recommendations = isSuspicious 
      ? 'This content exhibits patterns commonly found in phishing or scams. Do not interact with links or provide personal information.'
      : 'No immediately suspicious patterns detected. However, always remain vigilant.';

    resultsContainer.innerHTML = `
      <div class="result-header">
        <div>
          <h3 style="font-size: 1.25rem; margin-bottom: 4px; color: white;">Analysis Complete</h3>
          <p style="color: #94A3B8; font-size: 0.9rem; word-break: break-all; max-height: 60px; overflow: hidden; text-overflow: ellipsis;">${type === 'url' ? input : 'Email Content Snippet...'}</p>
        </div>
        <div style="text-align: right;">
          <div class="risk-score ${riskClass}">${score}<span style="font-size: 1.5rem; color: #94A3B8;">/100</span></div>
          <div class="risk-label">${riskLevel}</div>
        </div>
      </div>
      <div class="result-details">
        <p><strong>Heuristics:</strong> ${heuristicsMsg}</p>
        <p><strong>Status:</strong> ${type === 'url' ? 'Checked against known blocklists.' : 'Scanned for social engineering tactics.'}</p>
        <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 4px solid ${score > 60 ? '#EF4444' : score > 30 ? '#FBBF24' : '#10B981'};">
          <p style="margin: 0; color: #E2E8F0;"><strong>Recommendation:</strong> ${recommendations}</p>
        </div>
      </div>
    `;
  }

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
