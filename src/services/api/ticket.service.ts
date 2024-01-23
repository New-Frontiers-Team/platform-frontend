import api from "@/helpers/api"
import { Ticket } from "@/models/ticket.model"

export class TicketService {
  public static create(title: string, description: string): Promise<Ticket> {
    return api.post('/tickets', {
      title: title,
      description: description
    }).then(response => response.data)
  }

  public static findTickets(page: number, limit: number) {
    return api.get('/tickets', {
      params: {
        page: page,
        limit: limit
      }
    }).then(response => response.data)
  }

  public static assumeTicket(ticketId: string) {
    return api.put(`/tickets/${ticketId}`).then(response => response.data)
  }
}