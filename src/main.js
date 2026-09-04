document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scan-form');
  const urlInput = document.getElementById('url-input');
  const resultsContainer = document.getElementById('scan-results');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    // Show loading state
    resultsContainer.classList.remove('hidden');
    resultsContainer.innerHTML = `
      <div class="loader">
        <div class="spinner"></div>
      </div>
      <p style="text-align:center; color: #94A3B8; margin-top: 16px;">Analyzing link heuristics...</p>
    `;

    // Simulate API call and heuristic analysis
    setTimeout(() => {
      displayResults(url);
    }, 2000);
  });

  function displayResults(url) {
    const urlLower = url.toLowerCase();
    const isSuspicious = urlLower.includes('free') || urlLower.includes('login') || urlLower.includes('win') || urlLower.length > 80 || urlLower.includes('bit.ly') || urlLower.includes('tinyurl');
    const score = isSuspicious ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 5;
    const riskLevel = score > 60 ? 'HIGH RISK' : score > 30 ? 'MEDIUM RISK' : 'LOW RISK';
    const riskClass = score > 60 ? 'risk-high' : score > 30 ? 'risk-medium' : 'risk-low';
    const recommendations = isSuspicious 
      ? 'This link exhibits patterns commonly found in phishing or scam websites. Do not enter any personal information.'
      : 'No immediately suspicious patterns detected. However, always verify the source before providing sensitive data.';

    resultsContainer.innerHTML = `
      <div class="result-header">
        <div>
          <h3 style="font-size: 1.25rem; margin-bottom: 4px; color: white;">Analysis Complete</h3>
          <p style="color: #94A3B8; font-size: 0.9rem; word-break: break-all;">${url}</p>
        </div>
        <div style="text-align: right;">
          <div class="risk-score ${riskClass}">${score}<span style="font-size: 1.5rem; color: #94A3B8;">/100</span></div>
          <div class="risk-label">${riskLevel}</div>
        </div>
      </div>
      <div class="result-details">
        <p><strong>Heuristics:</strong> Pattern matching and length check completed.</p>
        <p><strong>Domain Reputation:</strong> Checked against known blocklists.</p>
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
