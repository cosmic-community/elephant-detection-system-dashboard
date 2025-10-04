import { getDetectionEvents, getElephantProfiles, getCameraStations } from '@/lib/cosmic'
import DashboardHeader from '@/components/DashboardHeader'
import StatsCards from '@/components/StatsCards'
import DetectionEventsList from '@/components/DetectionEventsList'
import QuickLinks from '@/components/QuickLinks'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [detectionEvents, elephantProfiles, cameraStations] = await Promise.all([
    getDetectionEvents(),
    getElephantProfiles(),
    getCameraStations()
  ])
  
  // Calculate statistics
  const totalDetections = detectionEvents.length
  const verifiedDetections = detectionEvents.filter((event: any) => 
    event.metadata?.alert_status?.key === 'verified'
  ).length
  const activeCameras = cameraStations.filter((station: any) => 
    station.metadata?.status?.key === 'active'
  ).length
  const totalElephants = elephantProfiles.length
  
  // Get recent detections (last 5)
  const recentDetections = detectionEvents.slice(0, 5)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Detection System Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor elephant detections, camera stations, and wildlife profiles
          </p>
        </div>
        
        <StatsCards 
          totalDetections={totalDetections}
          verifiedDetections={verifiedDetections}
          activeCameras={activeCameras}
          totalElephants={totalElephants}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <DetectionEventsList events={recentDetections} />
          </div>
          
          <div>
            <QuickLinks 
              elephantCount={totalElephants}
              cameraCount={cameraStations.length}
            />
          </div>
        </div>
      </main>
    </div>
  )
}