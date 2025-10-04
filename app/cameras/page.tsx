import { getCameraStations } from '@/lib/cosmic'
import DashboardHeader from '@/components/DashboardHeader'
import Link from 'next/link'
import { MapPin, Calendar, Activity } from 'lucide-react'

export const revalidate = 60

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'active':
      return 'badge-success'
    case 'maintenance':
      return 'badge-warning'
    case 'offline':
      return 'badge-danger'
    default:
      return 'badge-info'
  }
}

export default async function CamerasPage() {
  const cameraStations = await getCameraStations()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Camera Stations
          </h1>
          <p className="text-gray-600">
            {cameraStations.length} monitoring stations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cameraStations.map((station: any) => {
            const stationImage = station.metadata?.station_image
            const status = station.metadata?.status
            const coordinates = station.metadata?.location_coordinates
            const installDate = station.metadata?.installation_date
            
            return (
              <Link
                key={station.id}
                href={`/cameras/${station.slug}`}
                className="card hover:shadow-lg transition-shadow"
              >
                {stationImage && (
                  <img
                    src={`${stationImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                    alt={station.title}
                    width="400"
                    height="200"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {station.title}
                    </h3>
                    {status && (
                      <span className={`badge ${getStatusBadgeClass(status.key)}`}>
                        {status.value}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {coordinates && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{coordinates}</span>
                      </div>
                    )}
                    
                    {installDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Installed: {new Date(installDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {station.metadata?.coverage_area && (
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 mt-0.5" />
                        <span className="flex-1">{station.metadata.coverage_area}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        
        {cameraStations.length === 0 && (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-gray-500">No camera stations found</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}