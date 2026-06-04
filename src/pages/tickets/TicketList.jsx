import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";
import DataTable from "../../components/tables/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  getTickets,
  deleteTicket,
} from "../../services/ticketService";

export default function TicketList() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "category",
      label: "Category",
    },
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticket) => {
    try {
      await deleteTicket(ticket.id);
      loadTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Tickets">
      <div className="mb-4">
        <button
          onClick={() => navigate("/tickets/new")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Create Ticket
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={tickets}
          onView={(ticket) =>
            navigate(`/tickets/${ticket.id}`)
          }
          onEdit={(ticket) =>
            navigate(`/tickets/${ticket.id}/edit`)
          }
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}