
import requests
import json
import os

URL = "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json"
TARGET_FILE = r"c:\Users\PC\Desktop\AlSolved Email System\ALSOLVED - Sistema Venditori\js\comuni.js"

print(f"Downloading from {URL}...")
try:
    response = requests.get(URL)
    response.raise_for_status()
    data = response.json()
    
    print(f"Downloaded {len(data)} entries. Processing...")
    
    # Create the mapping: Name (Upper) -> Cadastral Code
    comuni_map = {}
    for entry in data:
        name = entry.get("nome", "").upper()
        code = entry.get("codiceCatastale", "")
        if name and code:
            comuni_map[name] = code
            
    print(f"Mapped {len(comuni_map)} municipalities.")
    
    # Write to JS file
    js_content = f"const COMUNI = {json.dumps(comuni_map, separators=(',', ':'))};"
    
    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Successfully wrote to {TARGET_FILE}")
    
except Exception as e:
    print(f"Error: {e}")
