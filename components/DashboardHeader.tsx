import Link from 'next/link'
import { Camera, Users, Activity } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Elephant Detection
                </h1>
                <p className="text-xs text-gray-500">Monitoring System</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Link 
              href="/detections" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>Detections</span>
            </Link>
            <Link 
              href="/elephants" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Elephants</span>
            </Link>
            <Link 
              href="/cameras" 
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Cameras</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}