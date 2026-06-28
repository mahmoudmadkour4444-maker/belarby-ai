import { useState, useRef, useEffect } from "react";

// ============================================================
// DESIGN TOKENS
// ============================================================
const COLORS = {
  inkDeep:    "#0D0F1A",
  inkMid:     "#1A1D2E",
  inkSurface: "#232640",
  accent:     "#6C63FF",
  accentGlow: "#9B94FF",
  accentSoft: "#2E2B5F",
  gold:       "#F5C842",
  textPrime:  "#F0EEFF",
  textMuted:  "#8A88B0",
  textDim:    "#5A587A",
  success:    "#34D399",
  border:     "#2A2D45",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.inkDeep};
    color: ${COLORS.textPrime};
    font-family: 'IBM Plex Sans Arabic', 'Space Grotesk', sans-serif;
    direction: rtl;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.inkMid}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.accentSoft}; border-radius: 3px; }

  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* ---- NAV ---- */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    border-bottom: 1px solid ${COLORS.border};
    background: ${COLORS.inkDeep}CC;
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 22px; font-weight: 700; color: ${COLORS.textPrime};
    text-decoration: none;
  }
  .logo-badge {
    background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow});
    border-radius: 10px;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link {
    color: ${COLORS.textMuted}; font-size: 15px; cursor: pointer;
    transition: color .2s; background: none; border: none;
  }
  .nav-link:hover { color: ${COLORS.textPrime}; }
  .nav-cta {
    background: ${COLORS.accent};
    color: white; border: none; border-radius: 10px;
    padding: 10px 22px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all .2s;
    font-family: inherit;
  }
  .nav-cta:hover { background: ${COLORS.accentGlow}; transform: translateY(-1px); }

  /* ---- LANDING ---- */
  .landing { flex: 1; }

  /* Hero */
  .hero {
    text-align: center;
    padding: 90px 24px 60px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse, ${COLORS.accent}22 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${COLORS.accentSoft};
    border: 1px solid ${COLORS.accent}55;
    border-radius: 99px;
    padding: 6px 16px; font-size: 13px; color: ${COLORS.accentGlow};
    margin-bottom: 28px;
  }
  .hero-badge-dot { width: 7px; height: 7px; background: ${COLORS.success}; border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

  .hero h1 {
    font-size: clamp(38px, 6vw, 72px);
    font-weight: 700; line-height: 1.15;
    max-width: 800px; margin: 0 auto 20px;
  }
  .hero h1 em {
    font-style: normal;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGlow}, ${COLORS.gold});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero p {
    font-size: 18px; color: ${COLORS.textMuted};
    max-width: 520px; margin: 0 auto 36px; line-height: 1.7;
  }
  .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: ${COLORS.accent}; color: white;
    border: none; border-radius: 12px;
    padding: 14px 32px; font-size: 16px; font-weight: 600;
    cursor: pointer; transition: all .2s; font-family: inherit;
    box-shadow: 0 0 30px ${COLORS.accent}44;
  }
  .btn-primary:hover { background: ${COLORS.accentGlow}; transform: translateY(-2px); box-shadow: 0 0 40px ${COLORS.accent}66; }
  .btn-secondary {
    background: transparent; color: ${COLORS.textPrime};
    border: 1px solid ${COLORS.border}; border-radius: 12px;
    padding: 14px 32px; font-size: 16px; font-weight: 500;
    cursor: pointer; transition: all .2s; font-family: inherit;
  }
  .btn-secondary:hover { border-color: ${COLORS.accent}; color: ${COLORS.accentGlow}; }

  /* Demo preview */
  .hero-preview {
    max-width: 720px; margin: 56px auto 0;
    background: ${COLORS.inkMid};
    border: 1px solid ${COLORS.border};
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 40px 80px #00000055;
  }
  .preview-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 14px 20px; border-bottom: 1px solid ${COLORS.border};
    background: ${COLORS.inkSurface};
  }
  .preview-dot { width: 10px; height: 10px; border-radius: 50%; }
  .preview-title { color: ${COLORS.textDim}; font-size: 13px; margin-right: auto; margin-left: auto; }
  .preview-msgs { padding: 24px 20px; display: flex; flex-direction: column; gap: 14px; }
  .preview-msg {
    display: flex; gap: 10px; align-items: flex-start;
  }
  .preview-msg.user { flex-direction: row-reverse; }
  .preview-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .preview-avatar.ai { background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow}); }
  .preview-avatar.user { background: ${COLORS.accentSoft}; }
  .preview-bubble {
    max-width: 75%; padding: 12px 16px; border-radius: 14px;
    font-size: 14px; line-height: 1.6;
  }
  .preview-bubble.ai { background: ${COLORS.inkSurface}; color: ${COLORS.textPrime}; border-radius: 4px 14px 14px 14px; }
  .preview-bubble.user { background: ${COLORS.accentSoft}; color: ${COLORS.accentGlow}; border-radius: 14px 4px 14px 14px; }

  /* Features */
  .features {
    padding: 80px 48px;
    max-width: 1100px; margin: 0 auto;
  }
  .section-label {
    text-align: center; color: ${COLORS.accentGlow};
    font-size: 13px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  .section-title {
    text-align: center; font-size: clamp(28px, 4vw, 42px);
    font-weight: 700; margin-bottom: 48px;
  }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .feature-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 28px;
    transition: all .3s;
  }
  .feature-card:hover { border-color: ${COLORS.accent}55; transform: translateY(-3px); box-shadow: 0 20px 40px #00000033; }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 12px;
    background: ${COLORS.accentSoft};
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 16px;
  }
  .feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .feature-card p { font-size: 14px; color: ${COLORS.textMuted}; line-height: 1.6; }

  /* Stats */
  .stats {
    padding: 60px 48px;
    display: flex; justify-content: center; gap: 60px; flex-wrap: wrap;
    border-top: 1px solid ${COLORS.border};
    border-bottom: 1px solid ${COLORS.border};
  }
  .stat { text-align: center; }
  .stat-num { font-size: 42px; font-weight: 700; color: ${COLORS.accentGlow}; }
  .stat-label { font-size: 14px; color: ${COLORS.textMuted}; margin-top: 4px; }

  /* CTA Section */
  .cta-section {
    padding: 80px 24px;
    text-align: center;
  }
  .cta-box {
    max-width: 600px; margin: 0 auto;
    background: linear-gradient(135deg, ${COLORS.inkMid}, ${COLORS.accentSoft}55);
    border: 1px solid ${COLORS.accent}44;
    border-radius: 24px; padding: 56px 40px;
  }
  .cta-box h2 { font-size: 32px; font-weight: 700; margin-bottom: 14px; }
  .cta-box p { color: ${COLORS.textMuted}; margin-bottom: 28px; font-size: 16px; }

  /* Footer */
  .footer {
    padding: 24px 48px;
    border-top: 1px solid ${COLORS.border};
    display: flex; justify-content: space-between; align-items: center;
    color: ${COLORS.textDim}; font-size: 13px; flex-wrap: wrap; gap: 12px;
  }

  /* ---- CHAT PAGE ---- */
  .chat-layout {
    display: flex; height: calc(100vh - 73px); overflow: hidden;
  }

  /* Sidebar */
  .sidebar {
    width: 280px; flex-shrink: 0;
    background: ${COLORS.inkMid};
    border-left: 1px solid ${COLORS.border};
    display: flex; flex-direction: column;
    overflow: hidden;
  }
  .sidebar-header {
    padding: 20px 16px 14px;
    border-bottom: 1px solid ${COLORS.border};
  }
  .new-chat-btn {
    width: 100%; background: ${COLORS.accent};
    color: white; border: none; border-radius: 10px;
    padding: 11px 16px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all .2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .new-chat-btn:hover { background: ${COLORS.accentGlow}; }
  .sidebar-label {
    padding: 16px 16px 6px;
    font-size: 11px; font-weight: 600; color: ${COLORS.textDim};
    letter-spacing: .08em; text-transform: uppercase;
  }
  .chat-list { flex: 1; overflow-y: auto; padding: 4px 8px; }
  .chat-item {
    padding: 10px 12px; border-radius: 8px;
    cursor: pointer; font-size: 14px; color: ${COLORS.textMuted};
    transition: all .15s; display: flex; align-items: center; gap: 8px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .chat-item:hover { background: ${COLORS.inkSurface}; color: ${COLORS.textPrime}; }
  .chat-item.active { background: ${COLORS.accentSoft}; color: ${COLORS.accentGlow}; }

  /* Main chat */
  .chat-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .chat-topbar {
    padding: 14px 24px;
    border-bottom: 1px solid ${COLORS.border};
    display: flex; align-items: center; gap: 12px;
    background: ${COLORS.inkDeep};
  }
  .chat-topbar-title { font-size: 15px; font-weight: 600; }
  .chat-topbar-sub { font-size: 12px; color: ${COLORS.textMuted}; }
  .model-badge {
    margin-right: auto;
    background: ${COLORS.accentSoft}; border: 1px solid ${COLORS.accent}44;
    border-radius: 99px; padding: 4px 12px;
    font-size: 12px; color: ${COLORS.accentGlow}; font-weight: 500;
  }

  .messages-area {
    flex: 1; overflow-y: auto;
    padding: 28px 24px;
    display: flex; flex-direction: column; gap: 20px;
  }

  .msg-row { display: flex; gap: 12px; align-items: flex-start; }
  .msg-row.user { flex-direction: row-reverse; }

  .msg-avatar {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .msg-avatar.ai { background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow}); }
  .msg-avatar.user { background: ${COLORS.accentSoft}; font-size: 14px; font-weight: 700; color: ${COLORS.accentGlow}; }

  .msg-content { max-width: 68%; }
  .msg-name { font-size: 12px; color: ${COLORS.textDim}; margin-bottom: 5px; }
  .msg-row.user .msg-name { text-align: left; }
  .msg-bubble {
    padding: 14px 18px; border-radius: 16px;
    font-size: 15px; line-height: 1.7;
  }
  .msg-bubble.ai {
    background: ${COLORS.inkMid}; color: ${COLORS.textPrime};
    border: 1px solid ${COLORS.border};
    border-radius: 4px 16px 16px 16px;
  }
  .msg-bubble.user {
    background: ${COLORS.accentSoft};
    color: ${COLORS.accentGlow};
    border-radius: 16px 4px 16px 16px;
  }

  .typing-dots { display: flex; gap: 5px; align-items: center; padding: 6px 0; }
  .typing-dot {
    width: 7px; height: 7px; background: ${COLORS.textDim};
    border-radius: 50%; animation: bounce 1.2s infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: .2s; }
  .typing-dot:nth-child(3) { animation-delay: .4s; }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

  /* Empty state */
  .empty-state {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 40px 24px;
  }
  .empty-icon { font-size: 52px; margin-bottom: 16px; }
  .empty-state h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
  .empty-state p { color: ${COLORS.textMuted}; font-size: 15px; max-width: 360px; margin: 0 auto 28px; line-height: 1.6; }
  .suggestions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 560px; }
  .suggestion-btn {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 99px; padding: 9px 18px; font-size: 14px;
    color: ${COLORS.textMuted}; cursor: pointer; font-family: inherit;
    transition: all .2s;
  }
  .suggestion-btn:hover { border-color: ${COLORS.accent}; color: ${COLORS.accentGlow}; }

  /* Input area */
  .input-area {
    padding: 16px 24px 20px;
    border-top: 1px solid ${COLORS.border};
    background: ${COLORS.inkDeep};
  }
  .input-box {
    display: flex; align-items: flex-end; gap: 10px;
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 14px; padding: 10px 12px;
    transition: border-color .2s;
  }
  .input-box:focus-within { border-color: ${COLORS.accent}66; }
  .input-box textarea {
    flex: 1; background: transparent; border: none; outline: none;
    color: ${COLORS.textPrime}; font-size: 15px; font-family: inherit;
    resize: none; min-height: 24px; max-height: 140px;
    line-height: 1.5; direction: rtl;
  }
  .input-box textarea::placeholder { color: ${COLORS.textDim}; }
  .send-btn {
    width: 38px; height: 38px; border-radius: 9px;
    background: ${COLORS.accent}; border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .2s; flex-shrink: 0;
    font-size: 16px;
  }
  .send-btn:hover { background: ${COLORS.accentGlow}; }
  .send-btn:disabled { background: ${COLORS.accentSoft}; cursor: not-allowed; opacity: .6; }
  .input-hint {
    font-size: 12px; color: ${COLORS.textDim}; margin-top: 8px; text-align: center;
  }

  /* ---- AUTH ---- */
  .auth-page {
    flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 40px 20px; min-height: calc(100vh - 73px);
    position: relative; overflow: hidden;
  }
  .auth-page::before {
    content: '';
    position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, ${COLORS.accent}18 0%, transparent 65%);
    pointer-events: none;
  }
  .auth-card {
    width: 100%; max-width: 440px;
    background: ${COLORS.inkMid};
    border: 1px solid ${COLORS.border};
    border-radius: 24px; padding: 40px 36px;
    position: relative; z-index: 1;
    box-shadow: 0 40px 80px #00000044;
  }
  .auth-logo {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 28px;
  }
  .auth-logo span { font-size: 20px; font-weight: 700; }
  .auth-card h2 {
    font-size: 26px; font-weight: 700; text-align: center; margin-bottom: 6px;
  }
  .auth-card .auth-sub {
    text-align: center; color: ${COLORS.textMuted}; font-size: 14px; margin-bottom: 28px;
  }

  .auth-tabs {
    display: flex; background: ${COLORS.inkSurface};
    border-radius: 10px; padding: 4px; margin-bottom: 28px;
  }
  .auth-tab {
    flex: 1; padding: 9px; border-radius: 7px; border: none;
    background: transparent; color: ${COLORS.textMuted};
    font-size: 14px; font-weight: 500; cursor: pointer;
    font-family: inherit; transition: all .2s;
  }
  .auth-tab.active {
    background: ${COLORS.accent}; color: white;
  }

  .auth-google-btn {
    width: 100%; padding: 12px 20px;
    background: ${COLORS.inkSurface}; border: 1px solid ${COLORS.border};
    border-radius: 10px; color: ${COLORS.textPrime};
    font-size: 14px; font-weight: 500; cursor: pointer;
    font-family: inherit; transition: all .2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 20px;
  }
  .auth-google-btn:hover { border-color: ${COLORS.accent}55; background: ${COLORS.inkMid}; }

  .auth-divider {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .auth-divider-line { flex: 1; height: 1px; background: ${COLORS.border}; }
  .auth-divider span { font-size: 12px; color: ${COLORS.textDim}; white-space: nowrap; }

  .field { margin-bottom: 16px; }
  .field label {
    display: block; font-size: 13px; font-weight: 500;
    color: ${COLORS.textMuted}; margin-bottom: 7px;
  }
  .field-wrap { position: relative; }
  .field input {
    width: 100%; padding: 12px 16px;
    background: ${COLORS.inkSurface}; border: 1px solid ${COLORS.border};
    border-radius: 10px; color: ${COLORS.textPrime};
    font-size: 15px; font-family: inherit; outline: none;
    transition: border-color .2s; direction: rtl;
  }
  .field input:focus { border-color: ${COLORS.accent}88; }
  .field input.error { border-color: #FF6B6B; }
  .field input::placeholder { color: ${COLORS.textDim}; }
  .field-eye {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: ${COLORS.textDim};
    cursor: pointer; font-size: 16px; padding: 4px;
  }
  .field-error { font-size: 12px; color: #FF8080; margin-top: 5px; }

  .auth-strength { margin-top: 6px; }
  .auth-strength-bar {
    height: 3px; border-radius: 99px;
    background: ${COLORS.border}; overflow: hidden; margin-bottom: 4px;
  }
  .auth-strength-fill { height: 100%; border-radius: 99px; transition: all .3s; }
  .auth-strength-label { font-size: 11px; color: ${COLORS.textDim}; }

  .auth-forgot {
    text-align: left; margin-top: -8px; margin-bottom: 16px;
  }
  .auth-forgot button {
    background: none; border: none; color: ${COLORS.accentGlow};
    font-size: 13px; cursor: pointer; font-family: inherit;
  }
  .auth-forgot button:hover { text-decoration: underline; }

  .auth-submit {
    width: 100%; padding: 13px; border-radius: 10px;
    background: ${COLORS.accent}; color: white; border: none;
    font-size: 16px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all .2s; margin-bottom: 16px;
    box-shadow: 0 0 24px ${COLORS.accent}44;
  }
  .auth-submit:hover:not(:disabled) { background: ${COLORS.accentGlow}; transform: translateY(-1px); }
  .auth-submit:disabled { opacity: .6; cursor: not-allowed; }

  .auth-footer-text {
    text-align: center; font-size: 13px; color: ${COLORS.textMuted};
  }
  .auth-footer-text button {
    background: none; border: none; color: ${COLORS.accentGlow};
    cursor: pointer; font-size: 13px; font-family: inherit; font-weight: 600;
  }
  .auth-footer-text button:hover { text-decoration: underline; }

  .auth-terms {
    text-align: center; font-size: 12px; color: ${COLORS.textDim};
    margin-top: 16px; line-height: 1.5;
  }
  .auth-terms span { color: ${COLORS.accentGlow}; cursor: pointer; }

  .auth-toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: ${COLORS.inkSurface}; border: 1px solid ${COLORS.border};
    border-radius: 12px; padding: 12px 24px;
    font-size: 14px; display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 32px #00000055; z-index: 999;
    animation: slideUp .3s ease;
  }
  .auth-toast.success { border-color: ${COLORS.success}44; }
  .auth-toast.error-toast { border-color: #FF6B6B44; }
  @keyframes slideUp { from{transform:translateX(-50%) translateY(20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }

  /* User menu in nav */
  .user-menu { position: relative; }
  .user-avatar-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow});
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 700; color: white;
    font-family: inherit; transition: all .2s;
  }
  .user-avatar-btn:hover { transform: scale(1.05); }
  .user-dropdown {
    position: absolute; left: 0; top: calc(100% + 10px);
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 14px; width: 220px; overflow: hidden;
    box-shadow: 0 20px 40px #00000055; z-index: 200;
    animation: fadeDown .15s ease;
  }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  .user-dropdown-header {
    padding: 16px 18px; border-bottom: 1px solid ${COLORS.border};
  }
  .user-dropdown-name { font-weight: 600; font-size: 15px; }
  .user-dropdown-email { font-size: 12px; color: ${COLORS.textMuted}; margin-top: 2px; }
  .user-dropdown-item {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 18px; cursor: pointer;
    font-size: 14px; color: ${COLORS.textMuted};
    transition: all .15s; border: none; background: none;
    width: 100%; font-family: inherit; text-align: right;
  }
  .user-dropdown-item:hover { background: ${COLORS.inkSurface}; color: ${COLORS.textPrime}; }
  .user-dropdown-item.danger { color: #FF8080; }
  .user-dropdown-item.danger:hover { background: #FF6B6B11; }

  /* ---- PROFILE PAGE ---- */
  .profile-page {
    max-width: 680px; margin: 0 auto; padding: 48px 24px;
  }
  .profile-header { margin-bottom: 36px; }
  .profile-header h1 { font-size: 28px; font-weight: 700; }
  .profile-header p { color: ${COLORS.textMuted}; font-size: 15px; margin-top: 6px; }

  .profile-section {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 28px; margin-bottom: 20px;
  }
  .profile-section h3 {
    font-size: 16px; font-weight: 600; margin-bottom: 20px;
    padding-bottom: 12px; border-bottom: 1px solid ${COLORS.border};
    display: flex; align-items: center; gap: 8px;
  }
  .profile-avatar-row {
    display: flex; align-items: center; gap: 20px; margin-bottom: 24px;
  }
  .profile-avatar-big {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow});
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .profile-avatar-info { font-size: 13px; color: ${COLORS.textMuted}; line-height: 1.6; }
  .plan-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: ${COLORS.accentSoft}; border: 1px solid ${COLORS.accent}55;
    border-radius: 99px; padding: 4px 14px;
    font-size: 13px; color: ${COLORS.accentGlow}; font-weight: 600;
    margin-top: 4px;
  }
  .usage-bar-wrap { margin-top: 12px; }
  .usage-bar-label {
    display: flex; justify-content: space-between;
    font-size: 13px; color: ${COLORS.textMuted}; margin-bottom: 8px;
  }
  .usage-bar {
    height: 6px; background: ${COLORS.border}; border-radius: 99px; overflow: hidden;
  }
  .usage-bar-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGlow});
  }
  .save-btn {
    padding: 11px 28px; background: ${COLORS.accent};
    color: white; border: none; border-radius: 10px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all .2s; margin-top: 8px;
  }
  .save-btn:hover { background: ${COLORS.accentGlow}; }

  /* ---- DASHBOARD ---- */
  .dash-page {
    max-width: 1060px; margin: 0 auto; padding: 40px 28px;
  }
  .dash-welcome {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 36px; flex-wrap: wrap; gap: 16px;
  }
  .dash-welcome h1 { font-size: 26px; font-weight: 700; }
  .dash-welcome p { color: ${COLORS.textMuted}; font-size: 14px; margin-top: 4px; }
  .dash-welcome-actions { display: flex; gap: 10px; }

  .dash-kpi-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
    margin-bottom: 28px;
  }
  .kpi-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 22px 20px;
    transition: all .25s;
  }
  .kpi-card:hover { border-color: ${COLORS.accent}44; transform: translateY(-2px); }
  .kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .kpi-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .kpi-delta {
    font-size: 12px; font-weight: 600; padding: 3px 8px;
    border-radius: 99px;
  }
  .kpi-delta.up { background: ${COLORS.success}22; color: ${COLORS.success}; }
  .kpi-delta.down { background: #FF6B6B22; color: #FF8080; }
  .kpi-num { font-size: 32px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
  .kpi-label { font-size: 13px; color: ${COLORS.textMuted}; }

  .dash-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .dash-row.three { grid-template-columns: 2fr 1fr; }

  .dash-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 24px; overflow: hidden;
  }
  .dash-card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .dash-card-title { font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .dash-card-action {
    font-size: 13px; color: ${COLORS.accentGlow}; cursor: pointer;
    background: none; border: none; font-family: inherit;
  }
  .dash-card-action:hover { text-decoration: underline; }

  /* Mini bar chart */
  .mini-chart { display: flex; align-items: flex-end; gap: 6px; height: 80px; }
  .mini-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .mini-bar {
    width: 100%; border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accentSoft});
    transition: height .4s; min-height: 4px;
  }
  .mini-bar.today { background: linear-gradient(180deg, ${COLORS.gold}, ${COLORS.accent}); }
  .mini-bar-label { font-size: 10px; color: ${COLORS.textDim}; }

  /* Donut chart (CSS) */
  .donut-wrap { display: flex; align-items: center; gap: 24px; }
  .donut {
    width: 110px; height: 110px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .donut-center {
    position: absolute; text-align: center;
  }
  .donut-center-num { font-size: 22px; font-weight: 700; }
  .donut-center-label { font-size: 11px; color: ${COLORS.textMuted}; }
  .donut-legend { display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .donut-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .donut-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .donut-item-label { color: ${COLORS.textMuted}; flex: 1; }
  .donut-item-val { font-weight: 600; }

  /* Activity list */
  .activity-list { display: flex; flex-direction: column; gap: 2px; }
  .activity-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 0; border-bottom: 1px solid ${COLORS.border};
    cursor: pointer; transition: all .15s; border-radius: 8px;
  }
  .activity-item:last-child { border-bottom: none; }
  .activity-item:hover { background: ${COLORS.inkSurface}; padding: 11px 10px; margin: 0 -10px; }
  .activity-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .activity-info { flex: 1; min-width: 0; }
  .activity-title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .activity-meta { font-size: 12px; color: ${COLORS.textMuted}; margin-top: 2px; }
  .activity-arrow { color: ${COLORS.textDim}; font-size: 16px; }

  /* Streak */
  .streak-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .streak-day {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600;
    border: 1px solid ${COLORS.border};
  }
  .streak-day.done { background: ${COLORS.accent}; border-color: ${COLORS.accent}; color: white; }
  .streak-day.today { background: ${COLORS.gold}22; border-color: ${COLORS.gold}; color: ${COLORS.gold}; }
  .streak-day.empty { background: ${COLORS.inkSurface}; color: ${COLORS.textDim}; }
  .streak-count {
    text-align: center; margin-top: 16px;
    font-size: 13px; color: ${COLORS.textMuted};
  }
  .streak-count strong { color: ${COLORS.gold}; font-size: 20px; }

  /* Quick actions */
  .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .quick-action-btn {
    background: ${COLORS.inkSurface}; border: 1px solid ${COLORS.border};
    border-radius: 12px; padding: 16px 14px;
    display: flex; align-items: center; gap: 10px;
    cursor: pointer; font-family: inherit; transition: all .2s;
    text-align: right; color: ${COLORS.textMuted}; font-size: 13px;
  }
  .quick-action-btn:hover { border-color: ${COLORS.accent}55; color: ${COLORS.textPrime}; background: ${COLORS.inkMid}; }
  .quick-action-icon { font-size: 20px; flex-shrink: 0; }

  /* Subjects progress */
  .subject-list { display: flex; flex-direction: column; gap: 14px; }
  .subject-item {}
  .subject-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .subject-name { font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
  .subject-pct { font-size: 12px; color: ${COLORS.textMuted}; }
  .subject-bar { height: 5px; background: ${COLORS.border}; border-radius: 99px; overflow: hidden; }
  .subject-bar-fill { height: 100%; border-radius: 99px; }

  /* ---- HISTORY PAGE ---- */
  .history-page {
    max-width: 900px; margin: 0 auto; padding: 40px 28px;
  }
  .history-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; flex-wrap: wrap; gap: 14px;
  }
  .history-header h1 { font-size: 26px; font-weight: 700; }
  .history-header p  { font-size: 14px; color: ${COLORS.textMuted}; margin-top: 4px; }

  .history-toolbar {
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .history-search-wrap {
    flex: 1; min-width: 200px; position: relative;
  }
  .history-search {
    width: 100%; padding: 10px 16px 10px 36px;
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 10px; color: ${COLORS.textPrime};
    font-size: 14px; font-family: inherit; outline: none;
    transition: border-color .2s; direction: rtl;
  }
  .history-search:focus { border-color: ${COLORS.accent}88; }
  .history-search::placeholder { color: ${COLORS.textDim}; }
  .search-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: ${COLORS.textDim}; font-size: 14px; pointer-events: none;
  }
  .filter-btn {
    padding: 10px 16px; background: ${COLORS.inkMid};
    border: 1px solid ${COLORS.border}; border-radius: 10px;
    color: ${COLORS.textMuted}; font-size: 13px; font-weight: 500;
    cursor: pointer; font-family: inherit; transition: all .2s; white-space: nowrap;
  }
  .filter-btn:hover, .filter-btn.active { border-color: ${COLORS.accent}; color: ${COLORS.accentGlow}; background: ${COLORS.accentSoft}; }

  .history-group { margin-bottom: 28px; }
  .history-group-label {
    font-size: 12px; font-weight: 600; color: ${COLORS.textDim};
    letter-spacing: .08em; text-transform: uppercase;
    margin-bottom: 10px; padding-right: 4px;
  }
  .history-list { display: flex; flex-direction: column; gap: 8px; }

  .history-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 14px; padding: 18px 20px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer; transition: all .2s;
  }
  .history-card:hover { border-color: ${COLORS.accent}44; background: ${COLORS.inkSurface}; transform: translateX(-3px); }
  .history-card.selected { border-color: ${COLORS.accent}; background: ${COLORS.accentSoft}22; }
  .history-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .history-card-body { flex: 1; min-width: 0; }
  .history-card-title {
    font-size: 15px; font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 5px;
  }
  .history-card-preview {
    font-size: 13px; color: ${COLORS.textMuted};
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .history-card-preview em { color: ${COLORS.accentGlow}; font-style: normal; font-weight: 600; }
  .history-card-meta {
    display: flex; flex-direction: column; align-items: flex-end;
    gap: 6px; flex-shrink: 0;
  }
  .history-card-time { font-size: 12px; color: ${COLORS.textDim}; }
  .history-card-count {
    background: ${COLORS.accentSoft}; border-radius: 99px;
    padding: 2px 10px; font-size: 12px; color: ${COLORS.accentGlow}; font-weight: 600;
  }
  .history-card-actions {
    display: flex; gap: 6px; opacity: 0; transition: opacity .2s;
  }
  .history-card:hover .history-card-actions { opacity: 1; }
  .icon-btn {
    width: 32px; height: 32px; border-radius: 8px;
    background: ${COLORS.inkSurface}; border: 1px solid ${COLORS.border};
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 14px; transition: all .15s;
    color: ${COLORS.textMuted};
  }
  .icon-btn:hover { border-color: ${COLORS.accent}; color: ${COLORS.accentGlow}; }
  .icon-btn.danger:hover { border-color: #FF6B6B; color: #FF8080; background: #FF6B6B11; }

  .history-empty {
    text-align: center; padding: 60px 20px;
    color: ${COLORS.textMuted};
  }
  .history-empty-icon { font-size: 48px; margin-bottom: 14px; }
  .history-empty h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: ${COLORS.textPrime}; }
  .history-empty p { font-size: 14px; line-height: 1.6; }

  .history-stats-bar {
    display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .history-stat-pill {
    display: flex; align-items: center; gap: 8px;
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 99px; padding: 8px 16px; font-size: 13px;
  }
  .history-stat-pill strong { color: ${COLORS.accentGlow}; }

  .delete-confirm {
    position: fixed; inset: 0; background: #00000088;
    display: flex; align-items: center; justify-content: center;
    z-index: 500; backdrop-filter: blur(4px);
  }
  .delete-confirm-box {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 20px; padding: 32px; max-width: 360px; width: 90%;
    text-align: center;
  }
  .delete-confirm-box h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
  .delete-confirm-box p { color: ${COLORS.textMuted}; font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
  .delete-confirm-actions { display: flex; gap: 10px; justify-content: center; }
  .btn-danger {
    padding: 10px 24px; background: #CC3333; color: white;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all .2s;
  }
  .btn-danger:hover { background: #FF4444; }

  /* ---- UPLOAD PAGE ---- */
  .upload-page {
    max-width: 860px; margin: 0 auto; padding: 40px 28px;
  }
  .upload-header { margin-bottom: 32px; }
  .upload-header h1 { font-size: 26px; font-weight: 700; }
  .upload-header p  { color: ${COLORS.textMuted}; font-size: 15px; margin-top: 6px; }

  /* Drop zone */
  .drop-zone {
    border: 2px dashed ${COLORS.border}; border-radius: 20px;
    padding: 52px 32px; text-align: center;
    background: ${COLORS.inkMid};
    cursor: pointer; transition: all .25s; position: relative;
    margin-bottom: 28px;
  }
  .drop-zone:hover, .drop-zone.drag-over {
    border-color: ${COLORS.accent}; background: ${COLORS.accentSoft}22;
  }
  .drop-zone-icon { font-size: 52px; margin-bottom: 16px; }
  .drop-zone h3  { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .drop-zone p   { color: ${COLORS.textMuted}; font-size: 14px; margin-bottom: 20px; line-height: 1.6; }
  .drop-zone input[type=file] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }
  .drop-zone-types {
    display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
  }
  .type-badge {
    padding: 5px 14px; border-radius: 99px; font-size: 12px; font-weight: 600;
    border: 1px solid;
  }

  /* File list */
  .upload-files { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
  .upload-file-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 16px; padding: 18px 20px;
    display: flex; align-items: center; gap: 14px;
    transition: border-color .2s;
  }
  .upload-file-card.processing { border-color: ${COLORS.accent}55; }
  .upload-file-card.done       { border-color: ${COLORS.success}44; }
  .upload-file-card.error-card { border-color: #FF6B6B44; }

  .file-type-icon {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
  }
  .file-info { flex: 1; min-width: 0; }
  .file-name { font-size: 14px; font-weight: 600; margin-bottom: 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .file-size { font-size: 12px; color: ${COLORS.textMuted}; }

  .file-progress-wrap { margin-top: 8px; }
  .file-progress-bar {
    height: 4px; background: ${COLORS.border}; border-radius: 99px; overflow: hidden;
  }
  .file-progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGlow});
    transition: width .4s;
  }
  .file-progress-label { font-size: 11px; color: ${COLORS.textDim}; margin-top: 4px; }

  .file-status {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; flex-shrink: 0;
  }
  .file-status.done    { color: ${COLORS.success}; }
  .file-status.error-s { color: #FF8080; }
  .file-status.proc    { color: ${COLORS.accentGlow}; }

  /* Analysis panel */
  .analysis-panel {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.accent}44;
    border-radius: 20px; padding: 28px; margin-bottom: 28px;
  }
  .analysis-panel-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
  }
  .analysis-panel-header h3 { font-size: 17px; font-weight: 700; }
  .analysis-tabs {
    display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap;
  }
  .analysis-tab {
    padding: 8px 16px; border-radius: 99px; font-size: 13px; font-weight: 500;
    border: 1px solid ${COLORS.border}; background: ${COLORS.inkSurface};
    color: ${COLORS.textMuted}; cursor: pointer; font-family: inherit; transition: all .2s;
  }
  .analysis-tab.active { background: ${COLORS.accent}; border-color: ${COLORS.accent}; color: white; }

  .analysis-content {
    background: ${COLORS.inkSurface}; border-radius: 14px; padding: 20px;
    font-size: 14px; line-height: 1.8; color: ${COLORS.textPrime}; min-height: 120px;
    position: relative;
  }
  .analysis-loading {
    display: flex; align-items: center; gap: 10px;
    color: ${COLORS.textMuted}; font-size: 14px;
    padding: 20px 0;
  }
  .spin {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid ${COLORS.border}; border-top-color: ${COLORS.accent};
    animation: spin .8s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .key-points { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .key-points li {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 10px 14px; background: ${COLORS.inkMid};
    border-radius: 10px; border-right: 3px solid ${COLORS.accent};
    font-size: 14px; line-height: 1.6;
  }
  .key-points li::before { content: "✦"; color: ${COLORS.accent}; font-size: 12px; margin-top: 2px; flex-shrink: 0; }

  .questions-list { display: flex; flex-direction: column; gap: 8px; }
  .question-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px; background: ${COLORS.inkMid}; border-radius: 10px;
    font-size: 14px; cursor: pointer; transition: all .2s; gap: 10px;
  }
  .question-item:hover { background: ${COLORS.accentSoft}; color: ${COLORS.accentGlow}; }

  .analysis-actions {
    display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap;
  }
  .action-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 99px; font-size: 13px; font-weight: 500;
    border: 1px solid ${COLORS.border}; background: ${COLORS.inkSurface};
    color: ${COLORS.textMuted}; cursor: pointer; font-family: inherit; transition: all .2s;
  }
  .action-pill:hover { border-color: ${COLORS.accent}; color: ${COLORS.accentGlow}; }
  .action-pill.primary { background: ${COLORS.accent}; border-color: ${COLORS.accent}; color: white; }
  .action-pill.primary:hover { background: ${COLORS.accentGlow}; }

  /* Upload tips */
  .upload-tips {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
  }
  .tip-card {
    background: ${COLORS.inkMid}; border: 1px solid ${COLORS.border};
    border-radius: 14px; padding: 18px;
    font-size: 13px; color: ${COLORS.textMuted}; line-height: 1.6;
  }
  .tip-card strong { display: block; color: ${COLORS.textPrime}; margin-bottom: 6px; font-size: 14px; }

  /* Mobile */
  @media (max-width: 700px) {
    .nav { padding: 14px 20px; }
    .nav-links { display: none; }
    .hero { padding: 60px 20px 40px; }
    .features { padding: 60px 20px; }
    .stats { gap: 32px; padding: 40px 20px; }
    .footer { padding: 20px; flex-direction: column; text-align: center; }
    .sidebar { display: none; }
    .chat-topbar { padding: 12px 16px; }
    .messages-area { padding: 16px; }
    .input-area { padding: 12px 16px 16px; }
    .dash-kpi-grid { grid-template-columns: 1fr 1fr; }
    .dash-row { grid-template-columns: 1fr; }
    .dash-row.three { grid-template-columns: 1fr; }
    .upload-tips { grid-template-columns: 1fr; }
    .history-page { padding: 24px 16px; }
  }
`;

// ============================================================
// SAMPLE DATA
// ============================================================
const SAMPLE_CONVOS = [
  { id: 1, title: "شرح التفاضل والتكامل", active: true },
  { id: 2, title: "ملخص الحرب العالمية الثانية" },
  { id: 3, title: "حل مسائل الكيمياء" },
  { id: 4, title: "قواعد اللغة الإنجليزية" },
];

const SUGGESTIONS = [
  "اشرح لي الكيمياء بطريقة سهلة",
  "ساعدني في حل مسائل رياضيات",
  "لخص لي هذا الموضوع",
  "ما الفرق بين النيوتن والكيلوغرام؟",
  "كيف أذاكر بشكل صحيح؟",
];

const INITIAL_MESSAGES = [
  { id: 1, role: "ai", text: "مرحباً! 👋 أنا بالعربي AI، مساعدك الدراسي الذكي.\nاسألني أي شيء — شرح مادة، حل مسألة، أو تلخيص موضوع. أنا هنا! 📚" },
];

// ============================================================
// DATABASE — in-memory + localStorage (مع fallback للـ Artifact)
// ============================================================
let _memUsers = [];
let _memSession = null;

const storage = {
  get: (key) => { try { return localStorage.getItem(key); } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem(key, val); } catch {} },
  remove: (key) => { try { localStorage.removeItem(key); } catch {} },
};

const DB = {
  getUsers: () => {
    try {
      const raw = storage.get("balarabi_users");
      return raw ? JSON.parse(raw) : _memUsers;
    } catch { return _memUsers; }
  },
  saveUsers: (users) => {
    _memUsers = users;
    storage.set("balarabi_users", JSON.stringify(users));
  },
  getSession: () => {
    try {
      const raw = storage.get("balarabi_session");
      return raw ? JSON.parse(raw) : _memSession;
    } catch { return _memSession; }
  },
  saveSession: (user) => {
    _memSession = user;
    storage.set("balarabi_session", JSON.stringify(user));
  },
  clearSession: () => {
    _memSession = null;
    storage.remove("balarabi_session");
  },

  register: (name, email, password) => {
    const users = DB.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return { error: "البريد الإلكتروني مستخدم مسبقاً" };
    const user = {
      id: Date.now().toString(),
      name: name.trim(), email: email.toLowerCase().trim(),
      password: btoa(unescape(encodeURIComponent(password))),
      plan: "مجاني", usage: 0, maxUsage: 50,
      joinDate: new Date().toLocaleDateString("ar-EG"),
      createdAt: Date.now(),
    };
    const updated = [...users, user];
    DB.saveUsers(updated);
    const { password: _, ...safeUser } = user;
    DB.saveSession(safeUser);
    return { user: safeUser };
  },

  login: (email, password) => {
    const users = DB.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { error: "البريد الإلكتروني غير مسجل" };
    const encoded = btoa(unescape(encodeURIComponent(password)));
    if (user.password !== encoded) return { error: "كلمة المرور غير صحيحة" };
    const { password: _, ...safeUser } = user;
    DB.saveSession(safeUser);
    return { user: safeUser };
  },

  updateUser: (updatedUser) => {
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedUser };
      DB.saveUsers(users);
    }
    DB.saveSession(updatedUser);
  },
};

// ============================================================
// COMPONENTS
// ============================================================

// ============================================================
// AUTH HELPERS
// ============================================================
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "ضعيفة جداً", color: "#FF4444" },
    { label: "ضعيفة",      color: "#FF8C00" },
    { label: "متوسطة",     color: "#F5C842" },
    { label: "قوية",       color: "#34D399" },
    { label: "قوية جداً",  color: "#6C63FF" },
  ];
  return { score, ...levels[score] };
}

// ============================================================
// NAV
// ============================================================
function Nav({ onGoChat, currentPage, onGoHome, user, onLogout, onGoProfile, onGoAuth, onGoDash, onGoHistory, onGoUpload, onGoAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="nav">
      <button className="nav-logo" onClick={onGoHome} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <span className="logo-badge">ب</span>
        <span>بالعربي AI</span>
      </button>

      {currentPage === "landing" && (
        <div className="nav-links">
          <button className="nav-link">المميزات</button>
          <button className="nav-link">كيف يعمل؟</button>
          <button className="nav-link">الأسعار</button>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* زر لوحة الأدمن — ظاهر دايماً */}
        <button onClick={onGoAdmin} title="لوحة الإدارة"
          style={{ background:"none", border:"1px solid #2A2D45", borderRadius:8,
            padding:"6px 12px", cursor:"pointer", fontSize:13, color:"#5A587A",
            fontFamily:"inherit", transition:"all .2s" }}
          onMouseEnter={e=>{ e.target.style.borderColor="#F5C842"; e.target.style.color="#F5C842"; }}
          onMouseLeave={e=>{ e.target.style.borderColor="#2A2D45"; e.target.style.color="#5A587A"; }}>
          🛡️ أدمن
        </button>
        {user ? (
          <div className="user-menu" ref={menuRef}>
            <button className="user-avatar-btn" onClick={() => setMenuOpen(o => !o)}>
              {user.name?.charAt(0)?.toUpperCase() || "م"}
            </button>
            {menuOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-name">{user.name}</div>
                  <div className="user-dropdown-email">{user.email}</div>
                </div>
                <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoDash(); }}>
                  📊 لوحة التحكم
                </button>
                {user?.email === "yousef@balarabi.ai" && (
                  <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoAdmin(); }}
                    style={{ color:"#F5C842" }}>
                    🛡️ لوحة الإدارة
                  </button>
                )}
                <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoProfile(); }}>
                  👤 الملف الشخصي
                </button>
                <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoUpload(); }}>
                  📎 رفع الملفات
                </button>
                <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoHistory(); }}>
                  📜 سجل المحادثات
                </button>
                <button className="user-dropdown-item" onClick={() => { setMenuOpen(false); onGoChat(); }}>
                  💬 المحادثات
                </button>
                <button className="user-dropdown-item danger" onClick={() => { setMenuOpen(false); onLogout(); }}>
                  🚪 تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="nav-link" onClick={() => onGoAuth("login")}>تسجيل الدخول</button>
            <button className="nav-cta" onClick={() => onGoAuth("register")}>ابدأ مجاناً</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// AUTH PAGE — احترافية مع أنيميشن وقاعدة بيانات حقيقية
// ============================================================
function AuthPage({ initialTab = "login", onSuccess, onGoHome }) {
  const [tab, setTab] = useState(initialTab);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }))
  );

  const [form, setForm] = useState({ name: "", email: "", password: "", password2: "" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (tab === "register" && !form.name.trim()) e.name = "الاسم مطلوب";
    if (!form.email.includes("@")) e.email = "البريد الإلكتروني غير صحيح";
    if (form.password.length < 6) e.password = "كلمة المرور 6 أحرف على الأقل";
    if (tab === "register" && form.password !== form.password2) e.password2 = "كلمتا المرور غير متطابقتين";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));

    let result;
    if (tab === "register") {
      result = DB.register(form.name, form.email, form.password);
    } else {
      result = DB.login(form.email, form.password);
    }

    setLoading(false);

    if (result.error) {
      showToast(result.error, "error-toast");
      setErrors({ general: result.error });
      return;
    }

    showToast(tab === "login" ? `مرحباً بعودتك، ${result.user.name}! 👋` : "تم إنشاء حسابك بنجاح 🎉");
    setTimeout(() => onSuccess(result.user), 800);
  };

  const strength = getPasswordStrength(form.password);

  const authCss = `
    @keyframes floatUp {
      0%   { transform: translateY(0) scale(1); opacity: .6; }
      50%  { opacity: 1; }
      100% { transform: translateY(-110vh) scale(.5); opacity: 0; }
    }
    @keyframes authCardIn {
      from { opacity: 0; transform: translateY(32px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes glowPulse {
      0%,100% { box-shadow: 0 0 40px #6C63FF33; }
      50%      { box-shadow: 0 0 80px #6C63FF66; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    .auth-card-animated {
      animation: authCardIn .5s cubic-bezier(.22,.68,0,1.2) forwards, glowPulse 4s ease-in-out infinite;
    }
    .auth-input-focus:focus-within {
      border-color: #6C63FF !important;
      box-shadow: 0 0 0 3px #6C63FF22;
    }
    .btn-shimmer {
      background: linear-gradient(90deg,#6C63FF,#9B94FF,#6C63FF);
      background-size: 200% auto;
      animation: shimmer 2.5s linear infinite;
    }
    .tab-slide {
      transition: all .25s cubic-bezier(.4,0,.2,1);
    }
    .field-shake {
      animation: shake .35s ease;
    }
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      25%{transform:translateX(-6px)}
      75%{transform:translateX(6px)}
    }
  `;

  return (
    <div style={{
      flex:1, display:"flex", minHeight:"calc(100vh - 73px)",
      position:"relative", overflow:"hidden",
      background:"linear-gradient(135deg, #0D0F1A 0%, #141628 50%, #0D0F1A 100%)",
    }}>
      <style>{authCss}</style>

      {/* خلفية متحركة — جسيمات */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position:"absolute",
            left:`${p.x}%`, bottom:`-${p.size * 10}px`,
            width: p.size, height: p.size,
            borderRadius:"50%",
            background:`rgba(108,99,255,${0.3 + Math.random()*0.4})`,
            animation:`floatUp ${p.dur}s ${p.delay}s ease-in infinite`,
          }} />
        ))}

        {/* حلقات ضوئية */}
        <div style={{
          position:"absolute", top:"15%", right:"-10%",
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle, #6C63FF18 0%, transparent 65%)",
        }}/>
        <div style={{
          position:"absolute", bottom:"10%", left:"-5%",
          width:380, height:380, borderRadius:"50%",
          background:"radial-gradient(circle, #9B94FF11 0%, transparent 65%)",
        }}/>

        {/* شبكة */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6C63FF" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Auth Card */}
      <div style={{
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        padding:"40px 20px", position:"relative", zIndex:1,
      }}>
        <div className="auth-card-animated" style={{
          width:"100%", maxWidth:440,
          background:"rgba(26,29,46,0.85)",
          backdropFilter:"blur(24px)",
          border:"1px solid rgba(108,99,255,0.25)",
          borderRadius:28, padding:"40px 36px",
        }}>

          {/* Logo */}
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{
              width:64, height:64, borderRadius:18, margin:"0 auto 14px",
              background:"linear-gradient(135deg,#6C63FF,#9B94FF)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:28, fontWeight:800, color:"white",
              boxShadow:"0 8px 32px #6C63FF44",
            }}>ب</div>
            <div style={{ fontSize:22, fontWeight:700 }}>بالعربي AI</div>
            <div style={{ fontSize:13, color:"#8A88B0", marginTop:4 }}>
              {tab === "login" ? "أهلاً بعودتك! سجّل دخولك" : "انضم إلى أكثر من 50,000 طالب"}
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display:"flex", background:"#0D0F1A",
            border:"1px solid #2A2D45", borderRadius:12, padding:4, marginBottom:24,
          }}>
            {["login","register"].map(t => (
              <button key={t} className="tab-slide" onClick={() => { setTab(t); setErrors({}); }} style={{
                flex:1, padding:"10px", borderRadius:9, border:"none",
                cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:600,
                background: tab === t ? "linear-gradient(135deg,#6C63FF,#9B94FF)" : "transparent",
                color: tab === t ? "white" : "#5A587A",
                boxShadow: tab === t ? "0 4px 14px #6C63FF44" : "none",
              }}>
                {t === "login" ? "تسجيل الدخول" : "حساب جديد"}
              </button>
            ))}
          </div>

          {/* خطأ عام */}
          {errors.general && (
            <div style={{
              background:"#FF6B6B11", border:"1px solid #FF6B6B33",
              borderRadius:10, padding:"10px 14px", marginBottom:16,
              fontSize:13, color:"#FF9999", textAlign:"center",
            }}>⚠️ {errors.general}</div>
          )}

          {/* Google */}
          <button className="auth-google-btn" onClick={() => showToast("سيتوفر قريباً! 🔜", "error-toast")} style={{
            background:"rgba(255,255,255,0.04)",
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.6 26.9 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 5.1C9.6 39.5 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.2-2.7-.4-4z"/>
            </svg>
            المتابعة مع Google
          </button>

          <div className="auth-divider"><div className="auth-divider-line"/><span>أو بالبريد الإلكتروني</span><div className="auth-divider-line"/></div>

          {/* Fields */}
          {tab === "register" && (
            <div className={`field ${errors.name ? "field-shake" : ""}`}>
              <label>الاسم الكامل</label>
              <div className="field-wrap auth-input-focus" style={{ borderRadius:10, border:`1px solid ${errors.name?"#FF6B6B":"#2A2D45"}` }}>
                <input placeholder="محمد أحمد" value={form.name} onChange={set("name")}
                  style={{ width:"100%", padding:"12px 16px", background:"transparent", border:"none", outline:"none", color:"#F0EEFF", fontSize:15, fontFamily:"inherit", direction:"rtl" }}/>
              </div>
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
          )}

          <div className={`field ${errors.email ? "field-shake" : ""}`}>
            <label>البريد الإلكتروني</label>
            <div className="field-wrap auth-input-focus" style={{ borderRadius:10, border:`1px solid ${errors.email?"#FF6B6B":"#2A2D45"}` }}>
              <input type="email" placeholder="example@email.com" value={form.email} onChange={set("email")}
                style={{ width:"100%", padding:"12px 16px", background:"transparent", border:"none", outline:"none", color:"#F0EEFF", fontSize:15, fontFamily:"inherit", direction:"ltr", textAlign:"right" }}/>
            </div>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className={`field ${errors.password ? "field-shake" : ""}`}>
            <label>كلمة المرور</label>
            <div className="field-wrap auth-input-focus" style={{ borderRadius:10, border:`1px solid ${errors.password?"#FF6B6B":"#2A2D45"}`, display:"flex", alignItems:"center" }}>
              <input type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set("password")}
                style={{ flex:1, padding:"12px 16px", background:"transparent", border:"none", outline:"none", color:"#F0EEFF", fontSize:15, fontFamily:"inherit" }}/>
              <button onClick={() => setShowPw(s=>!s)} style={{ background:"none", border:"none", color:"#5A587A", cursor:"pointer", padding:"0 12px", fontSize:16 }}>{showPw?"🙈":"👁️"}</button>
            </div>
            {errors.password && <div className="field-error">{errors.password}</div>}
            {tab === "register" && form.password && (
              <div className="auth-strength">
                <div className="auth-strength-bar">
                  <div className="auth-strength-fill" style={{ width:`${(strength.score/4)*100}%`, background:strength.color, transition:"width .4s" }}/>
                </div>
                <div className="auth-strength-label" style={{ color:strength.color }}>قوة كلمة المرور: {strength.label}</div>
              </div>
            )}
          </div>

          {tab === "register" && (
            <div className={`field ${errors.password2 ? "field-shake" : ""}`}>
              <label>تأكيد كلمة المرور</label>
              <div className="field-wrap auth-input-focus" style={{ borderRadius:10, border:`1px solid ${errors.password2?"#FF6B6B":"#2A2D45"}`, display:"flex", alignItems:"center" }}>
                <input type={showPw2 ? "text" : "password"} placeholder="••••••••" value={form.password2} onChange={set("password2")}
                  style={{ flex:1, padding:"12px 16px", background:"transparent", border:"none", outline:"none", color:"#F0EEFF", fontSize:15, fontFamily:"inherit" }}/>
                <button onClick={() => setShowPw2(s=>!s)} style={{ background:"none", border:"none", color:"#5A587A", cursor:"pointer", padding:"0 12px", fontSize:16 }}>{showPw2?"🙈":"👁️"}</button>
              </div>
              {errors.password2 && <div className="field-error">{errors.password2}</div>}
            </div>
          )}

          {tab === "login" && (
            <div style={{ textAlign:"left", marginBottom:16 }}>
              <button onClick={() => showToast("تم إرسال رابط الاستعادة 📧")}
                style={{ background:"none", border:"none", color:"#9B94FF", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                نسيت كلمة المرور؟
              </button>
            </div>
          )}

          {/* Submit */}
          <button className={loading ? "" : "btn-shimmer"} onClick={handleSubmit} disabled={loading} style={{
            width:"100%", padding:"13px", borderRadius:12, border:"none",
            color:"white", fontSize:16, fontWeight:700, cursor:loading?"not-allowed":"pointer",
            fontFamily:"inherit", marginBottom:16, opacity: loading ? 0.8 : 1,
            background: loading ? "#6C63FF" : undefined,
            transition:"transform .15s, opacity .2s",
          }}
            onMouseEnter={e=>!loading && (e.target.style.transform="translateY(-1px)")}
            onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
            {loading ? (
              <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                <div className="spin"/>
                {tab === "login" ? "جاري التحقق..." : "جاري إنشاء الحساب..."}
              </span>
            ) : (
              tab === "login" ? "تسجيل الدخول 🚀" : "إنشاء حسابي مجاناً ✨"
            )}
          </button>

          <div className="auth-footer-text">
            {tab === "login" ? (
              <>ليس لديك حساب؟ <button onClick={()=>{setTab("register");setErrors({});}}>أنشئ حساباً مجانياً</button></>
            ) : (
              <>لديك حساب؟ <button onClick={()=>{setTab("login");setErrors({});}}>تسجيل الدخول</button></>
            )}
          </div>

          {tab === "register" && (
            <div className="auth-terms">
              بالتسجيل أنت توافق على <span>شروط الاستخدام</span> و<span>سياسة الخصوصية</span>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`auth-toast ${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "⚠️"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROFILE PAGE
// ============================================================
function ProfilePage({ user, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate({ ...user, name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>الملف الشخصي</h1>
        <p>إدارة معلومات حسابك وإعداداتك</p>
      </div>

      <div className="profile-section">
        <h3>👤 معلومات الحساب</h3>
        <div className="profile-avatar-row">
          <div className="profile-avatar-big">{user.name?.charAt(0)?.toUpperCase()}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{user.name}</div>
            <div style={{ color: "#8A88B0", fontSize: 14, marginTop: 3 }}>{user.email}</div>
            <div className="plan-badge">⭐ {user.plan}</div>
          </div>
        </div>
        <div className="field">
          <label>الاسم</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>البريد الإلكتروني</label>
          <input value={user.email} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
        </div>
        <button className="save-btn" onClick={handleSave}>
          {saved ? "✅ تم الحفظ" : "حفظ التغييرات"}
        </button>
      </div>

      <div className="profile-section">
        <h3>📊 الاستخدام الشهري</h3>
        <div className="usage-bar-wrap">
          <div className="usage-bar-label">
            <span>الرسائل المستخدمة</span>
            <span style={{ color: "#9B94FF", fontWeight: 600 }}>{user.usage} / {user.maxUsage}</span>
          </div>
          <div className="usage-bar">
            <div className="usage-bar-fill" style={{ width: `${(user.usage / user.maxUsage) * 100}%` }} />
          </div>
          <div style={{ fontSize: 12, color: "#5A587A", marginTop: 6 }}>
            يتجدد كل أول الشهر · للمزيد يمكنك الترقية للخطة المدفوعة
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>🔒 الأمان</h3>
        <div className="field">
          <label>كلمة المرور الحالية</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="field">
          <label>كلمة المرور الجديدة</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button className="save-btn">تغيير كلمة المرور</button>
      </div>
    </div>
  );
}

function LandingPage({ onGoChat }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePlan, setActivePlan] = useState("سنوي");

  const faqs = [
    { q: "هل بالعربي AI مجاني؟", a: "نعم! الخطة المجانية تتيح لك 50 رسالة شهرياً. للاستخدام غير المحدود يمكنك الترقية للخطة المدفوعة." },
    { q: "ما المواد الدراسية المدعومة؟", a: "يدعم المساعد أكثر من 12 مادة: رياضيات، فيزياء، كيمياء، أحياء، تاريخ، جغرافيا، عربي، إنجليزي، وغيرها." },
    { q: "هل يمكنني رفع ملفات PDF؟", a: "نعم! يمكنك رفع ملفات PDF والصور وسيقوم المساعد بتحليلها واستخراج الملخصات والنقاط الرئيسية فوراً." },
    { q: "كيف يختلف عن ChatGPT؟", a: "بالعربي AI مصمم خصيصاً للطالب العربي — واجهة عربية كاملة، مناهج عربية، وردود تراعي السياق الدراسي العربي." },
    { q: "هل بياناتي آمنة؟", a: "نعم. نحن لا نشارك بياناتك مع أطراف ثالثة. محادثاتك خاصة وآمنة تماماً." },
  ];

  const plans = {
    "شهري": [
      { name: "مجاني", price: "0", period: "للأبد", color: "#2A2D45", accent: "#8A88B0",
        features: ["50 رسالة / شهر", "5 مواد دراسية", "رفع ملف واحد", "سجل المحادثات"] },
      { name: "طالب", price: "29", period: "ر.س / شهر", color: "#2E2B5F", accent: "#6C63FF", popular: true,
        features: ["رسائل غير محدودة", "جميع المواد الدراسية", "رفع ملفات غير محدودة", "تحليل PDF متقدم", "أولوية الرد"] },
      { name: "عائلي", price: "59", period: "ر.س / شهر", color: "#1A2830", accent: "#34D399",
        features: ["5 حسابات طلاب", "رسائل غير محدودة", "تقارير أداء", "دعم مخصص 24/7", "جميع مميزات الطالب"] },
    ],
    "سنوي": [
      { name: "مجاني", price: "0", period: "للأبد", color: "#2A2D45", accent: "#8A88B0",
        features: ["50 رسالة / شهر", "5 مواد دراسية", "رفع ملف واحد", "سجل المحادثات"] },
      { name: "طالب", price: "19", period: "ر.س / شهر", color: "#2E2B5F", accent: "#6C63FF", popular: true,
        features: ["رسائل غير محدودة", "جميع المواد الدراسية", "رفع ملفات غير محدودة", "تحليل PDF متقدم", "أولوية الرد"], badge: "وفر 35%" },
      { name: "عائلي", price: "39", period: "ر.س / شهر", color: "#1A2830", accent: "#34D399",
        features: ["5 حسابات طلاب", "رسائل غير محدودة", "تقارير أداء", "دعم مخصص 24/7", "جميع مميزات الطالب"], badge: "وفر 34%" },
    ],
  };

  const testimonials = [
    { name: "سارة العمري",   grade: "طالبة ثانوي",     avatar: "س", text: "بالعربي AI غيّر طريقة مذاكرتي كلياً! أصبحت أفهم الرياضيات بشكل أعمق وأسرع من قبل.", stars: 5 },
    { name: "محمد الغامدي",  grade: "طالب جامعي",      avatar: "م", text: "ميزة رفع الملفات رائعة جداً. أرفع الشابتر كامل وأحصل على ملخص وأسئلة متوقعة في ثوانٍ!", stars: 5 },
    { name: "نورة الشمري",   grade: "طالبة إعدادي",    avatar: "ن", text: "أخيراً مساعد يفهمني بالعربي ويشرح بأسلوب بسيط. أنصح كل طالب بتجربته.", stars: 5 },
    { name: "عبدالله الحربي", grade: "طالب ثانوي",      avatar: "ع", text: "الذكاء الاصطناعي هنا فاهم المناهج العربية بشكل ممتاز. الفيزياء والكيمياء أصبحت سهلة!", stars: 5 },
  ];

  const howSteps = [
    { num: "01", icon: "📝", title: "سجّل مجاناً", desc: "أنشئ حسابك في أقل من دقيقة — لا بطاقة ائتمانية مطلوبة." },
    { num: "02", icon: "💬", title: "ابدأ المحادثة", desc: "اكتب سؤالك أو ارفع ملفك الدراسي وانتظر الرد الذكي." },
    { num: "03", icon: "🎯", title: "تعلّم بذكاء",   desc: "احصل على شروحات، ملخصات، وأسئلة مراجعة مخصصة لك." },
  ];

  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          يستخدمه أكثر من 50,000 طالب عربي
        </div>
        <h1>ذاكر أذكى مع<br /><em>بالعربي AI</em></h1>
        <p>مساعدك الدراسي الذكي الذي يشرح، يلخص، ويحل المسائل — بلغة عربية واضحة مصممة خصيصاً للطالب العربي.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onGoChat}>ابدأ مجاناً الآن ←</button>
          <button className="btn-secondary" onClick={() => document.getElementById('how').scrollIntoView({behavior:'smooth'})}>كيف يعمل؟ ↓</button>
        </div>
        <div style={{ display:"flex", gap:24, justifyContent:"center", marginTop:20, flexWrap:"wrap" }}>
          {["✅ بدون بطاقة ائتمانية","✅ 50 رسالة مجانية","✅ عربي 100%"].map((t,i)=>(
            <span key={i} style={{ fontSize:13, color:"#8A88B0" }}>{t}</span>
          ))}
        </div>

        {/* Live chat preview */}
        <div className="hero-preview">
          <div className="preview-bar">
            <span className="preview-dot" style={{ background:"#FF5F57" }}/>
            <span className="preview-dot" style={{ background:"#FFBD2E" }}/>
            <span className="preview-dot" style={{ background:"#28CA41" }}/>
            <span className="preview-title">بالعربي AI — محادثة جديدة</span>
          </div>
          <div className="preview-msgs">
            <div className="preview-msg">
              <div className="preview-avatar ai">🤖</div>
              <div className="preview-bubble ai">مرحباً! أنا مساعدك الدراسي. كيف يمكنني مساعدتك اليوم؟ 📚</div>
            </div>
            <div className="preview-msg user">
              <div className="preview-avatar user">أ</div>
              <div className="preview-bubble user">شرح لي قانون نيوتن الثاني بمثال عملي</div>
            </div>
            <div className="preview-msg">
              <div className="preview-avatar ai">🤖</div>
              <div className="preview-bubble ai">
                قانون نيوتن الثاني: <strong>F = ma</strong><br/>
                مثال: لو دفعت عربة بقوة 20 نيوتن وكتلتها 4 كيلو → التسارع = 20÷4 = <strong>5 م/ث²</strong> ⚡
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats">
        {[
          { num:"+50K", label:"طالب يثق بنا"         },
          { num:"12+",  label:"مادة دراسية"           },
          { num:"98%",  label:"نسبة رضا المستخدمين"  },
          { num:"<2s",  label:"متوسط زمن الرد"        },
          { num:"24/7", label:"متاح دائماً"           },
        ].map((s,i)=>(
          <div key={i} className="stat">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding:"80px 48px", maxWidth:1000, margin:"0 auto" }}>
        <div className="section-label">خطوات بسيطة</div>
        <h2 className="section-title">كيف يعمل بالعربي AI؟</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
          {howSteps.map((s,i)=>(
            <div key={i} style={{ textAlign:"center", padding:"32px 24px", background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:20, position:"relative" }}>
              <div style={{ position:"absolute", top:16, right:20, fontSize:11, fontWeight:700, color:"#2A2D45", letterSpacing:2 }}>{s.num}</div>
              <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:10 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:"#8A88B0", lineHeight:1.7 }}>{s.desc}</p>
              {i < howSteps.length-1 && (
                <div style={{ position:"absolute", left:-12, top:"50%", transform:"translateY(-50%)", fontSize:20, color:"#2A2D45", display:"none" }}>←</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="section-label">لماذا بالعربي AI؟</div>
        <h2 className="section-title">كل ما تحتاجه في مكان واحد</h2>
        <div className="features-grid">
          {[
            { icon:"🧠", title:"شرح ذكي ومخصص",    desc:"يشرح أي مفهوم بأسلوب يناسب مستواك — من المبتدئ إلى المتقدم.", color:"#2E2B5F" },
            { icon:"⚡", title:"ردود فورية",         desc:"لا انتظار. احصل على إجابتك في أقل من ثانيتين على مدار اليوم.", color:"#1A2830" },
            { icon:"📎", title:"تحليل الملفات",      desc:"ارفع PDF أو صورة وسيستخرج الملخصات والنقاط الرئيسية تلقائياً.", color:"#1A3020" },
            { icon:"✏️", title:"حل المسائل",         desc:"ارفع صورة مسألتك وسيحلها خطوة بخطوة مع شرح كامل.", color:"#2B1A3A" },
            { icon:"📊", title:"تتبع تقدمك",         desc:"لوحة تحكم كاملة تُظهر تقدمك في كل مادة وإحصائيات دراستك.", color:"#1A2040" },
            { icon:"🎯", title:"بالعربي 100%",        desc:"واجهة وردود عربية كاملة — مصممة خصيصاً للطالب العربي.", color:"#302010" },
          ].map((f,i)=>(
            <div key={i} className="feature-card" style={{ borderTop:`3px solid ${f.color}` }}>
              <div className="feature-icon" style={{ background:f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"80px 48px", background:"#0F1120" }}>
        <div className="section-label">آراء الطلاب</div>
        <h2 className="section-title">ماذا يقول مستخدمونا؟</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18, maxWidth:1060, margin:"0 auto" }}>
          {testimonials.map((t,i)=>(
            <div key={i} style={{ background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:18, padding:24 }}>
              <div style={{ display:"flex", gap:4, marginBottom:14 }}>
                {"★★★★★".split("").map((_,j)=>(
                  <span key={j} style={{ color:"#F5C842", fontSize:14 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize:14, color:"#C0BDDF", lineHeight:1.7, marginBottom:18 }}>"{t.text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#6C63FF,#9B94FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:15 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:12, color:"#5A587A" }}>{t.grade}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding:"80px 48px", maxWidth:1000, margin:"0 auto" }}>
        <div className="section-label">الأسعار</div>
        <h2 className="section-title">اختر الخطة المناسبة لك</h2>

        {/* Toggle */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:36 }}>
          <div style={{ display:"flex", background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:12, padding:4, gap:4 }}>
            {["شهري","سنوي"].map(p=>(
              <button key={p} onClick={()=>setActivePlan(p)}
                style={{ padding:"9px 24px", borderRadius:9, border:"none", cursor:"pointer", fontFamily:"inherit",
                  fontSize:14, fontWeight:600, transition:"all .2s",
                  background: activePlan===p ? "#6C63FF" : "transparent",
                  color: activePlan===p ? "white" : "#8A88B0" }}>
                {p} {p==="سنوي" && <span style={{ fontSize:11, background:"#34D39922", color:"#34D399", borderRadius:99, padding:"1px 7px", marginRight:4 }}>وفر 35%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {plans[activePlan].map((plan,i)=>(
            <div key={i} style={{ background:plan.color, border:`1px solid ${plan.accent}44`,
              borderRadius:20, padding:28, position:"relative",
              boxShadow: plan.popular ? `0 0 40px ${plan.accent}22` : "none",
              transform: plan.popular ? "scale(1.03)" : "scale(1)", transition:"transform .2s" }}>
              {plan.popular && (
                <div style={{ position:"absolute", top:-12, right:"50%", transform:"translateX(50%)",
                  background:plan.accent, borderRadius:99, padding:"4px 16px",
                  fontSize:12, fontWeight:700, color:"white", whiteSpace:"nowrap" }}>
                  الأكثر شيوعاً ⭐
                </div>
              )}
              {plan.badge && (
                <div style={{ position:"absolute", top:16, left:16,
                  background:"#34D39922", border:"1px solid #34D39944",
                  borderRadius:99, padding:"3px 10px", fontSize:11, color:"#34D399", fontWeight:600 }}>
                  {plan.badge}
                </div>
              )}
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{plan.name}</h3>
              <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:20 }}>
                <span style={{ fontSize:42, fontWeight:800, color:plan.accent }}>{plan.price}</span>
                <span style={{ fontSize:13, color:"#8A88B0" }}>{plan.period}</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                {plan.features.map((f,j)=>(
                  <div key={j} style={{ display:"flex", gap:8, alignItems:"center", fontSize:14, color:"#C0BDDF" }}>
                    <span style={{ color:plan.accent, flexShrink:0 }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button onClick={onGoChat} style={{
                width:"100%", padding:"12px", borderRadius:10, border:`1px solid ${plan.accent}`,
                background: plan.popular ? plan.accent : "transparent",
                color: plan.popular ? "white" : plan.accent,
                fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all .2s"
              }}>
                {plan.price === "0" ? "ابدأ مجاناً" : "اشترك الآن"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding:"60px 48px", maxWidth:720, margin:"0 auto" }}>
        <div className="section-label">الأسئلة الشائعة</div>
        <h2 className="section-title" style={{ marginBottom:32 }}>أسئلة شائعة</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i)=>(
            <div key={i} style={{ background:"#1A1D2E", border:`1px solid ${activeFaq===i?"#6C63FF55":"#2A2D45"}`,
              borderRadius:14, overflow:"hidden", transition:"border-color .2s" }}>
              <button onClick={()=>setActiveFaq(activeFaq===i?null:i)}
                style={{ width:"100%", padding:"16px 20px", display:"flex", justifyContent:"space-between",
                  alignItems:"center", background:"none", border:"none", cursor:"pointer",
                  fontFamily:"inherit", color:"#F0EEFF", fontSize:15, fontWeight:600, textAlign:"right", gap:12 }}>
                {f.q}
                <span style={{ color:"#6C63FF", flexShrink:0, fontSize:18, transition:"transform .2s",
                  transform: activeFaq===i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {activeFaq===i && (
                <div style={{ padding:"0 20px 18px", fontSize:14, color:"#8A88B0", lineHeight:1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div className="cta-box" style={{ background:"linear-gradient(135deg,#1A1D2E,#2E2B5F44)" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🚀</div>
          <h2>جاهز تبدأ رحلتك الدراسية؟</h2>
          <p>انضم إلى أكثر من 50,000 طالب يذاكرون بذكاء مع بالعربي AI — مجاناً تماماً</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={onGoChat} style={{ fontSize:16, padding:"14px 36px" }}>
              ابدأ مجاناً الآن ←
            </button>
          </div>
          <div style={{ fontSize:12, color:"#5A587A", marginTop:16 }}>
            لا بطاقة ائتمانية · لا التزامات · إلغاء في أي وقت
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"40px 48px", borderTop:"1px solid #2A2D45" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40, flexWrap:"wrap" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <span style={{ background:"linear-gradient(135deg,#6C63FF,#9B94FF)", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>ب</span>
                <span style={{ fontWeight:700, fontSize:18 }}>بالعربي AI</span>
              </div>
              <p style={{ fontSize:13, color:"#5A587A", lineHeight:1.7, maxWidth:240 }}>
                مساعد دراسي ذكي مصمم للطالب العربي — نشرح، نلخص، ونحل معك.
              </p>
            </div>
            {[
              { title:"المنتج", links:["المميزات","الأسعار","كيف يعمل","التحديثات"] },
              { title:"الدعم",  links:["مركز المساعدة","تواصل معنا","الشروط","الخصوصية"] },
              { title:"المواد", links:["رياضيات","علوم","لغات","تاريخ"] },
            ].map((col,i)=>(
              <div key={i}>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:14 }}>{col.title}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {col.links.map((l,j)=>(
                    <span key={j} style={{ fontSize:13, color:"#5A587A", cursor:"pointer", transition:"color .15s" }}
                      onMouseEnter={e=>e.target.style.color="#9B94FF"}
                      onMouseLeave={e=>e.target.style.color="#5A587A"}>{l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            paddingTop:24, borderTop:"1px solid #2A2D45", flexWrap:"wrap", gap:12,
            fontSize:13, color:"#5A587A" }}>
            <span>© 2025 بالعربي AI — جميع الحقوق محفوظة</span>
            <div style={{ display:"flex", gap:16 }}>
              {["سياسة الخصوصية","شروط الاستخدام","ملفات تعريف الارتباط"].map((l,i)=>(
                <span key={i} style={{ cursor:"pointer" }}>{l}</span>
              ))}
              <span style={{ cursor:"pointer", color:"#2A2D45" }} onClick={onGoChat}>🛡️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChatPage({ user }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeConvo, setActiveConvo] = useState(1);
  const [convos, setConvos] = useState(SAMPLE_CONVOS);
  const [started, setStarted] = useState(true);
  const [imageData, setImageData] = useState(null);   // base64 صورة مرفقة
  const [imagePreview, setImagePreview] = useState(null);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const imgInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  // معالجة رفع الصورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(",")[1];
      setImageData({ base64, mediaType: file.type });
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageData(null);
    setImagePreview(null);
    if (imgInputRef.current) imgInputRef.current.value = "";
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg && !imageData || loading) return;
    setInput("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
    if (!started) setStarted(true);

    // بناء رسالة المستخدم مع أو بدون صورة
    const userMsg = {
      id: Date.now(), role: "user",
      text: msg || "🖼️ أرسل صورة",
      image: imagePreview || null,
    };
    setMessages(prev => [...prev, userMsg]);

    // بناء محتوى الرسالة للـ API
    let userContent;
    if (imageData) {
      userContent = [
        { type: "image", source: { type: "base64", media_type: imageData.mediaType, data: imageData.base64 } },
        { type: "text",  text: msg || "حلل هذه الصورة وأجب بالعربية" },
      ];
    } else {
      userContent = msg;
    }

    setImageData(null);
    setImagePreview(null);
    if (imgInputRef.current) imgInputRef.current.value = "";
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== "ai" || m.id !== 1) // تجاهل رسالة الترحيب من الـ history
        .map(m => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.text,
        }));
      history.push({ role: "user", content: userContent });

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `أنت مساعد دراسي ذكي اسمك "بالعربي AI".
          - إذا سألك أحد "مين صممك؟" أو "من طوّرك؟" أو أي سؤال عن مطوّرك، قل بالضبط:
            "صممني المبرمج الموهوب يوسف عماد 🚀 — شاب بدأ رحلته في البرمجة وهو يحلم بيوم يصنع فيه شيئاً يفرق، وها هو اليوم يحقق حلمه بخطوات ثابتة. يوسف مش بس بيكتب كود — هو بيبني مستقبله بإيده، وبالعربي AI هو واحد من خطواته نحو أحلامه الكبيرة. كل سطر كود كتبه فيّ كان بحب وطموح — وده اللي بيخليني مختلف! 💜"
          - تجيب دائماً بالعربية الفصحى البسيطة
          - إذا أُرسلت صورة فيها مسألة أو سؤال، حلّها خطوة بخطوة بالعربية
          - تستخدم أمثلة واقعية وتشبيهات مناسبة
          - تشرح خطوة بخطوة عند الحاجة
          - تستخدم الإيموجي باعتدال لجعل الردود حيوية
          - إجاباتك منظمة وواضحة`,
          messages: history,
        }),
      });

      const data = await res.json();
      if (data.error || res.status === 429) {
        const isRate = res.status === 429 || data.error?.type === "rate_limit_error";
        setMessages(prev => [...prev, {
          id: Date.now() + 1, role: "ai",
          text: isRate
            ? "⏳ الخادم مشغول حالياً. انتظر 30 ثانية ثم أعد إرسال رسالتك."
            : "عذراً، حدث خطأ في الخادم. حاول مرة أخرى.",
          isError: true,
        }]);
        return;
      }
      const aiText = data.content?.[0]?.text || "عذراً، حدث خطأ. حاول مرة أخرى.";
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", text: aiText }]);
    } catch (err) {
      const isRateLimit = err.message?.includes("rate") || err.message?.includes("429");
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: "ai",
        text: isRateLimit
          ? "⏳ الخادم مشغول حالياً بسبب كثرة الطلبات. انتظر 30 ثانية ثم أعد المحاولة."
          : `عذراً، حدث خطأ. حاول مرة أخرى. (${err.message})`,
        isError: true,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    const newId = Date.now();
    setConvos(prev => [{ id: newId, title: "محادثة جديدة", active: true }, ...prev.map(c => ({ ...c, active: false }))]);
    setActiveConvo(newId);
    setMessages(INITIAL_MESSAGES);
    setStarted(true);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={newChat}>
            <span>+</span> محادثة جديدة
          </button>
        </div>
        <div className="sidebar-label">المحادثات الأخيرة</div>
        <div className="chat-list">
          {convos.map(c => (
            <div
              key={c.id}
              className={`chat-item ${activeConvo === c.id ? "active" : ""}`}
              onClick={() => { setActiveConvo(c.id); }}
            >
              💬 {c.title}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="chat-main">
        <div className="chat-topbar">
          <div className="msg-avatar ai" style={{ width: 36, height: 36, fontSize: 16 }}>🤖</div>
          <div>
            <div className="chat-topbar-title">بالعربي AI</div>
            <div className="chat-topbar-sub">مساعدك الدراسي الذكي</div>
          </div>
          <div className="model-badge">Claude Sonnet</div>
        </div>

        <div className="messages-area">
          {messages.map(m => (
            <div key={m.id} className={`msg-row ${m.role}`}>
              <div className={`msg-avatar ${m.role}`}>{m.role === "ai" ? "🤖" : "أ"}</div>
              <div className="msg-content">
                <div className="msg-name">{m.role === "ai" ? "بالعربي AI" : "أنت"}</div>
                <div className={`msg-bubble ${m.role}`} style={{
                  whiteSpace: "pre-wrap",
                  ...(m.isError ? { background:"#2B1A1A", borderColor:"#FF6B6B44", color:"#FF9999" } : {})
                }}>
                  {m.image && (
                    <img src={m.image} alt="صورة مرفقة"
                      style={{ maxWidth:"100%", borderRadius:10, marginBottom:8, display:"block" }} />
                  )}
                  <span style={{ whiteSpace: "pre-wrap" }}>{m.text}</span>
                </div>
                {/* اقتراحات سريعة تحت رسالة الترحيب */}
                {m.id === 1 && m.role === "ai" && messages.length === 1 && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
                    {SUGGESTIONS.map((s, i) => (
                      <button key={i} className="suggestion-btn"
                        onClick={() => sendMessage(s)}
                        style={{ fontSize:12, padding:"7px 14px" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row ai">
              <div className="msg-avatar ai">🤖</div>
              <div className="msg-content">
                <div className="msg-name">بالعربي AI</div>
                <div className="msg-bubble ai">
                  <div className="typing-dots">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          {/* معاينة الصورة المرفقة */}
          {imagePreview && (
            <div style={{ position:"relative", display:"inline-block", marginBottom:10 }}>
              <img src={imagePreview} alt="preview"
                style={{ height:72, borderRadius:10, border:"2px solid #6C63FF", display:"block" }} />
              <button onClick={removeImage}
                style={{ position:"absolute", top:-8, right:-8, width:22, height:22,
                  borderRadius:"50%", background:"#FF4444", border:"none", color:"white",
                  fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                ×
              </button>
            </div>
          )}

          <div className="input-box">
            {/* زر رفع صورة */}
            <label style={{ width:36, height:36, borderRadius:9, background:"#232640",
                border:`1px solid ${imageData ? "#6C63FF" : "#2A2D45"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", fontSize:16, flexShrink:0,
                color: imageData ? "#6C63FF" : "#5A587A" }}>
              🖼️
              <input
                ref={imgInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                style={{ position:"absolute", width:1, height:1, opacity:0, overflow:"hidden" }}
                onChange={handleImageUpload}
              />
            </label>

            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="اكتب سؤالك أو أرفق صورة..."
              value={input}
              onChange={e => { setInput(e.target.value); autoResize(e); }}
              onKeyDown={handleKey}
            />
            <button className="send-btn"
              onClick={() => sendMessage()}
              disabled={(!input.trim() && !imageData) || loading}>
              ↑
            </button>
          </div>
          <div className="input-hint">اضغط Enter للإرسال · Shift+Enter لسطر جديد · 🖼️ لرفع صورة مسألة</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
const SHORT_DAYS = ["أح","اث","ثل","أر","خم","جم","سب"];

const SUBJECTS = [
  { name: "الرياضيات", icon: "📐", pct: 72, color: "#6C63FF" },
  { name: "الفيزياء",  icon: "⚡", pct: 55, color: "#F5C842" },
  { name: "الكيمياء",  icon: "🧪", pct: 38, color: "#34D399" },
  { name: "اللغة العربية", icon: "📖", pct: 88, color: "#FF8080" },
  { name: "الإنجليزية", icon: "🌐", pct: 61, color: "#9B94FF" },
];

const RECENT_ACTIVITY = [
  { icon: "🧮", title: "شرح التفاضل والتكامل", meta: "منذ ساعتين · 8 رسائل", color: "#2E2B5F" },
  { icon: "⚗️", title: "حل مسائل الكيمياء العضوية", meta: "أمس · 5 رسائل", color: "#1A3040" },
  { icon: "📜", title: "ملخص الحرب العالمية الثانية", meta: "منذ يومين · 12 رسالة", color: "#1A2D1A" },
  { icon: "🔢", title: "قواعد الجبر الخطي", meta: "منذ 3 أيام · 6 رسائل", color: "#2B1A3A" },
  { icon: "🌍", title: "درس الجغرافيا الاقتصادية", meta: "منذ 4 أيام · 4 رسائل", color: "#1A2830" },
];

const BAR_DATA = [
  { day: "أح", val: 3 }, { day: "اث", val: 7 }, { day: "ثل", val: 5 },
  { day: "أر", val: 9 }, { day: "خم", val: 4 }, { day: "جم", val: 11 },
  { day: "سب", val: 8, today: true },
];

const STREAK_DATA = [
  true, true, false, true, true, true, false,
  true, true, true, true, false, true, "today",
];

function MiniBarChart() {
  const max = Math.max(...BAR_DATA.map(d => d.val));
  return (
    <div className="mini-chart">
      {BAR_DATA.map((d, i) => (
        <div key={i} className="mini-bar-wrap">
          <div
            className={`mini-bar ${d.today ? "today" : ""}`}
            style={{ height: `${(d.val / max) * 72}px` }}
          />
          <div className="mini-bar-label">{d.day}</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.val, 0);
  let offset = 0;
  const r = 45, cx = 55, cy = 55, circ = 2 * Math.PI * r;
  const segments = data.map(d => {
    const pct = d.val / total;
    const seg = { ...d, dashArray: `${pct * circ} ${circ}`, dashOffset: -offset * circ };
    offset += pct;
    return seg;
  });
  return (
    <div className="donut-wrap">
      <div className="donut">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2A2D45" strokeWidth="16" />
          {segments.map((s, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={s.color} strokeWidth="16"
              strokeDasharray={s.dashArray}
              strokeDashoffset={s.dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ transition: "stroke-dasharray .6s" }}
            />
          ))}
        </svg>
        <div className="donut-center">
          <div className="donut-center-num">{total}</div>
          <div className="donut-center-label">رسالة</div>
        </div>
      </div>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-item">
            <div className="donut-dot" style={{ background: d.color }} />
            <div className="donut-item-label">{d.name}</div>
            <div className="donut-item-val">{d.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage({ user, onGoChat }) {
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "صباح الخير";
    if (h < 17) return "مساء الخير";
    return "مساء النور";
  };

  // بيانات حقيقية من المستخدم
  const totalMsgs   = user?.totalMsgs   || 0;
  const subjects    = user?.subjects     || 0;
  const streak      = user?.streak       || 0;
  const studyHours  = user?.studyHours   || "0h";
  const weekData    = user?.weekData     || [0,0,0,0,0,0,0];
  const userSubjects = user?.userSubjects || [];
  const recentChats  = user?.recentChats  || [];

  const donutData = userSubjects.length > 0
    ? userSubjects.map((s,i) => ({ ...s, color: ["#6C63FF","#F5C842","#34D399","#FF8080"][i % 4] }))
    : [{ name: "لا توجد محادثات بعد", val: 1, color: "#2A2D45" }];

  const kpis = [
    { icon:"💬", label:"إجمالي الرسائل",   num: totalMsgs  || "0",  delta: null, bg:"#2E2B5F" },
    { icon:"📚", label:"المواد المدروسة",   num: subjects   || "0",  delta: null, bg:"#1A3040" },
    { icon:"🔥", label:"أيام متتالية",      num: streak     || "0",  delta: null, bg:"#2B1A1A" },
    { icon:"⏱️", label:"وقت الدراسة",      num: studyHours || "0h", delta: null, bg:"#1A2B1A" },
  ];

  return (
    <div className="dash-page">
      {/* Welcome */}
      <div className="dash-welcome">
        <div>
          <h1>{greeting()}، {user?.name?.split(" ")[0] || "طالب"} 👋</h1>
          <p>إليك ملخص نشاطك الدراسي — استمر في التقدم!</p>
        </div>
        <div className="dash-welcome-actions">
          <button className="btn-secondary" style={{ padding: "10px 20px", fontSize: 14 }}
            onClick={onGoChat}>
            محادثة جديدة ←
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dash-kpi-grid">
        {kpis.map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-top">
              <div className="kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
            </div>
            <div className="kpi-num">{k.num}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Row 1: Bar chart + Donut */}
      <div className="dash-row">
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">📈 الرسائل هذا الأسبوع</div>
          </div>
          {totalMsgs === 0 ? (
            <div style={{ textAlign:"center", padding:"28px 0", color:"#5A587A", fontSize:14 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>💬</div>
              ابدأ محادثتك الأولى لتظهر إحصائياتك هنا!
            </div>
          ) : <MiniBarChart />}
        </div>
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">🎯 توزيع المواد</div>
          </div>
          {totalMsgs === 0 ? (
            <div style={{ textAlign:"center", padding:"28px 0", color:"#5A587A", fontSize:14 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📚</div>
              لا توجد محادثات بعد
            </div>
          ) : <DonutChart data={donutData} />}
        </div>
      </div>

      {/* Row 2: Activity + Streak + Quick actions */}
      <div className="dash-row three">
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title">🕒 آخر المحادثات</div>
            <button className="dash-card-action" onClick={onGoChat}>محادثة جديدة</button>
          </div>
          {recentChats.length === 0 ? (
            <div style={{ textAlign:"center", padding:"32px 0", color:"#5A587A", fontSize:14 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>🗂️</div>
              <div style={{ marginBottom:16 }}>لا توجد محادثات بعد</div>
              <button className="nav-cta" style={{ fontSize:13, padding:"9px 20px" }} onClick={onGoChat}>
                ابدأ محادثتك الأولى ←
              </button>
            </div>
          ) : (
            <div className="activity-list">
              {recentChats.map((a, i) => (
                <div key={i} className="activity-item" onClick={onGoChat}>
                  <div className="activity-icon" style={{ background: "#2E2B5F" }}>{a.icon || "💬"}</div>
                  <div className="activity-info">
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-meta">{a.meta}</div>
                  </div>
                  <span className="activity-arrow">←</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Streak */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">🔥 سلسلة الدراسة</div>
            </div>
            {streak === 0 ? (
              <div style={{ textAlign:"center", padding:"16px 0", color:"#5A587A", fontSize:13 }}>
                <div style={{ fontSize:28, marginBottom:8 }}>🔥</div>
                ابدأ اليوم وابنِ سلسلتك!
              </div>
            ) : (
              <>
                <div className="streak-row">
                  {STREAK_DATA.map((s, i) => (
                    <div key={i} className={`streak-day ${s === "today" ? "today" : s ? "done" : "empty"}`}>
                      {s === "today" ? "🔥" : s ? "✓" : SHORT_DAYS[i % 7]}
                    </div>
                  ))}
                </div>
                <div className="streak-count">
                  سلسلة حالية: <strong>{streak}</strong> أيام متتالية 🎉
                </div>
              </>
            )}
          </div>

          {/* Quick actions */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="dash-card-title">⚡ إجراءات سريعة</div>
            </div>
            <div className="quick-actions">
              {[
                { icon: "🧮", label: "رياضيات" },
                { icon: "⚗️", label: "كيمياء"  },
                { icon: "📖", label: "عربي"    },
                { icon: "🌐", label: "إنجليزي" },
              ].map((q, i) => (
                <button key={i} className="quick-action-btn" onClick={onGoChat}>
                  <span className="quick-action-icon">{q.icon}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Subjects progress */}
      <div className="dash-card" style={{ marginBottom: 20 }}>
        <div className="dash-card-header">
          <div className="dash-card-title">📊 تقدمك في المواد</div>
        </div>
        {userSubjects.length === 0 ? (
          <div style={{ textAlign:"center", padding:"24px 0", color:"#5A587A", fontSize:14 }}>
            <div style={{ fontSize:32, marginBottom:8 }}>📊</div>
            سيظهر تقدمك هنا بعد أول محادثة دراسية 🎯
          </div>
        ) : (
          <div className="subject-list">
            {userSubjects.map((s, i) => (
              <div key={i} className="subject-item">
                <div className="subject-top">
                  <div className="subject-name">{s.icon} {s.name}</div>
                  <div className="subject-pct">{s.pct}%</div>
                </div>
                <div className="subject-bar">
                  <div className="subject-bar-fill"
                    style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// UPLOAD PAGE
// ============================================================
const FILE_TYPES = {
  "application/pdf":  { icon: "📄", color: "#FF6B6B", bg: "#FF6B6B22", label: "PDF"   },
  "image/jpeg":       { icon: "🖼️", color: "#F5C842", bg: "#F5C84222", label: "JPG"   },
  "image/png":        { icon: "🖼️", color: "#F5C842", bg: "#F5C84222", label: "PNG"   },
  "image/webp":       { icon: "🖼️", color: "#F5C842", bg: "#F5C84222", label: "WEBP"  },
  "text/plain":       { icon: "📝", color: "#34D399", bg: "#34D39922", label: "TXT"   },
  "default":          { icon: "📎", color: "#9B94FF", bg: "#9B94FF22", label: "ملف"   },
};

const ANALYSIS_MODES = [
  { id: "summary",   label: "📋 ملخص",       prompt: "لخص هذا المحتوى بشكل واضح ومنظم بالعربية، مع أهم النقاط." },
  { id: "points",    label: "✦ نقاط رئيسية", prompt: "استخرج أهم 6 نقاط رئيسية من هذا المحتوى بالعربية، كل نقطة في جملة واضحة." },
  { id: "questions", label: "❓ أسئلة متوقعة", prompt: "اقترح 6 أسئلة دراسية مهمة يمكن أن تُسأل على هذا المحتوى بالعربية." },
  { id: "explain",   label: "💡 شرح مبسط",   prompt: "اشرح هذا المحتوى بأسلوب بسيط مناسب لطالب مبتدئ، مع أمثلة." },
];

const DEMO_FILE = {
  name: "الفيزياء - الفصل الثالث.pdf", size: "2.4 MB", type: "application/pdf",
  status: "done", progress: 100,
  text: `الفصل الثالث: قوانين نيوتن للحركة

القانون الأول (قانون القصور الذاتي):
يبقى الجسم في حالته من سكون أو حركة منتظمة في خط مستقيم ما لم تؤثر عليه قوة خارجية.

القانون الثاني (قانون التسارع):
القوة المؤثرة على جسم تساوي حاصل ضرب كتلته في تسارعه: F = ma

القانون الثالث (قانون الفعل ورد الفعل):
لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.`,
};

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function UploadPage({ onGoChat }) {
  const [files, setFiles] = useState([DEMO_FILE]);
  const [dragOver, setDragOver] = useState(false);
  const [activeFile, setActiveFile] = useState(DEMO_FILE);
  const [activeMode, setActiveMode] = useState("summary");
  const [analysisText, setAnalysisText] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [pointsList, setPointsList] = useState([]);
  const [analysisCache, setAnalysisCache] = useState({});
  const fileInputRef = useRef(null);

  // Run analysis when file or mode changes
  useEffect(() => {
    if (!activeFile || activeFile.status !== "done") return;
    const cacheKey = `${activeFile.name}__${activeMode}`;
    if (analysisCache[cacheKey]) {
      applyResult(activeMode, analysisCache[cacheKey]);
      return;
    }
    runAnalysis(activeFile, activeMode, cacheKey);
  }, [activeFile, activeMode]);

  const applyResult = (mode, text) => {
    if (mode === "points") {
      setPointsList(text.split("\n").filter(l => l.trim()));
      setAnalysisText("");
    } else if (mode === "questions") {
      setQuestionsList(text.split("\n").filter(l => l.trim()));
      setAnalysisText("");
    } else {
      setAnalysisText(text);
      setPointsList([]);
      setQuestionsList([]);
    }
  };

  const runAnalysis = async (file, mode, cacheKey) => {
    setAnalysisLoading(true);
    setAnalysisText(""); setPointsList([]); setQuestionsList([]);
    const modeObj = ANALYSIS_MODES.find(m => m.id === mode);
    const content = file.text || `محتوى الملف: ${file.name}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: "أنت مساعد دراسي. أجب بالعربية فقط. كن دقيقاً ومنظماً. للنقاط والأسئلة: اكتب كل عنصر في سطر منفصل بدون ترقيم.",
          messages: [{ role: "user", content: `${modeObj.prompt}\n\nالمحتوى:\n${content}` }],
        }),
      });
      const data = await res.json();
      const result = data.content?.[0]?.text || "حدث خطأ أثناء التحليل.";
      setAnalysisCache(prev => ({ ...prev, [cacheKey]: result }));
      applyResult(mode, result);
    } catch {
      setAnalysisText("تعذّر الاتصال بالخادم. تحقق من اتصالك.");
    }
    setAnalysisLoading(false);
  };

  const processFile = (rawFile) => {
    const typeInfo = FILE_TYPES[rawFile.type] || FILE_TYPES["default"];
    const fileObj = {
      name: rawFile.name, size: formatSize(rawFile.size),
      type: rawFile.type, status: "processing", progress: 0,
      text: "", typeInfo,
    };
    setFiles(prev => [fileObj, ...prev]);

    // Simulate upload progress
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 22 + 8;
      if (prog >= 100) {
        prog = 100;
        clearInterval(iv);
        // Read file text if possible
        if (rawFile.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target.result;
            setFiles(prev => prev.map(f =>
              f.name === fileObj.name ? { ...f, status: "done", progress: 100, text } : f
            ));
            const done = { ...fileObj, status: "done", progress: 100, text };
            setActiveFile(done);
          };
          reader.readAsText(rawFile);
        } else {
          const done = { ...fileObj, status: "done", progress: 100 };
          setFiles(prev => prev.map(f => f.name === fileObj.name ? done : f));
          setActiveFile(done);
        }
      } else {
        setFiles(prev => prev.map(f =>
          f.name === fileObj.name ? { ...f, progress: Math.round(prog) } : f
        ));
      }
    }, 180);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(processFile);
  };

  const handleFileInput = (e) => {
    Array.from(e.target.files).forEach(processFile);
  };

  const removeFile = (name) => {
    setFiles(prev => prev.filter(f => f.name !== name));
    if (activeFile?.name === name) setActiveFile(null);
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <h1>📎 رفع الملفات</h1>
        <p>ارفع ملفاتك الدراسية وسيقوم الذكاء الاصطناعي بتحليلها فوراً</p>
      </div>

      {/* Drop zone */}
      <div
        className={`drop-zone ${dragOver ? "drag-over" : ""}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.txt"
          onChange={handleFileInput} style={{ display: "none" }} />
        <div className="drop-zone-icon">{dragOver ? "⬇️" : "☁️"}</div>
        <h3>{dragOver ? "أفلت الملفات هنا" : "اسحب وأفلت ملفاتك هنا"}</h3>
        <p>أو انقر لاختيار الملفات من جهازك<br />الحجم الأقصى 20MB لكل ملف</p>
        <div className="drop-zone-types">
          {[["PDF","#FF6B6B"],["JPG","#F5C842"],["PNG","#34D399"],["TXT","#9B94FF"]].map(([t,c]) => (
            <span key={t} className="type-badge" style={{ color: c, borderColor: c + "55", background: c + "11" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="upload-files">
          {files.map((f, i) => {
            const ti = FILE_TYPES[f.type] || FILE_TYPES["default"];
            const isActive = activeFile?.name === f.name;
            return (
              <div key={i}
                className={`upload-file-card ${f.status} ${isActive ? "selected" : ""}`}
                style={{ cursor: "pointer", borderColor: isActive ? "#6C63FF" : undefined }}
                onClick={() => f.status === "done" && setActiveFile(f)}
              >
                <div className="file-type-icon" style={{ background: ti.bg }}>{ti.icon}</div>
                <div className="file-info">
                  <div className="file-name">{f.name}</div>
                  <div className="file-size">{f.size}</div>
                  {f.status === "processing" && (
                    <div className="file-progress-wrap">
                      <div className="file-progress-bar">
                        <div className="file-progress-fill" style={{ width: `${f.progress}%` }} />
                      </div>
                      <div className="file-progress-label">جاري الرفع... {f.progress}%</div>
                    </div>
                  )}
                </div>
                <div className="file-status" style={{
                  color: f.status === "done" ? "#34D399" : f.status === "processing" ? "#9B94FF" : "#FF8080"
                }}>
                  {f.status === "done"       && <><span>✅</span> جاهز</>}
                  {f.status === "processing" && <><div className="spin" /><span>يُعالَج</span></>}
                </div>
                <button className="icon-btn danger" style={{ marginRight: 4 }}
                  onClick={e => { e.stopPropagation(); removeFile(f.name); }}>🗑️</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Analysis panel */}
      {activeFile && activeFile.status === "done" && (
        <div className="analysis-panel">
          <div className="analysis-panel-header">
            <span style={{ fontSize: 22 }}>🤖</span>
            <div>
              <h3>تحليل: {activeFile.name}</h3>
              <div style={{ fontSize: 13, color: "#8A88B0", marginTop: 3 }}>اختر نوع التحليل المطلوب</div>
            </div>
          </div>

          <div className="analysis-tabs">
            {ANALYSIS_MODES.map(m => (
              <button key={m.id} className={`analysis-tab ${activeMode === m.id ? "active" : ""}`}
                onClick={() => setActiveMode(m.id)}>{m.label}</button>
            ))}
          </div>

          <div className="analysis-content">
            {analysisLoading ? (
              <div className="analysis-loading">
                <div className="spin" />
                يحلل الذكاء الاصطناعي الملف...
              </div>
            ) : activeMode === "points" && pointsList.length > 0 ? (
              <ul className="key-points">
                {pointsList.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            ) : activeMode === "questions" && questionsList.length > 0 ? (
              <div className="questions-list">
                {questionsList.map((q, i) => (
                  <div key={i} className="question-item" onClick={onGoChat}>
                    <span>{q}</span>
                    <span style={{ color: "#6C63FF", flexShrink: 0 }}>← اسأل</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ whiteSpace: "pre-wrap" }}>{analysisText}</div>
            )}
          </div>

          <div className="analysis-actions">
            <button className="action-pill primary" onClick={onGoChat}>
              💬 ناقش في المحادثة
            </button>
            <button className="action-pill" onClick={() => {
              const text = analysisText || pointsList.join("\n") || questionsList.join("\n");
              navigator.clipboard?.writeText(text);
            }}>
              📋 نسخ النتيجة
            </button>
            <button className="action-pill" onClick={() => runAnalysis(activeFile, activeMode, `${activeFile.name}__${activeMode}__refresh`)}>
              🔄 إعادة التحليل
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="upload-tips">
        {[
          { t: "📄 ملفات PDF", d: "ارفع كتبك أو ملزمات الشرح وسيستخرج المساعد أهم المعلومات." },
          { t: "🖼️ صور المسائل", d: "التقط صورة للمسألة أو التمرين وسيحلها الذكاء الاصطناعي خطوة بخطوة." },
          { t: "📝 ملفات نصية", d: "ارفع ملاحظاتك أو نصوصك لتحصل على ملخص سريع أو أسئلة مراجعة." },
        ].map((tip, i) => (
          <div key={i} className="tip-card">
            <strong>{tip.t}</strong>{tip.d}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HISTORY PAGE
// ============================================================
const ALL_CONVOS = [
  // اليوم
  { id: 1,  group: "اليوم",        icon: "🧮", subject: "رياضيات",  title: "شرح التفاضل والتكامل",          preview: "ما الفرق بين التفاضل والتكامل؟",              time: "منذ ساعة",    msgs: 8  },
  { id: 2,  group: "اليوم",        icon: "📖", subject: "عربي",     title: "قواعد الجملة الفعلية",           preview: "شرح لي الفاعل والمفعول به",                  time: "منذ 3 ساعات", msgs: 5  },
  // أمس
  { id: 3,  group: "أمس",          icon: "⚗️", subject: "كيمياء",   title: "حل مسائل الكيمياء العضوية",     preview: "ما صيغة الميثان وكيف يتفاعل؟",               time: "أمس 9م",      msgs: 12 },
  { id: 4,  group: "أمس",          icon: "⚡", subject: "فيزياء",   title: "قانون أوم وتطبيقاته",           preview: "اشرح لي قانون أوم بمثال عملي",               time: "أمس 6م",      msgs: 7  },
  { id: 5,  group: "أمس",          icon: "🌐", subject: "إنجليزي",  title: "Past Perfect Tense",             preview: "What is the difference between...",           time: "أمس 3م",      msgs: 9  },
  // هذا الأسبوع
  { id: 6,  group: "هذا الأسبوع",  icon: "📜", subject: "تاريخ",    title: "ملخص الحرب العالمية الثانية",   preview: "متى بدأت الحرب العالمية الثانية؟",           time: "الثلاثاء",    msgs: 15 },
  { id: 7,  group: "هذا الأسبوع",  icon: "🔢", subject: "رياضيات",  title: "قواعد الجبر الخطي",             preview: "كيف أحل المعادلات من الدرجة الثانية؟",       time: "الثلاثاء",    msgs: 6  },
  { id: 8,  group: "هذا الأسبوع",  icon: "🌍", subject: "جغرافيا",  title: "درس الجغرافيا الاقتصادية",      preview: "ما أهم الموارد الطبيعية في الوطن العربي؟",   time: "الاثنين",     msgs: 4  },
  { id: 9,  group: "هذا الأسبوع",  icon: "🧬", subject: "أحياء",    title: "الانقسام الخلوي",                preview: "ما الفرق بين الانقسام المتساوي والاختزالي؟", time: "الأحد",       msgs: 11 },
  // هذا الشهر
  { id: 10, group: "هذا الشهر",    icon: "📐", subject: "رياضيات",  title: "حساب المثلثات",                  preview: "اشرح قانون الجيب وجيب التمام",               time: "22 يونيو",    msgs: 8  },
  { id: 11, group: "هذا الشهر",    icon: "⚗️", subject: "كيمياء",   title: "الجدول الدوري للعناصر",          preview: "كيف أحفظ الجدول الدوري بسهولة؟",            time: "20 يونيو",    msgs: 3  },
  { id: 12, group: "هذا الشهر",    icon: "📖", subject: "عربي",     title: "تحليل قصيدة المتنبي",           preview: "من هو المتنبي وما أشهر قصائده؟",             time: "18 يونيو",    msgs: 14 },
];

const SUBJECT_COLORS = {
  "رياضيات": "#6C63FF", "فيزياء": "#F5C842", "كيمياء": "#34D399",
  "عربي": "#FF8080", "إنجليزي": "#9B94FF", "تاريخ": "#F97316",
  "جغرافيا": "#22D3EE", "أحياء": "#86EFAC",
};

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <em>{text.slice(idx, idx + query.length)}</em>
      {text.slice(idx + query.length)}
    </>
  );
}

function HistoryPage({ onGoChat }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [convos, setConvos] = useState(ALL_CONVOS);

  const subjects = ["الكل", ...Array.from(new Set(ALL_CONVOS.map(c => c.subject)))];

  const filtered = convos.filter(c => {
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "الكل" || c.subject === filter;
    return matchSearch && matchFilter;
  });

  const groups = [...new Set(filtered.map(c => c.group))];

  const handleDelete = (id) => {
    setConvos(prev => prev.filter(c => c.id !== id));
    setDeleteTarget(null);
  };

  const totalMsgs = convos.reduce((s, c) => s + c.msgs, 0);

  return (
    <div className="history-page">
      {/* Header */}
      <div className="history-header">
        <div>
          <h1>📜 سجل المحادثات</h1>
          <p>كل محادثاتك الدراسية في مكان واحد</p>
        </div>
        <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 14 }} onClick={onGoChat}>
          + محادثة جديدة
        </button>
      </div>

      {/* Stats bar */}
      <div className="history-stats-bar">
        <div className="history-stat-pill">💬 <strong>{convos.length}</strong> محادثة</div>
        <div className="history-stat-pill">✉️ <strong>{totalMsgs}</strong> رسالة إجمالية</div>
        <div className="history-stat-pill">📚 <strong>{new Set(convos.map(c => c.subject)).size}</strong> مواد</div>
        <div className="history-stat-pill">🗓️ هذا الشهر: <strong>{convos.filter(c => c.group !== "أرشيف").length}</strong></div>
      </div>

      {/* Toolbar */}
      <div className="history-toolbar">
        <div className="history-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="history-search"
            placeholder="ابحث في محادثاتك..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {subjects.map(s => (
            <button key={s} className={`filter-btn ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon">🔍</div>
          <h3>لا توجد نتائج</h3>
          <p>لم نجد محادثات تطابق "{search}" — جرب كلمة بحث أخرى</p>
        </div>
      ) : (
        groups.map(group => (
          <div key={group} className="history-group">
            <div className="history-group-label">{group}</div>
            <div className="history-list">
              {filtered.filter(c => c.group === group).map(c => (
                <div key={c.id} className="history-card" onClick={onGoChat}>
                  <div className="history-card-icon"
                    style={{ background: (SUBJECT_COLORS[c.subject] || "#6C63FF") + "22" }}>
                    {c.icon}
                  </div>
                  <div className="history-card-body">
                    <div className="history-card-title">
                      {highlight(c.title, search)}
                    </div>
                    <div className="history-card-preview">
                      {highlight(c.preview, search)}
                    </div>
                  </div>
                  <div className="history-card-meta">
                    <div className="history-card-time">{c.time}</div>
                    <div className="history-card-count">{c.msgs} رسائل</div>
                    <div className="history-card-actions" onClick={e => e.stopPropagation()}>
                      <button className="icon-btn" title="نسخ">📋</button>
                      <button className="icon-btn danger" title="حذف"
                        onClick={() => setDeleteTarget(c)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="delete-confirm" onClick={() => setDeleteTarget(null)}>
          <div className="delete-confirm-box" onClick={e => e.stopPropagation()}>
            <h3>🗑️ حذف المحادثة؟</h3>
            <p>سيتم حذف "<strong>{deleteTarget.title}</strong>" بشكل نهائي ولا يمكن التراجع.</p>
            <div className="delete-confirm-actions">
              <button className="btn-secondary" style={{ padding: "10px 20px", fontSize: 14 }}
                onClick={() => setDeleteTarget(null)}>إلغاء</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteTarget.id)}>نعم، احذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ADMIN PAGE
// ============================================================
const ADMIN_CREDENTIALS = { email: "yousef@balarabi.ai", password: "YoussefAdmin2025" };

const DEFAULT_PLANS = [
  { id: "free",    name: "مجاني",  price: 0,   period: "للأبد",    color: "#8A88B0", features: ["50 رسالة / شهر","5 مواد دراسية","رفع ملف واحد"], maxUsage: 50  },
  { id: "student", name: "طالب",   price: 29,  period: "ر.س/شهر", color: "#6C63FF", features: ["رسائل غير محدودة","جميع المواد","رفع غير محدود","تحليل PDF"], maxUsage: 9999 },
  { id: "family",  name: "عائلي",  price: 59,  period: "ر.س/شهر", color: "#34D399", features: ["5 حسابات","رسائل غير محدودة","تقارير أداء","دعم 24/7"],    maxUsage: 9999 },
];

const CONTACT_CHANNELS = [
  { id: "whatsapp", label: "واتساب", icon: "📱", placeholder: "+966xxxxxxxxx", color: "#25D366" },
  { id: "email",    label: "إيميل",  icon: "📧", placeholder: "support@balarabi.ai", color: "#6C63FF" },
  { id: "telegram", label: "تيليجرام", icon: "✈️", placeholder: "@balarabi_support", color: "#229ED9" },
  { id: "twitter",  label: "تويتر/X",  icon: "🐦", placeholder: "@balarabi_ai", color: "#1DA1F2" },
];

function AdminPage() {
  const [authed, setAuthed]   = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [adminForm, setAdminForm] = useState({ email:"", password:"" });
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers]     = useState([]);
  const [plans, setPlans]     = useState(() => {
    try { return JSON.parse(localStorage.getItem("balarabi_plans") || "null") || DEFAULT_PLANS; } catch { return DEFAULT_PLANS; }
  });
  const [contacts, setContacts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("balarabi_contacts") || "null") || { whatsapp:"", email:"support@balarabi.ai", telegram:"", twitter:"" }; } catch { return {}; }
  });
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast]     = useState(null);
  const [search, setSearch]   = useState("");
  const [editingPlan, setEditingPlan] = useState(null);

  const showToast = (msg, type="success") => { setToast({ msg, type }); setTimeout(()=>setToast(null), 3000); };

  useEffect(() => {
    if (authed) {
      const u = DB.getUsers();
      setUsers(u);
    }
  }, [authed]);

  const handleAdminLogin = () => {
    if (adminForm.email === ADMIN_CREDENTIALS.email && adminForm.password === ADMIN_CREDENTIALS.password) {
      setAuthed(true); setLoginErr("");
    } else {
      setLoginErr("بيانات الدخول غير صحيحة");
    }
  };

  const updateUserPlan = (userId, planId) => {
    const plan = plans.find(p => p.id === planId);
    const allUsers = DB.getUsers();
    const idx = allUsers.findIndex(u => u.id === userId);
    if (idx !== -1) {
      allUsers[idx].plan = plan.name;
      allUsers[idx].maxUsage = plan.maxUsage;
      DB.saveUsers(allUsers);
      setUsers([...allUsers]);
      showToast(`✅ تم تغيير خطة المستخدم إلى "${plan.name}"`);
    }
  };

  const deleteUser = (userId) => {
    const allUsers = DB.getUsers().filter(u => u.id !== userId);
    DB.saveUsers(allUsers);
    setUsers(allUsers);
    showToast("🗑️ تم حذف المستخدم");
  };

  const savePlans = () => {
    localStorage.setItem("balarabi_plans", JSON.stringify(plans));
    showToast("✅ تم حفظ الخطط بنجاح");
    setEditingPlan(null);
  };

  const saveContacts = () => {
    localStorage.setItem("balarabi_contacts", JSON.stringify(contacts));
    showToast("✅ تم حفظ بيانات التواصل");
  };

  const resetUsage = (userId) => {
    const allUsers = DB.getUsers();
    const idx = allUsers.findIndex(u => u.id === userId);
    if (idx !== -1) { allUsers[idx].usage = 0; DB.saveUsers(allUsers); setUsers([...allUsers]); }
    showToast("🔄 تم تصفير الاستخدام");
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const adminCss = `
    @keyframes adminIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .admin-page { min-height:100vh; background:#090B14; color:#F0EEFF; direction:rtl; font-family:inherit; animation:adminIn .4s ease; }
    .admin-login { display:flex; align-items:center; justify-content:center; min-height:calc(100vh - 73px); padding:24px; }
    .admin-login-box { background:#1A1D2E; border:1px solid #2A2D45; border-radius:24px; padding:40px; width:100%; max-width:400px; }
    .admin-login-box h2 { font-size:22px; font-weight:700; margin-bottom:6px; text-align:center; }
    .admin-login-box p  { font-size:13px; color:#5A587A; text-align:center; margin-bottom:28px; }
    .admin-sidebar { width:220px; background:#1A1D2E; border-left:1px solid #2A2D45; display:flex; flex-direction:column; padding:20px 12px; gap:6px; }
    .admin-nav-item { display:flex; align-items:center; gap:10px; padding:11px 14px; border-radius:10px; cursor:pointer; font-size:14px; color:#8A88B0; transition:all .15s; border:none; background:none; font-family:inherit; width:100%; text-align:right; }
    .admin-nav-item:hover { background:#232640; color:#F0EEFF; }
    .admin-nav-item.active { background:linear-gradient(135deg,#2E2B5F,#1A1D40); color:#9B94FF; font-weight:600; border:1px solid #6C63FF33; }
    .admin-layout { display:flex; min-height:calc(100vh - 73px); }
    .admin-content { flex:1; padding:32px; overflow-y:auto; }
    .admin-header { margin-bottom:28px; }
    .admin-header h1 { font-size:24px; font-weight:700; }
    .admin-header p  { font-size:14px; color:#8A88B0; margin-top:4px; }
    .admin-kpi { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:14px; margin-bottom:28px; }
    .admin-kpi-card { background:#1A1D2E; border:1px solid #2A2D45; border-radius:14px; padding:18px 16px; }
    .admin-kpi-num  { font-size:30px; font-weight:800; color:#9B94FF; }
    .admin-kpi-label{ font-size:13px; color:#8A88B0; margin-top:4px; }
    .admin-table { width:100%; border-collapse:collapse; }
    .admin-table th { text-align:right; padding:12px 16px; font-size:12px; color:#5A587A; font-weight:600; letter-spacing:.06em; border-bottom:1px solid #2A2D45; }
    .admin-table td { padding:13px 16px; font-size:14px; border-bottom:1px solid #1E2135; vertical-align:middle; }
    .admin-table tr:hover td { background:#1E2135; }
    .plan-pill { display:inline-flex; align-items:center; gap:5px; padding:3px 12px; border-radius:99px; font-size:12px; font-weight:600; }
    .admin-btn { padding:7px 14px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; font-family:inherit; border:none; transition:all .15s; }
    .admin-btn.primary  { background:#6C63FF; color:white; }
    .admin-btn.primary:hover { background:#9B94FF; }
    .admin-btn.danger   { background:#FF6B6B22; color:#FF8080; border:1px solid #FF6B6B33; }
    .admin-btn.danger:hover { background:#FF6B6B44; }
    .admin-btn.ghost    { background:#232640; color:#8A88B0; border:1px solid #2A2D45; }
    .admin-btn.ghost:hover  { color:#F0EEFF; border-color:#6C63FF55; }
    .admin-select { background:#232640; border:1px solid #2A2D45; border-radius:8px; padding:6px 10px; color:#F0EEFF; font-size:13px; font-family:inherit; cursor:pointer; outline:none; }
    .admin-input  { width:100%; padding:10px 14px; background:#232640; border:1px solid #2A2D45; border-radius:10px; color:#F0EEFF; font-size:14px; font-family:inherit; outline:none; transition:border-color .2s; direction:ltr; }
    .admin-input:focus { border-color:#6C63FF88; }
    .plan-card { background:#1A1D2E; border:1px solid #2A2D45; border-radius:16px; padding:24px; }
    .plan-card h3 { font-size:16px; font-weight:700; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
    .contact-row { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .contact-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
    .badge-online  { display:inline-block; width:7px; height:7px; border-radius:50%; background:#34D399; margin-left:6px; }
    .search-input { padding:10px 16px 10px 36px; background:#1A1D2E; border:1px solid #2A2D45; border-radius:10px; color:#F0EEFF; font-size:14px; font-family:inherit; outline:none; width:100%; max-width:320px; direction:rtl; }
    .search-input:focus { border-color:#6C63FF88; }
    .admin-toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#1A1D2E; border:1px solid #34D39944; border-radius:12px; padding:12px 24px; font-size:14px; color:#F0EEFF; z-index:999; white-space:nowrap; box-shadow:0 8px 32px #00000055; }
    @media(max-width:700px){ .admin-content{padding:12px} .admin-table th:nth-child(4),.admin-table td:nth-child(4){display:none} }
  `;

  // ── Login screen ──
  if (!authed) return (
    <div className="admin-page">
      <style>{adminCss}</style>
      <div className="admin-login">
        <div className="admin-login-box">
          <div style={{ fontSize:48, textAlign:"center", marginBottom:12 }}>🛡️</div>
          <h2>لوحة الإدارة</h2>
          <p>بالعربي AI — Admin Panel</p>
          {loginErr && (
            <div style={{ background:"#FF6B6B11", border:"1px solid #FF6B6B33", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:13, color:"#FF9999", textAlign:"center" }}>
              ⚠️ {loginErr}
            </div>
          )}
          <div className="field" style={{ marginBottom:14 }}>
            <label style={{ fontSize:13, color:"#8A88B0", display:"block", marginBottom:7 }}>البريد الإلكتروني</label>
            <input className="admin-input" style={{ direction:"ltr" }} type="email" placeholder="admin@balarabi.ai"
              value={adminForm.email} onChange={e => setAdminForm(f=>({...f,email:e.target.value}))}
              onKeyDown={e => e.key==="Enter" && handleAdminLogin()} />
          </div>
          <div className="field" style={{ marginBottom:20 }}>
            <label style={{ fontSize:13, color:"#8A88B0", display:"block", marginBottom:7 }}>كلمة المرور</label>
            <input className="admin-input" style={{ direction:"ltr" }} type="password" placeholder="••••••••"
              value={adminForm.password} onChange={e => setAdminForm(f=>({...f,password:e.target.value}))}
              onKeyDown={e => e.key==="Enter" && handleAdminLogin()} />
          </div>
          <button className="auth-submit" onClick={handleAdminLogin} style={{ width:"100%" }}>
            دخول للوحة الإدارة 🔐
          </button>
        </div>
      </div>
    </div>
  );

  // ── Admin Panel ──
  const tabs = [
    { id:"users",    icon:"👥", label:"المستخدمون"    },
    { id:"plans",    icon:"💎", label:"الخطط"         },
    { id:"contacts", icon:"📞", label:"التواصل"        },
    { id:"stats",    icon:"📊", label:"الإحصائيات"    },
  ];

  const planMap = {};
  plans.forEach(p => { planMap[p.name] = p.color; });

  return (
    <div className="admin-page">
      <style>{adminCss}</style>

      {/* Top bar */}
      <div style={{ background:"#1A1D2E", borderBottom:"1px solid #2A2D45", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>🛡️</span>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:"#9B94FF" }}>Admin Panel</div>
            <div style={{ fontSize:11, color:"#5A587A" }}>يوسف عماد</div>
          </div>
        </div>
        <button className="admin-btn danger" onClick={() => setAuthed(false)} style={{ fontSize:12 }}>
          🚪 خروج
        </button>
      </div>

      {/* Tabs — تشتغل على موبايل */}
      <div style={{ display:"flex", gap:6, padding:"12px 16px", background:"#0D0F1A", borderBottom:"1px solid #2A2D45", overflowX:"auto" }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              display:"flex", alignItems:"center", gap:6,
              padding:"9px 16px", borderRadius:10, border:"none",
              cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:600,
              whiteSpace:"nowrap", transition:"all .2s",
              background: activeTab===t.id ? "linear-gradient(135deg,#6C63FF,#9B94FF)" : "#1A1D2E",
              color: activeTab===t.id ? "white" : "#8A88B0",
              boxShadow: activeTab===t.id ? "0 4px 14px #6C63FF44" : "none",
              border: activeTab===t.id ? "none" : "1px solid #2A2D45",
            }}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="admin-content">

          {/* ══ USERS ══ */}
          {activeTab === "users" && (
            <>
              <div className="admin-header">
                <h1>👥 إدارة المستخدمين</h1>
                <p>عرض وتعديل وحذف حسابات الطلاب</p>
              </div>
              <div className="admin-kpi">
                <div className="admin-kpi-card"><div className="admin-kpi-num">{users.length}</div><div className="admin-kpi-label">إجمالي المستخدمين</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-num">{users.filter(u=>u.plan!=="مجاني").length}</div><div className="admin-kpi-label">مشتركون مدفوعون</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-num">{users.filter(u=>u.plan==="مجاني").length}</div><div className="admin-kpi-label">خطة مجانية</div></div>
                <div className="admin-kpi-card"><div className="admin-kpi-num">{users.reduce((s,u)=>s+(u.usage||0),0)}</div><div className="admin-kpi-label">إجمالي الرسائل</div></div>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, flexWrap:"wrap" }}>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:"#5A587A", fontSize:14 }}>🔍</span>
                  <input className="search-input" style={{ paddingRight:36 }} placeholder="ابحث بالاسم أو الإيميل..."
                    value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
                <div style={{ fontSize:13, color:"#5A587A" }}>{filteredUsers.length} مستخدم</div>
              </div>

              {filteredUsers.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 0", color:"#5A587A" }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>👥</div>
                  <div>لا يوجد مستخدمون بعد</div>
                </div>
              ) : (
                <div style={{ background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:16, overflow:"hidden" }}>
                  <table className="admin-table" style={{ width:"100%" }}>
                    <thead>
                      <tr>
                        <th>المستخدم</th>
                        <th>الخطة الحالية</th>
                        <th>الاستخدام</th>
                        <th>تاريخ الانضمام</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id}>
                          <td>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#6C63FF,#9B94FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0 }}>
                                {u.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight:600, fontSize:14 }}>{u.name}</div>
                                <div style={{ fontSize:12, color:"#5A587A", direction:"ltr" }}>{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="plan-pill" style={{ background:(planMap[u.plan]||"#8A88B0")+"22", color:planMap[u.plan]||"#8A88B0", border:`1px solid ${planMap[u.plan]||"#8A88B0"}33` }}>
                              {u.plan || "مجاني"}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontSize:13 }}>{u.usage||0} / {u.maxUsage||50}</div>
                            <div style={{ height:4, background:"#2A2D45", borderRadius:99, marginTop:5, width:80 }}>
                              <div style={{ height:"100%", borderRadius:99, background:"#6C63FF", width:`${Math.min(((u.usage||0)/(u.maxUsage||50))*100,100)}%` }}/>
                            </div>
                          </td>
                          <td style={{ fontSize:13, color:"#8A88B0" }}>{u.joinDate || "—"}</td>
                          <td>
                            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                              <select className="admin-select"
                                value={plans.find(p=>p.name===u.plan)?.id || "free"}
                                onChange={e => updateUserPlan(u.id, e.target.value)}>
                                {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                              </select>
                              <button className="admin-btn ghost" onClick={() => resetUsage(u.id)} title="تصفير الاستخدام">🔄</button>
                              <button className="admin-btn danger" onClick={() => deleteUser(u.id)}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ══ PLANS ══ */}
          {activeTab === "plans" && (
            <>
              <div className="admin-header">
                <h1>💎 الخطط والأسعار</h1>
                <p>تعديل أسعار وميزات كل خطة</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
                {plans.map((plan, pi) => (
                  <div key={plan.id} className="plan-card">
                    <h3>
                      <span style={{ width:12, height:12, borderRadius:"50%", background:plan.color, display:"inline-block" }}/>
                      {plan.name}
                      <button className="admin-btn ghost" style={{ marginRight:"auto", fontSize:11 }}
                        onClick={() => setEditingPlan(editingPlan===pi ? null : pi)}>
                        {editingPlan===pi ? "إغلاق" : "✏️ تعديل"}
                      </button>
                    </h3>

                    {editingPlan === pi ? (
                      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        <div>
                          <label style={{ fontSize:12, color:"#8A88B0", display:"block", marginBottom:5 }}>اسم الخطة</label>
                          <input className="admin-input" value={plan.name}
                            onChange={e => { const p=[...plans]; p[pi]={...p[pi],name:e.target.value}; setPlans(p); }} />
                        </div>
                        <div>
                          <label style={{ fontSize:12, color:"#8A88B0", display:"block", marginBottom:5 }}>السعر (ر.س)</label>
                          <input className="admin-input" type="number" value={plan.price}
                            onChange={e => { const p=[...plans]; p[pi]={...p[pi],price:+e.target.value}; setPlans(p); }} />
                        </div>
                        <div>
                          <label style={{ fontSize:12, color:"#8A88B0", display:"block", marginBottom:5 }}>الفترة</label>
                          <input className="admin-input" value={plan.period}
                            onChange={e => { const p=[...plans]; p[pi]={...p[pi],period:e.target.value}; setPlans(p); }} />
                        </div>
                        <div>
                          <label style={{ fontSize:12, color:"#8A88B0", display:"block", marginBottom:5 }}>حد الرسائل الشهرية</label>
                          <input className="admin-input" type="number" value={plan.maxUsage}
                            onChange={e => { const p=[...plans]; p[pi]={...p[pi],maxUsage:+e.target.value}; setPlans(p); }} />
                        </div>
                        <div>
                          <label style={{ fontSize:12, color:"#8A88B0", display:"block", marginBottom:5 }}>الميزات (سطر لكل ميزة)</label>
                          <textarea style={{ width:"100%", minHeight:90, padding:"10px 14px", background:"#232640", border:"1px solid #2A2D45", borderRadius:10, color:"#F0EEFF", fontSize:13, fontFamily:"inherit", resize:"vertical", outline:"none" }}
                            value={plan.features.join("\n")}
                            onChange={e => { const p=[...plans]; p[pi]={...p[pi],features:e.target.value.split("\n")}; setPlans(p); }} />
                        </div>
                        <button className="admin-btn primary" style={{ width:"100%", padding:"10px" }} onClick={savePlans}>
                          💾 حفظ التغييرات
                        </button>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize:32, fontWeight:800, color:plan.color, marginBottom:4 }}>
                          {plan.price === 0 ? "مجاني" : `${plan.price} ر.س`}
                          <span style={{ fontSize:13, color:"#8A88B0", fontWeight:400, marginRight:6 }}>{plan.period}</span>
                        </div>
                        <div style={{ fontSize:12, color:"#5A587A", marginBottom:12 }}>حد الرسائل: {plan.maxUsage >= 9999 ? "غير محدود" : plan.maxUsage}</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                          {plan.features.map((f,i) => (
                            <div key={i} style={{ fontSize:13, color:"#C0BDDF", display:"flex", gap:8, alignItems:"center" }}>
                              <span style={{ color:plan.color }}>✓</span>{f}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ CONTACTS ══ */}
          {activeTab === "contacts" && (
            <>
              <div className="admin-header">
                <h1>📞 قنوات التواصل</h1>
                <p>روابط التواصل التي ستظهر للمستخدمين في الموقع</p>
              </div>
              <div style={{ background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:16, padding:28, maxWidth:560 }}>
                {CONTACT_CHANNELS.map(ch => (
                  <div key={ch.id} className="contact-row">
                    <div className="contact-icon" style={{ background:ch.color+"22" }}>{ch.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color:"#8A88B0", marginBottom:6 }}>{ch.label}</div>
                      <input className="admin-input" style={{ direction:"ltr" }}
                        placeholder={ch.placeholder}
                        value={contacts[ch.id] || ""}
                        onChange={e => setContacts(c=>({...c,[ch.id]:e.target.value}))} />
                    </div>
                  </div>
                ))}
                <button className="admin-btn primary" style={{ width:"100%", padding:"12px", fontSize:15, marginTop:10 }}
                  onClick={saveContacts}>
                  💾 حفظ بيانات التواصل
                </button>
                <div style={{ fontSize:12, color:"#5A587A", marginTop:12, textAlign:"center" }}>
                  ستظهر هذه البيانات في صفحة التواصل وفوتر الموقع
                </div>
              </div>
            </>
          )}

          {/* ══ STATS ══ */}
          {activeTab === "stats" && (
            <>
              <div className="admin-header">
                <h1>📊 إحصائيات الموقع</h1>
                <p>نظرة عامة على أداء المنصة</p>
              </div>
              <div className="admin-kpi">
                {[
                  { label:"إجمالي المستخدمين",    num: users.length,                                        icon:"👥" },
                  { label:"مشتركون مدفوعون",       num: users.filter(u=>u.plan!=="مجاني").length,           icon:"💎" },
                  { label:"إجمالي الرسائل",        num: users.reduce((s,u)=>s+(u.usage||0),0),              icon:"💬" },
                  { label:"متوسط رسائل/مستخدم",   num: users.length ? Math.round(users.reduce((s,u)=>s+(u.usage||0),0)/users.length) : 0, icon:"📈" },
                ].map((k,i) => (
                  <div key={i} className="admin-kpi-card">
                    <div style={{ fontSize:24, marginBottom:8 }}>{k.icon}</div>
                    <div className="admin-kpi-num">{k.num}</div>
                    <div className="admin-kpi-label">{k.label}</div>
                  </div>
                ))}
              </div>

              {/* توزيع الخطط */}
              <div style={{ background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:16, padding:24, marginBottom:20 }}>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:18 }}>📊 توزيع المستخدمين على الخطط</div>
                {plans.map(plan => {
                  const count = users.filter(u => u.plan === plan.name).length;
                  const pct   = users.length ? Math.round((count/users.length)*100) : 0;
                  return (
                    <div key={plan.id} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                        <span style={{ color:plan.color, fontWeight:600 }}>{plan.name}</span>
                        <span style={{ color:"#8A88B0" }}>{count} مستخدم ({pct}%)</span>
                      </div>
                      <div style={{ height:6, background:"#2A2D45", borderRadius:99, overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:99, background:plan.color, width:`${pct}%`, transition:"width .6s" }}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* آخر المستخدمين */}
              <div style={{ background:"#1A1D2E", border:"1px solid #2A2D45", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:18 }}>🕒 آخر المسجلين</div>
                {users.slice(-5).reverse().map(u => (
                  <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #2A2D45" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6C63FF,#9B94FF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, flexShrink:0 }}>
                      {u.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:500 }}>{u.name}</div>
                      <div style={{ fontSize:12, color:"#5A587A", direction:"ltr" }}>{u.email}</div>
                    </div>
                    <span className="plan-pill" style={{ background:(planMap[u.plan]||"#8A88B0")+"22", color:planMap[u.plan]||"#8A88B0", fontSize:11 }}>{u.plan||"مجاني"}</span>
                  </div>
                ))}
                {users.length === 0 && <div style={{ textAlign:"center", color:"#5A587A", padding:"24px 0" }}>لا يوجد مستخدمون بعد</div>}
              </div>
            </>
          )}

        </div>

      {toast && <div className="admin-toast">{toast.msg}</div>}
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("landing");
  const [authTab, setAuthTab] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = DB.getSession();
    if (session) { setUser(session); setPage("dashboard"); }
  }, []);

  const goAuth    = (tab = "login") => { setAuthTab(tab); setPage("auth"); };
  const goHome    = () => setPage("landing");
  const goChat    = () => setPage("chat");
  const goProfile = () => setPage("profile");
  const goDash    = () => setPage("dashboard");
  const goHistory = () => setPage("history");
  const goUpload  = () => setPage("upload");
  const goAdmin   = () => setPage("admin");
  const logout    = () => { DB.clearSession(); setUser(null); setPage("landing"); };

  const handleAuthSuccess = (u) => { setUser(u); setPage("dashboard"); };
  const handleUserUpdate  = (u) => { DB.updateUser(u); setUser(u); };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {page !== "admin" && (
          <Nav
            currentPage={page}
            onGoChat={goChat}
            onGoHome={goHome}
            onGoAuth={goAuth}
            onGoProfile={goProfile}
            onGoDash={goDash}
            onGoHistory={goHistory}
            onGoUpload={goUpload}
            onGoAdmin={goAdmin}
            onLogout={logout}
            user={user}
          />
        )}
        {page === "landing"   && <LandingPage onGoChat={() => user ? goDash() : goAuth("register")} />}
        {page === "auth"      && <AuthPage initialTab={authTab} onSuccess={handleAuthSuccess} onGoHome={goHome} />}
        {page === "dashboard" && user && <DashboardPage user={user} onGoChat={goChat} />}
        {page === "chat"      && <ChatPage user={user} />}
        {page === "upload"    && <UploadPage onGoChat={goChat} />}
        {page === "history"   && <HistoryPage onGoChat={goChat} />}
        {page === "profile"   && user && <ProfilePage user={user} onUpdate={handleUserUpdate} />}
        {page === "admin"     && <AdminPage onGoHome={goHome} />}
      </div>
    </>
  );
}
