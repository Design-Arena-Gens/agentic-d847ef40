'use client'

import { useState } from 'react'
import { Bell, Briefcase, MapPin, DollarSign, Clock, CheckCircle } from 'lucide-react'

interface JobAlert {
  id: string
  jobTitle: string
  location: string
  salary: string
  jobType: string
  keywords: string
  frequency: string
  active: boolean
}

interface JobMatch {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  postedDate: string
  matchScore: number
}

export default function Home() {
  const [alerts, setAlerts] = useState<JobAlert[]>([])
  const [matches, setMatches] = useState<JobMatch[]>([])
  const [formData, setFormData] = useState({
    jobTitle: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    keywords: '',
    frequency: 'daily'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const createAlert = (e: React.FormEvent) => {
    e.preventDefault()
    const newAlert: JobAlert = {
      id: Date.now().toString(),
      ...formData,
      active: true
    }
    setAlerts([...alerts, newAlert])

    // Simulate finding matches
    simulateJobMatches(newAlert)

    // Reset form
    setFormData({
      jobTitle: '',
      location: '',
      salary: '',
      jobType: 'full-time',
      keywords: '',
      frequency: 'daily'
    })
  }

  const simulateJobMatches = (alert: JobAlert) => {
    const mockJobs: JobMatch[] = [
      {
        id: '1',
        title: alert.jobTitle || 'Software Engineer',
        company: 'TechCorp Inc',
        location: alert.location || 'Remote',
        salary: alert.salary || '$80k - $120k',
        type: alert.jobType,
        postedDate: '2 hours ago',
        matchScore: 95
      },
      {
        id: '2',
        title: alert.jobTitle || 'Senior Developer',
        company: 'Innovation Labs',
        location: alert.location || 'San Francisco, CA',
        salary: alert.salary || '$100k - $150k',
        type: alert.jobType,
        postedDate: '5 hours ago',
        matchScore: 88
      },
      {
        id: '3',
        title: alert.jobTitle || 'Full Stack Engineer',
        company: 'StartupXYZ',
        location: alert.location || 'New York, NY',
        salary: alert.salary || '$90k - $130k',
        type: alert.jobType,
        postedDate: '1 day ago',
        matchScore: 82
      }
    ]
    setMatches([...matches, ...mockJobs])
  }

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Job Alerts Agent</h1>
          </div>
          <p className="text-gray-600 text-lg">Set up personalized job alerts and let our agent find opportunities for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Alert Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              Create Job Alert
            </h2>
            <form onSubmit={createAlert} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Engineer"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Remote, San Francisco, CA"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g., $80k - $120k"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <textarea
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g., React, TypeScript, Node.js"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Alert Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="realtime">Real-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Bell className="w-5 h-5" />
                Create Alert
              </button>
            </form>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Alerts ({alerts.length})</h2>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No active alerts yet. Create one to get started!</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${alert.active ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{alert.jobTitle}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {alert.active ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </p>
                      {alert.salary && (
                        <p className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {alert.salary}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {alert.frequency} updates
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        className="flex-1 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded text-sm font-medium transition"
                      >
                        {alert.active ? 'Pause' : 'Resume'}
                      </button>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Job Matches */}
        {matches.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Latest Job Matches ({matches.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium mb-2">{job.company}</p>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </p>
                    <p className="text-xs text-gray-500">{job.postedDate}</p>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium transition">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
