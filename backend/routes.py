"""All API routes: public endpoints + session-authenticated admin CRUD."""
import os
import uuid

import bcrypt
from flask import current_app, jsonify, request, session
from werkzeug.utils import secure_filename

from auth import login_required
from models import AdminUser, Download, Feedback, Gallery, Leadership, NewsPost, db

IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'gif'}
DOCUMENT_EXTENSIONS = IMAGE_EXTENSIONS | {'pdf', 'doc', 'docx', 'xls', 'xlsx', 'pptx', 'txt'}


def body():
    """Parse JSON request body safely; never raises on bad input."""
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def save_upload(file_storage, allowed_extensions):
    """Validate extension and persist an upload with a random safe filename."""
    if not file_storage or not file_storage.filename:
        return None
    original = secure_filename(file_storage.filename)
    if '.' not in original:
        return None
    extension = original.rsplit('.', 1)[1].lower()
    if extension not in allowed_extensions:
        return None
    safe_name = f"{uuid.uuid4().hex[:12]}.{extension}"
    file_storage.save(os.path.join(current_app.config['UPLOAD_FOLDER'], safe_name))
    return safe_name


def crud_endpoints(app, model, resource, writable_fields, required_fields):
    """Register list/create/update/delete routes for one resource (DRY)."""

    @app.get(f'/api/admin/{resource}', endpoint=f'{resource}_list')
    @login_required
    def list_items(m=model):
        query = m.query
        created = getattr(m, 'created_at', None)
        order_col = created.desc() if created is not None else m.id
        rows = query.order_by(order_col).all()
        return jsonify([row.dict() for row in rows])

    @app.post(f'/api/admin/{resource}', endpoint=f'{resource}_create')
    @login_required
    def create_item(m=model, fields=writable_fields, required=required_fields):
        data = body()
        missing = [field for field in required if not (data.get(field) or '').strip()
                   if isinstance(data.get(field), str)] or \
                  [field for field in required if not data.get(field)]
        if missing:
            return jsonify(ok=False, error=f"Missing required field(s): {', '.join(missing)}"), 400
        item = m()
        for field in fields:
            if field in data:
                setattr(item, field, data[field])
        db.session.add(item)
        db.session.commit()
        return jsonify(ok=True, item=item.dict())

    @app.put(f'/api/admin/{resource}/<int:item_id>', endpoint=f'{resource}_update')
    @login_required
    def update_item(item_id, m=model, fields=writable_fields):
        item = m.query.get(item_id)
        if not item:
            return jsonify(ok=False, error='Not found'), 404
        data = body()
        for field in fields:
            if field in data:
                setattr(item, field, data[field])
        db.session.commit()
        return jsonify(ok=True, item=item.dict())

    @app.delete(f'/api/admin/{resource}/<int:item_id>', endpoint=f'{resource}_delete')
    @login_required
    def delete_item(item_id, m=model):
        item = m.query.get(item_id)
        if not item:
            return jsonify(ok=False, error='Not found'), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify(ok=True)


def register_routes(app):

    # ── Public API ────────────────────────────────────────────────
    @app.get('/api/news')
    def public_news():
        rows = NewsPost.query.order_by(NewsPost.created_at.desc()).all()
        return jsonify([row.dict() for row in rows])

    @app.get('/api/leadership')
    def public_leadership():
        rows = Leadership.query.order_by(Leadership.order_num, Leadership.id).all()
        return jsonify([row.dict() for row in rows])

    @app.get('/api/downloads')
    def public_downloads():
        rows = Download.query.order_by(Download.created_at.desc()).all()
        return jsonify([row.dict() for row in rows])

    @app.post('/api/feedback')
    def public_feedback():
        data = body()
        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip()
        message = (data.get('message') or '').strip()
        if not name or not email or not message:
            return jsonify(ok=False, error='name, email and message are required'), 400
        if '@' not in email or len(email) > 200:
            return jsonify(ok=False, error='Invalid email address'), 400
        feedback = Feedback(name=name[:120], email=email, message=message[:5000])
        db.session.add(feedback)
        db.session.commit()
        return jsonify(ok=True, message='Message received')

    # ── Admin auth ────────────────────────────────────────────────
    @app.post('/api/admin/login')
    def admin_login():
        data = body()
        username = (data.get('username') or '').strip()
        password = (data.get('password') or '')
        user = AdminUser.query.filter_by(username=username).first()
        if not user or not bcrypt.checkpw(password.encode(), user.password.encode()):
            # Generic message: do not reveal whether username exists
            return jsonify(ok=False, error='Invalid username or password'), 401
        session.clear()
        session.permanent = True
        session['admin_id'] = user.id
        return jsonify(ok=True, username=user.username)

    @app.post('/api/admin/logout')
    def admin_logout():
        session.clear()
        return jsonify(ok=True)

    @app.get('/api/admin/me')
    @login_required
    def admin_me():
        user = AdminUser.query.get(session['admin_id'])
        return jsonify(ok=True, username=user.username if user else '')

    # ── Dashboard stats ───────────────────────────────────────────
    @app.get('/api/admin/stats')
    @login_required
    def admin_stats():
        unread = Feedback.query.filter_by(is_read=False).count()
        return jsonify(
            news=NewsPost.query.count(),
            leadership=Leadership.query.count(),
            downloads=Download.query.count(),
            feedback=Feedback.query.count(),
            unread=unread,
            gallery=Gallery.query.count(),
        )

    # ── Resource CRUD ─────────────────────────────────────────────
    crud_endpoints(
        app, NewsPost, 'news',
        ['title', 'title_am', 'content', 'content_am', 'category', 'image_url'],
        ['title', 'content'],
    )
    crud_endpoints(
        app, Leadership, 'leadership',
        ['name', 'name_am', 'position', 'position_am', 'photo_url', 'order_num'],
        ['name', 'position'],
    )
    crud_endpoints(
        app, Download, 'downloads',
        ['title', 'title_am', 'description', 'file_url', 'icon', 'category'],
        ['title'],
    )
    crud_endpoints(
        app, Feedback, 'feedback',
        ['reply', 'is_read'],
        [],
    )

    # ── Uploads & gallery ─────────────────────────────────────────
    @app.post('/api/admin/upload')
    @login_required
    def admin_upload():
        uploaded_file = request.files.get('file')
        kind = request.form.get('kind', 'file')
        allowed = IMAGE_EXTENSIONS if kind == 'image' else DOCUMENT_EXTENSIONS
        stored_name = save_upload(uploaded_file, allowed)
        if not stored_name:
            return jsonify(ok=False, error='Invalid or missing file'), 400
        url = f"/uploads/{stored_name}"
        gallery_id = None
        if kind == 'image':
            image = Gallery(
                filename=stored_name,
                url=url,
                label=(request.form.get('label') or '').strip()[:200] or None,
            )
            db.session.add(image)
            db.session.commit()
            gallery_id = image.id
        return jsonify(ok=True, url=url, gallery_id=gallery_id)

    @app.get('/api/admin/gallery')
    @login_required
    def admin_gallery():
        rows = Gallery.query.order_by(Gallery.created_at.desc()).all()
        return jsonify([row.dict() for row in rows])

    @app.delete('/api/admin/gallery/<int:item_id>')
    @login_required
    def admin_gallery_delete(item_id):
        image = Gallery.query.get(item_id)
        if not image:
            return jsonify(ok=False, error='Not found'), 404
        try:
            os.remove(os.path.join(current_app.config['UPLOAD_FOLDER'], image.filename))
        except OSError:
            pass  # File already gone; row removal is what matters.
        db.session.delete(image)
        db.session.commit()
        return jsonify(ok=True)

    # ── Settings (change password) ────────────────────────────────
    @app.put('/api/admin/settings')
    @login_required
    def admin_settings():
        data = body()
        user = AdminUser.query.get(session['admin_id'])
        current_password = data.get('current_password') or ''
        new_password = data.get('new_password') or ''
        if not user or not bcrypt.checkpw(current_password.encode(), user.password.encode()):
            return jsonify(ok=False, error='Current password is incorrect'), 400
        if len(new_password) < 6:
            return jsonify(ok=False, error='New password must be at least 6 characters'), 400
        user.password = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
        db.session.commit()
        return jsonify(ok=True, message='Password updated')
