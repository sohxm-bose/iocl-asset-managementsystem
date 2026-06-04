import { useEffect, useState } from "react";

import PageLayout from "../../components/layout/PageLayout";

import {
  Monitor,
  Users,
  MapPin,
  Building2,
  Ticket,
} from "lucide-react";

import StatCard from "./StatCard";

import { getAssets } from "../../services/assetService";
import { getEmployees } from "../../services/employeeService";
import { getLocations } from "../../services/locationService";
import { getVendors } from "../../services/vendorService";
import { getTickets } from "../../services/ticketService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    assets: 0,
    employees: 0,
    locations: 0,
    vendors: 0,
    tickets: 0,
  });

  const [recentAssets, setRecentAssets] = useState([]);
  const [recentTickets, setRecentTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        assetsRes,
        employeesRes,
        locationsRes,
        vendorsRes,
        ticketsRes,
      ] = await Promise.all([
        getAssets(),
        getEmployees(),
        getLocations(),
        getVendors(),
        getTickets(),
      ]);

      const assets = assetsRes.data || [];
      const employees = employeesRes.data || [];
      const locations = locationsRes.data || [];
      const vendors = vendorsRes.data || [];
      const tickets = ticketsRes.data || [];

      setStats({
        assets: assets.length,
        employees: employees.length,
        locations: locations.length,
        vendors: vendors.length,
        tickets: tickets.filter(
          (ticket) => ticket.status !== "CLOSED"
        ).length,
      });

      setRecentAssets(
        assets.slice(0, 5)
      );

      setRecentTickets(
        tickets.slice(0, 5)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Dashboard">
        Loading Dashboard...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dashboard">
      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

        <StatCard
          title="Assets"
          value={stats.assets}
          icon={<Monitor size={30} />}
        />

        <StatCard
          title="Employees"
          value={stats.employees}
          icon={<Users size={30} />}
        />

        <StatCard
          title="Locations"
          value={stats.locations}
          icon={<MapPin size={30} />}
        />

        <StatCard
          title="Vendors"
          value={stats.vendors}
          icon={<Building2 size={30} />}
        />

        <StatCard
          title="Open Tickets"
          value={stats.tickets}
          icon={<Ticket size={30} />}
        />

      </div>

      {/* Recent Assets & Tickets */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Assets */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">
            Recent Assets
          </h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">
                  Asset Tag
                </th>

                <th className="py-2">
                  Model
                </th>

                <th className="py-2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b"
                >
                  <td className="py-2">
                    {asset.assetTag}
                  </td>

                  <td className="py-2">
                    {asset.model}
                  </td>

                  <td className="py-2">
                    {asset.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tickets */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">
            Recent Tickets
          </h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">
                  Title
                </th>

                <th className="py-2">
                  Priority
                </th>

                <th className="py-2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b"
                >
                  <td className="py-2">
                    {ticket.title}
                  </td>

                  <td className="py-2">
                    {ticket.priority}
                  </td>

                  <td className="py-2">
                    {ticket.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </PageLayout>
  );
}