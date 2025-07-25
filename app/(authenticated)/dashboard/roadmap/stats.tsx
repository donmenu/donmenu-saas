import { Card, Title, Text, Metric, ProgressBar } from '@tremor/react'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  FireIcon
} from '@heroicons/react/24/outline'

interface DevelopmentStats {
  totalFeatures: number
  releasedFeatures: number
  inDevelopment: number
  plannedFeatures: number
  ideas: number
  completionRate: number
  nextRelease: string
  activeDevelopment: number
}

const stats: DevelopmentStats = {
  totalFeatures: 25,
  releasedFeatures: 11,
  inDevelopment: 3,
  plannedFeatures: 8,
  ideas: 4,
  completionRate: 44, // (11/25) * 100
  nextRelease: '2024-08-15',
  activeDevelopment: 3
}

export default function DevelopmentStats() {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'green'
    if (percentage >= 60) return 'blue'
    if (percentage >= 40) return 'orange'
    return 'red'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <ArrowTrendingUpIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Title className="text-gray-800">Progresso Geral</Title>
            <Text className="text-gray-600">Sistema completo</Text>
          </div>
        </div>
        <Metric className="text-2xl font-bold text-blue-600 mb-2">
          {stats.completionRate}%
        </Metric>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              getProgressColor(stats.completionRate) === 'green' ? 'bg-green-500' :
              getProgressColor(stats.completionRate) === 'blue' ? 'bg-blue-500' :
              getProgressColor(stats.completionRate) === 'orange' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
        <Text className="text-sm text-gray-500 mt-2">
          {stats.releasedFeatures} de {stats.totalFeatures} funcionalidades
        </Text>
      </Card>

      {/* Released Features */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-full">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <Title className="text-gray-800">Disponíveis</Title>
            <Text className="text-gray-600">Funcionalidades ativas</Text>
          </div>
        </div>
        <Metric className="text-2xl font-bold text-green-600">
          {stats.releasedFeatures}
        </Metric>
        <Text className="text-sm text-gray-500 mt-2">
          Prontas para uso
        </Text>
      </Card>

      {/* In Development */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <ClockIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <Title className="text-gray-800">Em Desenvolvimento</Title>
            <Text className="text-gray-600">Em construção</Text>
          </div>
        </div>
        <Metric className="text-2xl font-bold text-blue-600">
          {stats.inDevelopment}
        </Metric>
        <Text className="text-sm text-gray-500 mt-2">
          Próximas funcionalidades
        </Text>
      </Card>

      {/* Planned Features */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-full">
            <CalendarDaysIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <Title className="text-gray-800">Planejadas</Title>
            <Text className="text-gray-600">No roadmap</Text>
          </div>
        </div>
        <Metric className="text-2xl font-bold text-orange-600">
          {stats.plannedFeatures}
        </Metric>
        <Text className="text-sm text-gray-500 mt-2">
          Em planejamento
        </Text>
      </Card>
    </div>
  )
} 