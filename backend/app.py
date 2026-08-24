"""Flask entry point — Hossana Mesob One Digital Service Center."""
import os
from datetime import timedelta

import bcrypt
from flask import Flask, abort, send_from_directory
from flask_cors import CORS

from models import AdminUser, Download, Leadership, NewsPost, db

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # project root
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=None)
app.config.update(
    # Secret from environment; dev fallback keeps local runs working.
    SECRET_KEY=os.environ.get('SECRET_KEY', 'mesob-one-dev-secret-change-in-prod'),
    PERMANENT_SESSION_LIFETIME=timedelta(hours=8),
    MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16 MB upload cap
    UPLOAD_FOLDER=os.path.join(BACKEND_DIR, 'uploads'),
    SQLALCHEMY_DATABASE_URI=f"sqlite:///{os.path.join(BACKEND_DIR, 'db.sqlite')}",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)
CORS(app, supports_credentials=True, origins=[
    'http://localhost:5000', 'http://127.0.0.1:5000'])

db.init_app(app)

from routes import register_routes  # noqa: E402  (must import after db init)
register_routes(app)


# ── Static / SPA routes ───────────────────────────────────────────
DIST_DIR = os.path.join(BASE_DIR, 'dist')


@app.route('/')
def index():
    """Serve the React build when present; fall back to legacy page."""
    react_index = os.path.join(DIST_DIR, 'index.html')
    if os.path.exists(react_index):
        return send_from_directory(DIST_DIR, 'index.html')
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/admin')
def admin_page():
    return send_from_directory(BASE_DIR, 'admin.html')


@app.route('/uploads/<path:name>')
def uploaded_file(name):
    return send_from_directory(app.config['UPLOAD_FOLDER'], name)


@app.route('/assets/<path:name>')
def brand_assets(name):
    return send_from_directory(os.path.join(BASE_DIR, 'assets'), name)


@app.route('/<path:name>')
def project_asset(name):
    normalized = name.replace('\\', '/')
    top_level = normalized.split('/')[0]
    if top_level in ('backend', 'frontend', 'node_modules') \
            or normalized.lower().endswith(('.md', '.sqlite', '.pyc')):
        abort(404)  # Never expose source code or databases over HTTP.
    # React build output first, legacy static files second.
    candidate = os.path.join(DIST_DIR, normalized)
    if os.path.isfile(candidate):
        return send_from_directory(DIST_DIR, normalized)
    return send_from_directory(BASE_DIR, normalized)


# ── Sample seed data ──────────────────────────────────────────────
NEWS_SEED = [
    dict(title='Mesob One Digital Service Center Official Launch',
         title_am='የመሶብ አንድ ዲጂታል አገልግሎት ማዕከል ኦፊሴላዊ መክፈቻ',
         content='The Hossana Mesob One Digital Service Center has officially opened its doors, bringing 12 government institutions under one digital roof.',
         content_am='የሆሳዕና መሶብ አንድ ዲጂታል አገልግሎት ማዕከል በOfficial ሁኔታ ተከፍቷል።',
         category='reform'),
    dict(title='Trade License Services Now Available Online',
         title_am='የንግድ ፈቃድ አገልግሎቶች አሁን በመስመር ላይ ይገኛሉ',
         content='Citizens can now apply for trade licenses entirely online through the Mesob One platform.',
         content_am='ዜጎች አሁን የንግድ ፈቃዶችን ሙሉ በሙሉ በመስመር ላይ ማመልከት ይችላሉ።',
         category='service'),
    dict(title='Paperless Service Achievement: Zero Paper Used',
         title_am='ዜሮ ወረቀት አጠቃቀም: የተደረገ ለውጥ',
         content='Since launching, the center has achieved zero paper usage across all digital services.',
         content_am='ከመክፈት በኋላ ማዕከሉ በሁሉም ዲጂታል አገልግሎቶች ዜሮ ወረቀት አግኝቷል።',
         category='reform'),
    dict(title='12 Partner Institutions United Under Mesob One',
         title_am='12 ጋራ ተቋማት በመሶብ አንድ ስር ተሰባስበዋል',
         content='All 12 government institutions are now fully integrated into the digital platform.',
         content_am='ከ12 የመንግስት ተቋማት ሁሉ በሙሉ ወደ ዲጂታል መድረክ ገብተዋል።',
         category='announcement'),
    dict(title='Telebirr and CBE Birr Payment Integration Complete',
         title_am='Telebirr እና CBE Birr ክፍያ መቀላቀል ተጠናቋል',
         content='Digital payment via Telebirr and CBE Birr is now fully operational for all fee-based services.',
         content_am='በTelebirr እና CBE Birr የተደረገ ዲጂታል ክፍያ ለሁሉም ክፍያ ያለባቸው አገልግሎቶች ሙሉ ተግባራዊ ነው።',
         category='service'),
    dict(title='Community Testimonials: Citizens Share Their Experience',
         title_am='የማህበረሰብ ዝግጅቶች: ዜጎች ተሞክሮዎቻቸውን ይጋራሉ',
         content='Citizens of Hossana share their positive experiences using the new digital service center.',
         content_am='የሆሳዕና ዜጎች አዲሱን ዲጂታል አገልግሎት ማዕከል በመጠቀም አዎንታዊ ተሞክሮዎቻቸውን ይጋራሉ።',
         category='update'),
]

LEADERSHIP_SEED = [
    dict(name='Temesgen Wolde Anose', name_am='ተመስገን ወልደ አኖሴ',
         position='General Manager', position_am='ስራ አስኪያጅ',
         photo_url='/assets/temesgen-wolde.jpg'),
    dict(name='Besufikad Adisse', name_am='ቤሱፍቃድ አዲሴ',
         position='Head of Digital Services', position_am='የዲጂታል አገልግሎት ኃላፊ'),
    dict(name='Hana Bekele', name_am='ሃና በቀለ',
         position='Head of Operations', position_am='የኦፕሬሽን ኃላፊ'),
    dict(name='Daniel Tesfaye', name_am='ዳኒኤል ተስፋዬ',
         position='Head of IT & Systems', position_am='የአይቲ ኃላፊ'),
]

DOWNLOAD_SEED = [
    dict(title='Trade License Application Form', title_am='የንግድ ፈቃድ ማመልከቻ ቅጽ',
         description='Standard form for new trade license applications',
         icon='📝', category='forms'),
    dict(title='Construction Permit Guidelines', title_am='የግንባታ ፈቃድ መመሪያ',
         description='Step-by-step guide for construction permit applications',
         icon='🏗️', category='guidelines'),
    dict(title='Annual Service Report 2026', title_am='ዓመታዊ የአገልግሎት ሪፖርት 2026',
         description='Comprehensive report of service delivery achievements',
         icon='📊', category='reports'),
    dict(title='Digital Payment Regulations', title_am='የዲጂታል ክፍያ ደንቦች',
         description='Official regulations governing digital payment services',
         icon='💳', category='regulations'),
    dict(title='Document Verification Manual', title_am='የሰነድ ማረጋገጫ መመሪያ',
         description='How to verify documents using QR codes',
         icon='✅', category='guidelines'),
    dict(title='Citizen Feedback Form', title_am='የዜጎች አስተያየት ቅጽ',
         description='Form for submitting service feedback and complaints',
         icon='💬', category='forms'),
]


def seed_database():
    """Create tables and seed sample data on first run only."""
    with app.app_context():
        db.create_all()
        if AdminUser.query.first():
            print('[DB] Existing database found; skipping seed.')
            return
        db.session.add(AdminUser(
            username='admin',
            password=bcrypt.hashpw(b'admin123', bcrypt.gensalt()).decode()))
        for post in NEWS_SEED:
            db.session.add(NewsPost(**post))
        for order_num, member in enumerate(LEADERSHIP_SEED):
            db.session.add(Leadership(order_num=order_num, **member))
        for download in DOWNLOAD_SEED:
            db.session.add(Download(**download))
        db.session.commit()
        print('[DB] Seeded admin user (admin / admin123) and Mesob One sample data.')


if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    seed_database()
    host = os.environ.get('HOST', '127.0.0.1')
    port = int(os.environ.get('PORT', '5000'))
    print(f'[SERVER] Mesob One DSC -> http://{host}:{port}  |  Admin: /admin')
    app.run(host=host, port=port, debug=os.environ.get('FLASK_DEBUG') == '1')
