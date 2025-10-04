import { Activity, CheckCircle, Camera, Users } from 'lucide-react'

interface StatsCardsProps {
  totalDetections: number;
  verifiedDetections: number;
  activeCameras: number;
  totalElephants: number;
}

export default function StatsCards({
  totalDetections,
  verifiedDetections,
  activeCameras,
  totalElephants
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Total Detections',
      value: totalDetections,
      icon: Activity,
      color: 'bg-blue-500',
    },
    {
      label: 'Verified Events',
      value: verifiedDetections,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Active Cameras',
      value: activeCameras,
      icon: Camera,
      color: 'bg-purple-500',
    },
    {
      label: 'Identified Elephants',
      value: totalElephants,
      icon: Users,
      color: 'bg-orange-500',
    },
  ]
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}