import { getDetectionEvents } from '@/lib/cosmic'
import DashboardHeader from '@/components/DashboardHeader'
import DetectionEventsList from '@/components/DetectionEventsList'

export const revalidate = 30

export default async function DetectionsPage() {
  const detectionEvents = await getDetectionEvents()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Detection Events
          </h1>
          <p className="text-gray-600">
            {detectionEvents.length} total detection events
          </p>
        </div>
        
        <DetectionEventsList events={detectionEvents} />
      </main>
    </div>
  )
}