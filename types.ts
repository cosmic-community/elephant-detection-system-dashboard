// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Camera Station type
export interface CameraStation extends CosmicObject {
  type: 'camera-stations';
  metadata: {
    station_name: string;
    location_coordinates: string;
    installation_date?: string;
    status: {
      key: string;
      value: string;
    };
    coverage_area?: string;
    station_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Elephant Profile type
export interface ElephantProfile extends CosmicObject {
  type: 'elephant-profiles';
  metadata: {
    elephant_id: string;
    physical_characteristics?: string;
    estimated_age?: {
      key: string;
      value: string;
    };
    gender?: string;
    total_sightings?: number;
    profile_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    additional_notes?: string;
  };
}

// Detection Event type
export interface DetectionEvent extends CosmicObject {
  type: 'detection-events';
  metadata: {
    detection_time: string;
    location: string;
    confidence_score: number;
    captured_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    alert_status: {
      key: string;
      value: string;
    };
    camera_station?: CameraStation;
    identified_elephant?: ElephantProfile;
    notes?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isDetectionEvent(obj: CosmicObject): obj is DetectionEvent {
  return obj.type === 'detection-events';
}

export function isElephantProfile(obj: CosmicObject): obj is ElephantProfile {
  return obj.type === 'elephant-profiles';
}

export function isCameraStation(obj: CosmicObject): obj is CameraStation {
  return obj.type === 'camera-stations';
}

// Alert status types
export type AlertStatus = 'New' | 'Reviewed' | 'Verified' | 'False Positive';

// Camera status types
export type CameraStatus = 'Active' | 'Maintenance' | 'Offline';

// Age category types
export type AgeCategory = 'Calf (0-5 years)' | 'Juvenile (5-15 years)' | 'Adult (15+ years)';

// Gender types
export type Gender = 'Male' | 'Female' | 'Unknown';