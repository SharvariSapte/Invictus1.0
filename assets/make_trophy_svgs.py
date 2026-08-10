from PIL import Image, ImageDraw, ImageFont

# Generate simple trophy images for gold, silver, and copper.
# We will create 150x150 PNGs with a trophy icon and text.

def make_trophy(color, label, filename):
    size = (150, 150)
    img = Image.new('RGBA', size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Trophy base
    draw.rectangle([55, 90, 95, 115], fill=color)
    draw.rectangle([70, 115, 80, 130], fill=color)
    draw.rectangle([45, 60, 105, 90], fill=color)
    draw.rectangle([60, 30, 90, 60], fill=color)
    draw.rectangle([45, 40, 55, 80], fill=color)
    draw.rectangle([95, 40, 105, 80], fill=color)
    draw.ellipse([55, 20, 95, 60], fill=color)

    # Trophy handles
    draw.rectangle([40, 40, 45, 60], fill=color)
    draw.rectangle([105, 40, 110, 60], fill=color)

    # Label background
    draw.rectangle([30, 130, 120, 145], fill=(20, 20, 20, 190))

    # Text
    try:
        font = ImageFont.truetype('arial.ttf', 13)
    except IOError:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), label, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text(((150 - w) / 2, 132 - h / 2), label, font=font, fill='white')

    img.save(filename)

if __name__ == '__main__':
    make_trophy((212, 175, 55), 'GOLD', 'c:/Users/HP/Desktop/invictus/Invictus1.0/public/gold_trophy.png')
    make_trophy((192, 192, 192), 'SILVER', 'c:/Users/HP/Desktop/invictus/Invictus1.0/public/silver_trophy.png')
    make_trophy((184, 115, 51), 'COPPER', 'c:/Users/HP/Desktop/invictus/Invictus1.0/public/copper_trophy.png')
