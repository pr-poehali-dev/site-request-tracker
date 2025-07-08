import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [requestsPerSecond, setRequestsPerSecond] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [uptime, setUptime] = useState(99.9);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Превышен лимит запросов (>100/сек)",
      time: "2 мин назад",
    },
    {
      id: 2,
      type: "success",
      message: "Соединение с сервером восстановлено",
      time: "5 мин назад",
    },
  ]);

  // Симуляция live данных
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        setRequestsPerSecond(Math.floor(Math.random() * 150) + 20);
        setResponseTime(Math.floor(Math.random() * 500) + 50);
        setUptime(99.5 + Math.random() * 0.5);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const metricsData = [
    { time: "12:00", requests: 45, response: 120 },
    { time: "12:05", requests: 67, response: 110 },
    { time: "12:10", requests: 89, response: 95 },
    { time: "12:15", requests: 123, response: 140 },
    { time: "12:20", requests: 156, response: 180 },
    { time: "12:25", requests: 134, response: 160 },
    { time: "12:30", requests: 98, response: 130 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="Activity" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ServerMonitor
                </h1>
                <p className="text-sm text-gray-500">
                  Мониторинг стресс-тестов
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`${isMonitoring ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
              >
                <Icon
                  name={isMonitoring ? "Square" : "Play"}
                  className="mr-2"
                  size={16}
                />
                {isMonitoring ? "Остановить" : "Запустить"}
              </Button>
              <Button variant="outline">
                <Icon name="Settings" className="mr-2" size={16} />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="Zap" className="mr-2 text-blue-500" size={16} />
                Запросов/сек
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {requestsPerSecond}
              </div>
              <p className="text-sm text-gray-500 mt-1">Среднее: 87/сек</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="Clock" className="mr-2 text-green-500" size={16} />
                Время ответа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {responseTime}ms
              </div>
              <p className="text-sm text-gray-500 mt-1">Среднее: 125ms</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon
                  name="TrendingUp"
                  className="mr-2 text-purple-500"
                  size={16}
                />
                Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {uptime.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500 mt-1">За последние 24ч</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon
                  name="Server"
                  className="mr-2 text-orange-500"
                  size={16}
                />
                Статус
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${isMonitoring ? "bg-green-500" : "bg-gray-400"}`}
                ></div>
                <span className="text-lg font-semibold">
                  {isMonitoring ? "Активен" : "Остановлен"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">HTTP/HTTPS</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Requests Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon
                  name="BarChart3"
                  className="mr-2 text-blue-500"
                  size={20}
                />
                Запросы в реальном времени
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-1">
                {metricsData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(data.requests / 200) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {data.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Пик: 156 запросов</span>
                <span>Среднее: 102 запроса</span>
              </div>
            </CardContent>
          </Card>

          {/* Response Time Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon
                  name="Activity"
                  className="mr-2 text-green-500"
                  size={20}
                />
                Время отклика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-1">
                {metricsData.map((data, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm transition-all duration-300"
                      style={{ height: `${(data.response / 250) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {data.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Макс: 180ms</span>
                <span>Мин: 95ms</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Bell" className="mr-2 text-orange-500" size={20} />
                Алерты и уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    className={`${alert.type === "warning" ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}`}
                  >
                    <Icon
                      name={
                        alert.type === "warning"
                          ? "AlertTriangle"
                          : "CheckCircle"
                      }
                      className={`${alert.type === "warning" ? "text-orange-500" : "text-green-500"}`}
                      size={16}
                    />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{alert.message}</span>
                        <Badge variant="secondary" className="text-xs">
                          {alert.time}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon
                  name="Settings"
                  className="mr-2 text-purple-500"
                  size={20}
                />
                Настройки мониторинга
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    URL для мониторинга
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Лимит запросов/сек
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Макс. время ответа (ms)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="500"
                  />
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Icon name="Save" className="mr-2" size={16} />
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
