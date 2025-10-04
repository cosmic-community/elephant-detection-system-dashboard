import Link from 'next/link'
import { Camera, Users, Activity, Plus } from 'lucide-react'

interface QuickLinksProps {
  elephantCount: number;
  cameraCount: number;
}

export default function QuickLinks({ elephantCount, cameraCount }: QuickLinksProps) {
  const links = [
    {
      title: 'View All Detections',
      description: 'Browse all detection events',
      icon: Activity,
      href: '/detections',
      color: 'bg-blue-500',
    },
    {
      title: 'Elephant Profiles',
      description: `${elephantCount} identified elephants`,
      icon: Users,
      href: '/elephants',
      color: 'bg-green-500',
    },
    {
      title: 'Camera Stations',
      description: `${cameraCount} monitoring stations`,
      icon: Camera,
      href: '/cameras',
      color: 'bg-purple-500',
    },
    {
      title: 'Add New Detection',
      description: 'Manually log detection event',
      icon: Plus,
      href: '/detections/new',
      color: 'bg-orange-500',
    },
  ]
  
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>
      <div className="card-body space-y-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-gray-50 transition-all group"
            >
              <div className={`${link.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{link.title}</p>
                <p className="text-sm text-gray-600">{link.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}