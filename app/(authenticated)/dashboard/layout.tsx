import Sidebar from './sidebar'
import SessionWrapper from './session-wrapper'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 md:p-6 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </SessionWrapper>
  )
}
  