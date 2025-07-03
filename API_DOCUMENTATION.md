# Image Annotation Tool - API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the Image Annotation Tool.

## Table of Contents

1. [Overview](#overview)
2. [ImageAnnotator Class](#imageannotator-class)
3. [Public Methods](#public-methods)
4. [DOM Interface](#dom-interface)
5. [Event Handlers](#event-handlers)
6. [CSS Classes & Styling](#css-classes--styling)
7. [Usage Examples](#usage-examples)
8. [Integration Guide](#integration-guide)
9. [Error Handling](#error-handling)
10. [Browser Compatibility](#browser-compatibility)

## Overview

The Image Annotation Tool is a pure frontend JavaScript application that enables users to upload images and create bounding box annotations. It supports multiple annotation types (point, box, or combined) and provides real-time coordinate validation.

### Key Features
- **File Upload**: Drag & drop or click-to-upload image files
- **Multiple Input Formats**: Support for various coordinate input formats
- **Real-time Validation**: Live coordinate validation and preview
- **Multiple Annotation Types**: Point, box, or combined annotations
- **Customizable Styling**: Color selection and responsive design
- **Download Functionality**: Export annotated images

---

## ImageAnnotator Class

### Constructor

```javascript
new ImageAnnotator()
```

Creates a new instance of the ImageAnnotator class and automatically initializes event binding.

**Parameters:** None

**Returns:** `ImageAnnotator` instance

**Example:**
```javascript
const annotator = new ImageAnnotator();
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `uploadedImage` | `Image \| null` | The currently uploaded image element |
| `annotatedCanvas` | `HTMLCanvasElement \| null` | Canvas element containing the annotated image |

---

## Public Methods

### Core Methods

#### `init()`

Initializes the ImageAnnotator instance and sets up event bindings.

```javascript
annotator.init()
```

**Parameters:** None  
**Returns:** `void`

---

#### `bindEvents()`

Binds all necessary event listeners to DOM elements.

```javascript
annotator.bindEvents()
```

**Parameters:** None  
**Returns:** `void`

**Events Bound:**
- Upload zone click/drag/drop events
- File input change events
- Coordinate input events
- Button click events

---

### File Handling Methods

#### `handleFile(file)`

Processes an uploaded image file and validates the file type.

```javascript
annotator.handleFile(file)
```

**Parameters:**
- `file` (File): The image file to process

**Returns:** `void`

**Supported Formats:** JPG, PNG, GIF

**Example:**
```javascript
const fileInput = document.getElementById('imageInput');
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        annotator.handleFile(e.target.files[0]);
    }
});
```

---

#### `handleFileSelect(event)`

Event handler for file input change events.

```javascript
annotator.handleFileSelect(event)
```

**Parameters:**
- `event` (Event): The file input change event

**Returns:** `void`

---

#### `handleDragOver(event)`

Handles dragover events for the upload zone.

```javascript
annotator.handleDragOver(event)
```

**Parameters:**
- `event` (DragEvent): The dragover event

**Returns:** `void`

---

#### `handleDragLeave(event)`

Handles dragleave events for the upload zone.

```javascript
annotator.handleDragLeave(event)
```

**Parameters:**
- `event` (DragEvent): The dragleave event

**Returns:** `void`

---

#### `handleDrop(event)`

Handles drop events for the upload zone.

```javascript
annotator.handleDrop(event)
```

**Parameters:**
- `event` (DragEvent): The drop event

**Returns:** `void`

---

### Display Methods

#### `showImagePreview(src)`

Displays the uploaded image preview with metadata information.

```javascript
annotator.showImagePreview(src)
```

**Parameters:**
- `src` (string): The image data URL or source path

**Returns:** `void`

**Generated Elements:**
- Image preview with max dimensions (300px × 200px)
- Image metadata (dimensions, coordinate range info)
- Upload status indicator

---

### Coordinate Processing Methods

#### `parseBboxString()`

Parses the bbox coordinate string and updates individual coordinate inputs.

```javascript
annotator.parseBboxString()
```

**Parameters:** None  
**Returns:** `void`

**Supported Formats:**
- Space-separated: `"100 50 200 150"`
- Comma-separated: `"100,50,200,150"`
- Semicolon-separated: `"100;50;200;150"`
- Mixed separators: `"100, 50; 200 150"`

**Example:**
```javascript
// Automatically called when bboxString input changes
document.getElementById('bboxString').value = "100 50 200 150";
// Triggers parseBboxString() and updates x1, y1, x2, y2 inputs
```

---

#### `updateBboxString()`

Updates the bbox coordinate string based on individual coordinate inputs.

```javascript
annotator.updateBboxString()
```

**Parameters:** None  
**Returns:** `void`

---

#### `updateCoordsPreview()`

Updates the coordinate preview display with calculated metadata.

```javascript
annotator.updateCoordsPreview()
```

**Parameters:** None  
**Returns:** `void`

**Preview Information:**
- Coordinate validation status
- Corner points (top-left, bottom-right)
- Center point coordinates
- Bounding box dimensions (width, height)
- Area calculation

---

#### `validateInputs()`

Validates all input coordinates and image requirements.

```javascript
const coords = annotator.validateInputs()
```

**Parameters:** None

**Returns:** 
- `Object` with coordinates `{x1, y1, x2, y2}` if valid
- `false` if validation fails

**Validation Checks:**
- Image upload requirement
- Numeric coordinate values
- Coordinate range validation
- Logical coordinate relationships

**Example:**
```javascript
const coords = annotator.validateInputs();
if (coords) {
    console.log(`Valid coordinates: (${coords.x1}, ${coords.y1}) to (${coords.x2}, ${coords.y2})`);
} else {
    console.log('Validation failed');
}
```

---

### Image Processing Methods

#### `processImage()`

Main processing method that generates annotated images.

```javascript
await annotator.processImage()
```

**Parameters:** None  
**Returns:** `Promise<void>`

**Process Flow:**
1. Validates inputs
2. Shows loading state
3. Creates annotated image
4. Displays results
5. Hides loading state

---

#### `createAnnotatedImage(coords, annotationType, boxColor)`

Creates an annotated version of the uploaded image using Canvas API.

```javascript
const dataUrl = annotator.createAnnotatedImage(coords, annotationType, boxColor)
```

**Parameters:**
- `coords` (Object): Coordinate object `{x1, y1, x2, y2}`
- `annotationType` (string): Annotation type (`'point'`, `'box'`, or `'both'`)
- `boxColor` (string): Hex color code for annotations

**Returns:** `string` - Data URL of the annotated image

**Annotation Types:**

1. **Point Annotation (`'point'`)**:
   - Center point marker with crosshairs
   - Coordinate label
   - Responsive sizing based on image dimensions

2. **Box Annotation (`'box'`)**:
   - Bounding box rectangle
   - Semi-transparent fill
   - Corner coordinate labels

3. **Combined Annotation (`'both'`)**:
   - Both point and box annotations

**Example:**
```javascript
const coords = {x1: 100, y1: 50, x2: 200, y2: 150};
const annotatedDataUrl = annotator.createAnnotatedImage(
    coords, 
    'both', 
    '#ff0000'
);
```

---

### Result Display Methods

#### `showResults(originalSrc, annotatedSrc)`

Displays the original and annotated images side by side.

```javascript
annotator.showResults(originalSrc, annotatedSrc)
```

**Parameters:**
- `originalSrc` (string): Original image data URL
- `annotatedSrc` (string): Annotated image data URL

**Returns:** `void`

**Features:**
- Side-by-side image comparison
- Responsive layout
- Smooth scroll to results
- Download button activation

---

### Utility Methods

#### `downloadImage()`

Downloads the annotated image as a PNG file.

```javascript
annotator.downloadImage()
```

**Parameters:** None  
**Returns:** `void`

**Download Features:**
- Automatic filename generation with timestamp
- PNG format export
- Blob-based download mechanism

**Generated Filename Format:** `annotated_image_[timestamp].png`

---

#### `clearAll()`

Resets the entire application to its initial state.

```javascript
annotator.clearAll()
```

**Parameters:** None  
**Returns:** `void`

**Reset Operations:**
- Clear all coordinate inputs
- Reset file input
- Restore upload zone
- Hide result sections
- Clear internal state

---

## DOM Interface

### Required HTML Elements

The ImageAnnotator class expects the following HTML elements to be present:

#### Upload Elements
```html
<div id="uploadZone"><!-- Upload drop zone --></div>
<input type="file" id="imageInput" accept="image/*">
```

#### Coordinate Input Elements
```html
<input type="number" id="x1" placeholder="左上角X">
<input type="number" id="y1" placeholder="左上角Y">
<input type="number" id="x2" placeholder="右下角X">
<input type="number" id="y2" placeholder="右下角Y">
<input type="text" id="bboxString" placeholder="例如: 100 50 200 150">
```

#### Configuration Elements
```html
<select id="annotationType">
    <option value="both">点定位 + 框定位</option>
    <option value="point">仅点定位</option>
    <option value="box">仅框定位</option>
</select>
<input type="color" id="boxColor" value="#ff0000">
```

#### Control Elements
```html
<button id="processBtn">生成标注图片</button>
<button id="clearBtn">清除</button>
<button id="downloadBtn">下载标注图片</button>
```

#### Display Elements
```html
<div id="coordsPreview"><!-- Coordinate preview --></div>
<div id="coordsInfo"><!-- Coordinate information --></div>
<div id="loading"><!-- Loading indicator --></div>
<div id="resultSection"><!-- Results display --></div>
<div id="originalImageContainer"><!-- Original image --></div>
<div id="annotatedImageContainer"><!-- Annotated image --></div>
```

---

## Event Handlers

### Global Event Handlers

The application also includes global event handlers for enhanced user experience:

#### Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter: Quick process
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('processBtn').click();
    }
    
    // Escape: Clear all
    if (e.key === 'Escape') {
        document.getElementById('clearBtn').click();
    }
});
```

**Available Shortcuts:**
- `Ctrl + Enter`: Trigger image processing
- `Escape`: Clear all inputs and reset

---

## CSS Classes & Styling

### Core CSS Classes

#### `.upload-zone`
Upload area styling with drag-and-drop visual feedback.

```css
.upload-zone {
    border: 3px dashed #667eea;
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    background: rgba(102, 126, 234, 0.05);
    transition: all 0.3s;
    cursor: pointer;
}
```

**State Classes:**
- `.upload-zone:hover`: Hover state styling
- `.upload-zone.dragover`: Active drag state styling

#### `.preview-image`
Styling for image previews with responsive constraints.

```css
.preview-image {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
```

#### `.bbox-input`
Container styling for coordinate input sections.

```css
.bbox-input {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
```

#### `.coordinates-grid`
Grid layout for coordinate inputs.

```css
.coordinates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}
```

---

## Usage Examples

### Basic Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>Image Annotation Tool</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- Include all required HTML elements -->
    <div id="uploadZone">...</div>
    <!-- ... other elements ... -->
    
    <script src="script.js"></script>
    <script>
        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            const annotator = new ImageAnnotator();
        });
    </script>
</body>
</html>
```

### Programmatic Usage

```javascript
// Create annotator instance
const annotator = new ImageAnnotator();

// Programmatically set coordinates
document.getElementById('x1').value = 100;
document.getElementById('y1').value = 50;
document.getElementById('x2').value = 200;
document.getElementById('y2').value = 150;

// Update coordinate string
annotator.updateBboxString();

// Process image programmatically
annotator.processImage().then(() => {
    console.log('Image processing completed');
});
```

### Custom Event Handling

```javascript
const annotator = new ImageAnnotator();

// Listen for custom events
document.getElementById('processBtn').addEventListener('click', () => {
    console.log('Processing started');
});

// Override default behavior
const originalProcessImage = annotator.processImage;
annotator.processImage = async function() {
    console.log('Custom pre-processing logic');
    await originalProcessImage.call(this);
    console.log('Custom post-processing logic');
};
```

### Coordinate Format Examples

```javascript
// Different ways to input coordinates
const examples = [
    "100 50 200 150",        // Space-separated
    "100,50,200,150",        // Comma-separated
    "100;50;200;150",        // Semicolon-separated
    "100, 50; 200 150",      // Mixed separators
];

examples.forEach(coordString => {
    document.getElementById('bboxString').value = coordString;
    annotator.parseBboxString();
    console.log('Parsed coordinates:', {
        x1: document.getElementById('x1').value,
        y1: document.getElementById('y1').value,
        x2: document.getElementById('x2').value,
        y2: document.getElementById('y2').value
    });
});
```

### Custom Styling Integration

```javascript
// Create annotated image with custom styling
const coords = {x1: 100, y1: 50, x2: 200, y2: 150};
const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

customColors.forEach(color => {
    const annotatedDataUrl = annotator.createAnnotatedImage(
        coords, 
        'both', 
        color
    );
    console.log(`Generated annotation with color: ${color}`);
});
```

---

## Integration Guide

### Step 1: Include Dependencies

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome Icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Step 2: HTML Structure

Use the complete HTML structure from `index.html` or create a minimal version with required elements.

### Step 3: Initialize Application

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const annotator = new ImageAnnotator();
    
    // Optional: Add custom initialization logic
    console.log('Image Annotation Tool loaded');
});
```

### Step 4: Customization

Override default behaviors or add custom functionality:

```javascript
// Custom file validation
const originalHandleFile = ImageAnnotator.prototype.handleFile;
ImageAnnotator.prototype.handleFile = function(file) {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
    }
    originalHandleFile.call(this, file);
};
```

---

## Error Handling

### Input Validation Errors

```javascript
// File type validation
if (!file.type.startsWith('image/')) {
    alert('请选择有效的图片文件！');
    return;
}

// Coordinate validation
if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    alert('请输入有效的坐标值！');
    return false;
}
```

### Processing Errors

```javascript
try {
    const annotatedDataUrl = this.createAnnotatedImage(coords, annotationType, boxColor);
    this.showResults(this.uploadedImage.src, annotatedDataUrl);
} catch (error) {
    console.error('处理图片时出错:', error);
    alert('处理图片时出错，请重试！');
}
```

### Common Error Scenarios

1. **No Image Uploaded**
   - Error: "请先上传图片！"
   - Solution: Upload an image before processing

2. **Invalid Coordinates**
   - Error: "请输入有效的坐标值！"
   - Solution: Ensure all coordinate fields contain numeric values

3. **Coordinates Out of Range**
   - Warning: Prompts user with coordinate adjustment option
   - Solution: Coordinates are automatically clamped to image bounds

4. **Invalid File Type**
   - Error: "请选择有效的图片文件！"
   - Solution: Upload JPG, PNG, or GIF files only

---

## Browser Compatibility

### Minimum Requirements

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |

### Required APIs

- **Canvas API**: For image processing and annotation
- **FileReader API**: For file upload handling
- **Drag and Drop API**: For drag-and-drop functionality
- **ES6+ Features**: Classes, arrow functions, async/await

### Polyfill Recommendations

For older browser support, include:

```html
<!-- ES6 Polyfills -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

<!-- Canvas polyfills if needed -->
<script src="https://cdn.jsdelivr.net/npm/canvas-polyfill@1.0.0/canvas-polyfill.min.js"></script>
```

---

## Performance Considerations

### Image Size Optimization

- Large images are automatically scaled in preview (max 300×200px)
- Canvas processing maintains original image dimensions
- Consider implementing client-side image compression for very large files

### Memory Management

- Canvas elements are properly disposed after use
- Blob URLs are revoked after download
- Event listeners are bound once during initialization

### Responsive Performance

- CSS Grid and Flexbox for responsive layouts
- Hardware-accelerated transitions
- Optimized event handling with proper binding

---

This completes the comprehensive API documentation for the Image Annotation Tool. For additional support or feature requests, refer to the project README or submit an issue on the project repository.