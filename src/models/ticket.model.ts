export type Ticket = {
  id: string,
  title: string,
  userId: number,
  responsibleId?: number,
  status: string,
  createdAt: string
}