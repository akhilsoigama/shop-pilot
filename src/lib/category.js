export const categories = [
    'Electronics',
    'Fashion & Apparel',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Health & Wellness',
    'Sports & Outdoors',
    'Automotive',
    'Books & Stationery',
    'Toys & Games',
    'Baby Products',
    'Groceries & Gourmet',
    'Pet Supplies',
    'Office Supplies',
    'Tools & Hardware',
    'Jewelry & Accessories',
    'Footwear',
];


export const Subcategories = [
    {
        name: 'Electronics',
        subcategories: [
            {
                name: 'Smartphones & Mobiles', imageUrl: '/subcategory/electronics/mobile-phones.png',
                fields: [
                    { name: 'RAM', type: 'dropdown', options: ['4GB', '6GB', '8GB', '12GB'] },
                    { name: 'Storage', type: 'dropdown', options: ['64GB', '128GB', '256GB', '512GB', '1TB'] },
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Battery', type: 'text', unit: 'mAh' },
                    { name: 'Color', type: 'text' },
                    { name: 'Camera', type: 'text' },
                    { name: 'Processor', type: 'text' },
                    { name: 'Operating System', type: 'text' },
                    { name: '5G Supported', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Laptops',
                imageUrl: '/subcategory/electronics/laptops.png',
                fields: [
                    { name: 'Processor', type: 'dropdown', options: ['Intel i3', 'Intel i5', 'Intel i7', 'Intel i9', 'Ryzen 5', 'Ryzen 7'] },
                    { name: 'RAM', type: 'dropdown', options: ['8GB', '16GB', '32GB'] },
                    { name: 'Storage Type', type: 'dropdown', options: ['HDD', 'SSD', 'Hybrid'] },
                    { name: 'Storage Capacity', type: 'dropdown', options: ['256GB', '512GB', '1TB', '2TB'] },
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Color', type: 'text' },
                    { name: 'Graphics Card', type: 'text' },
                    { name: 'Operating System', type: 'text' },
                ],
            },
            {
                name: 'Tablets',
                imageUrl: '/subcategory/electronics/tablets.png',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Storage', type: 'dropdown', options: ['32GB', '64GB', '128GB', '256GB'] },
                    { name: 'RAM', type: 'dropdown', options: ['2GB', '4GB', '6GB', '8GB'] },
                    { name: 'Battery', type: 'text', unit: 'mAh' },
                    { name: 'Color', type: 'text' },
                    { name: 'Camera', type: 'text' },
                    { name: 'SIM Support', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Refrigerators',
                imageUrl: '/subcategory/electronics/refrigerator.png',
                fields: [
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Color', type: 'text' },
                    { name: 'Door Type', type: 'dropdown', options: ['Single Door', 'Double Door', 'Side by Side', 'French Door'] },
                    { name: 'Defrost Type', type: 'dropdown', options: ['Direct Cool', 'Frost Free'] },
                    { name: 'Star Rating', type: 'dropdown', options: ['2 Star', '3 Star', '4 Star', '5 Star'] },
                ],
            },
            {
                name: 'Headphones',
                imageUrl: '/subcategory/electronics/headphones.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['In-Ear', 'On-Ear', 'Over-Ear'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Connectivity', type: 'dropdown', options: ['Wired', 'Wireless', 'Bluetooth'] },
                    { name: 'Noise Cancellation', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Battery Life', type: 'text', unit: 'hours' },
                ],
            },
            {
                name: 'Cameras',
                imageUrl: '/subcategory/electronics/cameras.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera'] },
                    { name: 'Resolution', type: 'text', unit: 'MP' },
                    { name: 'Color', type: 'text' },
                    { name: 'Lens Included', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Zoom', type: 'text', unit: 'x' },
                    { name: 'Sensor Type', type: 'text' },
                ],
            },
            {
                name: 'Smart Watches',
                imageUrl: '/subcategory/electronics/smart-watches.png',
                fields: [
                    { name: 'Dial Shape', type: 'dropdown', options: ['Round', 'Square', 'Rectangular'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wi-Fi'] },
                    { name: 'Fitness Features', type: 'dropdown', options: ['Heart Rate', 'SpO2', 'Sleep Tracking', 'Steps Counter'] },
                    { name: 'Battery Life', type: 'text', unit: 'days' },
                ],
            },
            {
                name: 'Gaming Consoles',
                imageUrl: '/subcategory/electronics/gaming-consoles.png',
                fields: [
                    { name: 'Model', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Storage', type: 'dropdown', options: ['500GB', '1TB', '2TB'] },
                    { name: 'Controller Included', type: 'dropdown', options: ['1', '2'] },
                ],
            },
            {
                name: 'Televisions',
                imageUrl: '/subcategory/electronics/televisions.png',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Color', type: 'text' },
                    { name: 'Display Type', type: 'dropdown', options: ['LED', 'OLED', 'QLED', 'LCD'] },
                    { name: 'Smart TV', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Resolution', type: 'dropdown', options: ['HD', 'Full HD', '4K', '8K'] },
                ],
            },
            {
                name: 'Printers',
                imageUrl: '/subcategory/electronics/printers.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Inkjet', 'Laser', 'Dot Matrix'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Functions', type: 'dropdown', options: ['Print', 'Print + Scan + Copy'] },
                    { name: 'Connectivity', type: 'dropdown', options: ['USB', 'Wi-Fi', 'Bluetooth'] },
                ],
            },
            {
                name: 'Monitors',
                imageUrl: '/subcategory/electronics/monitors.png',
                fields: [
                    { name: 'Screen Size', type: 'text', unit: 'inches' },
                    { name: 'Color', type: 'text' },
                    { name: 'Resolution', type: 'dropdown', options: ['HD', 'Full HD', '2K', '4K'] },
                    { name: 'Refresh Rate', type: 'text', unit: 'Hz' },
                    { name: 'Panel Type', type: 'dropdown', options: ['IPS', 'TN', 'VA'] },
                ],
            },
            {
                name: 'Storage Devices',
                imageUrl: '/subcategory/electronics/storage.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['HDD', 'SSD', 'Pen Drive', 'Memory Card'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'dropdown', options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'] },
                    { name: 'Interface', type: 'dropdown', options: ['USB 2.0', 'USB 3.0', 'USB-C', 'SATA', 'NVMe'] },
                ],
            },
            {
                name: 'Fitness Bands',
                imageUrl: '/subcategory/electronics/fitness.png',
                fields: [
                    { name: 'Display', type: 'dropdown', options: ['AMOLED', 'LCD'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Battery Life', type: 'text', unit: 'days' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Tracking Features', type: 'dropdown', options: ['Steps', 'Calories', 'Sleep', 'Heart Rate'] },
                ],
            },
            {
                name: 'Washing Machines',
                imageUrl: '/subcategory/electronics/washing.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Front Load', 'Top Load', 'Semi Automatic'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Kg' },
                    { name: 'Spin Speed', type: 'text', unit: 'RPM' },
                    { name: 'Star Rating', type: 'dropdown', options: ['3 Star', '4 Star', '5 Star'] },
                ],
            },
            {
                name: 'Air Conditioners',
                imageUrl: '/subcategory/electronics/ac.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Split', 'Window', 'Portable'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Tons' },
                    { name: 'Star Rating', type: 'dropdown', options: ['3 Star', '4 Star', '5 Star'] },
                    { name: 'Inverter', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Audio Systems',
                imageUrl: '/subcategory/electronics/audio.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Home Theater', 'Soundbar', 'Bluetooth Speaker'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wi-Fi', 'Wired'] },
                    { name: 'Output Power', type: 'text', unit: 'Watt' },
                ],
            },
            {
                name: 'Accessories',
                imageUrl: '/subcategory/electronics/accessories.png',
                fields: [
                    {
                        name: 'Type',
                        type: 'dropdown',
                        options: [
                            'Keyboard',
                            'Mouse',
                            'Webcam',
                            'Speakers',
                            'Cables',
                            'Docking Station',
                            'Charger',
                            'Power Bank',
                            'Adapter',
                            'Screen Protector',
                            'Phone Case',
                            'Stylus',
                            'Mount & Holder',
                            'Headphones',
                            'Microphone',
                            'USB Hub',
                            'Laptop Stand',
                            'Cooling Pad'
                        ]
                    },
                    {
                        name: 'Connectivity',
                        type: 'dropdown',
                        options: [
                            'Wired',
                            'Wireless',
                            'Bluetooth',
                            'USB',
                            'USB-C',
                            'Lightning',
                            'HDMI',
                            'Thunderbolt',
                            '3.5mm Audio'
                        ]
                    },
                    {
                        name: 'Color',
                        type: 'dropdown',
                        options: [
                            'Black',
                            'White',
                            'Blue',
                            'Red',
                            'Silver',
                            'Gray',
                            'Pink',
                            'Green',
                            'Gold',
                            'Transparent',
                            'Multicolor'
                        ]
                    },
                    {
                        name: 'Material',
                        type: 'dropdown',
                        options: [
                            'Plastic',
                            'Silicone',
                            'Metal',
                            'Leather',
                            'Rubber',
                            'Fabric',
                            'Wood',
                            'Carbon Fiber',
                            'Aluminum'
                        ]
                    },
                    {
                        name: 'Compatibility',
                        type: 'text',
                        description: 'Specific device models this accessory works with'
                    },
                    {
                        name: 'Fast Charging Supported',
                        type: 'dropdown',
                        options: ['Yes', 'No']
                    },
                    {
                        name: 'Water Resistance',
                        type: 'dropdown',
                        options: ['None', 'IP54', 'IP67', 'IP68']
                    },
                    {
                        name: 'Cable Length',
                        type: 'dropdown',
                        options: ['0.5m', '1m', '1.5m', '2m', '3m', '5m']
                    },
                    {
                        name: 'Warranty',
                        type: 'dropdown',
                        options: ['None', '6 Months', '1 Year', '2 Years', 'Lifetime']
                    }
                ],
            }
        ],
    },
    {
        name: 'Fashion & Apparel',
        subcategories: [
            {
                name: "Men's Clothing",
                imageUrl: '/subcategory/fashion/mens-clothing.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Shirt', 'T-Shirt', 'Jeans', 'Trousers', 'Jacket', 'Kurta'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Fit', type: 'dropdown', options: ['Slim', 'Regular', 'Loose'] },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] },
                    { name: 'Pattern', type: 'text' },
                ],
            },
            {
                name: "Women's Clothing",
                imageUrl: '/subcategory/fashion/womens-clothing.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Top', 'Dress', 'Saree', 'Kurti', 'Jeans', 'Leggings'] },
                    { name: 'Size', type: 'dropdown', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Fit', type: 'dropdown', options: ['Slim', 'Regular', 'Loose'] },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] },
                    { name: 'Pattern', type: 'text' },
                ],
            },
            {
                name: "Kid's Clothing",
                imageUrl: '/subcategory/fashion/kids-clothing.png',
                fields: [
                    { name: 'Age Group', type: 'dropdown', options: ['0-1 Years', '1-3 Years', '4-6 Years', '7-9 Years', '10-12 Years'] },
                    { name: 'Gender', type: 'dropdown', options: ['Boys', 'Girls'] },
                    { name: 'Type', type: 'dropdown', options: ['Shirt', 'T-Shirt', 'Dress', 'Frock', 'Pants', 'Shorts'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                ],
            },
            {
                name: 'Bags & Luggage',
                imageUrl: '/subcategory/fashion/bags.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Backpack', 'Trolley Bag', 'Handbag', 'Laptop Bag', 'Duffel Bag'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Color', type: 'text' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Traditional Watches',
                imageUrl: '/subcategory/fashion/watches.png',
                fields: [
                    { name: 'Dial Shape', type: 'dropdown', options: ['Round', 'Square', 'Rectangular'] },
                    { name: 'Strap Material', type: 'text' },
                    { name: 'Strap Color', type: 'text' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Display Type', type: 'dropdown', options: ['Analog', 'Digital'] },
                ],
            },
            {
                name: 'Sunglasses',
                imageUrl: '/subcategory/fashion/sunglasses.png',
                fields: [
                    { name: 'Frame Shape', type: 'dropdown', options: ['Round', 'Square', 'Aviator', 'Wayfarer', 'Cat Eye'] },
                    { name: 'Lens Color', type: 'text' },
                    { name: 'Frame Color', type: 'text' },
                    { name: 'Frame Material', type: 'text' },
                    { name: 'UV Protection', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Polarized', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Fashion Accessories',
                imageUrl: '/subcategory/fashion/accessories.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Necklace', 'Bracelet', 'Ring', 'Earrings', 'Anklet'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Party', 'Wedding', 'Festive'] },
                ],
            },
            {
                name: 'Belts & Wallets',
                imageUrl: '/subcategory/fashion/belts.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Belt', 'Wallet'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                ],
            },
            {
                name: 'Scarves & Shawls',
                imageUrl: '/subcategory/fashion/scarves.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Scarf', 'Shawl', 'Stole', 'Dupatta'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Pattern', type: 'text' },
                    { name: 'Length', type: 'text', unit: 'cm' },
                ],
            },
            {
                name: 'Hats & Caps',
                imageUrl: '/subcategory/fashion/hats.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Cap', 'Hat', 'Beanie', 'Fedora'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Sports', 'Beach', 'Winter'] },
                ],
            },
        ],
    },
    {
        name: 'Home & Kitchen',
        subcategories: [
            {
                name: 'Living Room Furniture',
                imageUrl: '/subcategory/home&kitchen/furniture.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Sofa', 'Coffee Table', 'TV Unit', 'Recliner', 'Bookshelf'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Seating Capacity', type: 'dropdown', options: ['1 Seater', '2 Seater', '3 Seater', '5 Seater'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Dimensions', type: 'text', unit: 'L x W x H (cm)' },
                    { name: 'Storage Included', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Bedroom Furniture',
                imageUrl: '/subcategory/home&kitchen/bedroom.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bed', 'Wardrobe', 'Dressing Table', 'Nightstand', 'Mattress'] },
                    { name: 'Size', type: 'dropdown', options: ['Single', 'Double', 'Queen', 'King'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Storage Type', type: 'dropdown', options: ['Box', 'Drawer', 'Hydraulic', 'None'] },
                ],
            },
            {
                name: 'Kitchen & Dining Furniture',
                imageUrl: '/subcategory/home&kitchen/kitchen.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dining Table', 'Chairs', 'Kitchen Rack', 'Bar Stool'] },
                    { name: 'Seating Capacity', type: 'dropdown', options: ['2', '4', '6', '8'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Shape', type: 'dropdown', options: ['Round', 'Rectangular', 'Square'] },
                ],
            },
            {
                name: 'Gardening & Outdoor',
                imageUrl: '/subcategory/home&kitchen/garden.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Plant Pot', 'Garden Tool', 'Seeds', 'Outdoor Furniture'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage Area', type: 'dropdown', options: ['Balcony', 'Terrace', 'Garden', 'Indoor'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                ],
            },
            {
                name: 'Cookware & Bakeware',
                imageUrl: '/subcategory/home&kitchen/cookware.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Kadhai', 'Pan', 'Tawa', 'Casserole', 'Baking Tray'] },
                    { name: 'Material', type: 'dropdown', options: ['Non-stick', 'Stainless Steel', 'Aluminium', 'Cast Iron'] },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Induction Compatible', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Oven Safe', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Kitchen Appliances',
                imageUrl: '/subcategory/home&kitchen/appliances.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Mixer Grinder', 'Microwave', 'Toaster', 'Juicer', 'Induction Cooktop'] },
                    { name: 'Power Consumption', type: 'text', unit: 'Watts' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Color', type: 'text' },
                    { name: 'Auto Shut Off', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Lighting',
                imageUrl: '/subcategory/home&kitchen/lighting.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ceiling Light', 'Lamp', 'LED Strip', 'Pendant Light'] },
                    { name: 'Wattage', type: 'text', unit: 'Watts' },
                    { name: 'Color Temperature', type: 'dropdown', options: ['Warm White', 'Cool White', 'Daylight'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimmable', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Storage & Organization',
                imageUrl: '/subcategory/home&kitchen/storage.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Drawer', 'Storage Box', 'Shoe Rack', 'Wardrobe Organizer'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'Litres' },
                    { name: 'Foldable', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Bedding & Bath',
                imageUrl: '/subcategory/home&kitchen/bedding.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bedsheet', 'Pillow', 'Comforter', 'Towel', 'Mattress Protector'] },
                    { name: 'Size', type: 'dropdown', options: ['Single', 'Double', 'Queen', 'King'] },
                    { name: 'Thread Count', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                ],
            },
            {
                name: 'Home Decor',
                imageUrl: '/subcategory/home&kitchen/decor.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Wall Art', 'Clock', 'Showpiece', 'Photo Frame', 'Artificial Plant'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Mount Type', type: 'dropdown', options: ['Wall Mounted', 'Tabletop'] },
                    { name: 'Dimensions', type: 'text', unit: 'L x W x H (cm)' },
                ],
            },
            {
                name: 'Dining & Serveware',
                imageUrl: '/subcategory/home&kitchen/dining.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dinner Set', 'Plates', 'Bowls', 'Serving Tray', 'Cutlery Set', 'Glasses', 'Jug', 'Serving Spoon', 'Salad Bowl'] },
                    { name: 'Material', type: 'dropdown', options: ['Ceramic', 'Stainless Steel', 'Melamine', 'Glass', 'Bone China', 'Wood'] },
                    { name: 'Microwave Safe', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Dishwasher Safe', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Number of Pieces', type: 'text' },
                    { name: 'Color', type: 'text' },
                    { name: 'Pattern/Design', type: 'text' },
                ],
            },
        ],
    },
    {
        name: 'Beauty & Personal Care',
        subcategories: [
            {
                name: 'Makeup',
                imageUrl: '/subcategory/beauty/makeup.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Foundation', 'Lipstick', 'Mascara', 'Blush', 'Eyeshadow', 'Concealer'] },
                    { name: 'Shade', type: 'text' },
                    { name: 'Finish', type: 'dropdown', options: ['Matte', 'Glossy', 'Dewy', 'Satin'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Combination', 'Normal', 'All Skin Types'] },
                    { name: 'Waterproof', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Skin Care',
                imageUrl: '/subcategory/beauty/skincare.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Moisturizer', 'Sunscreen', 'Serum', 'Face Wash', 'Toner', 'Face Mask'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Combination', 'Sensitive', 'All Skin Types'] },
                    { name: 'SPF', type: 'text' },
                    { name: 'Usage', type: 'dropdown', options: ['Day', 'Night', 'Both'] },
                    { name: 'Fragrance Free', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Hair Care',
                imageUrl: '/subcategory/beauty/haircare.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask'] },
                    { name: 'Hair Type', type: 'dropdown', options: ['Dry', 'Oily', 'Normal', 'Colored', 'Damaged'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Sulfate Free', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Purpose', type: 'text' },
                ],
            },
            {
                name: 'Fragrances',
                imageUrl: '/subcategory/beauty/fragrances.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Perfume', 'Deodorant', 'Body Mist'] },
                    { name: 'Gender', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Fragrance Type', type: 'dropdown', options: ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh'] },
                    { name: 'Volume', type: 'text', unit: 'ml' },
                    { name: 'Long Lasting', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Grooming Tools',
                imageUrl: '/subcategory/beauty/grooming.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Trimmer', 'Razor', 'Hair Dryer', 'Straightener', 'Epilator'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Electric', 'Battery Operated', 'Manual'] },
                    { name: 'Cordless', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Recharge Time', type: 'text', unit: 'hrs' },
                    { name: 'Usage Time', type: 'text', unit: 'mins' },
                ],
            },
            {
                name: 'Bath & Body',
                imageUrl: '/subcategory/beauty/bath-body.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Body Wash', 'Soap', 'Body Lotion', 'Body Scrub'] },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Normal', 'Sensitive', 'All Skin Types'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Fragrance', type: 'text' },
                    { name: 'Paraben Free', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Oral Care',
                imageUrl: '/subcategory/beauty/oral-care.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Toothpaste', 'Toothbrush', 'Mouthwash', 'Floss'] },
                    { name: 'Pack Size', type: 'text' },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Whitening', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Sensitivity Care', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: "Men's Grooming",
                imageUrl: '/subcategory/beauty/mensgrooming.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Beard Oil', 'Shaving Foam', 'After Shave', 'Beard Trimmer'] },
                    { name: 'Fragrance', type: 'text' },
                    { name: 'Skin Type', type: 'dropdown', options: ['Dry', 'Oily', 'Sensitive', 'All Skin Types'] },
                    { name: 'Quantity', type: 'text', unit: 'ml' },
                    { name: 'Usage Area', type: 'dropdown', options: ['Face', 'Body', 'Beard'] },
                ],
            },
        ],
    },
    {
        name: 'Health & Wellness',
        subcategories: [
            {
                name: 'Supplements',
                imageUrl: '/subcategory/health/supplements.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Protein', 'Vitamins', 'Minerals', 'Omega-3', 'Herbal'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Capsule', 'Powder', 'Liquid', 'Gummies'] },
                    { name: 'Flavour', type: 'text' },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Serving Size', type: 'text' }
                ],
            },
            {
                name: 'Fitness Equipment',
                imageUrl: '/subcategory/health/fitness.png',
                fields: [
                    { name: 'Equipment Type', type: 'dropdown', options: ['Dumbbells', 'Treadmills', 'Exercise Bikes', 'Resistance Bands', 'Home Gym'] },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Personal Care',
                imageUrl: '/subcategory/health/personal-care.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Electric Trimmer', 'Hair Dryer', 'Epilator', 'Facial Cleanser'] },
                    { name: 'Usage', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Battery Operated', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Wellness Devices',
                imageUrl: '/subcategory/health/devices.png',
                fields: [
                    { name: 'Device Type', type: 'dropdown', options: ['Massager', 'Foot Spa', 'Aroma Diffuser', 'Heating Pad'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Electric', 'Battery'] },
                    { name: 'Timer Function', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
            },
            {
                name: 'First Aid',
                imageUrl: '/subcategory/health/first-aid.png',
                fields: [
                    { name: 'Kit Type', type: 'dropdown', options: ['Basic', 'Comprehensive', 'Travel', 'Home Use'] },
                    { name: 'Number of Items', type: 'text' },
                    { name: 'Sterile', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Water Resistant Case', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Health Monitors',
                imageUrl: '/subcategory/health/monitors.png',
                fields: [
                    { name: 'Monitor Type', type: 'dropdown', options: ['Blood Pressure', 'Glucometer', 'Pulse Oximeter', 'Thermometer'] },
                    { name: 'Display Type', type: 'dropdown', options: ['Digital', 'Analog'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Battery', 'Rechargeable'] },
                    { name: 'Memory Function', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Yoga & Meditation',
                imageUrl: '/subcategory/health/yoga.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Yoga Mat', 'Meditation Cushion', 'Yoga Block', 'Strap'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Thickness', type: 'text', unit: 'mm' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Vitamins & Minerals',
                imageUrl: '/subcategory/health/vitamins.png',
                fields: [
                    { name: 'Vitamin Type', type: 'dropdown', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Multivitamin'] },
                    { name: 'Mineral Type', type: 'dropdown', options: ['Calcium', 'Iron', 'Magnesium', 'Zinc', 'Potassium', 'Selenium'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Capsule', 'Liquid', 'Gummies', 'Powder'] },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Dosage Per Day', type: 'text' },
                    { name: 'Suitable For', type: 'dropdown', options: ['Adults', 'Kids', 'Elderly', 'Pregnant Women'] }
                ],
            },
            {
                name: 'Herbal Products',
                imageUrl: '/subcategory/health/herbal.png',
                fields: [
                    { name: 'Herb Type', type: 'dropdown', options: ['Ashwagandha', 'Tulsi', 'Amla', 'Giloy', 'Turmeric', 'Neem'] },
                    { name: 'Form', type: 'dropdown', options: ['Tablet', 'Powder', 'Juice', 'Capsule', 'Tea'] },
                    { name: 'Quantity', type: 'text', unit: 'g/ml' },
                    { name: 'Organic Certified', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Consumption Method', type: 'dropdown', options: ['Oral', 'Topical'] },
                    { name: 'Age Group', type: 'dropdown', options: ['Adults', 'Children', 'Senior Citizens'] }
                ],
            },
        ],
    },
    {
        name: 'Sports & Outdoors',
        subcategories: [
            {
                name: 'Gym Equipment',
                imageUrl: '/subcategory/sports/gym.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Dumbbell', 'Treadmill', 'Bench', 'Barbell', 'Resistance Band'] },
                    { name: 'Material', type: 'dropdown', options: ['Steel', 'Rubber', 'Plastic'] },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Dimensions', type: 'text', unit: 'cm' }
                ],
            },
            {
                name: 'Sportswear',
                imageUrl: '/subcategory/sports/sportswear.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['T-Shirt', 'Shorts', 'Tracksuit', 'Jacket'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Material', type: 'dropdown', options: ['Polyester', 'Cotton', 'Nylon'] },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Camping Gear',
                imageUrl: '/subcategory/sports/camping.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Tent', 'Sleeping Bag', 'Camping Stove', 'Lantern'] },
                    { name: 'Capacity', type: 'text', unit: 'persons' },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Cycling',
                imageUrl: '/subcategory/sports/cycling.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Mountain Bike', 'Road Bike', 'Hybrid', 'BMX'] },
                    { name: 'Frame Size', type: 'text', unit: 'inches' },
                    { name: 'Wheel Size', type: 'text', unit: 'inches' },
                    { name: 'Gear Type', type: 'dropdown', options: ['Single Speed', 'Multi Speed'] }
                ],
            },
            {
                name: 'Team Sports',
                imageUrl: '/subcategory/sports/team-sports.png',
                fields: [
                    { name: 'Sport Type', type: 'dropdown', options: ['Cricket', 'Football', 'Basketball', 'Hockey'] },
                    { name: 'Equipment Type', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
            },
            {
                name: 'Water Sports',
                imageUrl: '/subcategory/sports/water-sports.png',
                fields: [
                    { name: 'Activity Type', type: 'dropdown', options: ['Swimming', 'Surfing', 'Diving', 'Kayaking'] },
                    { name: 'Equipment Type', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Hiking & Trekking',
                imageUrl: '/subcategory/sports/hiking.png',
                fields: [
                    { name: 'Gear Type', type: 'dropdown', options: ['Backpack', 'Trekking Pole', 'Boots', 'Tent'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Capacity', type: 'text', unit: 'liters' },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
            },
        ],
    },
    {
        name: 'Automotive',
        subcategories: [
            {
                name: 'Car Accessories',
                imageUrl: '/subcategory/automotive/car-accessories.png',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Compatibility', type: 'text' },
                    { name: 'Color', type: 'text' },
                ],
            },
            {
                name: 'Motorbike Accessories',
                imageUrl: '/subcategory/automotive/bike-accessories.png',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Bike Model Compatibility', type: 'text' },
                    { name: 'Material', type: 'text' },
                ],
            },
            {
                name: 'Oils & Fluids',
                imageUrl: '/subcategory/automotive/oils.png',
                fields: [
                    { name: 'Oil Type', type: 'dropdown', options: ['Engine Oil', 'Brake Oil', 'Coolant', 'Transmission Oil'] },
                    { name: 'Quantity', type: 'text' },
                    { name: 'Viscosity Grade', type: 'text' },
                ],
            },
            {
                name: 'Tools & Equipment',
                imageUrl: '/subcategory/automotive/tools.png',
                fields: [
                    { name: 'Tool Type', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage', type: 'text' },
                ],
            },
            {
                name: 'Car Electronics',
                imageUrl: '/subcategory/automotive/car-electronics.png',
                fields: [
                    { name: 'Device Type', type: 'text' },
                    { name: 'Compatibility', type: 'text' },
                    { name: 'Connectivity', type: 'dropdown', options: ['Bluetooth', 'Wired', 'Wireless'] },
                ],
            },
            {
                name: 'Car Care',
                imageUrl: '/subcategory/automotive/car-care.png',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Volume', type: 'text' },
                    { name: 'Surface Compatibility', type: 'text' },
                ],
            },
            {
                name: 'Motorbike Gear',
                imageUrl: '/subcategory/automotive/motorbike-gear.png',
                fields: [
                    { name: 'Gear Type', type: 'dropdown', options: ['Helmet', 'Gloves', 'Jacket', 'Boots', 'Pants'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Tires & Wheels',
                imageUrl: '/subcategory/automotive/tires-wheels.png',
                fields: [
                    { name: 'Tire Type', type: 'dropdown', options: ['Tubeless', 'Tube Type', 'Radial'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Vehicle Compatibility', type: 'text' }
                ],
            },
        ],
    },
    {
        name: 'Books & Stationery',
        subcategories: [
            {
                name: 'Fiction',
                imageUrl: '/subcategory/bo oks&stationery/fiction.png',
                fields: [
                    { name: 'Author', type: 'text' },
                    { name: 'Language', type: 'text' },
                    { name: 'Genre', type: 'text' },
                    { name: 'Page Count', type: 'text' }
                ],
            },
            {
                name: 'Non-Fiction',
                imageUrl: '/subcategory/books&stationery/non-fiction.png',
                fields: [
                    { name: 'Author', type: 'text' },
                    { name: 'Language', type: 'text' },
                    { name: 'Subject', type: 'text' },
                    { name: 'Page Count', type: 'text' }
                ],
            },
            {
                name: 'Educational',
                imageUrl: '/subcategory/books&stationery/educational.png',
                fields: [
                    { name: 'Subject', type: 'text' },
                    { name: 'Board/University', type: 'text' },
                    { name: 'Class/Level', type: 'text' },
                    { name: 'Language', type: 'text' }
                ],
            },
            {
                name: "Children's Books",
                imageUrl: '/subcategory/books&stationery/children.png',
                fields: [
                    { name: 'Age Group', type: 'dropdown', options: ['0-3', '4-6', '7-9', '10-12'] },
                    { name: 'Language', type: 'text' },
                    { name: 'Illustrated', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Notebooks & Journals',
                imageUrl: '/subcategory/books&stationery/notebooks.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ruled', 'Unruled', 'Grid', 'Dotted'] },
                    { name: 'Pages', type: 'text' },
                    { name: 'Size', type: 'dropdown', options: ['A4', 'A5', 'B5', 'Custom'] },
                    { name: 'Binding Type', type: 'text' }
                ],
            },
            {
                name: 'Art Supplies',
                imageUrl: '/subcategory/books&stationery/art.png',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Color Set', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
            },
            {
                name: 'Office Stationery',
                imageUrl: '/subcategory/books&stationery/office-stationery.png',
                fields: [
                    { name: 'Item Type', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Usage', type: 'text' },
                    { name: 'Pack Size', type: 'text' }
                ],
            },
            {
                name: 'Pens & Writing',
                imageUrl: '/subcategory/books&stationery/stationery.png',
                fields: [
                    { name: 'Pen Type', type: 'dropdown', options: ['Ballpoint', 'Gel', 'Fountain', 'Marker', 'Highlighter'] },
                    { name: 'Ink Color', type: 'text' },
                    { name: 'Refillable', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Pack Size', type: 'text' }
                ],
            },
            {
                name: 'Calendars & Planners',
                imageUrl: '/subcategory/books&stationery/calendars.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Wall Calendar', 'Desk Calendar', 'Planner'] },
                    { name: 'Year', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Binding Type', type: 'dropdown', options: ['Spiral', 'Stapled', 'Hardbound'] }
                ],
            },
        ],
    },
    {
        name: 'Toys & Games',
        subcategories: [
            {
                name: 'Action Figures',
                imageUrl: '/subcategory/toys/action-figures.png',
                fields: [
                    { name: 'Character', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Height', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+', '12+'] },
                ],
            },
            {
                name: 'Educational Toys',
                imageUrl: '/subcategory/toys/educational.png',
                fields: [
                    { name: 'Skill Focus', type: 'dropdown', options: ['STEM', 'Language', 'Math', 'Creativity'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['2+', '4+', '6+', '10+'] },
                ],
            },
            {
                name: 'Board Games',
                imageUrl: '/subcategory/toys/board-games.png',
                fields: [
                    { name: 'Game Type', type: 'dropdown', options: ['Strategy', 'Family', 'Party', 'Card'] },
                    { name: 'Number of Players', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['6+', '8+', '10+', '12+'] },
                ],
            },
            {
                name: 'Puzzles',
                imageUrl: '/subcategory/toys/puzzles.png',
                fields: [
                    { name: 'Puzzle Type', type: 'dropdown', options: ['Jigsaw', '3D', 'Wooden'] },
                    { name: 'Piece Count', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['4+', '6+', '8+', '12+'] },
                ],
            },
            {
                name: 'Remote Control Toys',
                imageUrl: '/subcategory/toys/rc-toys.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Car', 'Helicopter', 'Boat', 'Drone'] },
                    { name: 'Battery Type', type: 'text' },
                    { name: 'Range', type: 'text' },
                    { name: 'Control Type', type: 'dropdown', options: ['Remote', 'App-Controlled'] },
                ],
            },
            {
                name: 'Outdoor Play',
                imageUrl: '/subcategory/toys/outdoor.png',
                fields: [
                    { name: 'Play Type', type: 'dropdown', options: ['Slides', 'Swings', 'Tents', 'Sports'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+'] },
                ],
            },
            {
                name: 'Dolls & Playsets',
                imageUrl: '/subcategory/toys/dolls.png',
                fields: [
                    { name: 'Doll Type', type: 'dropdown', options: ['Fashion', 'Baby', 'Character'] },
                    { name: 'Accessories Included', type: 'text' },
                    { name: 'Material', type: 'text' },
                    { name: 'Recommended Age', type: 'dropdown', options: ['3+', '5+', '8+'] },
                ],
            },
        ],
    },
    {
        name: 'Baby Products',
        subcategories: [
            {
                name: 'Diapers & Wipes',
                imageUrl: '/subcategory/baby/diapers.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['Newborn', 'S', 'M', 'L', 'XL', 'XXL'] },
                    { name: 'Diaper Type', type: 'dropdown', options: ['Pant Style', 'Tape Style'] },
                    { name: 'Pack Size', type: 'text' },
                    { name: 'Fragrance', type: 'dropdown', options: ['Fragrance-Free', 'Mild Fragrance'] }
                ],
            },
            {
                name: 'Feeding & Nursing',
                imageUrl: '/subcategory/baby/feeding.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Bottle', 'Sipper', 'Breast Pump', 'Sterilizer'] },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Glass', 'Silicone'] },
                    { name: 'Capacity (ml)', type: 'text' },
                    { name: 'BPA Free', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Baby Gear',
                imageUrl: '/subcategory/baby/gear.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Stroller', 'Car Seat', 'Carrier', 'Walker'] },
                    { name: 'Age Range', type: 'text' },
                    { name: 'Weight Capacity (kg)', type: 'text' },
                    { name: 'Foldable', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Baby Clothing',
                imageUrl: '/subcategory/baby/clothing.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['0-3M', '3-6M', '6-9M', '9-12M', '12-18M', '18-24M'] },
                    { name: 'Material', type: 'dropdown', options: ['Cotton', 'Fleece', 'Wool'] },
                    { name: 'Color', type: 'text' },
                    { name: 'Sleeve Length', type: 'dropdown', options: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'] }
                ],
            },
            {
                name: 'Baby Toys',
                imageUrl: '/subcategory/baby/toys.png',
                fields: [
                    { name: 'Toy Type', type: 'dropdown', options: ['Soft Toy', 'Rattle', 'Teether', 'Musical Toy'] },
                    { name: 'Age Group', type: 'text' },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Wooden', 'Fabric'] },
                    { name: 'Battery Required', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
            {
                name: 'Health & Safety',
                imageUrl: '/subcategory/baby/health.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Thermometer', 'Nail Clipper', 'Medicine Dispenser', 'Safety Lock'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Usage Age', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Baby Care',
                imageUrl: '/subcategory/baby/baby-care.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Shampoo', 'Lotion', 'Powder', 'Oil'] },
                    { name: 'Volume (ml)', type: 'text' },
                    { name: 'Skin Type', type: 'dropdown', options: ['Normal', 'Sensitive'] },
                    { name: 'Paraben Free', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
        ],
    },
    {
        name: 'Groceries & Gourmet',
        subcategories: [
            {
                name: 'Snacks & Sweets',
                imageUrl: '/subcategory/groceries/snacks.png',
                fields: [
                    { name: 'Type', type: 'text' },
                    { name: 'Weight', type: 'text' },
                    { name: 'Flavor', type: 'text' },
                ],
            },
            {
                name: 'Beverages',
                imageUrl: '/subcategory/groceries/beverages.png',
                fields: [
                    { name: 'Drink Type', type: 'dropdown', options: ['Juice', 'Soft Drink', 'Energy Drink', 'Tea', 'Coffee', 'Water'] },
                    { name: 'Volume', type: 'text' },
                    { name: 'Sugar Content', type: 'dropdown', options: ['Sugar-Free', 'Low Sugar', 'Regular'] },
                ],
            },
            {
                name: 'Staples',
                imageUrl: '/subcategory/groceries/staples.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Rice', 'Pulses', 'Flour', 'Oil'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Organic', type: 'dropdown', options: ['Yes', 'No'] },
                ],
            },
            {
                name: 'Organic Foods',
                imageUrl: '/subcategory/groceries/organic.png',
                fields: [
                    { name: 'Product Type', type: 'text' },
                    { name: 'Certified Organic', type: 'dropdown', options: ['Yes', 'No'] },
                    { name: 'Weight', type: 'text' },
                ],
            },
            {
                name: 'Baking Essentials',
                imageUrl: '/subcategory/groceries/baking.png',
                fields: [
                    { name: 'Item Type', type: 'text' },
                    { name: 'Weight/Volume', type: 'text' },
                    { name: 'Use Case', type: 'text' },
                ],
            },
            {
                name: 'Packaged Foods',
                imageUrl: '/subcategory/groceries/packaged.png',
                fields: [
                    { name: 'Food Type', type: 'text' },
                    { name: 'Net Quantity', type: 'text' },
                    { name: 'Shelf Life', type: 'text' },
                ],
            },
            {
                name: 'International Cuisine',
                imageUrl: '/subcategory/groceries/cuisine.png',
                fields: [
                    { name: 'Cuisine Type', type: 'dropdown', options: ['Italian', 'Chinese', 'Mexican', 'Thai', 'Japanese', 'Continental'] },
                    { name: 'Item Type', type: 'text' },
                    { name: 'Weight/Volume', type: 'text' },
                ],
            },
            {
                name: 'Bakery Items',
                imageUrl: '/subcategory/groceries/bakery.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Bread', 'Cakes', 'Cookies', 'Pastries'] },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Weight', type: 'text' },
                ],
            },
            {
                name: 'Dairy Products',
                imageUrl: '/subcategory/groceries/dairy.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Milk', 'Cheese', 'Yogurt', 'Butter'] },
                    { name: 'Fat Content', type: 'text' },
                    { name: 'Volume', type: 'text' },
                ],
            },
            {
                name: 'Condiments & Sauces',
                imageUrl: '/subcategory/groceries/condiments.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Ketchup', 'Mustard', 'Mayonnaise', 'Hot Sauce', 'Soy Sauce'] },
                    { name: 'Flavor', type: 'text' },
                    { name: 'Volume', type: 'text' },
                    { name: 'Spice Level', type: 'dropdown', options: ['Mild', 'Medium', 'Hot'] },
                ],
            },
        ],
    },
    {
        name: 'Pet Supplies',
        subcategories: [
            {
                name: 'Dog Food & Care',
                imageUrl: '/subcategory/pets/dog-food.png',
                fields: [
                    { name: 'Food Type', type: 'dropdown', options: ['Dry', 'Wet', 'Treats', 'Grain-Free'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Breed Size', type: 'dropdown', options: ['Small', 'Medium', 'Large'] },
                    { name: 'Age Group', type: 'dropdown', options: ['Puppy', 'Adult', 'Senior'] }
                ],
            },
            {
                name: 'Cat Food & Care',
                imageUrl: '/subcategory/pets/cat-food.png',
                fields: [
                    { name: 'Food Type', type: 'dropdown', options: ['Dry', 'Wet', 'Treats'] },
                    { name: 'Weight', type: 'text' },
                    { name: 'Age Group', type: 'dropdown', options: ['Kitten', 'Adult', 'Senior'] }
                ],
            },
            {
                name: 'Pet Toys',
                imageUrl: '/subcategory/pets/toys.png',
                fields: [
                    { name: 'Animal Type', type: 'dropdown', options: ['Dog', 'Cat', 'Bird', 'Small Pet'] },
                    { name: 'Toy Type', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Health & Grooming',
                imageUrl: '/subcategory/pets/grooming.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Shampoo', 'Conditioner', 'Supplements', 'Dental Care', 'Skin Care'] },
                    { name: 'Animal Type', type: 'dropdown', options: ['Dog', 'Cat', 'Other'] },
                    { name: 'Volume/Weight', type: 'text' }
                ],
            },
            {
                name: 'Pet Accessories',
                imageUrl: '/subcategory/pets/accessories.png',
                fields: [
                    { name: 'Accessory Type', type: 'dropdown', options: ['Collar', 'Leash', 'Harness', 'Clothing', 'Bedding'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Aquarium Supplies',
                imageUrl: '/subcategory/pets/aquarium.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Fish Food', 'Filters', 'Tanks', 'Heaters', 'Decorations'] },
                    { name: 'Volume/Size', type: 'text' },
                    { name: 'Water Type', type: 'dropdown', options: ['Freshwater', 'Saltwater'] }
                ],
            },
            {
                name: 'Bird Supplies',
                imageUrl: '/subcategory/pets/bird-supplies.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Food', 'Cage', 'Toys', 'Perches', 'Nesting'] },
                    { name: 'Bird Type', type: 'dropdown', options: ['Parrot', 'Budgie', 'Canary', 'Finch', 'Cockatiel'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' }
                ],
            },
        ],
    },
    {
        name: 'Office Supplies',
        subcategories: [
            {
                name: 'Office Stationery',
                imageUrl: '/subcategory/office/stationery.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Pens', 'Notebooks', 'Markers', 'Staplers', 'Glue'] },
                    { name: 'Pack Size', type: 'text' }
                ],
            },
            {
                name: 'Office Furniture',
                imageUrl: '/subcategory/office/furniture.png',
                fields: [
                    { name: 'Furniture Type', type: 'dropdown', options: ['Chairs', 'Desks', 'Cabinets', 'Tables'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Filing Products',
                imageUrl: '/subcategory/office/filing.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Files', 'Folders', 'Binders'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'dropdown', options: ['A4', 'Letter', 'Legal'] }
                ],
            },
            {
                name: 'Organizers',
                imageUrl: '/subcategory/office/organizers.png',
                fields: [
                    { name: 'Organizer Type', type: 'dropdown', options: ['Desk Organizer', 'Drawer Organizer', 'Cable Organizer'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Dimensions', type: 'text' }
                ],
            },
            {
                name: 'Presentation Supplies',
                imageUrl: '/subcategory/office/presentation.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Whiteboards', 'Markers', 'Projectors', 'Flip Charts'] },
                    { name: 'Size/Dimensions', type: 'text' },
                    { name: 'Material', type: 'text' }
                ],
            },
        ],
    },
    {
        name: 'Jewelry & Accessories',
        subcategories: [
            {
                name: 'Necklaces',
                imageUrl: '/subcategory/jewelry/necklaces.png',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Length', type: 'text', unit: 'inches' },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Wedding', 'Party', 'Daily'] },
                    { name: 'Gender', type: 'dropdown', options: ['Women', 'Men', 'Unisex'] }
                ],
            },
            {
                name: 'Earrings',
                imageUrl: '/subcategory/jewelry/earrings.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Studs', 'Hoops', 'Jhumkas', 'Drops'] },
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Occasion', type: 'dropdown', options: ['Casual', 'Wedding', 'Party', 'Daily'] },
                    { name: 'Closure Type', type: 'dropdown', options: ['Push Back', 'Screw Back', 'Clip On'] }
                ],
            },
            {
                name: 'Bracelets',
                imageUrl: '/subcategory/jewelry/bracelets.png',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Leather', 'Beads'] },
                    { name: 'Size', type: 'text', unit: 'cm' },
                    { name: 'Gender', type: 'dropdown', options: ['Men', 'Women', 'Unisex'] },
                    { name: 'Clasp Type', type: 'dropdown', options: ['Toggle', 'Lobster', 'Magnetic'] }
                ],
            },
            {
                name: 'Rings',
                imageUrl: '/subcategory/jewelry/rings.png',
                fields: [
                    { name: 'Material', type: 'dropdown', options: ['Gold', 'Silver', 'Platinum', 'Artificial'] },
                    { name: 'Size', type: 'text', unit: 'US Size' },
                    { name: 'Style', type: 'dropdown', options: ['Engagement', 'Wedding', 'Casual', 'Statement'] },
                    { name: 'Stone Type', type: 'dropdown', options: ['Diamond', 'CZ', 'None', 'Gemstone'] }
                ],
            },
            {
                name: 'Hair Accessories',
                imageUrl: '/subcategory/jewelry/hair.png',
                fields: [
                    { name: 'Type', type: 'dropdown', options: ['Clips', 'Bands', 'Headbands', 'Scrunchies'] },
                    { name: 'Material', type: 'dropdown', options: ['Plastic', 'Metal', 'Fabric'] },
                    { name: 'Color', type: 'text' }
                ],
            },
            {
                name: 'Brooches & Pins',
                imageUrl: '/subcategory/jewelry/brooches.png',
                fields: [
                    { name: 'Design Type', type: 'dropdown', options: ['Floral', 'Animal', 'Geometric', 'Traditional'] },
                    { name: 'Material', type: 'dropdown', options: ['Metal', 'Alloy', 'Artificial'] },
                    { name: 'Occasion', type: 'dropdown', options: ['Formal', 'Festive', 'Casual'] }
                ],
            },
            {
                name: 'Premium Watches',
                imageUrl: '/subcategory/jewelry/premium-watch.png',
                fields: [
                    { name: 'Watch Type', type: 'dropdown', options: ['Analog', 'Digital', 'Chronograph'] },
                    { name: 'Strap Material', type: 'dropdown', options: ['Leather', 'Stainless Steel', 'Silicone'] },
                    { name: 'Dial Size', type: 'text', unit: 'mm' },
                    { name: 'Water Resistant', type: 'dropdown', options: ['Yes', 'No'] }
                ],
            },
        ],
    },
    {
        name: 'Footwear',
        subcategories: [
            {
                name: "Men's Footwear",
                imageUrl: '/subcategory/footwear/mens.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Brown', 'White', 'Blue', 'Grey'] },
                    { name: 'Material', type: 'dropdown', options: ['Leather', 'Synthetic', 'Canvas'] },
                ],
            },
            {
                name: "Women's Footwear",
                imageUrl: '/subcategory/footwear/womens.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['4', '5', '6', '7', '8', '9'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Red', 'Beige', 'Pink', 'Blue'] },
                    { name: 'Heel Height', type: 'text', unit: 'inches' },
                ],
            },
            {
                name: "Kids' Footwear",
                imageUrl: '/subcategory/footwear/kids.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['1', '2', '3', '4', '5'] },
                    { name: 'Color', type: 'dropdown', options: ['Blue', 'Pink', 'Green', 'Yellow'] },
                    { name: 'Closure Type', type: 'dropdown', options: ['Velcro', 'Lace-Up', 'Slip-On'] },
                ],
            },
            {
                name: 'Sports Shoes',
                imageUrl: '/subcategory/footwear/sports.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Red', 'Blue', 'Grey'] },
                    { name: 'Sport Type', type: 'dropdown', options: ['Running', 'Training', 'Walking'] },
                ],
            },
            {
                name: 'Sandals & Flip Flops',
                imageUrl: '/subcategory/footwear/sandals.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10'] },
                    { name: 'Color', type: 'dropdown', options: ['Brown', 'Black', 'Blue'] },
                    { name: 'Material', type: 'dropdown', options: ['Rubber', 'Leather', 'Synthetic'] },
                ],
            },
            {
                name: 'Formal Shoes',
                imageUrl: '/subcategory/footwear/formal-shoes.png',
                fields: [
                    { name: 'Size', type: 'dropdown', options: ['6', '7', '8', '9', '10', '11'] },
                    { name: 'Color', type: 'dropdown', options: ['Black', 'Brown', 'Tan'] },
                    { name: 'Toe Style', type: 'dropdown', options: ['Pointed', 'Round', 'Square'] },
                ],
            },
        ],
    },
    {
        name: 'Tools & Hardware',
        subcategories: [
            {
                name: 'Power Tools',
                imageUrl: '/subcategory/tools&hardware/power.png',
                fields: [
                    { name: 'Tool Type', type: 'dropdown', options: ['Drill Machine', 'Angle Grinder', 'Heat Gun', 'Jigsaw', 'Screwdriver'] },
                    { name: 'Power Source', type: 'dropdown', options: ['Corded', 'Cordless'] },
                    { name: 'Voltage', type: 'text', unit: 'V' },
                    { name: 'Wattage', type: 'text', unit: 'W' },
                    { name: 'Speed Settings', type: 'text' }
                ],
            },
            {
                name: 'Hand Tools',
                imageUrl: '/subcategory/tools&hardware/hand.png',
                fields: [
                    { name: 'Tool Type', type: 'dropdown', options: ['Hammer', 'Wrench', 'Screwdriver Set', 'Pliers', 'Measuring Tape'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Size', type: 'text' },
                    { name: 'Weight', type: 'text', unit: 'kg' }
                ],
            },
            {
                name: 'Safety Equipment',
                imageUrl: '/subcategory/tools&hardware/safety.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Safety Helmet', 'Gloves', 'Safety Goggles', 'Safety Shoes', 'Ear Protection'] },
                    { name: 'Size', type: 'dropdown', options: ['S', 'M', 'L', 'XL'] },
                    { name: 'Material', type: 'text' },
                    { name: 'Compliance Standard', type: 'text' }
                ],
            },
            {
                name: 'Plumbing',
                imageUrl: '/subcategory/tools&hardware/plumbing.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Pipes', 'Fittings', 'Taps', 'Valves', 'Connectors'] },
                    { name: 'Material', type: 'dropdown', options: ['PVC', 'CPVC', 'Brass', 'Stainless Steel'] },
                    { name: 'Size', type: 'text' },
                    { name: 'Length', type: 'text', unit: 'ft' }
                ],
            },
            {
                name: 'Electrical Supplies',
                imageUrl: '/subcategory/tools&hardware/electrical.png',
                fields: [
                    { name: 'Product Type', type: 'dropdown', options: ['Switches', 'Sockets', 'Wires', 'MCB', 'Extension Boards'] },
                    { name: 'Current Rating', type: 'text', unit: 'A' },
                    { name: 'Voltage', type: 'text', unit: 'V' },
                    { name: 'Material', type: 'text' }
                ],
            },
            {
                name: 'Building Materials',
                imageUrl: '/subcategory/tools&hardware/building.png',
                fields: [
                    { name: 'Material Type', type: 'dropdown', options: ['Cement', 'Bricks', 'Steel', 'Paint', 'Tiles'] },
                    { name: 'Grade/Specification', type: 'text' },
                    { name: 'Weight', type: 'text', unit: 'kg' },
                    { name: 'Color', type: 'text' }
                ],
            },
        ],
    }
];


// Category for fashion page
export const fashionCategories = [
    {
        name: "Men's Clothing",
        slug: "mens-clothing",
        image: "/images/fashion/men-fashion.png",
    },
    {
        name: "Women's Clothing",
        slug: "womens-clothing",
        image: "/images/fashion/women-fashion.png",
    },
    {
        name: "Kid's Clothing",
        slug: "kids-clothing",
        image: "/images/fashion/kid-fashion.png",
    },
    {
        name: "Shoes",
        slug: "shoes",
        image: "/images/fashion/footware.png",
    },
    {
        name: "Bags",
        slug: "bags",
        image: "/images/fashion/bags.png",
    },
    {
        name: "Jewellery",
        slug: "jewellery",
        image: "/images/fashion/jewellery.png",
    },
    {
        name: "Watches",
        slug: "watches",
        image: "/images/fashion/watch-fashion.png",
    },
    {
        name: "Beauty",
        slug: "beauty",
        image: "/images/fashion/beauty.png",
    },
    {
        name: "Handbags",
        slug: "handbags",
        image: "/images/fashion/handbags.png",
    },
    {
        name: "Sunglasses",
        slug: "sunglasses",
        image: "/images/fashion/eyeware.png",
    },
];

// Maps URL slugs to actual subcategory names in the database
export const fashionSlugMap = {
    "mens-clothing": "Men's Clothing",
    "womens-clothing": "Women's Clothing",
    "kids-clothing": "Kid's Clothing",
    "kids-fashion": "Kids' Clothing",
    "shoes": "Shoes",
    "bags": "Bags",
    "jewellery": "Jewellery",
    "watches": "Watches",
    "beauty": "Beauty",
    "handbags": "Handbags",
    "sunglasses": "Sunglasses",
};

// Utility function to generate slugs
export const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};


// Category image 
export const categoryImages = {
    "Electronics": "/category/electronics.png",
    "Fashion & Apparel": "/category/fashion.png",
    "Home & Kitchen": "/category/home.png",
    "Beauty & Personal Care": "/category/beauty.png",
    "Health & Wellness": "/category/health.png",
    "Sports & Outdoors": "/category/sports.png",
    "Automotive": "/category/automotive.png",
    "Books & Stationery": "/category/books.png",
    "Toys & Games": "/category/toys.png",
    "Baby Products": "/category/baby.png",
    "Groceries & Gourmet": "/category/groceries.png",
    "Pet Supplies": "/category/pets.png",
    "Office Supplies": "/category/office.png",
    "Jewelry & Accessories": "/category/jewelry.png",
    "Footwear": "/category/footwear.png",
    "Tools & Hardware": "/category/tools.png",
    "Furniture & Decor": "/category/furniture.png",
    "Mobile Phones & Accessories": "/category/mobile.png",
    "Laptops & Computers": "/category/laptops.png",
    "Watches & Wearables": "/category/watches.png",
}