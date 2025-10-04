import { getElephantProfiles } from '@/lib/cosmic'
import DashboardHeader from '@/components/DashboardHeader'
import Link from 'next/link'

export const revalidate = 60

export default async function ElephantsPage() {
  const elephantProfiles = await getElephantProfiles()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Elephant Profiles
          </h1>
          <p className="text-gray-600">
            {elephantProfiles.length} identified elephants in the database
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elephantProfiles.map((elephant: any) => {
            const firstImage = elephant.metadata?.profile_images?.[0]
            const age = elephant.metadata?.estimated_age?.value
            const gender = elephant.metadata?.gender
            const sightings = elephant.metadata?.total_sightings
            
            return (
              <Link
                key={elephant.id}
                href={`/elephants/${elephant.slug}`}
                className="card hover:shadow-lg transition-shadow"
              >
                {firstImage && (
                  <img
                    src={`${firstImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={elephant.title}
                    width="300"
                    height="200"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {elephant.title}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">ID:</span> {elephant.metadata?.elephant_id}
                    </p>
                    {age && (
                      <p>
                        <span className="font-medium">Age:</span> {age}
                      </p>
                    )}
                    {gender && (
                      <p>
                        <span className="font-medium">Gender:</span> {gender}
                      </p>
                    )}
                    {typeof sightings === 'number' && (
                      <p>
                        <span className="font-medium">Sightings:</span> {sightings}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        
        {elephantProfiles.length === 0 && (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-gray-500">No elephant profiles found</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}