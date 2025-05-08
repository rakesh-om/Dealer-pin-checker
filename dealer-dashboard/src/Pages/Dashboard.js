import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import moment from 'moment';
import '../styles/dealergrid.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Pie chart component
const COLORS = ['#007bff', '#00C49F'];
const OrderPieChart = ({ todayCount, monthCount }) => {
  const chartData = [
    { name: 'Today', value: todayCount },
    { name: 'This Month', value: monthCount - todayCount },
  ];

  return (
    <div className="chart-wrapper">
      <h3>Orders Overview</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

const Dashboard = () => {
  // Sample data
  const data = [
    { dealerID: 'D001', orderDetails: 'Order1 details', date: '2025-05-01', email: 'dealer1@example.com', pincode: '110001' },
    { dealerID: 'D002', orderDetails: 'Order2 details', date: '2025-05-02', email: 'dealer2@example.com', pincode: '110002' },
    { dealerID: 'D003', orderDetails: 'Order3 details', date: '2025-05-03', email: 'dealer3@example.com', pincode: '110003' },
    { dealerID: 'D001', orderDetails: 'Order1 details', date: '2025-05-08', email: 'dealer1@example.com', pincode: '110001' },
    { dealerID: 'D002', orderDetails: 'Order2 details', date: '2025-05-08', email: 'dealer2@example.com', pincode: '110002' },
    { dealerID: 'D003', orderDetails: 'Order3 details', date: '2025-05-08', email: 'dealer3@example.com', pincode: '110003' },
    // Add more entries here
  ];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filters
  const filteredData = data.filter(item => {
    const orderDate = moment(item.date);
    const afterStart = startDate ? orderDate.isSameOrAfter(moment(startDate)) : true;
    const beforeEnd = endDate ? orderDate.isSameOrBefore(moment(endDate)) : true;
    return afterStart && beforeEnd;
  });

  // Calculate chart data
  const today = moment().format('YYYY-MM-DD');
  const todayOrders = data.filter(item => item.date === today).length;
  const monthOrders = data.filter(item => moment(item.date).isSame(moment(), 'month')).length;

  const columns = useMemo(() => [
    { Header: 'Dealer ID', accessor: 'dealerID' },
    { Header: 'Order Details', accessor: 'orderDetails' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Pincode', accessor: 'pincode' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: filteredData });

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Filters */}
      <div className="filter-container">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>

      {/* Pie Chart */}
      <OrderPieChart todayCount={todayOrders} monthCount={monthOrders} />

      {/* Table */}
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
