import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import { getTicket } from "../../services/ticketService";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] =
    useState(null);

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    const response =
      await getTicket(id);

    setTicket(response.data);
  };

  if (!ticket) {
    return (
      <PageLayout title="Ticket Details">
        Loading...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Ticket Details">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard
            label="Title"
            value={ticket.title}
          />

          <InfoCard
            label="Status"
            value={ticket.status}
          />

          <InfoCard
            label="Priority"
            value={ticket.priority}
          />

          <InfoCard
            label="Category"
            value={ticket.category}
          />

          <InfoCard
            label="Description"
            value={ticket.description}
          />
        </div>
      </div>
    </PageLayout>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="font-semibold mt-1">
        {value || "-"}
      </h3>
    </div>
  );
}