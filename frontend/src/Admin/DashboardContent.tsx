import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Users } from "./Users";
import AdminBlogs from "./AdminBlogs";

// Register the required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale);

const DashboardContent = () => {
  // State for blogs
 


  // Chart Data
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Number of Posts",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef(null);

  // Cleanup Chart.js instance when component unmounts
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the chart instance
      }
    };
  }, []);


 

  return (
    <div>
      {/* Graph Section */}
      <div className="mb-10 h-[30vh] w-[100vw]">
        <h3 className="text-xl text-center font-bold mb-4">Monthly Post Statistics</h3>
        <Chart type="bar" data={data} ref={chartRef} />
      </div>

      {/* New Users Section */}
      <Users />

      {/* New Blogs Section */}
     <AdminBlogs/>
    </div>
  );
};

export default DashboardContent;
