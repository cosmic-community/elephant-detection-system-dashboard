import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all detection events with related data
export async function getDetectionEvents() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'detection-events'
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const events = response.objects;
    
    // Manual sorting by detection time (newest first)
    return events.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.detection_time || '').getTime();
      const dateB = new Date(b.metadata?.detection_time || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch detection events');
  }
}

// Fetch single detection event
export async function getDetectionEvent(id: string) {
  try {
    const response = await cosmic.objects.findOne({
      id
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch detection event');
  }
}

// Fetch all elephant profiles
export async function getElephantProfiles() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'elephant-profiles'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch elephant profiles');
  }
}

// Fetch single elephant profile
export async function getElephantProfile(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'elephant-profiles',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch elephant profile');
  }
}

// Fetch all camera stations
export async function getCameraStations() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'camera-stations'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch camera stations');
  }
}

// Fetch single camera station
export async function getCameraStation(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'camera-stations',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch camera station');
  }
}

// Update detection event status
export async function updateDetectionStatus(id: string, status: string) {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: {
        alert_status: status
      }
    });
    
    return response.object;
  } catch (error) {
    throw new Error('Failed to update detection status');
  }
}

// Update elephant sighting count
export async function updateElephantSightings(id: string, count: number) {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: {
        total_sightings: count
      }
    });
    
    return response.object;
  } catch (error) {
    throw new Error('Failed to update sighting count');
  }
}