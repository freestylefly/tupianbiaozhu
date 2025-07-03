# Image Annotation Tool - Quick Reference

Fast reference for developers working with the Image Annotation Tool.

## 🚀 Quick Start

```javascript
// Initialize the application
const annotator = new ImageAnnotator();

// Programmatically set coordinates
document.getElementById('x1').value = 100;
document.getElementById('y1').value = 50;
document.getElementById('x2').value = 200;
document.getElementById('y2').value = 150;

// Process image
await annotator.processImage();
```

## 📦 Essential APIs

### Core Methods

```javascript
// File handling
annotator.handleFile(file)                    // Process uploaded file
annotator.validateInputs()                    // Validate coordinates -> {x1,y1,x2,y2} | false

// Image processing
await annotator.processImage()                // Generate annotated image
annotator.createAnnotatedImage(coords, type, color) // Create annotation -> dataURL

// Utility
annotator.downloadImage()                     // Download annotated image
annotator.clearAll()                         // Reset application
```

### Coordinate Parsing

```javascript
// Parse coordinate string to individual inputs
annotator.parseBboxString()                   // Auto-called on input

// Update coordinate string from individual inputs  
annotator.updateBboxString()                  // Auto-called on input change

// Preview coordinates with validation
annotator.updateCoordsPreview()              // Shows validation status
```

## 🎛️ Required HTML Elements

### Minimal Setup

```html
<!-- Upload -->
<div id="uploadZone">Click or drag to upload</div>
<input type="file" id="imageInput" accept="image/*" style="display: none;">

<!-- Coordinates -->
<input type="number" id="x1" placeholder="X1">
<input type="number" id="y1" placeholder="Y1">
<input type="number" id="x2" placeholder="X2">
<input type="number" id="y2" placeholder="Y2">
<input type="text" id="bboxString" placeholder="100 50 200 150">

<!-- Configuration -->
<select id="annotationType">
    <option value="both">Point + Box</option>
    <option value="point">Point Only</option>
    <option value="box">Box Only</option>
</select>
<input type="color" id="boxColor" value="#ff0000">

<!-- Controls -->
<button id="processBtn">Process</button>
<button id="clearBtn">Clear</button>
<button id="downloadBtn">Download</button>

<!-- Display -->
<div id="loading" style="display: none;">Processing...</div>
<div id="resultSection" style="display: none;">
    <div id="originalImageContainer"></div>
    <div id="annotatedImageContainer"></div>
</div>
<div id="coordsPreview" style="display: none;">
    <div id="coordsInfo"></div>
</div>
```

## 🎨 Key CSS Classes

```css
/* Core styling */
.upload-zone { /* Upload area */ }
.upload-zone.dragover { /* Active drag state */ }
.bbox-input { /* Coordinate input container */ }
.coordinates-grid { /* Grid layout for inputs */ }
.preview-image { /* Image display */ }
.result-section { /* Results container */ }

/* States */
.loading { display: none; } /* Hidden by default */
.dragover { /* Enhanced styling during drag */ }
```

## 🔧 Common Code Patterns

### Custom File Validation

```javascript
const originalHandleFile = ImageAnnotator.prototype.handleFile;
ImageAnnotator.prototype.handleFile = function(file) {
    // Custom validation
    if (file.size > 10 * 1024 * 1024) {
        alert('File too large');
        return;
    }
    originalHandleFile.call(this, file);
};
```

### Programmatic Coordinate Setting

```javascript
function setCoordinates(x1, y1, x2, y2) {
    document.getElementById('x1').value = x1;
    document.getElementById('y1').value = y1;
    document.getElementById('x2').value = x2;
    document.getElementById('y2').value = y2;
    annotator.updateBboxString();
    annotator.updateCoordsPreview();
}

// Usage
setCoordinates(100, 50, 200, 150);
```

### Custom Event Handling

```javascript
// Listen for processing completion
const originalShowResults = annotator.showResults;
annotator.showResults = function(originalSrc, annotatedSrc) {
    originalShowResults.call(this, originalSrc, annotatedSrc);
    // Custom logic after results shown
    console.log('Annotation completed');
};
```

### Batch Processing

```javascript
async function processMultipleCoordinates(image, coordinatesList) {
    const results = [];
    
    for (const coords of coordinatesList) {
        setCoordinates(coords.x1, coords.y1, coords.x2, coords.y2);
        await annotator.processImage();
        
        // Get result
        const annotatedDataUrl = annotator.annotatedCanvas.toDataURL();
        results.push({
            coords,
            result: annotatedDataUrl
        });
    }
    
    return results;
}
```

## 📝 Coordinate Formats

### Input Formats (all supported)

```javascript
"100 50 200 150"          // Space-separated
"100,50,200,150"          // Comma-separated  
"100;50;200;150"          // Semicolon-separated
"100, 50; 200 150"        // Mixed separators
```

### Validation Response

```javascript
const coords = annotator.validateInputs();
if (coords) {
    // coords = {x1: 100, y1: 50, x2: 200, y2: 150}
} else {
    // Validation failed
}
```

## ⚙️ Configuration Options

### Annotation Types

```javascript
document.getElementById('annotationType').value = 'both';  // Point + Box
document.getElementById('annotationType').value = 'point'; // Point only
document.getElementById('annotationType').value = 'box';   // Box only
```

### Colors

```javascript
document.getElementById('boxColor').value = '#ff0000';     // Red
document.getElementById('boxColor').value = '#00ff00';     // Green
document.getElementById('boxColor').value = '#0000ff';     // Blue
```

## 🎯 Event Handlers

### Built-in Events

```javascript
// File upload events (auto-bound)
uploadZone.addEventListener('click', () => imageInput.click());
uploadZone.addEventListener('drop', annotator.handleDrop.bind(annotator));

// Coordinate input events (auto-bound)
document.getElementById('bboxString').addEventListener('input', 
    annotator.parseBboxString.bind(annotator));

// Button events (auto-bound)
document.getElementById('processBtn').addEventListener('click', 
    annotator.processImage.bind(annotator));
```

### Global Shortcuts

```javascript
// Ctrl+Enter: Process image
// Escape: Clear all
// (automatically bound)
```

## 🚨 Error Handling

### Common Errors

```javascript
// No image uploaded
if (!annotator.uploadedImage) {
    alert('Please upload an image first');
}

// Invalid coordinates
const coords = annotator.validateInputs();
if (!coords) {
    alert('Invalid coordinates');
}

// File type validation
if (!file.type.startsWith('image/')) {
    alert('Invalid file type');
}
```

### Try-Catch Pattern

```javascript
try {
    await annotator.processImage();
} catch (error) {
    console.error('Processing failed:', error);
    alert('Processing failed. Please try again.');
}
```

## 🔗 Dependencies

### Required CDNs

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
```

## 💡 Performance Tips

```javascript
// Optimize for large images
const MAX_PREVIEW_SIZE = {width: 300, height: 200};

// Memory cleanup
annotator.clearAll(); // Clears canvas references

// Efficient coordinate updates
// Batch coordinate changes to avoid multiple preview updates
```

## 🔍 Debugging

### Console Logging

```javascript
// Enable detailed logging
console.log('Image loaded:', annotator.uploadedImage);
console.log('Validation result:', annotator.validateInputs());
console.log('Canvas created:', annotator.annotatedCanvas);
```

### State Inspection

```javascript
// Check current state
console.log({
    hasImage: !!annotator.uploadedImage,
    hasCanvas: !!annotator.annotatedCanvas,
    coordinates: {
        x1: document.getElementById('x1').value,
        y1: document.getElementById('y1').value,
        x2: document.getElementById('x2').value,
        y2: document.getElementById('y2').value
    }
});
```

---

📚 **For detailed documentation see:**
- [Complete API Reference](./API_DOCUMENTATION.md)
- [Component Documentation](./COMPONENT_DOCUMENTATION.md)
- [Documentation Index](./DOCUMENTATION_INDEX.md)