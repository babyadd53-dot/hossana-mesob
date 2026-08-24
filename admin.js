/* ==================================================================
   HOSSANA MESOB ONE — Admin Portal Logic
   Session auth · dashboard stats · CRUD for news/leadership/
   downloads/feedback · gallery upload · password settings
   ================================================================== */
'use strict';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const VIEW_TITLES = {
  dashboard: 'Dashboard',
  news: 'News & Posts',
  leadership: 'Leadership',
  downloads: 'Downloads',
  feedback: 'Feedback Inbox',
  gallery: 'Gallery',
  settings: 'Settings',
};

let currentView = 'dashboard';
let activeFeedbackId = null;

/* ── Utilities ───────────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const stack = $('#toastStack');
  if (!stack) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = document.createElement('span');
  icon.textContent = icons[type] || icons.info;
  const body = document.createElement('span');
  body.textContent = message;
  toast.append(icon, body);
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

async function api(path, options = {}) {
  const config = { headers: {}, ...options };
  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
    config.headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(path, config);
  if (response.status === 401) {
    showLogin();
    throw new Error('Unauthorized');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

function fmtDate(iso) {
  return iso ? iso.slice(0, 10) : '-';
}

/* ── Auth views ──────────────────────────────────────────────── */
function showLogin() {
  $('#appView').hidden = true;
  $('#loginView').hidden = false;
}

function showApp(username) {
  $('#loginView').hidden = true;
  $('#appView').hidden = false;
  $('#whoami').textContent = username ? `👤 ${username}` : '';
  switchView('dashboard');
}

async function checkSession() {
  try {
    const data = await api('/api/admin/me');
    showApp(data.username);
  } catch {
    showLogin();
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const button = $('#loginBtn');
  const errorBox = $('#loginError');
  errorBox.hidden = true;
  button.disabled = true;
  try {
    const data = await api('/api/admin/login', {
      method: 'POST',
      body: { username: $('#loginUser').value.trim(), password: $('#loginPass').value },
    });
    showApp(data.username);
    showToast('Welcome back!', 'success');
  } catch (error) {
    errorBox.textContent = error.message === 'Unauthorized'
      ? 'Invalid username or password.' : error.message;
    errorBox.hidden = false;
  } finally {
    button.disabled = false;
  }
}

async function handleLogout() {
  try { await api('/api/admin/logout', { method: 'POST' }); } catch { /* session already gone */ }
  showLogin();
  showToast('Logged out.', 'info');
}

/* ── Navigation ──────────────────────────────────────────────── */
function switchView(view) {
  currentView = view;
  $$('.view').forEach(section => { section.hidden = section.id !== `view-${view}`; });
  $$('.side-link').forEach(link => link.classList.toggle('active', link.dataset.view === view));
  $('#viewTitle').textContent = VIEW_TITLES[view] || view;
  loadView(view);
}

function loadView(view) {
  const loaders = {
    dashboard: loadDashboard,
    news: loadNews,
    leadership: loadLeadership,
    downloads: loadDownloads,
    feedback: loadFeedback,
    gallery: loadGallery,
  };
  loaders[view]?.();
}

/* ── Dashboard ───────────────────────────────────────────────── */
async function loadDashboard() {
  const wrap = $('#statCards');
  try {
    const stats = await api('/api/admin/stats');
    const cards = [
      ['📰', stats.news, 'News posts'],
      ['👥', stats.leadership, 'Leadership members'],
      ['📂', stats.downloads, 'Downloadable files'],
      ['💬', stats.feedback, 'Feedback total', 'accent'],
      ['🔴', stats.unread, 'Unread feedback', 'accent'],
      ['🖼️', stats.gallery, 'Gallery images'],
    ];
    wrap.innerHTML = cards.map(([icon, value, label, accent]) => `
      <div class="stat-card ${accent || ''}">
        <div>${icon}</div>
        <div class="n">${value}</div>
        <div class="l">${label}</div>
      </div>`).join('');
    const badge = $('#unreadBadge');
    badge.hidden = !stats.unread;
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── News ────────────────────────────────────────────────────── */
async function loadNews() {
  try {
    const items = await api('/api/admin/news');
    const rows = items.map(item => `
      <tr>
        <td class="unread-cell">#${item.id}</td>
        <td><strong>${escapeHtml(item.title)}</strong><br>
            <small style="color:var(--muted);">${escapeHtml(item.title_am || '')}</small></td>
        <td><span class="tag">${escapeHtml(item.category)}</span></td>
        <td>${fmtDate(item.created_at)}</td>
        <td><div class="row-actions">
          <button class="btn ghost mini" onclick="editNews(${item.id})">✏️</button>
          <button class="btn danger mini" onclick="deleteNews(${item.id})">🗑</button>
        </div></td>
      </tr>`).join('');
    $('#newsTable').innerHTML =
      `<thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
       <tbody>${rows}</tbody>`;
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function editNews(id) {
  api('/api/admin/news').then(items => {
    const item = items.find(row => row.id === id);
    if (!item) return;
    Object.entries({
      'news-id': item.id,
      'news-title': item.title,
      'news-title_am': item.title_am,
      'news-content': item.content,
      'news-content_am': item.content_am,
      'news-category': item.category,
      'news-image_url': item.image_url,
    }).forEach(([fieldId, value]) => { $(`#${fieldId}`).value = value ?? ''; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

async function deleteNews(id) {
  if (!confirm(`Delete post #${id}?`)) return;
  try {
    await api(`/api/admin/news/${id}`, { method: 'DELETE' });
    showToast('Post deleted.', 'success');
    loadNews();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function saveNews(event) {
  event.preventDefault();
  const payload = {
    title: $('#news-title').value.trim(),
    title_am: $('#news-title_am').value.trim(),
    content: $('#news-content').value.trim(),
    content_am: $('#news-content_am').value.trim(),
    category: $('#news-category').value,
    image_url: $('#news-image_url').value.trim(),
  };
  const idValue = $('#news-id').value;
  try {
    await api(idValue ? `/api/admin/news/${idValue}` : '/api/admin/news', {
      method: idValue ? 'PUT' : 'POST',
      body: payload,
    });
    showToast('Post saved.', 'success');
    resetForm('#newsForm');
    loadNews();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── Leadership ──────────────────────────────────────────────── */
async function loadLeadership() {
  try {
    const items = await api('/api/admin/leadership');
    const rows = items.map(item => `
      <tr>
        <td>${item.photo_url
          ? `<img class="thumb" src="${escapeHtml(item.photo_url)}" alt="">` : '<span style="font-size:1.4rem;">👤</span>'}</td>
        <td><strong>${escapeHtml(item.name)}</strong><br>
            <small style="color:var(--muted);">${escapeHtml(item.name_am || '')}</small></td>
        <td>${escapeHtml(item.position)}<br>
            <small style="color:var(--muted);">${escapeHtml(item.position_am || '')}</small></td>
        <td>${item.order_num ?? 0}</td>
        <td><div class="row-actions">
          <button class="btn ghost mini" onclick="editLeader(${item.id})">✏️</button>
          <button class="btn danger mini" onclick="deleteLeader(${item.id})">🗑</button>
        </div></td>
      </tr>`).join('');
    $('#leaderTable').innerHTML =
      `<thead><tr><th>Photo</th><th>Name</th><th>Position</th><th>Order</th><th>Actions</th></tr></thead>
       <tbody>${rows}</tbody>`;
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function editLeader(id) {
  try {
    const items = await api('/api/admin/leadership');
    const item = items.find(row => row.id === id);
    if (!item) return;
    Object.entries({
      'leader-id': item.id,
      'leader-name': item.name,
      'leader-name_am': item.name_am,
      'leader-position': item.position,
      'leader-position_am': item.position_am,
      'leader-photo_url': item.photo_url,
      'leader-order_num': item.order_num ?? 0,
    }).forEach(([fieldId, value]) => { $(`#${fieldId}`).value = value ?? ''; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function deleteLeader(id) {
  if (!confirm(`Delete member #${id}?`)) return;
  try {
    await api(`/api/admin/leadership/${id}`, { method: 'DELETE' });
    showToast('Member deleted.', 'success');
    loadLeadership();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function saveLeader(event) {
  event.preventDefault();
  const payload = {
    name: $('#leader-name').value.trim(),
    name_am: $('#leader-name_am').value.trim(),
    position: $('#leader-position').value.trim(),
    position_am: $('#leader-position_am').value.trim(),
    photo_url: $('#leader-photo_url').value.trim(),
    order_num: parseInt($('#leader-order_num').value, 10) || 0,
  };
  const idValue = $('#leader-id').value;
  try {
    await api(idValue ? `/api/admin/leadership/${idValue}` : '/api/admin/leadership', {
      method: idValue ? 'PUT' : 'POST',
      body: payload,
    });
    showToast('Member saved.', 'success');
    resetForm('#leaderForm');
    loadLeadership();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── Downloads ───────────────────────────────────────────────── */
async function loadDownloads() {
  try {
    const items = await api('/api/admin/downloads');
    const rows = items.map(item => `
      <tr>
        <td style="font-size:1.3rem;">${escapeHtml(item.icon || '📄')}</td>
        <td><strong>${escapeHtml(item.title)}</strong><br>
            <small style="color:var(--muted);">${escapeHtml(item.description || '')}</small></td>
        <td><span class="tag">${escapeHtml(item.category)}</span></td>
        <td><code style="font-size:.78rem;">${escapeHtml(item.file_url || '-')}</code></td>
        <td><div class="row-actions">
          <button class="btn ghost mini" onclick="editDownload(${item.id})">✏️</button>
          <button class="btn danger mini" onclick="deleteDownload(${item.id})">🗑</button>
        </div></td>
      </tr>`).join('');
    $('#downloadTable').innerHTML =
      `<thead><tr><th></th><th>Title</th><th>Category</th><th>File</th><th>Actions</th></tr></thead>
       <tbody>${rows}</tbody>`;
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function editDownload(id) {
  try {
    const items = await api('/api/admin/downloads');
    const item = items.find(row => row.id === id);
    if (!item) return;
    Object.entries({
      'dl-id': item.id,
      'dl-title': item.title,
      'dl-title_am': item.title_am,
      'dl-description': item.description,
      'dl-category': item.category,
      'dl-icon': item.icon,
      'dl-file_url': item.file_url,
    }).forEach(([fieldId, value]) => { $(`#${fieldId}`).value = value ?? ''; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function deleteDownload(id) {
  if (!confirm(`Delete file #${id}?`)) return;
  try {
    await api(`/api/admin/downloads/${id}`, { method: 'DELETE' });
    showToast('File entry deleted.', 'success');
    loadDownloads();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function saveDownload(event) {
  event.preventDefault();
  const payload = {
    title: $('#dl-title').value.trim(),
    title_am: $('#dl-title_am').value.trim(),
    description: $('#dl-description').value.trim(),
    category: $('#dl-category').value,
    icon: $('#dl-icon').value.trim() || '📄',
    file_url: $('#dl-file_url').value.trim(),
  };
  const idValue = $('#dl-id').value;
  try {
    await api(idValue ? `/api/admin/downloads/${idValue}` : '/api/admin/downloads', {
      method: idValue ? 'PUT' : 'POST',
      body: payload,
    });
    showToast('File saved.', 'success');
    resetForm('#downloadForm');
    loadDownloads();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── Feedback ────────────────────────────────────────────────── */
async function loadFeedback() {
  try {
    const items = await api('/api/admin/feedback');
    const unreadOnly = $('#showReadOnly')?.checked;
    const filtered = unreadOnly ? items.filter(item => !item.is_read) : items;
    const list = $('#feedbackList');

    list.innerHTML = filtered.length ? filtered.map(item => `
      <div class="fb-row ${item.is_read ? '' : 'unread'} ${item.id === activeFeedbackId ? 'active' : ''}"
           data-fb-id="${item.id}">
        <strong>${escapeHtml(item.name)}</strong> <small style="color:var(--muted);">&lt;${escapeHtml(item.email)}&gt;</small>
        <p>${escapeHtml((item.message || '').slice(0, 90))}…</p>
        <p style="margin-top:3px;">${fmtDate(item.created_at)} · ${item.is_read ? '✅ read' : '🟢 new'}</p>
      </div>`).join('')
      : `<div class="empty-note">No messages.</div>`;

    $$('.fb-row', list).forEach(row => {
      row.addEventListener('click', () => openFeedback(
        filtered.find(item => item.id === Number(row.dataset.fbId))));
    });

    const badge = $('#unreadBadge');
    badge.hidden = !items.some(item => !item.is_read);
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function openFeedback(item) {
  if (!item) return;
  activeFeedbackId = item.id;
  $('#feedbackDetail').hidden = false;
  $('#fb-subject').textContent = `From: ${item.name}`;
  $('#fb-meta').textContent = `${item.email} · ${fmtDate(item.created_at)} · ${item.is_read ? 'read' : 'NEW'}`;
  $('#fb-body').textContent = item.message;
  $('#fb-reply').value = item.reply || '';
  $$('.fb-row').forEach(row =>
    row.classList.toggle('active', Number(row.dataset.fbId) === item.id));
}

async function saveFeedbackReply() {
  if (!activeFeedbackId) return;
  try {
    await api(`/api/admin/feedback/${activeFeedbackId}`, {
      method: 'PUT',
      body: { reply: $('#fb-reply').value.trim(), is_read: true },
    });
    showToast('Reply saved & marked read.', 'success');
    loadFeedback();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function deleteFeedback() {
  if (!activeFeedbackId || !confirm('Delete this message?')) return;
  try {
    await api(`/api/admin/feedback/${activeFeedbackId}`, { method: 'DELETE' });
    activeFeedbackId = null;
    $('#feedbackDetail').hidden = true;
    showToast('Message deleted.', 'success');
    loadFeedback();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── Gallery ─────────────────────────────────────────────────── */
async function loadGallery() {
  try {
    const items = await api('/api/admin/gallery');
    const grid = $('#galleryGrid');
    grid.innerHTML = items.length ? items.map(item => `
      <figure class="gallery-item">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.label || '')}" loading="lazy">
        <figcaption>${escapeHtml(item.label || item.filename)}</figcaption>
        <button class="del" onclick="deleteGalleryItem(${item.id})">🗑 Delete</button>
      </figure>`).join('')
      : `<div class="empty-note" style="grid-column:1/-1;">No images uploaded yet.</div>`;
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function uploadGalleryFiles(inputElement) {
  for (const file of inputElement.files) {
    await uploadFile(file, 'image', '', success => {
      showToast(success ? `Uploaded: ${file.name}` : `Upload failed: ${file.name}`,
        success ? 'success' : 'error');
    });
  }
  inputElement.value = '';
  loadGallery();
  loadDashboard();
}

async function deleteGalleryItem(id) {
  if (!confirm('Delete this image?')) return;
  try {
    await api(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    showToast('Image deleted.', 'success');
    loadGallery();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

/* ── Shared upload helper ────────────────────────────────────── */
async function uploadFile(file, kind, label, onDone) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('kind', kind);
  formData.append('label', label);
  try {
    const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    if (response.status === 401) { showLogin(); throw new Error('Please sign in again.'); }
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || 'Upload failed');
    onDone(true, data.url);
    return data.url;
  } catch (error) {
    onDone(false);
    showToast(error.message, 'error');
    return null;
  }
}

function wireUploadInputs() {
  $$('input[type="file"][data-kind]').forEach(input => {
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      const url = await uploadFile(file, input.dataset.kind, '');
      if (url) {
        const targetField = $(`#${input.dataset.target}`);
        if (targetField) targetField.value = url;
        showToast('Upload complete — URL filled in.', 'success');
      }
      input.value = '';
    });
  });

  $('#galleryFile')?.addEventListener('change', event => uploadGalleryFiles(event.target));
}

/* ── Settings ────────────────────────────────────────────────── */
async function saveSettings(event) {
  event.preventDefault();
  const newPassword = $('#set-new').value;
  if (newPassword !== $('#set-confirm').value) {
    showToast('New passwords do not match.', 'error');
    return;
  }
  try {
    await api('/api/admin/settings', {
      method: 'PUT',
      body: { current_password: $('#set-current').value, new_password: newPassword },
    });
    showToast('Password updated.', 'success');
    resetForm('#settingsForm');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function resetForm(formSelector) {
  $(formSelector)?.reset();
  $$(formSelector + ' input[type="hidden"]').forEach(field => { field.value = ''; });
}

/* ── Theme ───────────────────────────────────────────────────── */
function toggleAdminTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mesob-admin-theme', next);
}

/* ── Boot ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('mesob-admin-theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  $('#loginForm').addEventListener('submit', handleLogin);
  $('#logoutBtn').addEventListener('click', handleLogout);
  $('#themeBtn').addEventListener('click', toggleAdminTheme);

  $$('.side-link').forEach(link =>
    link.addEventListener('click', () => switchView(link.dataset.view)));

  $('#newsForm').addEventListener('submit', saveNews);
  $('#news-reset').addEventListener('click', () => resetForm('#newsForm'));
  $('#leaderForm').addEventListener('submit', saveLeader);
  $('#leader-reset').addEventListener('click', () => resetForm('#leaderForm'));
  $('#downloadForm').addEventListener('submit', saveDownload);
  $('#dl-reset').addEventListener('click', () => resetForm('#downloadForm'));
  $('#settingsForm').addEventListener('submit', saveSettings);
  $('#fb-saveReply').addEventListener('click', saveFeedbackReply);
  $('#fb-delete').addEventListener('click', deleteFeedback);
  $('#showReadOnly')?.addEventListener('change', loadFeedback);

  wireUploadInputs();
  checkSession();
});
