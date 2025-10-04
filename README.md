# Elephant Detection System Dashboard

A comprehensive React dashboard for managing a visual-based intelligent elephant detection system with integrated camera monitoring, elephant profile management, and real-time detection tracking.

![Dashboard Preview](https://imgix.cosmicjs.com/6d6cb650-a11d-11f0-9e7e-e7d9684cb0a9-photo-1611348586804-61bf6c080437-1759580819485.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## Features

- 📸 **Real-Time Detection Dashboard** - Monitor elephant detections as they happen with confidence scores and verification status
- 🐘 **Elephant Profile Database** - Comprehensive management of individual elephant profiles with identification tracking
- 📷 **Camera Station Network** - Overview and management of all monitoring camera stations
- 🔍 **Advanced Filtering** - Filter detection events by status, camera station, and identified elephants
- ✏️ **Full CRUD Operations** - Create, update, and manage all detection events, elephant profiles, and camera stations
- 📊 **Analytics Dashboard** - Overview statistics including total detections, verified events, and active cameras
- 🖼️ **Image Galleries** - View and manage multiple images for each detection event and elephant profile
- 📱 **Responsive Design** - Fully responsive interface optimized for desktop, tablet, and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e1119f260d9dd939d1bb79&clone_repository=68e11365260d9dd939d1bb91)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "i need to create a app for visual based intelligent elpehant detection system using integrated camera"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic headless CMS
- **Package Manager**: Bun
- **Image Optimization**: Imgix integration
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Detection Events with Related Data

```typescript
const response = await cosmic.objects
  .find({
    type: 'detection-events'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const events = response.objects as DetectionEvent[]
```

### Creating a New Detection Event

```typescript
const newEvent = await cosmic.objects.insertOne({
  type: 'detection-events',
  title: 'New Detection at Waterhole',
  metadata: {
    detection_time: new Date().toISOString(),
    location: 'North Waterhole - 1.2345, 36.7890',
    confidence_score: 95,
    alert_status: 'New',
    camera_station: cameraStationId,
    notes: 'Clear visibility, single adult elephant'
  }
})
```

### Updating Detection Status

```typescript
await cosmic.objects.updateOne(detectionId, {
  metadata: {
    alert_status: 'Verified'
  }
})
```

## Cosmic CMS Integration

This dashboard integrates with three main content types in your Cosmic bucket:

### Detection Events
- Real-time elephant detection records
- Includes captured images, confidence scores, and verification status
- Links to camera stations and identified elephants

### Elephant Profiles
- Individual elephant identification records
- Physical characteristics, age estimates, and gender tracking
- Photo galleries and sighting history

### Camera Stations
- Network of monitoring cameras
- Location coordinates and installation dates
- Operational status tracking

All content types use the Cosmic SDK with depth queries to automatically fetch related objects, providing seamless access to connected data without additional queries.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Environment Variables

Required environment variables for deployment:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (required for CRUD operations)

<!-- README_END -->