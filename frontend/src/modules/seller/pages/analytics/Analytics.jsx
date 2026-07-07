/**
 * Analytics Page
 * Detailed metrics, charts and breakdown of store performance.
 */
import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { Card, Button } from '../../components/ui';
import { CardSkeleton } from '../../components/ui/Skeleton';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { monthlySalesData, weeklySalesData, categorySalesData, products } from '../../utils/dummyData';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const chartData = timeRange === 'monthly' ? monthlySalesData : weeklySalesData;
  const topProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title="Analytics" subtitle="Deep-dive into sales, category patterns, and product trends">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              timeRange === 'weekly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              timeRange === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            Monthly
          </button>
        </div>
      </PageHeader>

      {/* Main Revenue Performance */}
      <Card title="Sales Performance" subtitle="Revenue generated vs Total orders over time">
        <div className="h-[350px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSalesRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey={timeRange === 'monthly' ? 'month' : 'day'} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                formatter={(value, name) => [name === 'revenue' ? formatCurrency(value) : value, name === 'revenue' ? 'Revenue' : 'Orders']}
              />
              <Legend verticalAlign="top" height={36} />
              <Area name="revenue" type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#colorSalesRev)" />
              <Line name="orders" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card title="Category Distribution" subtitle="How categories represent total sales volume">
          <div className="h-[300px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Performing Products */}
        <Card title="Top Selling Products" subtitle="Top 5 items driving your store's GMV">
          <div className="space-y-4 mt-6">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-400">SKU: {p.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{p.sales} sales</p>
                  <p className="text-xs text-gray-400">{formatCurrency((p.discountPrice || p.price) * p.sales)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
