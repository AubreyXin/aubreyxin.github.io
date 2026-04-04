// 全局状态
let currentTimes = 0;
let betMultiplier = 0;
const odds = 1.93;

// 设置倍数
function setMultiplier(multiplier) {
  betMultiplier = multiplier;
  
  document.querySelectorAll('[data-multiplier]').forEach(btn => {
    btn.classList.remove('active');
    if (parseFloat(btn.dataset.multiplier) === multiplier) {
      btn.classList.add('active');
    }
  });
  
  calculate();
}

// 设置次数
function setTimes(times) {
  currentTimes = times;
  
  document.querySelectorAll('[data-times]').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.dataset.times) === times) {
      btn.classList.add('active');
    }
  });
  
  calculate();
}

// 格式化货币
function formatCurrency(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return '¥0.00';
  return '¥' + num.toLocaleString('zh-CN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

// 计算结果
function calculate() {
  const totalBalanceInput = document.getElementById('totalBalance');
  const balanceNum = parseFloat(totalBalanceInput.value);
  const container = document.getElementById('resultsContainer');
  
  // 验证输入
  if (isNaN(balanceNum) || balanceNum <= 0) {
    renderEmptyState('请输入余额以查看结果');
    return;
  }
  
  if (betMultiplier === 0) {
    renderEmptyState('请选择倍数以查看结果');
    return;
  }
  
  if (currentTimes === 0) {
    renderEmptyState('请选择次数以查看结果');
    return;
  }
  
  // 计算比例总和
  const ratios = [];
  let ratioSum = 0;
  for (let i = 0; i < currentTimes; i++) {
    const ratio = Math.pow(betMultiplier, i);
    ratios.push(ratio);
    ratioSum += ratio;
  }
  
  // 计算结果
  const results = [];
  let totalInvestment = 0;
  
  for (let i = 0; i < currentTimes; i++) {
    // 倍投模式：所有次数都按比例分配余额
    const betAmount = Math.round(balanceNum * (ratios[i] / ratioSum));
    
    totalInvestment += betAmount;
    const winAmount = betAmount * odds;
    const profit = winAmount - totalInvestment;
    
    results.push({
      round: i + 1,
      betAmount: betAmount.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      winAmount: winAmount.toFixed(2),
      profit: profit.toFixed(2),
      profitValue: profit
    });
  }
  
  // 渲染结果
  renderResults(results);
}

// 渲染空状态
function renderEmptyState(message) {
  const container = document.getElementById('resultsContainer');
  
  container.innerHTML = `
    <div class="empty-state">
      <p class="empty-text">${message}</p>
    </div>
  `;
}

// 渲染结果
function renderResults(results) {
  const container = document.getElementById('resultsContainer');
  
  let cardsHTML = results.map(result => {
    const profitClass = result.profitValue >= 0 ? 'positive' : 'negative';
    const profitSign = result.profitValue >= 0 ? '+' : '';
    
    return `
      <div class="result-card">
        <div class="card-header">
          <div class="round-number">${result.round}</div>
          <span class="round-label">第 ${result.round} 次</span>
        </div>
        <div class="card-content">
          <div class="card-left">
            <div class="data-item">
              <span class="data-label">投入金额</span>
              <span class="data-value">${formatCurrency(result.betAmount)}</span>
            </div>
            <div class="data-item">
              <span class="data-label">累计投入</span>
              <span class="data-value small">${formatCurrency(result.totalInvestment)}</span>
            </div>
          </div>
          <div class="card-right">
            <div class="data-item">
              <span class="data-label">利润</span>
              <span class="data-value profit ${profitClass}">${profitSign}${formatCurrency(result.profit)}</span>
            </div>
            <div class="data-item">
              <span class="data-label">中奖金额</span>
              <span class="data-value win-amount">${formatCurrency(result.winAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `
    <div class="results-header">
      <h2 class="results-title">计算结果</h2>
    </div>
    <div class="results-grid cols-${currentTimes}">
      ${cardsHTML}
    </div>
  `;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始显示空状态
  renderEmptyState('请输入余额以查看结果');
});
