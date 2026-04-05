from PIL import Image

def convert_to_transparent():
    # Keep an original backup just in case
    img = Image.open(r"f:\EAC\frontend\public\logo.png").convert("RGBA")
    img.save(r"f:\EAC\frontend\public\logo_backup.png", "PNG")
    
    datas = img.getdata()
    newData = []
    for item in datas:
        r, g, b, a = item
        # Logo has mostly blue and orange. White is (255, 255, 255)
        # We target near-white pixels and scale their alpha down smoothly
        
        # Calculate how close to pure white (255) the maximum color component is
        m = max(r, g, b)
        
        if m > 250:
            # Pure white -> transparent
            newData.append((255, 255, 255, 0))
        elif m > 210:
            # Anti-aliased white edge -> semi-transparent
            # If m is 210, factor is 1.0 (opaque)
            # If m is 250, factor is 0.0 (transparent)
            factor = (m - 210) / 40.0
            new_a = int(a * (1.0 - factor))
            newData.append((r, g, b, new_a))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(r"f:\EAC\frontend\public\logo.png", "PNG")

convert_to_transparent()
