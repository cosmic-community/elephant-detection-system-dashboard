import Link from 'next/link'
import { MapPin, Clock, TrendingUp } from 'lucide-react'
import { DetectionEvent } from '@/types'

interface DetectionEventsListProps {
  events: any[];
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'verified':
      return 'badge-success'
    case 'reviewed':
      return 'badge-info'
    case 'new':
      return 'badge-warning'
    case 'false_positive':
      return 'badge-danger'
    default:
      return 'badge-info'
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default function DetectionEventsList({ events }: DetectionEventsListProps) {
  if (!events || events.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Recent Detections</h2>
        </div>
        <div className="card-body">
          <p className="text-gray-500 text-center py-8">No detection events found</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Detections</h2>
        <Link href="/detections" className="text-primary hover:text-primary-hover text-sm font-medium">
          View All
        </Link>
      </div>
      <div className="divide-y divide-gray-200">
        {events.map((event: any) => {
          const firstImage = event.metadata?.captured_images?.[0]
          const status = event.metadata?.alert_status
          const station = event.metadata?.camera_station
          const elephant = event.metadata?.identified_elephant
          
          return (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                {firstImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={`${firstImage.imgix_url}?w=200&h=150&fit=crop&auto=format,compress`}
                      alt={event.title}
                      width="100"
                      height="75"
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <Link 
                      href={`/detections/${event.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary"
                    >
                      {event.title}
                    </Link>
                    {status && (
                      <span className={`badge ${getStatusBadgeClass(status.key)}`}>
                        {status.value}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    {station && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{station.title}</span>
                      </div>
                    )}
                    
                    {event.metadata?.detection_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(event.metadata.detection_time)}</span>
                      </div>
                    )}
                    
                    {event.metadata?.confidence_score && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{event.metadata.confidence_score}% Confidence</span>
                      </div>
                    )}
                  </div>
                  
                  {elephant && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Identified: </span>
                      <Link 
                        href={`/elephants/${elephant.slug}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {elephant.title}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}