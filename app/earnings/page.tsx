'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const userId = localStorage.getItem('userId') || ''
      if (!userId) return
      const response = await fetch(`/api/earnings?freelancerId=${userId}`);
      const data = await response.json();
      setEarnings(data.earnings || []);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    try {
      const userId = localStorage.getItem('userId') || ''
      const response = await fetch('/api/earnings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelancerId: userId,
          amount: parseFloat(withdrawalAmount),
          reason: 'Withdrawal request',
        }),
      });

      if (!response.ok) throw new Error('Failed to request withdrawal');

      toast.success('Withdrawal request submitted!');
      setWithdrawalAmount('');
      fetchEarnings();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to request withdrawal');
    }
  };

  // Generate chart data from last 6 months
  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => {
      const monthEarnings = earnings
        .filter((e) => {
          const date = new Date(e.created_at || e.date);
          return date.getMonth() === index;
        })
        .reduce((sum, e) => sum + (e.amount || 0), 0);
      return { month, earnings: monthEarnings };
    });
  };

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Earnings Dashboard</h1>
          <p className="text-slate-400">Track your income and manage withdrawals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${stats?.totalEarnings || 0}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-cyan-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed Projects</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stats?.completedProjects || 0}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending Earnings</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${stats?.pendingEarnings || 0}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg Project Value</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${stats?.averageProjectValue || 0}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Earnings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Bar dataKey="earnings" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Withdrawal */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Request Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">Available Balance</p>
                <p className="text-2xl font-bold text-cyan-400">${stats?.totalEarnings || 0}</p>
              </div>

              <div>
                <label className="text-slate-300 text-sm">Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={handleWithdrawal}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Request Withdrawal
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Minimum withdrawal: $10. Processed within 5-7 business days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings History */}
        <Card className="mt-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Earnings History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
                </div>
              ) : earnings.length > 0 ? (
                earnings.map((earning) => (
                  <div key={earning.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                    <div>
                      <p className="font-medium text-white">{earning.project_title}</p>
                      <p className="text-sm text-slate-400">Status: {earning.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-400">${earning.total_amount}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(earning.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8">No earnings yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
