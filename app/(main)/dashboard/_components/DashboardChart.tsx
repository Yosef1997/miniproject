import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

interface DataItem {
  organizerId: number
  totalSales: number
  date: string
}

interface ConvertedData {
  data: number[]
  label: string[]
}

function convertDataFormat(data: DataItem[]): ConvertedData {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  )

  const salesByHour = new Array(24).fill(0)

  data.forEach((item) => {
    const date = new Date(item.date)
    const hour = date.getHours()
    salesByHour[hour] = item.totalSales
  })

  return {
    data: salesByHour,
    label: hours,
  }
}

interface BarChartProps {
  data: DataItem[]
}

const DashboardChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        const convertedData = convertDataFormat(data)
        console.log("convertedData>>>", convertedData)
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: convertedData.label,
            datasets: [
              {
                label: "Total Sales",
                data: convertedData.data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Total Sales",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}

export default DashboardChart
