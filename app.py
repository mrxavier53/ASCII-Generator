from flask import Flask, request, jsonify, render_template
import pyfiglet
from pyfiglet import Figlet
import random
import re
from flask import send_from_directory
import os

app = Flask(__name__)


AVAILABLE_FONTS = [
    'standard', 'slant', 'small', 'cyberlarge', 'digital', 'doom', 
    'banner', 'big', 'block', 'bubble', 'lean', 'mini', 'script',
    'shadow', 'smslant', 'smscript', 'smshadow', 'smblock', 'larry3d'
]


PROFANITY_LIST = ['badword1', 'badword2', 'offensive']  

def contains_profanity(text):
  
    text_lower = text.lower()
    for word in PROFANITY_LIST:
        if word in text_lower:
            return True
    return False

def generate_ascii_art(text, font=None):
    
    if not text or len(text.strip()) == 0:
        return "Error: No text provided"
    
    
    text = ' '.join(text.split())
    
  
    if len(text) > 500:
        text = text[:500]
        warning = "\n[Note: Text was truncated to 500 characters]\n"
    else:
        warning = ""
    
    try:
        if font and font in AVAILABLE_FONTS:
            fig = Figlet(font=font)
        else:
           
            fig = Figlet(font=random.choice(AVAILABLE_FONTS))
        
        art = fig.renderText(text)
        
        
        if warning:
            art = warning + art
            
        return art
    except Exception as e:
        return f"Error generating ASCII art: {str(e)}"
        
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text'].strip()
    
    
    if len(text) > 500:
        return jsonify({'error': 'Text exceeds 500 character limit'}), 400
    
    if len(text) == 0:
        return jsonify({'error': 'Please enter some text'}), 400
    
   
    if contains_profanity(text):
        return jsonify({'error': 'Inappropriate content detected'}), 400
    
    
    font = data.get('font', None)
    
    
    art = generate_ascii_art(text, font)
    
    return jsonify({
        'art': art,
        'original_text': text,
        'font_used': font if font else 'random',
        'length': len(art)
    })

@app.route('/fonts', methods=['GET'])
def get_fonts():
   
    return jsonify({'fonts': AVAILABLE_FONTS})

@app.route('/save', methods=['POST'])
def save_art():
    
    data = request.get_json()
    
    if not data or 'art' not in data:
        return jsonify({'error': 'No art provided'}), 400
    
    art = data['art']
    filename = data.get('filename', 'ascii_art.txt')
    
    
    if not filename.endswith('.txt'):
        filename += '.txt'
    
    
    filename = re.sub(r'[^\w\-\.]', '_', filename)
    
   
    import os
    from flask import send_from_directory
    
    save_dir = os.path.join(app.root_path, 'static', 'downloads')
    os.makedirs(save_dir, exist_ok=True)
    
    filepath = os.path.join(save_dir, filename)
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(art)
        
        
        return jsonify({
            'success': True,
            'download_url': f'/static/downloads/{filename}',
            'filename': filename
        })
    except Exception as e:
        return jsonify({'error': f'Failed to save file: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)