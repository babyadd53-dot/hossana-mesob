"""SQLAlchemy models for Besufikad Adisse Digital Service Center."""
from datetime import datetime, timezone

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def _utcnow():
    return datetime.now(timezone.utc)


def _iso(dt):
    return dt.isoformat() if dt else None


class NewsPost(db.Model):
    __tablename__ = 'news_post'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    title_am = db.Column(db.String(200))
    content = db.Column(db.Text, nullable=False)
    content_am = db.Column(db.Text)
    category = db.Column(db.String(50), default='announcement')
    image_url = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=_utcnow)

    def dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'title_am': self.title_am,
            'content': self.content,
            'content_am': self.content_am,
            'category': self.category,
            'image_url': self.image_url,
            'created_at': _iso(self.created_at),
        }


class Leadership(db.Model):
    __tablename__ = 'leadership'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    name_am = db.Column(db.String(120))
    position = db.Column(db.String(120), nullable=False)
    position_am = db.Column(db.String(120))
    photo_url = db.Column(db.String(300))
    order_num = db.Column(db.Integer, default=0)

    def dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'name_am': self.name_am,
            'position': self.position,
            'position_am': self.position_am,
            'photo_url': self.photo_url,
            'order_num': self.order_num or 0,
        }


class Download(db.Model):
    __tablename__ = 'download'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    title_am = db.Column(db.String(200))
    description = db.Column(db.Text)
    file_url = db.Column(db.String(300))
    icon = db.Column(db.String(16), default='📄')
    category = db.Column(db.String(50), default='forms')
    created_at = db.Column(db.DateTime, default=_utcnow)

    def dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'title_am': self.title_am,
            'description': self.description,
            'file_url': self.file_url,
            'icon': self.icon,
            'category': self.category,
            'created_at': _iso(self.created_at),
        }


class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    reply = db.Column(db.Text)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=_utcnow)

    def dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'reply': self.reply,
            'is_read': bool(self.is_read),
            'created_at': _iso(self.created_at),
        }


class Gallery(db.Model):
    __tablename__ = 'gallery'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(300), nullable=False)
    label = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=_utcnow)

    def dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'url': self.url,
            'label': self.label,
            'created_at': _iso(self.created_at),
        }


class AdminUser(db.Model):
    __tablename__ = 'admin_user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # bcrypt hash
